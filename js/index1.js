

const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const messageInput = document.querySelector('#message');
let name, email, phone, message;

form.addEventListener('submit', function (e) {
    e.preventDefault();
    name = nameInput.value;
    email = emailInput.value;
    phone = phoneInput.value;
    message = messageInput.value;

    let body = `Hello Rodrick,\n\n${message}\n\nRespectfully,\n${name} \n${email} \n${phone}`;
    let uri = encodeURI(body);

    window.open('mailto:test@example.com?subject=Interesting%20page&body=' + uri);
});