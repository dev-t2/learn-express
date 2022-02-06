/* eslint-disable no-undef */

const socket = io();

const enterContainer = document.querySelector('.enter-container');
const enterForm = enterContainer.querySelector('form');
const roomContainer = document.querySelector('.room-container');

enterForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const input = enterForm.querySelector('input');

  const name = input.value.trim();

  if (name) {
    socket.emit('enterRoom', name, () => {
      const roomName = roomContainer.querySelector('h2');

      enterContainer.hidden = true;
      roomName.innerText = `Room Name: ${name}`;
      roomContainer.hidden = false;
    });

    input.value = '';
  }
});
