/* eslint-disable no-undef */

const enterForm = document.querySelector('.enter-form');
const messageForm = document.querySelector('.message-form');

const createUserList = (users) => {
  const userList = document.querySelector('.user-list');

  userList.innerHTML = '';

  users.forEach((user) => {
    const li = document.createElement('li');

    li.innerText = user.nickname;

    userList.appendChild(li);
  });
};

const createMessage = (message) => {
  const messageList = document.querySelector('.message-list');

  const li = document.createElement('li');

  li.innerText = message;

  messageList.appendChild(li);
};

enterForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const socket = io();

  const nickname = enterForm.querySelector('input');

  socket.emit('enter', nickname.value);

  nickname.value = '';

  socket.on('enter', ({ users, user }) => {
    const enteredContainer = document.querySelector('.entered-container');

    enterForm.hidden = true;
    enteredContainer.hidden = false;

    createUserList(users);
    createMessage(`${user.nickname} 님이 들어왔습니다.`);
  });

  socket.on('leave', ({ users, user }) => {
    createUserList(users);
    createMessage(`${user.nickname} 님이 나갔습니다.`);
  });

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = messageForm.querySelector('input');

    socket.emit('message', message.value);

    message.value = '';
  });

  socket.on('message', ({ user, message }) => {
    createMessage(`${user.nickname} : ${message}`);
  });
});
