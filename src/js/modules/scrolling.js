const scrolling = (upSelector) => {
  const upItem = document.querySelector(upSelector);

  upItem.classList.add("animated");

  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 1650) {
      upItem.classList.remove("fadeOut");
      upItem.classList.add("fadeIn");

    } else {
      upItem.classList.remove("fadeIn");
      upItem.classList.add("fadeOut");
    }
  });

  let links = document.querySelectorAll("[href^='#']"),
      speed = 0.3;

  links.forEach(item => {
    item.addEventListener("click", function(event) {
      event.preventDefault();

      let toTop = document.documentElement.scrollTop,
          hash = this.hash,
          toBlock = document.querySelector(hash).getBoundingClientRect().top,
          start = null,
          position = toTop + toBlock;

      requestAnimationFrame(step)

      function step(time) {
        if (start === null) {
          start = time;
        }

        let progress = time - start,
            scroll = toBlock < 0 ? Math.max(toTop - progress/speed, position) : Math.min(toTop + progress/speed, position);

        document.documentElement.scrollTo(0, scroll);

        if (scroll != position) {
          requestAnimationFrame(step);
        } else {
            location.hash = hash;
        }
      }
    });
  });
}

export default scrolling;