const banner = document.querySelector('.banner');

// Swiper init
var swiper = new Swiper(".examListSwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// Banner event
function bannerSlide() {
    var count = 1;
    setInterval(() => {
        if (count <= 5) { ++count; }
        else { count = 1; }
        banner.innerHTML = `<img src="image/banner/${count}.png" alt="">`;
        console.log(count);
    }, 3000)
}

bannerSlide();