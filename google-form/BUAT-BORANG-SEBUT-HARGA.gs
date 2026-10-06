/**
 * Mega Safe Security Services Sdn Bhd
 * AUTOMASI BORANG SEBUT HARGA
 *
 * Jalankan fungsi BUAT_BORANG_SEBUT_HARGA() sekali sahaja.
 * Skrip ini akan mencipta:
 * 1. Borang Google untuk permintaan sebut harga
 * 2. Google Sheet untuk menyimpan semua jawapan
 * 3. Soalan yang tersusun supaya mudah ditapis dan dibalas
 */
function BUAT_BORANG_SEBUT_HARGA() {
  const form = FormApp.create('Mega Safe Security Services Sdn Bhd - Permintaan Sebut Harga');
  form.setDescription(
    'Sila lengkapkan borang ini untuk mendapatkan sebut harga perkhidmatan keselamatan. ' +
    'Maklumat anda akan digunakan oleh Mega Safe Security Services Sdn Bhd untuk semakan dan tindakan susulan.'
  );
  form.setConfirmationMessage('Terima kasih. Permintaan sebut harga anda telah diterima. Pihak Mega Safe Security Services Sdn Bhd akan menghubungi anda untuk tindakan selanjutnya.');
  form.setCollectEmail(false);

  form.addTextItem().setTitle('Nama / Pegawai Untuk Dihubungi').setRequired(true);
  form.addTextItem().setTitle('Syarikat / Organisasi').setRequired(true);
  form.addTextItem().setTitle('Nombor Telefon').setRequired(true);
  form.addTextItem().setTitle('E-mel').setRequired(false);
  form.addTextItem().setTitle('Lokasi Premis').setRequired(true);
  form.addListItem().setTitle('Jenis Premis').setChoiceValues([
    'Kerajaan','GLC / Korporat','Komersial','Industri','Pembinaan','Kediaman','Acara','Lain-lain'
  ]).setRequired(true);
  form.addTextItem().setTitle('Anggaran Bilangan Pengawal Diperlukan').setRequired(false);
  form.addDateItem().setTitle('Tarikh Mula Diperlukan').setRequired(false);
  form.addParagraphTextItem().setTitle('Keperluan Keselamatan / Skop Kerja').setRequired(false);
  form.addParagraphTextItem().setTitle('Maklumat Tambahan').setRequired(false);

  const sheet = SpreadsheetApp.create('Mega Safe - Senarai Permintaan Sebut Harga');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  // Sediakan helaian tindakan susulan untuk pasukan Mega Safe.
  const followUp = sheet.insertSheet('Tindakan Susulan');
  followUp.getRange(1, 1, 1, 7).setValues([['Tarikh Terima','Nama / Organisasi','Telefon','Lokasi','Jenis Premis','Status','Catatan / Tindakan']]);
  followUp.setFrozenRows(1);
  followUp.getRange('F2:F1000').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['Baru','Sedang Diproses','Sebutharga Dihantar','Susulan','Selesai','Tidak Berjaya'], true).build());
  followUp.getRange('A:G').setWrap(true);

  // Hantar notifikasi e-mel apabila borang diterima.
  ScriptApp.newTrigger('NOTIFIKASI_SEBUT_HARGA').forSpreadsheet(sheet).onFormSubmit().create();

  Logger.log('URL BORANG UNTUK PELANGGAN: ' + form.getPublishedUrl());
  Logger.log('URL EDIT BORANG: ' + form.getEditUrl());
  Logger.log('URL GOOGLE SHEET JAWAPAN: ' + sheet.getUrl());

  return {
    borang: form.getPublishedUrl(),
    edit: form.getEditUrl(),
    spreadsheet: sheet.getUrl()
  };
}


/** Hantar notifikasi kepada pasukan Mega Safe apabila pelanggan menghantar borang. */
function NOTIFIKASI_SEBUT_HARGA(e) {
  const recipient = 'megasafe.my@gmail.com';
  const values = e.namedValues || {};
  const subject = 'Permintaan Sebut Harga Baharu - Mega Safe Security Services';
  let body = 'Permintaan sebut harga baharu telah diterima.\n\n';
  Object.keys(values).forEach(function(key) { body += key + ': ' + values[key].join(', ') + '\n'; });
  body += '\nSila semak Google Sheet untuk tindakan susulan.';
  MailApp.sendEmail(recipient, subject, body);

  // Rekod ringkas dalam helaian Tindakan Susulan.
  const sheet = e.range.getSheet().getParent();
  const followUp = sheet.getSheetByName('Tindakan Susulan');
  if (followUp) {
    followUp.appendRow([
      new Date(),
      (values['Nama / Pegawai Untuk Dihubungi'] || [''])[0] + ' / ' + (values['Syarikat / Organisasi'] || [''])[0],
      (values['Nombor Telefon'] || [''])[0],
      (values['Lokasi Premis'] || [''])[0],
      (values['Jenis Premis'] || [''])[0],
      'Baru',
      'Semak permintaan dan hubungi pelanggan.'
    ]);
  }
}
