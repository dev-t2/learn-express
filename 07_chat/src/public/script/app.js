/* eslint-disable no-undef */

const enterForm = document.querySelector('.enter-form');

const createUserList = (users) => {
  const userList = document.querySelector('.user-list');

  userList.innerHTML = '';

  users.forEach((user) => {
    const li = document.createElement('li');

    li.innerText = user.nickname;

    userList.appendChild(li);
  });
};

enterForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nickname = enterForm.querySelector('input');

  if (nickname.value) {
    const socket = io();

    socket.emit('enter', nickname.value);

    socket.on('enter', (users) => {
      enterForm.hidden = true;

      createUserList(users);
    });

    socket.on('leave', (users) => {
      createUserList(users);
    });
  }
});
