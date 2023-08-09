const items = document.querySelectorAll('.carousel-item')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const indicators = document.querySelector('.carousel-indicators')
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
    indicators.querySelector('.active')?.classList.remove('active');
    indicators.children[currentIndex]?.classList.add('active');
}

function addIndicators() {
    for (let i = 0; i < itemLength; i++) {
        const indicator = document.createElement('li');
        indicator.classList.add('carousel-indicator');
        if (i === currentIndex) {
            indicator.classList.add('active');
        }
        indicators.appendChild(indicator);
    }
}

addIndicators()

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

function autoPlay(times = 9000) {
    // timer = setInterval(() => {
    //     nextSlide()
    // }, times)
}

autoPlay()

let startX = 0
let currentX = 0
let isMove = false

container.addEventListener('touchstart', handleTouchStart)
container.addEventListener('touchmove', handleTouchMove)
container.addEventListener('touchend', handleTouchEnd)

function handleTouchStart(event) {
    startX = event.touches[0].clientX
    container.style.transition = 'none'

}

function handleTouchMove(event) {
    isMove = true
    currentX = event.touches[0].clientX
    const diffX = currentX - startX
    container.style.transition = 'none'
    container.style.transform = `translateX(calc(${-currentIndex * 100}% + ${diffX}px))`
    container.offsetHeight
}

function handleTouchEnd() {
    if (!isMove) return

    const diffX = currentX - startX
    const sensitivity = 100

    if (diffX > sensitivity) {
        mobilePrevSlide()

    } else if (diffX < -sensitivity) {
        mobileNextSlide()
    } else {
        moveTo(currentIndex)
    }
    isMove = false
}

function mobilePrevSlide() {
    if (currentIndex === 0) {
        container.style.transition = '0.5s'
        container.style.transform = `translateX(100%)`
        container.offsetHeight
        container.addEventListener('transitionend', () => {
            container.style.transition = 'none'
            container.style.transform = `translateX(-${itemLength - 1}00%})`
        }, { once: true })
        currentIndex = itemLength - 1;
        indicators.querySelector('.active')?.classList.remove('active');
        indicators.children[currentIndex]?.classList.add('active');
        return
    }
    currentIndex--
    moveTo(currentIndex)
}

function mobileNextSlide() {

    if (currentIndex === itemLength - 1) {
        container.style.transition = '0.5s'
        container.style.transform = `translateX(-${itemLength}00%)`
        container.offsetHeight
        // setTimeout(() => {
        // container.style.transition = 'none'
        // container.style.transform = `translateX(0)`
        // },500)
        container.addEventListener('transitionend', () => {
            container.style.transition = 'none'
            container.style.transform = `translateX(0)`
        }, { once: true })
        currentIndex = 0;
        indicators.querySelector('.active')?.classList.remove('active');
        indicators.children[currentIndex]?.classList.add('active');
        return
    }
    currentIndex++
    moveTo(currentIndex)
}



//封装一个通用类
// class Carousel {
//     constructor(options) {
//         this.container = options.container
//         this.items = options.items
//         this.prev = options.prev
//         this.next = options.next
//         this.indicators = options.indicators
//         this.currentIndex = 0
//         this.itemLength = this.items.length
//         this.firstItem = this.container.firstElementChild.cloneNode(true)
//         this.lastItem = this.container.lastElementChild.cloneNode(true)
//         this.lastItem.classList.add('first-clone')
//         this.container.insertBefore(this.lastItem, this.container.firstElementChild)
//         this.container.appendChild(this.firstItem).classList.add('clone')
//         this.addIndicators()
//         this.addEvent()
//         this.autoPlay()
//     }
//     moveTo(index) {
//         this.container.style.transition = '0.5s'
//         this.container.style.transform = `translateX(-${index * 100}%)`
//         this.currentIndex = index
//         this.indicators.querySelector('.active').classList.remove('active');
//         this.indicators.children[this.currentIndex].classList.add('active');
//     }
//     addIndicators() {
//         for (let i = 0; i < this.itemLength; i++) {
//             const indicator = document.createElement('li');
//             indicator.classList.add('carousel-indicator');
//             if (i === this.currentIndex) {
//                 indicator.classList.add('active');
//             }
//             this.indicators.appendChild(indicator);
//         }
//     }
//     nextSlide() {
//         if (this.currentIndex === this.itemLength - 1) {
//             this.container.style.transition = 'none'
//             this.container.style.transform = `translateX(100%)`
//             this.container.offsetHeight
//             this.moveTo(0)
//             return
//         }
//         this.currentIndex++
//         this.moveTo(this.currentIndex)
//     }
//     prevSlide() {
//         if (this.currentIndex === 0) {
//             this.container.style.transition = 'none'
//             this.container.style.transform = `translateX(-${this.itemLength}00%)`
//             this.container.offsetHeight
//             this.moveTo(this.itemLength - 1)
//             return
//         }
//         this.currentIndex--
//         this.moveTo(this.currentIndex)
//     }
//     addEvent() {
//         this.prev.addEventListener('click', () => {
//             this.stopPlay()
//             this.prevSlide()
//             this.autoPlay()
//         })
//         this.next.addEventListener('click', () => {
//             this.stopPlay()
//             this.nextSlide()
//             this.autoPlay()
//         })
//         this.indicators.addEventListener('mouseover', (e) => {
//             if (e.target.tagName.toLowerCase() === 'li') {
//                 this.stopPlay()
//                 this.moveTo(e.target.dataset.index)
//                 this.autoPlay()
//             }
//         })
//     }
//     stopPlay() {
//         clearInterval(this.timer)
//     }
//     autoPlay(times = 3000) {
//         this.timer = setInterval(() => {
//             this.nextSlide()
//         }, times)
//     }
// }

// const carousel = new Carousel({
//     container: document.querySelector('.carousel-container'),
//     items: document.querySelectorAll('.carousel-item'),
//     prev: document.querySelector('.carousel-arrow.prev'),
//     next: document.querySelector('.next'),
//     indicators: document.querySelector('.carousel-indicators'),
// })

