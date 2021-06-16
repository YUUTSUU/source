const mask = (selector) => {
  // const setCursorPosition = (position, element) => {
  //   element.focus();
    
  //   if (element.setSelectionRange) {
  //     element.setSelectionRange(position, position);

  //   } else if (element.createTextRange) {
  //     let range = element.createTextRange();

  //     range.collapse(true);
  //     range.moveEnd("character", position);
  //     range.moveStart("character", position);
  //     range.select();
  //   }
  // }

  function createMask(event) {
    let matrix = "+7 (___) ___ __ __",
        i = 0,
        inputDefault = matrix.replace(/\D/g, ""),
        inputValue = this.value.replace(/\D/g, "");
    
    if (inputDefault.length >= inputValue.length) {
      inputValue = inputDefault;
    }

    this.value = matrix.replace(/./g, function(symbol) {
      return /[_\d]/.test(symbol) && i < inputValue.length ? inputValue.charAt(i++) : i >= inputValue.length ? "" : symbol;
    })

    if (event.type === "blur") {
      if (this.value.length == 2) {
        this.value = "";
      } 
      // else {
      //   setCursorPosition(this.value.length, this);
      // }
    }
  }

  let inputs = document.querySelectorAll(selector);

  inputs.forEach(input => {
    input.addEventListener("input", createMask);
    input.addEventListener("focus", createMask);
    input.addEventListener("blur", createMask);
  });
}

export default mask;