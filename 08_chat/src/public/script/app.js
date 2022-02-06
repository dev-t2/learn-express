/* eslint-disable no-undef */

const socket = io();

const enterContainer = document.querySelector('.enter-container');
const enterForm = enterContainer.querySelector('form');
const roomContainer = document.querySelector('.room-container');

const createMessage = (message) => {
  const ul = roomContainer.querySelector('ul');
  const li = document.createElement('li');

  li.innerText = message;

  ul.appendChild(li);
};

enterForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const input = enterForm.querySelector('input');

  const roomName = input.value.trim();

  if (roomName) {
    socket.emit('enterRoom', roomName, () => {
      const form = roomContainer.querySelector('form');
      const h2 = roomContainer.querySelector('h2');

      enterContainer.hidden = true;
      input.value = '';

      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const input = form.querySelector('input');

        const message = input.value.trim();

        if (message) {
          socket.emit('createMessage', roomName, message, () => {
            createMessage(message);

            input.value = '';
          });
        }
      });

      h2.innerText = `Room Name: ${roomName}`;
      roomContainer.hidden = false;
    });
  }
});

socket.on('enterRoom', () => {
  createMessage('123');
});

socket.on('leaveRoom', () => {
  createMessage('456');
});

socket.on('createMessage', (message) => {
  createMessage(message);
});
