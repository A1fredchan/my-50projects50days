const active = document.querySelectorAll('.active')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const sliders = document.getElementById('slider')
const panels = document.querySelectorAll('.panel')

let currentActive = 0;
const section = 100 / (panels.length - 1);
let value;

next.addEventListener('click', () => {
    if (currentActive > panels.length - 2) {
        return
    }
    currentActive++

    updatePage()
})

prev.addEventListener('click', () => {
    if (currentActive < 1) {
        return
    }
    currentActive--
    updatePage()
})

function updatePage() {
    sliders.value = currentActive * section;
    panels.forEach((v, i) => {
        if (i > currentActive) {
            v.classList.remove('active')
        } else {
            v.classList.add('active')
        }

    })
}

panels.forEach((v, i) => {
    v.addEventListener('click', (event) => {
        const target = event.target
        const text = target.innerHTML
        currentActive = text - 1;
        updatePage()
    })
})