const card = document.querySelector(".card__inner");

card.addEventListener("click", function (e) {
  card.classList.toggle('is-flipped');
});

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstProjectWidth = carousel.querySelector(".project").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

// Get the number of projects that can fit in the carousel at once (aim for 3 usually)
let projPerView = Math.round(carousel.offsetWidth / firstProjectWidth);

// Insert copies of the last few projects to beginning of carousel for infinite scrolling
carouselChildrens.slice(-projPerView).reverse().forEach(project => {
    carousel.insertAdjacentHTML("afterbegin", project.outerHTML);
});

// Insert copies of the first few projects to end of carousel for infinite scrolling
carouselChildrens.slice(0, projPerView).forEach(project => {
    carousel.insertAdjacentHTML("beforeend", project.outerHTML);
});

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstProjectWidth : firstProjectWidth;
    });
});

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = 0;
        carousel.scrollLeft += carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

carousel.addEventListener("scroll", infiniteScroll);