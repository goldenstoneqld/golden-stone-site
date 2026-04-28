/* ==========================================================================
   Golden Stone QLD — Quote Form · Google Apps Script Backend

   Sheet ID  : 1xuhWueV2LUCHqVQ3SbFW0hWqM5Oi7ohQC7jjGG1e4bc
   Drive ID  : 1oOjTXVdesiiwJEXcefg3-E3zNPn3tNVW
   Notify    : sales@goldenstoneqld.com.au

   Client ID format: XXXXAABB
     XXXX = zero-padded sequential number (0001, 0002, …)
     AA   = 2-digit month (01–12)
     BB   = 2-digit year (26 = 2026)
   ========================================================================== */

var SHEET_ID    = '1xuhWueV2LUCHqVQ3SbFW0hWqM5Oi7ohQC7jjGG1e4bc';
var FOLDER_ID   = '1oOjTXVdesiiwJEXcefg3-E3zNPn3tNVW';
var NOTIFY_EMAIL = 'sales@goldenstoneqld.com.au';
var TIMEZONE    = 'Australia/Brisbane';

var HEADERS = [
  'Client ID',
  'Timestamp',
  'Full Name',
  'Phone',
  'Email',
  'Project Type',
  'Stone Preference',
  'Approx. Size',
  'Suburb / City',
  'State',
  'Message',
  'How Found',
  'Preferred Contact',
  'Best Time to Call',
  'Files'
];

/* --------------------------------------------------------------------------
   doGet — health check endpoint
   -------------------------------------------------------------------------- */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'Golden Stone QLD — Quote Form' }))
    .setMimeType(ContentService.MimeType.JSON);
}

/* --------------------------------------------------------------------------
   doPost — main form submission handler
   -------------------------------------------------------------------------- */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); /* Wait up to 30 s; throws if lock cannot be acquired */

  try {
    var data = JSON.parse(e.postData.contents);

    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheets()[0];

    /* Write headers if the sheet is empty */
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      SpreadsheetApp.flush();
    }

    /* Generate sequential client ID ---
       After ensuring headers exist, lastRow = 1 for first submission,
       2 for second, etc.  So seq = lastRow gives 1-based counting. */
    var now     = new Date();
    var seq     = sheet.getLastRow(); /* header is row 1 → first data row will be row 2, seq = 1 */
    var month   = Utilities.formatDate(now, TIMEZONE, 'MM');
    var year    = Utilities.formatDate(now, TIMEZONE, 'yy');
    var clientId = pad(seq, 4) + month + year;

    /* Create per-client folder in Drive */
    var parentFolder = DriveApp.getFolderById(FOLDER_ID);
    var clientFolder = parentFolder.createFolder(clientId + ' — ' + (data.name || 'Unknown'));

    /* Upload base64-encoded files */
    var fileLinks = [];
    if (data.files && data.files.length > 0) {
      data.files.forEach(function (f) {
        var blob = Utilities.newBlob(
          Utilities.base64Decode(f.data),
          f.type || 'application/octet-stream',
          f.name
        );
        var uploaded = clientFolder.createFile(blob);
        uploaded.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        fileLinks.push(f.name + ': ' + uploaded.getUrl());
      });
    }

    /* Append data row */
    var timestamp = Utilities.formatDate(now, TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
    sheet.appendRow([
      clientId,
      timestamp,
      data.name         || '',
      data.phone        || '',
      data.email        || '',
      data.projectType  || '',
      data.stonePref    || '',
      data.size         || '',
      data.suburb       || '',
      data.state        || 'QLD',
      data.message      || '',
      data.howFound     || '',
      data.preferredContact || '',
      data.bestTime     || '',
      data.files && data.files.length > 0 ? clientFolder.getUrl() : ''
    ]);

    /* Auto-resize columns for readability */
    sheet.autoResizeColumns(1, HEADERS.length);

    /* Send notification email */
    var subject = 'New Quote Request [' + clientId + '] — ' + (data.name || 'Unknown');
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: subject,
      htmlBody: buildEmailHtml(data, clientId, clientFolder.getUrl(), fileLinks)
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, clientId: clientId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    /* Log the error for debugging in Apps Script execution log */
    console.error('doPost error:', err.message, err.stack);

    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */
function pad(n, width) {
  var s = String(n);
  while (s.length < width) s = '0' + s;
  return s;
}

function buildEmailHtml(data, clientId, folderUrl, fileLinks) {
  var rows = [
    ['Client ID',           clientId],
    ['Full Name',           data.name         || '—'],
    ['Phone',               data.phone        || '—'],
    ['Email',               data.email        || '—'],
    ['Project Type',        data.projectType  || '—'],
    ['Stone Preference',    data.stonePref    || '—'],
    ['Approx. Size',        data.size         || '—'],
    ['Suburb / City',       (data.suburb || '—') + ', ' + (data.state || 'QLD')],
    ['Preferred Contact',   data.preferredContact || '—'],
    ['Best Time to Call',   data.bestTime     || '—'],
    ['How Found',           data.howFound     || '—']
  ];

  var tableRows = rows.map(function (r) {
    return '<tr>'
      + '<td style="padding:8px 12px;font-weight:600;color:#5C5650;white-space:nowrap;border-bottom:1px solid #EDE7DA;">' + htmlEscape(r[0]) + '</td>'
      + '<td style="padding:8px 12px;color:#111111;border-bottom:1px solid #EDE7DA;">' + htmlEscape(r[1]) + '</td>'
      + '</tr>';
  }).join('');

  var messageBlock = data.message
    ? '<p style="margin:0 0 8px;font-weight:600;color:#5C5650;">Message</p>'
      + '<p style="margin:0;padding:16px;background:#F5F0E8;border-radius:6px;color:#111111;line-height:1.6;">'
      + htmlEscape(data.message).replace(/\n/g, '<br>')
      + '</p>'
    : '';

  var filesBlock = fileLinks.length > 0
    ? '<p style="margin:24px 0 8px;font-weight:600;color:#5C5650;">Attached Files</p>'
      + '<ul style="margin:0;padding-left:20px;color:#111111;">'
      + fileLinks.map(function (l) {
          var parts = l.split(': ');
          var name  = parts[0];
          var url   = parts.slice(1).join(': ');
          return '<li><a href="' + url + '" style="color:#B8922A;">' + htmlEscape(name) + '</a></li>';
        }).join('')
      + '</ul>'
    : '';

  return '<!DOCTYPE html><html><body style="font-family:\'Helvetica Neue\',Arial,sans-serif;background:#F5F0E8;margin:0;padding:0;">'
    + '<div style="max-width:640px;margin:40px auto;background:#FFFFFF;border-radius:8px;overflow:hidden;box-shadow:0 4px 16px rgba(17,17,17,0.10);">'
    + '<div style="background:#111111;padding:24px 32px;border-top:4px solid #B8922A;">'
    + '<p style="margin:0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#B8922A;font-weight:600;">Golden Stone QLD</p>'
    + '<h1 style="margin:8px 0 0;font-size:22px;color:#FFFFFF;font-weight:700;">New Quote Request</h1>'
    + '<p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.55);">Client ID: ' + clientId + '</p>'
    + '</div>'
    + '<div style="padding:32px;">'
    + '<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">' + tableRows + '</table>'
    + messageBlock
    + filesBlock
    + '<div style="margin-top:32px;padding-top:24px;border-top:1px solid #EDE7DA;">'
    + '<a href="' + folderUrl + '" style="display:inline-block;padding:12px 24px;background:#B8922A;color:#111111;text-decoration:none;border-radius:6px;font-weight:600;font-size:14px;">Open Client Folder in Drive</a>'
    + '</div>'
    + '</div>'
    + '<div style="padding:16px 32px;background:#F5F0E8;border-top:1px solid #EDE7DA;">'
    + '<p style="margin:0;font-size:11px;color:#9E9790;">This email was generated automatically by the Golden Stone QLD quote form.</p>'
    + '</div>'
    + '</div>'
    + '</body></html>';
}

function htmlEscape(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}
