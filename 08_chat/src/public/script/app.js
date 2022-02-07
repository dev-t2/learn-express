/* eslint-disable no-undef */

const socket = io();

const enterContainer = document.querySelector('.enter-container');
const enterForm = enterContainer.querySelector('form');
const roomContainer = document.querySelector('.room-container');
const roomName = roomContainer.querySelector('h2');

const createMessage = (message) => {
  const ul = roomContainer.querySelector('ul');

  const li = document.createElement('li');

  li.innerText = message;

  ul.appendChild(li);
};

enterForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nicknameInput = enterForm.querySelector('input[name=nickname]');
  const roomInput = enterForm.querySelector('input[name=room]');

  const nickname = nicknameInput.value.trim();
  const room = roomInput.value.trim();

  if (nickname && room) {
    socket.emit('enterRoom', room, nickname, (totalUsers) => {
      enterContainer.hidden = true;
      roomName.innerText = `Room: ${room} (${totalUsers})`;
      roomContainer.hidden = false;

      const form = roomContainer.querySelector('form');

      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const messageInput = form.querySelector('input');

        const message = messageInput.value.trim();

        if (message) {
          socket.emit('createMessage', room, message, () => {
            createMessage(`${nickname}: ${message}`);

            messageInput.value = '';
          });
        }
      });
    });
  }
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

socket.on('enterRoom', (room, totalUsers, nickname) => {
  roomName.innerText = `Room: ${room} (${totalUsers})`;

  createMessage(`${nickname} entered the room`);
});

socket.on('createMessage', (nickname, message) => {
  createMessage(`${nickname}: ${message}`);
});

socket.on('leaveRoom', (room, totalUsers, nickname) => {
  roomName.innerText = `Room: ${room} (${totalUsers})`;

  createMessage(`${nickname} left the room`);
});
