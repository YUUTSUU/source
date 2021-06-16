const animated = () => {
  const wowItem = document.querySelectorAll(".wow")

  wowItem.forEach(item => {
    if (item.classList.contains("wow")) {
      item.classList.replace("wow", "animated")
      // item.setAttribute("data-wow-duration", "2s")
      // item.setAttribute("data-wow-delay", "0.8s")    
    }
  })
}

export default animated;