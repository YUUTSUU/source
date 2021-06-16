const modals = (triggerSelector, modalSelector, closeSelector, destroyGift = false) => {
  const triggerModal = document.querySelectorAll(triggerSelector),
          modalWindow = document.querySelector(modalSelector),
          closeModal = document.querySelector(closeSelector),
          windows = document.querySelectorAll("[data-modal]");

  const offsetWidth = calcScroll();

  triggerModal.forEach(item => {
    item.addEventListener("click", (event) => {
      if (event.target) {
        event.preventDefault();
      }

      windows.forEach(element => {
        element.style.display = "none";
        element.classList.add("animated", "fadeIn")
      });

      if (destroyGift) {
        item.style.display = "none";
      }

      modalWindow.style.display = "block";
      document.body.style.overflow = "hidden"
      document.body.style.marginRight = `${offsetWidth}px`;

      document.querySelector(".fixed-gift").style.marginRight = `${offsetWidth}px`; //gif offset
      document.querySelector(".pageup").style.marginRight = `${offsetWidth}px`
    });
  });

  closeModal.addEventListener("click", () => {
    modalWindow.style.display = "none";
    document.body.style.overflow = "";
    document.body.style.marginRight = "0px";

    document.querySelector(".fixed-gift").style.marginRight = "0px"; //gif offset
    document.querySelector(".pageup").style.marginRight = "0px"
  });

  modalWindow.addEventListener("click", (event) => {
    if (event.target === modalWindow) {
      modalWindow.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = "0px";

      document.querySelector(".fixed-gift").style.marginRight = "0px"; //gif offset
      document.querySelector(".pageup").style.marginRight = "0px"
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      modalWindow.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = "0px";

      document.querySelector(".fixed-gift").style.marginRight = "0px"; //gif offset
      document.querySelector(".pageup").style.marginRight = "0px"
    }
  });  

  function showByModalWindowTime() {
    setTimeout(() => {
      let displayModal = false;

      document.querySelectorAll("[data-modal]").forEach(item => {
        if (getComputedStyle(item).display === "block") {
          displayModal = true;
        }
      });

      if(!displayModal) {
        document.querySelector(".button-consultation").style.display = "block";
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${offsetWidth}px`;

        document.querySelector(".fixed-gift").style.marginRight = `${offsetWidth}px`; //gif offset
        document.querySelector(".pageup").style.marginRight = `${offsetWidth}px`
      }
    }, 6000000);
  }

  showByModalWindowTime();

  function showByModalWindowScroll() {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const giftTrigger = document.querySelector(".fixed-gift");
    const giftModal = document.querySelector(".popup-gift");

    if (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight) {
      if (getComputedStyle(giftTrigger).display === "block") {
        giftTrigger.style.display = "none";

        giftModal.classList.add("animated", "fadeIn")
        giftModal.style.display = "block";
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${offsetWidth}px`;

        document.querySelector(".pageup").style.marginRight = `${offsetWidth}px`
        window.removeEventListener('scroll', showByModalWindowScroll);
      }
    }
  }

  window.addEventListener("scroll", showByModalWindowScroll);

  function calcScroll() {
    const div = document.createElement("div");
      div.style.width = "50px";
      div.style.height = "50px";
      div.style.overflow = "scroll";
      div.style.visibility = "hidden";
      document.body.appendChild(div);

    let marginRight = div.offsetWidth - div.clientWidth;
      div.remove();

    return marginRight;
  }
}

export default modals;