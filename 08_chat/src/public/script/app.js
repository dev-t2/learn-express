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

  const nicknameInput = enterForm.querySelector('input[name=nickname]');
  const roomNameInput = enterForm.querySelector('input[name=room-name]');

  const nickname = nicknameInput.value.trim();
  const roomName = roomNameInput.value.trim();

  if (nickname && roomName) {
    socket.emit('enterRoom', nickname, roomName, () => {
      const form = roomContainer.querySelector('form');
      const h2 = roomContainer.querySelector('h2');

      enterContainer.hidden = true;

      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const input = form.querySelector('input');

        const message = input.value.trim();

        if (message) {
          socket.emit('createMessage', roomName, message, () => {
            createMessage(`${nickname}: ${message}`);

            input.value = '';
          });
        }
      });

      h2.innerText = `Room: ${roomName}`;
      roomContainer.hidden = false;
    });
  }
});

socket.on('enterRoom', (nickname) => {
  createMessage(`${nickname} entered the room`);
});

socket.on('updateRooms', (rooms) => {
  const ul = enterContainer.querySelector('ul');

  ul.innerHTML = '';

  rooms.forEach((room) => {
    const li = document.createElement('li');

    li.innerText = room;

    ul.appendChild(li);
  });
});

socket.on('leaveRoom', (nickname) => {
  createMessage(`${nickname} left the room`);
});

socket.on('createMessage', (nickname, message) => {
  createMessage(`${nickname}: ${message}`);
});
