/* eslint-disable no-undef */

let users = [];

const loginForm = document.querySelector('.login-form');
const nickname = loginForm.querySelector('input');
const userList = document.querySelector('.user-list');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (nickname.value) {
    const socket = io();

    socket.emit('enter', nickname.value);

    socket.on('enter', (enteredUsers) => {
      users = enteredUsers;

      loginForm.hidden = true;
      nickname.value = '';
      userList.innerHTML = '';

      users.forEach((user) => {
        const li = document.createElement('li');

        li.innerText = user.nickname;
        userList.appendChild(li);
      });
    });
  }
});
