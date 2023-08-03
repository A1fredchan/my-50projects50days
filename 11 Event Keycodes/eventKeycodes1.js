const keyel = document.getElementById('key')
const keycodeel = document.getElementById('keycode')
const codeel = document.getElementById('code')

window.addEventListener('keydown', (event) =>{
    document.getElementById('tips').classList.add('hide');
    document.getElementById('content').classList.remove('hide');

    keyel.innerHTML = event.key === ' ' ? 'Space' : event.key;
    keycodeel.innerHTML = event.keyCode;
    codeel.innerHTML = event.code;
})