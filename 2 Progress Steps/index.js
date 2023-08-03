const linker = document.getElementById('linker')
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const panels = document.querySelectorAll('.panel')

let currentActive = 1

next.addEventListener('click', () => {
    currentActive++

    if(currentActive > panels.length) {
        currentActive = panels.length
    }

    updatePage()
})

prev.addEventListener('click', () => {
    currentActive--

    if(currentActive < 1) {
        currentActive = 1
    }

    updatePage()
})

function updatePage() {
    panels.forEach((panel, idx) => {
        if(idx < currentActive) {
            panel.classList.add('active')
        } else {
            panel.classList.remove('active')
        }
    })

    const actives = document.querySelectorAll('.active')

    linker.style.width = (actives.length - 1) / (panels.length - 1) * 100 + '%'

    if(currentActive === 1) {
        prev.disabled = true
    } else if(currentActive === panels.length) {
        next.disabled = true
    } else {
        prev.disabled = false
        next.disabled = false
    }
}


