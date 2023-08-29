// const remove = document.querySelectorAll('.remove');
// Array.from(remove).forEach((el)=>{
//     el.addEventListener('click', ()=>{
//         el.parentElement.remove();
//         // el.parentElement.style.display = 'none';
//     })
// })

// const manu = document.querySelector('.menu');
// Array.from(manu.children).forEach((el) => {
//     el.addEventListener('click', () => {
//         if (el.children.length > 1) {
//             el.lastElementChild.style.backgroundColor = 'green';
//             Array.from(el.children[1].children).forEach((el)=>{
//                 el.addEventListener('click', ()=>{
//                     el.firstElementChild.style.color = 'blue'
//                 })
//             })
//         } else {
//             el.firstElementChild.style.color = 'blue'
//         }
//     })
// })

// let productActive = document.querySelector('.products .active');
// let product = document.querySelector('.products')
// let prev = document.querySelector('.prev');
// let next = document.querySelector('.next');
// let dem = 1;

// next.onclick = handleNext
// prev.onclick = handlePrev

// let isHover = false;
// setInterval(()=>{
//     if(!isHover){
//         handleNext()
//     }
// }, 1000)

// product.addEventListener('mouseover', ()=>{
//     isHover = true
// })
// product.addEventListener('mouseleave', ()=>{
//     isHover = false
// })
const tag = (tag) => document.querySelector(`${tag}`);
const tagAll = (tag) => document.querySelectorAll(`${tag}`);

const carousel = tag('.carousel')
const carousel_inner = tag('.carousel-inner')
const carousel_nav = tag('.carousel-nav')
const prev = tag('.prev')
const next = tag('.next')
let listDot = tag('.list-dot');
let dem = 1, itemWidth, widthscroll;
let carouselItem = carousel_inner.querySelectorAll('.item');


Array.from(carousel_inner.children).forEach((el, index)=>{
    let dot = document.createElement('span');
    if(index==0){
        dot.className = 'dot active'
    }else{
        dot.className = 'dot'
    }
    dot.dataset.index = ++index
    listDot.appendChild(dot)
})
dotActive = tag('.dot.active');

if(carouselItem.length){
     itemWidth = carousel_inner.clientWidth
    let totalWidth = itemWidth * carouselItem.length
    carousel_inner.style.width = `${totalWidth}px`
    let possition = 0;
    next.addEventListener('click', ()=>{
        if(Math.abs(possition)< totalWidth - itemWidth){
            possition-=itemWidth
            carousel_inner.style.translate = `${possition}px`
            carousel_inner.style.transition  = `translate 0.5s ease`
            handleNext()
        }
    })
    prev.addEventListener('click', ()=>{
        if(possition < 0){
            possition+=itemWidth
            carousel_inner.style.translate = `${possition}px`
            carousel_inner.style.transition  = `translate 0.5s ease`
            handlePrev()
        }
    })
    Array.from(listDot.children).forEach((el,indexActive)=>{
        el.addEventListener('click', ()=>{
            possition = -itemWidth * (el.dataset.index -1);
            carousel_inner.style.translate = `${possition}px`;
            el.classList.add('active');
            Array.from(listDot.children).forEach((el, indexRemove)=>{
                if(indexActive != indexRemove){
                    el.classList.remove('active')
                }
            })
        })
    })
    carousel_inner.addEventListener('mousemove', function(e){
        if(e.which == 1){
             console.log('down')
            this.style.cursor = 'all-scroll';}
        //     console.log('possition', possition);
        //     console.log('possitionNext', possition = possition - itemWidth);
        //     let widthTranslate = widthscroll - e.clientX;
        //     console.log('widthTranslate', widthTranslate)
        //     if( widthTranslate < 200){
        //         carousel_inner.style.translate = `${-widthTranslate}px`;
        //     }
        //     console.log(carousel_inner.style.translate)
        //  }
    })
    carousel_inner.addEventListener('mouseenter', (e)=>{
        widthscroll = e.clientX
    })
    carousel_inner.addEventListener('mouseleave',function(){
        this.style.cursor = 'initial'
    })
}

function handleNext(){
    if(dem>=listDot.children.length){
        listDot.lastElementChild.classList.remove('active')
        listDot.firstElementChild.classList.add('active')
        dotActive = listDot.firstElementChild
        dem=1;
    }else{ 
        dotActive.nextElementSibling.classList.add('active');
        dotActive.classList.remove('active')
        dotActive = dotActive.nextElementSibling;
        dem++
    }
}
function handlePrev(){
    if(dem > 1){
        dotActive.previousElementSibling.classList.add('active');
        dotActive.classList.remove('active')
        dotActive = dotActive.previousElementSibling;
        dem--
    }else{
        listDot.lastElementChild.classList.add('active')
        listDot.firstElementChild.classList.remove('active')
        dotActive = listDot.lastElementChild
        dem = 4
    }
}