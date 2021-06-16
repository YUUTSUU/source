const pictureSize = (imgSelector) => {
  const blocks = document.querySelectorAll(imgSelector)

  function showImage(item) {
    const img = item.querySelector("img");
    img.src = img.src.slice(0, -4) + "-1.png";
    item.querySelectorAll("p:not(.sizes-hit)").forEach(p => {
      p.style.display = "none";
    })
  }

  function hideImage(item) {
    const img = item.querySelector("img");
    img.src = img.src.slice(0, -6) + ".png";
    item.querySelectorAll("p:not(.sizes-hit)").forEach(p => {
      p.style.display = "block";
    })
  }

  blocks.forEach(item => {
    item.addEventListener("mouseover", () => {
      showImage(item);
    });
    item.addEventListener("mouseout", () => {
      hideImage(item);
    });
  });
}

export default pictureSize;