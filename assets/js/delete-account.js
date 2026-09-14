/* =============================================================================
   Ludino — account deletion request form
   Ported from the original standalone deletion page. Validation rules, the
   confirmation step and the API contract are unchanged.

   NOTE: the endpoint below is live. A successful submission files a real
   account deletion request, so do not test-submit it with a valid account.
   ========================================================================== */

(function () {
  'use strict';

  var API_URL = 'https://yaro-2e698dbda8ec.herokuapp.com/api/profile/login-request-delete/';

  var form = document.querySelector('#delete-form');
  if (!form) return;

  var userId = document.querySelector('#user-id');
  var password = document.querySelector('#password');
  var confirmation = document.querySelector('#confirmation');
  var toggle = document.querySelector('#password-toggle');
  var modal = document.querySelector('#confirm-modal');
  var cancelButton = document.querySelector('#cancel-delete');
  var confirmButton = document.querySelector('#confirm-delete');
  var submitButton = document.querySelector('#submit-button');
  var status = document.querySelector('#form-status');
  var lastFocused = null;

  function showError(input, elementId, message) {
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    document.querySelector('#' + elementId).textContent = message;
    return !message;
  }

  function validate() {
    var idValue = userId.value.trim();
    var idMessage = !idValue
      ? 'Your User ID is required.'
      : !/^\d{8}$/.test(idValue) ? 'Enter exactly 8 numbers.' : '';
    var idValid = showError(userId, 'user-id-error', idMessage);

    var passwordValid = showError(
      password, 'password-error',
      !password.value.trim() ? 'Your password is required.' : ''
    );

    document.querySelector('#confirmation-error').textContent = confirmation.checked
      ? ''
      : 'Please confirm that you understand the deletion and retention terms.';

    return idValid && passwordValid && confirmation.checked;
  }

  function openModal() {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    cancelButton.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  function setStatus(type, message) {
    status.className = 'status ' + type;
    status.textContent = message;
    status.hidden = false;
  }

  toggle.addEventListener('click', function () {
    var shouldShow = password.type === 'password';
    password.type = shouldShow ? 'text' : 'password';
    toggle.textContent = shouldShow ? 'Hide' : 'Show';
    toggle.setAttribute('aria-label', shouldShow ? 'Hide password' : 'Show password');
    toggle.setAttribute('aria-pressed', String(shouldShow));
  });

  userId.addEventListener('input', function () {
    userId.value = userId.value.replace(/\D/g, '').slice(0, 8);
    if (userId.getAttribute('aria-invalid') === 'true') validate();
  });

  password.addEventListener('input', function () {
    if (password.getAttribute('aria-invalid') === 'true') validate();
  });

  confirmation.addEventListener('change', function () {
    document.querySelector('#confirmation-error').textContent = '';
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    status.hidden = true;
    if (!validate()) {
      var invalid = form.querySelector('[aria-invalid="true"]');
      if (invalid) invalid.focus();
      return;
    }
    openModal();
  });

  cancelButton.addEventListener('click', closeModal);

  modal.addEventListener('click', function (event) {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });

  confirmButton.addEventListener('click', function () {
    closeModal();
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    status.hidden = true;

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId.value.trim(),
        password: password.value.trim()
      })
    })
      .then(function (response) {
        if (response.ok) return null;
        var fallback = 'We could not submit your request. Check your details and try again.';
        return response.json()
          .then(function (data) {
            throw new Error(data.detail || data.message || data.error || fallback);
          })
          .catch(function (err) {
            // Server did not return JSON — use the safe fallback message.
            throw (err instanceof Error && err.message !== fallback) ? err : new Error(fallback);
          });
      })
      .then(function () {
        form.reset();
        password.type = 'password';
        toggle.textContent = 'Show';
        toggle.setAttribute('aria-pressed', 'false');
        setStatus('success', 'Your account deletion request was submitted successfully. Our team will verify it and notify you when the process is complete.');
      })
      .catch(function (error) {
        var fallback = 'A network error prevented submission. Please try again or contact help@ludino.live.';
        setStatus('error', error instanceof TypeError ? fallback : error.message);
      })
      .then(function () {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
  });
})();
