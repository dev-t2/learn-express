/* eslint-disable no-undef */

const socket = io();

const enterContainer = document.querySelector('.enter-container');
const enterForm = enterContainer.querySelector('form');

enterForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const input = enterForm.querySelector('input');

  socket.emit('enterRoom', { name: input.value });

  input.value = '';
});
