const input = document.getElementById('input')
const button = document.getElementById('button')


button.addEventListener('click', (e) => {
    if (input.offsetWidth === 0) {
        input.style.width = '200px';
    } else {
        input.style.width = '0';
    }
    // const w = window.getComputedStyle(input).width;
    // console.log(w);
})