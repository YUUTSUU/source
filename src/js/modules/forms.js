import {postData} from "../services/service";

const forms = (formsSelector, inputSelector, state) => {
  const formsItems = document.querySelectorAll(formsSelector),
        inputItems = document.querySelectorAll(inputSelector),
        windowModal = document.querySelectorAll("[data-modal]"),
        inputUpload = document.querySelectorAll("input[name='upload']"),
        selectItems = document.querySelectorAll("[data-select]"),
        calcPrice = document.querySelector(".calc-price")

  let server = null;

  const path = {
    designer: "http://localhost:3000/designer",
    question: "http://localhost:3000/question"
  }

  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся!",
    failure: "Что-то пошло не так...",
    spinner: "assets/img/spinner.gif",
    ok: "assets/img/ok.png",
    fail: "assets/img/fail.png",
    state: "Не выбран размер и материал картины"
  }

  inputUpload.forEach(item => {
    item.addEventListener("input", () => {
      let dots = null;
      item.files[0].name.split(".")[0].length > 6 ? dots = "..." : dots = "."
      const name = item.files[0].name.split(".")[0].substring(0, 6) + dots + item.files[0].name.split(".")[1];
      item.previousElementSibling.textContent = name;
    });
  });

  formsItems.forEach(item => {
    item.addEventListener("submit", (event) => {
      event.preventDefault();

      //сообщение >
      const status = document.createElement("div")
      status.classList.add("status");
      status.style.textAlign = "center";
      item.parentNode.appendChild(status);

      item.classList.add("animated", "fadeOutUp");
      setTimeout(() => {
        item.style.display = "none";
        statusImage.style.opacity = "1"
        statusMessage.style.opacity = "1"
      }, 400);

      const statusImage = document.createElement("img");
      statusImage.classList.add("animated", "pulse");
      statusImage.setAttribute("src", message.spinner);
      statusImage.style.opacity = "0"
      status.appendChild(statusImage);
      
      const statusMessage = document.createElement("div");
      statusMessage.classList.add("animated", "pulse");
      statusMessage.style.opacity = "0"
      statusMessage.textContent = message.loading;
      status.appendChild(statusMessage);
      //сообщение <

      const formData = new FormData(item);
  
      if (item.getAttribute('data-calc') === "state") {
        if (!state.size || !state.materialCoeff || !state.options) {
          statusImage.setAttribute("src", message.fail);
          statusMessage.textContent = message.state;
          setTimeout(() => {
            statusImage.remove();
            statusMessage.remove();

            formsItems.forEach(item => {
              item.style.display = "block";
              item.classList.remove("fadeOutUp");
              item.classList.add("fadeInUp");
            });
          }, 3000);
          return;
        }
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }
      
      item.closest(".popup-design") || 
      item.classList.contains("form_calc") ? server = path.designer : server = path.question;
      const data = JSON.stringify(Object.fromEntries(formData.entries()));

      postData(server, data)
        .then(res => {
          console.log(res);

          statusImage.setAttribute("src", message.ok);
          statusMessage.textContent = message.success;
        })
        .catch(() => {
          statusImage.setAttribute("src", message.fail);
          statusMessage.textContent = message.failure;
        })
        .finally(() => {
          inputItems.forEach(item => {
            item.value = "";
          });

          selectItems.forEach(item => {
            item.value = "";
          })

          calcPrice.textContent = "Для расчета нужно выбрать размер картины и материал картины"

          inputUpload.forEach(item => {
            item.previousElementSibling.textContent = "Файл не выбран"
          });

          // state = {};

          setTimeout(() => {
            status.remove();

            windowModal.forEach(item => {
              item.style.display = 'none'
              document.body.style.overflow = ''
              document.body.style.marginRight = '0px'
            });

            formsItems.forEach(item => {
              item.style.display = "block";
              item.classList.remove("fadeOutUp")
              item.classList.add("fadeInUp")
            })
          }, 3000);
        });
    });
  });
}

export default forms;