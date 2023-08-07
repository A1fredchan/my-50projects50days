const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value)

    if (e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = ''
        }, 10)
        runHighlight()
    }
})

function createTags(input) {
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())

    tagsEl.innerHTML = ''

    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    })
}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')
    const randomTag = tags[Math.floor(Math.random() * tags.length)]
    return randomTag
}

function highlightTag(tag) {
    tag.classList.add('highlight')
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight')
}

const times = 10

function runHighlight() {
    const interval = setInterval(() => {
        const randomTag = pickRandomTag()
        highlightTag(randomTag)

        setTimeout(() => {
            unHighlightTag(randomTag)
        }, 100)
    }, 100)

    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            const randomTag = pickRandomTag()
            highlightTag(randomTag)
        }, 100)
    }, times * 100)

}

// optimize runHeighlight with requestAnimationFrame
// function runHighlight() {
//     let timesRun = 0
//     const interval = setInterval(() => {
//         const randomTag = pickRandomTag()
//         highlightTag(randomTag)

//         setTimeout(() => {
//             unHighlightTag(randomTag)
//         }, 100)
//         timesRun += 1
//         if (timesRun === times) {
//             clearInterval(interval)
//             setTimeout(() => {
//                 const randomTag = pickRandomTag()
//                 highlightTag(randomTag)
//             }, 100)
//         }
//     }, 100)
// }