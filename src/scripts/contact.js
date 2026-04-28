/* ==========================================================================
   Golden Stone QLD — Contact / Quote Form JS
   Handles: file validation, base64 encoding, form submission, UX states.

   IMPORTANT: Replace APPS_SCRIPT_URL below with your deployed Web App URL.
   See docs/apps-script-setup.md for deployment instructions.
   ========================================================================== */

(function () {
  'use strict';

  /* ── Replace with your deployed Apps Script Web App URL ─────────────────── */
  var APPS_SCRIPT_URL = 'REPLACE_WITH_YOUR_APPS_SCRIPT_WEB_APP_URL';

  var MAX_FILE_SIZE  = 15 * 1024 * 1024; /* 15 MB */
  var MAX_FILE_COUNT = 10;
  var ALLOWED_EXT    = ['.pdf', '.docx', '.doc', '.dwg', '.jpg', '.jpeg', '.png', '.gif', '.webp'];

  /* ── Element refs ───────────────────────────────────────────────────────── */
  var form           = document.getElementById('quote-form');
  var formContainer  = document.getElementById('form-container');
  var formSuccess    = document.getElementById('form-success');
  var formErrorAlert = document.getElementById('form-error-alert');
  var submitBtn      = document.getElementById('submit-btn');
  var submitLabel    = document.getElementById('submit-label');
  var submitSpinner  = document.getElementById('submit-spinner');
  var fileInput      = document.getElementById('files');
  var fileBrowseBtn  = document.getElementById('file-browse-btn');
  var fileZone       = document.getElementById('file-upload-zone');
  var fileListEl     = document.getElementById('file-list');
  var fileErrorEl    = document.getElementById('file-error');
  var bestTimeGroup  = document.getElementById('best-time-group');

  if (!form) return; /* Not on contact page */

  var selectedFiles = [];

  /* ── Conditional: hide "Best Time to Call" when Email is preferred ───────── */
  document.querySelectorAll('[name="preferredContact"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      bestTimeGroup.hidden = (this.value !== 'Phone');
    });
  });

  /* ── File upload — click to browse ─────────────────────────────────────── */
  if (fileBrowseBtn) {
    fileBrowseBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      fileInput.click();
    });
  }

  /* Clicking anywhere on the zone also opens file picker */
  fileZone.addEventListener('click', function (e) {
    if (e.target !== fileBrowseBtn) {
      fileInput.click();
    }
  });

  fileInput.addEventListener('change', function () {
    handleFiles(Array.from(this.files));
    this.value = ''; /* Reset so the same file can be re-added after removal */
  });

  /* ── Drag and drop ──────────────────────────────────────────────────────── */
  fileZone.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
    fileZone.classList.add('drag-over');
  });

  fileZone.addEventListener('dragleave', function (e) {
    e.stopPropagation();
    fileZone.classList.remove('drag-over');
  });

  fileZone.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    fileZone.classList.remove('drag-over');
    handleFiles(Array.from(e.dataTransfer.files));
  });

  /* ── Handle file selection ──────────────────────────────────────────────── */
  function handleFiles(newFiles) {
    var errors = [];

    newFiles.forEach(function (file) {
      var ext = '.' + file.name.split('.').pop().toLowerCase();

      if (ALLOWED_EXT.indexOf(ext) === -1) {
        errors.push('“' + file.name + '” is not an allowed file type.');
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push('“' + file.name + '” exceeds the 15 MB limit.');
        return;
      }

      if (selectedFiles.length >= MAX_FILE_COUNT) {
        errors.push('Maximum of 10 files allowed.');
        return;
      }

      /* Skip duplicates (same name + size) */
      var isDuplicate = selectedFiles.some(function (f) {
        return f.name === file.name && f.size === file.size;
      });
      if (!isDuplicate) {
        selectedFiles.push(file);
      }
    });

    renderFileList();

    if (errors.length > 0) {
      fileErrorEl.textContent = errors.join(' ');
    } else {
      fileErrorEl.textContent = '';
    }
  }

  /* ── Render file list ───────────────────────────────────────────────────── */
  function renderFileList() {
    fileListEl.innerHTML = '';

    selectedFiles.forEach(function (file, idx) {
      var item = document.createElement('div');
      item.className = 'file-item';
      item.innerHTML =
        '<span class="file-item__name">' + escapeHtml(file.name) + '</span>' +
        '<span class="file-item__size">' + formatFileSize(file.size) + '</span>' +
        '<button type="button" class="file-item__remove" data-idx="' + idx + '" aria-label="Remove ' + escapeHtml(file.name) + '">' +
        '×' +
        '</button>';
      fileListEl.appendChild(item);
    });

    fileListEl.style.display = selectedFiles.length > 0 ? 'flex' : 'none';
  }

  /* Remove file on button click */
  fileListEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.file-item__remove');
    if (!btn) return;
    var idx = parseInt(btn.getAttribute('data-idx'), 10);
    selectedFiles.splice(idx, 1);
    fileErrorEl.textContent = '';
    renderFileList();
  });

  /* ── Form submission ────────────────────────────────────────────────────── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    formErrorAlert.hidden = true;

    filesToBase64(selectedFiles)
      .then(function (encodedFiles) {
        var preferredContact = (form.querySelector('[name="preferredContact"]:checked') || {}).value || '';
        var bestTime = (!bestTimeGroup.hidden && form.querySelector('[name="bestTime"]:checked'))
          ? form.querySelector('[name="bestTime"]:checked').value
          : '';

        var payload = {
          name:             trim(form.querySelector('#name')),
          phone:            trim(form.querySelector('#phone')),
          email:            trim(form.querySelector('#email')),
          projectType:      val(form.querySelector('#project-type')),
          stonePref:        val(form.querySelector('#stone-pref')),
          size:             val(form.querySelector('#size')),
          suburb:           trim(form.querySelector('#suburb')),
          state:            val(form.querySelector('#state')),
          message:          trim(form.querySelector('#message')),
          howFound:         val(form.querySelector('#how-found')),
          preferredContact: preferredContact,
          bestTime:         bestTime,
          files:            encodedFiles
        };

        return fetch(APPS_SCRIPT_URL, {
          method:  'POST',
          mode:    'no-cors', /* Apps Script doesn't support CORS preflight; response will be opaque */
          headers: { 'Content-Type': 'text/plain' },
          body:    JSON.stringify(payload)
        });
      })
      .then(function () {
        /* Response is opaque (no-cors) — treat any resolved fetch as success */
        showSuccess();
      })
      .catch(function (err) {
        console.error('Quote form submission error:', err);
        setLoading(false);
        formErrorAlert.hidden = false;
        formErrorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
  });

  /* ── Validation ─────────────────────────────────────────────────────────── */
  function validateForm() {
    var isValid = true;

    /* Required text/email/tel/select inputs */
    form.querySelectorAll('[required]').forEach(function (field) {
      clearError(field);
      if (!field.value.trim()) {
        showFieldError(field, 'This field is required.');
        isValid = false;
      }
    });

    /* Email format */
    var emailField = form.querySelector('#email');
    if (emailField && emailField.value.trim() && !isValidEmail(emailField.value.trim())) {
      showFieldError(emailField, 'Please enter a valid email address.');
      isValid = false;
    }

    if (!isValid) {
      var firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.focus();
      }
    }

    return isValid;
  }

  function showFieldError(field, msg) {
    field.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');
    var errorEl = document.getElementById(field.id + '-error');
    if (errorEl) errorEl.textContent = msg;
  }

  function clearError(field) {
    field.classList.remove('is-invalid');
    field.removeAttribute('aria-invalid');
    var errorEl = document.getElementById(field.id + '-error');
    if (errorEl) errorEl.textContent = '';
  }

  /* Clear validation state on user input */
  form.querySelectorAll('.form-input').forEach(function (field) {
    field.addEventListener('input', function () { clearError(this); });
    field.addEventListener('change', function () { clearError(this); });
  });

  /* ── UI state helpers ───────────────────────────────────────────────────── */
  function setLoading(loading) {
    submitBtn.disabled = loading;
    submitLabel.textContent = loading ? 'Sending…' : 'Submit Quote Request';
    submitSpinner.hidden = !loading;
  }

  function showSuccess() {
    formContainer.hidden = true;
    formSuccess.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ── File helpers ───────────────────────────────────────────────────────── */
  function filesToBase64(files) {
    return Promise.all(files.map(function (file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function () {
          var base64 = reader.result.split(',')[1];
          resolve({
            name: file.name,
            type: file.type || 'application/octet-stream',
            data: base64
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }));
  }

  function formatFileSize(bytes) {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  /* ── Misc helpers ───────────────────────────────────────────────────────── */
  function trim(el) { return el ? el.value.trim() : ''; }
  function val(el)  { return el ? el.value : ''; }

  function escapeHtml(str) {
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

})();
