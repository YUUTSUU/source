const filter = (headerSelector, wrapperSelector, noSelector) => {
  const header = document.querySelector(headerSelector),
        tabs = header.querySelectorAll("li"),
        wrapper = document.querySelector(wrapperSelector),
        content = wrapper.querySelectorAll("div"),
        no = document.querySelector(noSelector);    

  function hideContentFilter() {
    content.forEach(item => {
      item.style.display = "none";
      item.classList.remove("animated", "fadeIn");
    });

    no.style.display = "none";
    no.classList.remove("animated", "fadeIn");
  }

  function showContentFilter(className) {
    const items = wrapper.querySelectorAll(`.${className}`)

    if (items.length > 0) {
      items.forEach(item => {
        item.style.display = "block";
        item.classList.add("animated", "fadeIn");
      });
    } else {
      no.style.display = "block";
      no.classList.add("animated", "fadeIn");
    }
  }

  header.addEventListener("click", (event) => {
    const className = event.target.className.split(" ")[0]

    if (event.target && (event.target.tagName === "LI" || event.target.parentNode.classList.contains(className))) {
      tabs.forEach(item => item.classList.remove("active"))
      hideContentFilter();
      showContentFilter(className)
      event.target.classList.add("active")
    }
  });
}

export default filter;