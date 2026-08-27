/**
 * Petlisted application intake.
 *
 * 1. Open the SAME Google Sheet you use for the whitelist checker.
 * 2. Extensions → Apps Script
 * 3. Delete the stub, paste this whole file, Save.
 * 4. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL.
 * 6. Paste it into dashboard.html as WL_APPLY_SCRIPT.
 *
 * Writes to a tab named "Applications":
 * time | address | post | status
 *
 * Do NOT write pending apps onto the address|phase tab —
 * that tab is the approved checker list only.
 */

var TAB = 'Applications';
var HEAD = ['time', 'address', 'post', 'status'];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(TAB);
  if (!sheet) {
    sheet = ss.insertSheet(TAB);
    sheet.appendRow(HEAD);
    sheet.setFrozenRows(1);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEAD);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function saveRow_(address, post) {
  var addr = String(address || '').trim().toLowerCase();
  var link = String(post || '').trim();
  if (!/^0x[a-fA-F0-9]{40}$/.test(addr)) return { ok: false, error: 'bad address' };
  if (!/^https?:\/\/(www\.)?(x|twitter)\.com\//i.test(link)) return { ok: false, error: 'bad post' };

  var sheet = getSheet_();
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet.appendRow([new Date(), addr, link, 'pending']);
  } finally {
    lock.releaseLock();
  }
  return { ok: true };
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
    return json_(saveRow_(data.address, data.post));
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  try {
    var p = (e && e.parameter) || {};
    if (!p.address && !p.post) return json_({ ok: true, ready: true });
    return json_(saveRow_(p.address, p.post));
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}
