const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const input = document.querySelector('input');

  input.value = '';
});
