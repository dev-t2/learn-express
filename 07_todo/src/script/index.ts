const form = document.querySelector('form');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const input = document.querySelector('input');

  if (input) {
    input.value = '';
  }
});
