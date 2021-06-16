const calcState = (selector, event, prop, state) => {
  const data = document.querySelectorAll(selector);
  

  data.forEach(item => {
    item.addEventListener(event, () => {
      switch(item.nodeName) {
        case "SELECT":
          state[prop] = +item.value
          break;
        case "INPUT":
          state[prop] = item.value
          break;   
      }
      state.sum = document.querySelector(".calc-price").innerHTML.replace(/\D/g, "")
      console.log(state)
    })
  })
  
}

export default calcState;