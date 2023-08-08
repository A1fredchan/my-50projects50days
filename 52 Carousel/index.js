const items = document.querySelectorAll('.carousel-item')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const indicators = document.querySelectorAll('.carousel-indicator')
const container = document.querySelector('.carousel-container')

const firstItem = container.firstElementChild.cloneNode(true)
const lastItem = container.lastElementChild.cloneNode(true)
lastItem.classList.add('first-clone')

let currentIndex = 0
const itemLength = items.length

container.insertBefore(lastItem, container.firstElementChild)
container.appendChild(firstItem).classList.add('clone')

function moveTo(index) {
    container.style.transition = '0.5s'
    container.style.transform = `translateX(-${index * 100}%)`
    currentIndex = index
    document.querySelector('.carousel-indicator.active').classList.remove('active')
    indicators[currentIndex].classList.add('active')
}

function nextSlide() {
    if (currentIndex === itemLength - 1) {
        container.style.transition = 'none'
        container.style.transform = `translateX(100%)`
        container.offsetHeight
        //强制浏览器渲染
        //Q:为什么要强制浏览器渲染？
        //A:因为浏览器会把transition:none和transform:translateX(100%)合并成一步，导致transition:0.5s失效
        //  所以要强制浏览器渲染，让浏览器把transition:none和transform:translateX(100%)合并成一步，然后再执行transition:0.5s
        //Q:ruheqiangzhilibrowser渲染？
        //A:通过获取元素的高度，强制浏览器渲染
        moveTo(0)
        return
    }
    currentIndex++
    moveTo(currentIndex)
}

function prevSlide() {
    if (currentIndex === 0) {
        container.style.transition = 'none'
        container.style.transform = `translateX(-${itemLength}00%)`
        container.offsetHeight
        moveTo(itemLength - 1)
        return
    }
    currentIndex--
    moveTo(currentIndex)
}

let timer

prev.addEventListener('click', () => {
    stopPlay()
    prevSlide()
    autoPlay()
})

next.addEventListener('click', () => {
    stopPlay()
    nextSlide()
    autoPlay()
})

function stopPlay() {
    clearInterval(timer)
}

function autoPlay(times = 3000) {
    timer = setInterval(() => {
        nextSlide()
    }, times)
}

autoPlay()
// indicators.forEach((indicator, index) => {
//     indicator.addEventListener('mouseover', () => {
//         moveTo(index)
//     })
// })
