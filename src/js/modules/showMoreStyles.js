import {getResource} from "../services/service";

const showMoreStyles = (trigger) => {
  const button = document.querySelector(trigger);

  let errorMessage = document.createElement("div");
      errorMessage.style.textAlign = "center";
      document.querySelector("#styles .row").appendChild(errorMessage);

  button.addEventListener("click", () => {
    getResource("http://localhost:3000/styles")
      .then(res => createCards(res))
      .catch(() => {
        errorMessage.textContent = "Нет соединения с сервером...";
      })
      .finally(() => {
        setTimeout(() => {
          errorMessage.remove();
        }, 3000);
      })
  });

  function createCards(response) {
    response.forEach(item => {
      let card = document.createElement("div");
      card.classList.add("animated", "fadeInUp", "col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");
      card.innerHTML = `
        <div class="styles-block">
          <img src=${item.src} alt>
          <h4>${item.title}</h4>
          <a href=${item.link}>Подробнее</a>
        </div>
      `
      document.querySelector("#styles .row").appendChild(card);
      button.style.display = "none";
    });
  }
}

export default showMoreStyles;