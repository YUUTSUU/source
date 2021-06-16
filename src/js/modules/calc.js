import {getResource} from "../services/service";

const calc = (sizeSelector, materialSelector, optionsSelector, promocodeSelector, resultSelector) => {
  const sizeBlock = document.querySelector(sizeSelector),
        materialBlock = document.querySelector(materialSelector),
        optionsBlock = document.querySelector(optionsSelector),
        promocodeBlock = document.querySelector(promocodeSelector),
        resultBlock = document.querySelector(resultSelector);

  const errorMessage = document.querySelector(".calc-price");

  function result(selector) {
    getResource(`http://localhost:3000/${selector}`)
      .then(res => renderSelect(res, selector))
      .catch(() => {
        errorMessage.textContent = "Список не загрузился...";
      })
  }

  result("size");
  result("material");
  result("options");

  function renderSelect(res, selector) {
    switch (selector) {
      case "size":
        res.forEach(item => {
          const option = document.createElement("option");
          option.setAttribute("value", `${item.value}`);
          option.innerHTML = `${item.title}`;
          document.querySelector("#size").appendChild(option);
        })
      break;
      case "material":
        res.forEach(item => {
          const option = document.createElement("option");
          option.setAttribute("value", `${item.value}`);
          option.setAttribute("title", `${item.descr}`);
          option.innerHTML = `${item.title}`;
          document.querySelector("#material").append(option);
        })
      break;
      case "options":
        res.forEach(item => {
          const option = document.createElement("option");
          option.setAttribute("value", `${item.value}`);
          option.innerHTML = `${item.title}`;
          document.querySelector("#options").append(option);
        })
      break;
    }
  }

  let sum = 0;

  function calcFunc() {
    sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

    if (sizeBlock.value == "" || materialBlock.value == "") {
      resultBlock.textContent = "Пожалуйста! Выберите размер и материал картины"

    } else if (promocodeBlock.value.replace(/\s/g, "") === "IWANTPOPART") {
      sum = sum * 0.7
      resultBlock.textContent = sum;

    } else {
      resultBlock.textContent = sum;
    }
  }

  sizeBlock.addEventListener("change", calcFunc);
  materialBlock.addEventListener("change", calcFunc);
  optionsBlock.addEventListener("change", calcFunc);
  promocodeBlock.addEventListener("input", calcFunc);
}

export default calc;