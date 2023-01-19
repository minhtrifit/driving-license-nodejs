const banner = document.querySelector('.banner');
const nextBannerBtn = document.querySelector('.carousel-control-next');

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
function bannerTransfer() {
    setInterval(() => { nextBannerBtn.click(); }, 4000)
}

bannerTransfer();