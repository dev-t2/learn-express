/* eslint-disable no-undef */

const socket = io();

const enterContainer = document.querySelector('.enter-container');
const enterForm = enterContainer.querySelector('form');
const roomContainer = document.querySelector('.room-container');

enterForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const input = enterForm.querySelector('input');

  const roomName = input.value.trim();

  if (roomName) {
    socket.emit('enterRoom', roomName, () => {
      const h2 = roomContainer.querySelector('h2');

      enterContainer.hidden = true;
      input.value = '';
      h2.innerText = `Room Name: ${roomName}`;
      roomContainer.hidden = false;
    });
  }
});

const createMessage = (message) => {
  const ul = roomContainer.querySelector('ul');
  const li = document.createElement('li');

  li.innerText = message;

  ul.appendChild(li);
};

socket.on('enterRoom', () => {
  createMessage('123465');
});
