const sliders = (sliderSelector, previousSelector, nextSelector, direction) => {
  let slideIndex = 1,
      slidePaused = null;

  const sliderItems = document.querySelectorAll(sliderSelector);

  //отображение слайдера
  function showSlides(index) {
    if (index > sliderItems.length) {
      slideIndex = 1
    }

    if (index < 1) {
      slideIndex = sliderItems.length;
    }

    sliderItems.forEach(item => {
      item.classList.add("animated");
      item.style.display = "none";
    });

    sliderItems[slideIndex - 1].style.display = "block";
  }

  showSlides(slideIndex);

  //перелючение
  function plusSlides(index) {
    showSlides(slideIndex += index);
  }

  //переключение слайдера
  try {
    const previousButton = document.querySelector(previousSelector),
          nextButton  = document.querySelector(nextSelector);

    previousButton.addEventListener("click", () => {
      plusSlides(-1);
      sliderItems[slideIndex -1].classList.remove("slideInRight");
      sliderItems[slideIndex -1].classList.add("slideInLeft");
    });

    nextButton.addEventListener("click", () => {
      plusSlides(1);
      sliderItems[slideIndex -1].classList.remove("slideInLeft");
      sliderItems[slideIndex -1].classList.add("slideInRight");
    });
  } catch (error) {}

  function activateAnimation() {
    //автослайдер
    if (direction === "vertical") {
      slidePaused = setInterval(() => {
        plusSlides(1);
        sliderItems[slideIndex -1].classList.add("fadeIn"); //slideInDown
      }, 3000);
    } else {
      slidePaused = setInterval(() => {
        plusSlides(1);
        sliderItems[slideIndex -1].classList.remove("slideInLeft");
        sliderItems[slideIndex -1].classList.add("slideInRight");
      }, 3000);
    }
  }

  activateAnimation();

  //остановка автослайдера
  sliderItems[0].parentNode.addEventListener("mouseenter", () => {
    clearInterval(slidePaused);
  });

  sliderItems[0].parentNode.addEventListener("mouseleave", () => {
    activateAnimation();
  });
}

export default sliders;