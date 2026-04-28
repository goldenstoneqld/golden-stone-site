# Apps Script Setup — Golden Stone QLD Quote Form

This guide walks you through deploying the Google Apps Script backend that powers
the contact / quote form at `contact.html`.

---

## Prerequisites

- A Google account with access to the target Google Sheet and Google Drive folder.
- The Sheet and Drive folder IDs are already hard-coded in `apps-script/Code.gs`.

---

## Step 1 — Open Google Apps Script

1. Go to [script.google.com](https://script.google.com) and click **New project**.
2. Name the project **Golden Stone QLD — Quote Form**.

---

## Step 2 — Paste the code

1. Delete the default empty function in the editor.
2. Open `apps-script/Code.gs` from this repository.
3. Copy the entire contents and paste it into the Apps Script editor.
4. Click the **Save** icon (or press `Ctrl+S` / `Cmd+S`).

---

## Step 3 — Run the setup test

1. In the function dropdown at the top, select **doGet**.
2. Click **Run**.
3. Grant the requested permissions when prompted:
   - View and manage your spreadsheets (Google Sheets)
   - View and manage files in Google Drive
   - Send email as you (Gmail)
4. After the run completes, check the execution log — you should see no errors.

> **Note:** You only need to grant permissions once. All subsequent executions
> (including web requests) will use the same authorisation.

---

## Step 4 — Deploy as a Web App

1. Click **Deploy** → **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment settings:
   - **Description:** Quote Form v1
   - **Execute as:** Me *(your Google account)*
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Copy the **Web app URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

## Step 5 — Add the URL to the website

1. Open `src/scripts/contact.js`.
2. Find this line near the top:
   ```javascript
   var APPS_SCRIPT_URL = 'REPLACE_WITH_YOUR_APPS_SCRIPT_WEB_APP_URL';
   ```
3. Replace the placeholder string with your Web App URL:
   ```javascript
   var APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
   ```
4. Save the file, commit, and push.

---

## Step 6 — Test the form

1. Open `contact.html` in a browser.
2. Fill in all required fields and submit.
3. Verify:
   - A new row appears in the Google Sheet with the correct Client ID.
   - A subfolder named with the Client ID is created inside the Drive folder.
   - A notification email arrives at `sales@goldenstoneqld.com.au`.

---

## Redeploying after code changes

If you update `Code.gs`, you **must** create a new deployment version:

1. Click **Deploy** → **Manage deployments**.
2. Click the edit (pencil) icon on the existing deployment.
3. Change **Version** to **New version**.
4. Click **Deploy**.

> The Web App URL stays the same — you do not need to update `contact.js`.

---

## Client ID format

| Part | Meaning | Example |
|------|---------|---------|
| `XXXX` | Zero-padded sequential number | `0001` |
| `AA` | 2-digit month of submission | `04` (April) |
| `BB` | 2-digit year of submission | `26` (2026) |

Full example: `00010426` = first client, April 2026.

A Drive subfolder is created for each submission, named:
`00010426 — Sarah Johnson`

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Form submits but no row appears in the sheet | Check the Apps Script execution log (View → Executions) for errors. Re-run permissions grant if needed. |
| "The script does not have permission" error | Re-run `doGet` manually in the editor to trigger the OAuth flow again. |
| Emails not arriving | Check Gmail spam folder. Confirm `NOTIFY_EMAIL` constant is correct in `Code.gs`. |
| Files not uploading | Confirm the Drive folder ID in `Code.gs` matches `FOLDER_ID`. Ensure "Execute as: Me" is set in the deployment. |
| Need to change sheet or folder | Edit the `SHEET_ID` or `FOLDER_ID` constants at the top of `Code.gs`, save, and redeploy with a new version. |
