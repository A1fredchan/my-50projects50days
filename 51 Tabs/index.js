const btns = document.querySelectorAll('button');
const indicator = document.querySelector('.indicator');
const panels = document.querySelectorAll('.panel');

btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // const current = document.querySelectorAll('.active');
        // current.forEach((i) => {
        //     i.classList.remove('active');
        // });
        document.querySelector('button.active').classList.remove('active');
        btn.classList.add('active');

        const clickedTab = e.target;
        const nodeIndex = Array.from(btns).indexOf(clickedTab);
        indicator.style.transform = `translateX(calc(${nodeIndex} * 100%))`;
        console.log(nodeIndex);

        document.querySelector('.panel.active').classList.remove('active');
        panels[nodeIndex].classList.add('active');
    });
});