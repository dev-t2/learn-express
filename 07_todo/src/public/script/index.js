import axios from 'axios';
const form = document.querySelector('form');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const input = document.querySelector('input');
    if (input) {
        await axios.post('/todos', {});
        input.value = '';
    }
});
