'use strict';
function qs(params) {
    return document.querySelector(params);
}

function qsa(params) {
    return document.querySelectorAll(params);
}

function id(params) {
    return document.getElementById(params);
}

window.addEventListener('load', validate);

function validate(errors) {
    const nameValue = id('username').value;
    const passwordValue = id('password').value;
}