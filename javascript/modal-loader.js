// Scripts load at end of <body> so DOM is already ready — call directly
(function () {
  const modalRoot = document.getElementById('change-password-modal-root');
  if (!modalRoot) return;

  fetch('change-password-modal.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load change password modal.');
      }
      return response.text();
    })
    .then(html => {
      modalRoot.innerHTML = html;
      document.dispatchEvent(new CustomEvent('changePasswordModalLoaded'));
    })
    .catch(error => {
      console.error(error);
    });
})();