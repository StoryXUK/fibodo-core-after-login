(function () {
  let modal = null;

  function getModalElements() {
    modal = document.getElementById('changePasswordModal');

    if (!modal) return null;

    return {
      modal,
      closeBtn: document.getElementById('closeChangePassword'),
      cancelBtn: document.getElementById('cancelChangePassword'),
      form: document.getElementById('changePasswordForm')
    };
  }

  function openModal() {
    const elements = getModalElements();
    if (!elements) return;

    elements.modal.classList.add('is-open');
    elements.modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    const elements = getModalElements();
    if (!elements) return;

    elements.modal.classList.remove('is-open');
    elements.modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function setupModal() {
    const elements = getModalElements();
    if (!elements) return;

    if (elements.closeBtn) {
      elements.closeBtn.addEventListener('click', closeModal);
    }

    if (elements.cancelBtn) {
      elements.cancelBtn.addEventListener('click', closeModal);
    }

    elements.modal.addEventListener('click', (e) => {
      if (e.target === elements.modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    elements.modal.querySelectorAll('.password-toggle').forEach(button => {
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (!input) return;

        input.type = input.type === 'password' ? 'text' : 'password';
      });
    });

    if (elements.form) {
      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Send OTP clicked');
      });
    }
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-change-password]');
    if (!trigger) return;

    e.preventDefault();
    openModal();
  });

  document.addEventListener('changePasswordModalLoaded', setupModal);
  document.addEventListener('DOMContentLoaded', setupModal);

  window.openChangePasswordModal = openModal;
  window.closeChangePasswordModal = closeModal;
})();