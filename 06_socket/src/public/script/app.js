/* eslint-disable no-undef */

const socket = io();

const form = document.querySelector('form');
const input = form.querySelector('input');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  socket.emit('message', input.value);

  input.value = '';
});

socket.on('message', (message) => {
  console.log(message);
});
