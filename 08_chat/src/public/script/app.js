/* eslint-disable no-undef */

const socket = io();

const enterContainer = document.querySelector('.enter-container');
const enterForm = enterContainer.querySelector('form');

const roomContainer = document.querySelector('.room-container');
const roomInfo = roomContainer.querySelector('h2');

enterForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nicknameInput = enterForm.querySelector('input[name=nickname]');
  const roomNameInput = enterForm.querySelector('input[name=room-name]');

  const nickname = nicknameInput.value.trim();
  const roomName = roomNameInput.value.trim();

  if (nickname && roomName) {
    socket.emit('enterRoom', nickname, roomName, (totalUsers) => {
      roomInfo.innerText = `Room Name: ${roomName} / Total Users: ${totalUsers}`;

      enterContainer.hidden = true;
      roomContainer.hidden = false;

      const roomForm = roomContainer.querySelector('form');

      const createMessage = (message) => {
        const ul = roomContainer.querySelector('ul');

        const li = document.createElement('li');

        li.innerText = message;

        ul.appendChild(li);
      };

      roomForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const messageInput = roomForm.querySelector('input');

        const message = messageInput.value.trim();

        if (message) {
          socket.emit('createMessage', roomName, message, () => {
            messageInput.value = '';

            createMessage(`${nickname}(Me): ${message}`);
          });
        }
      });

      socket.on('enterRoom', (nickname, totalUsers) => {
        roomInfo.innerText = `Room Name: ${roomName} / Total Users: ${totalUsers}`;

        createMessage(`---------- '${nickname}' entered the room ----------`);
      });

      socket.on('leaveRoom', (nickname, totalUsers) => {
        roomInfo.innerText = `Room Name: ${roomName} / Total Users: ${totalUsers}`;

        createMessage(`---------- '${nickname}' left the room ----------`);
      });

      socket.on('createMessage', (nickname, message) => {
        createMessage(`${nickname}: ${message}`);
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
