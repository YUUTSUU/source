import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from "./modules/checkTextInputs";
import showMoreStyles from "./modules/showMoreStyles";
import calc from "./modules/calc";
import calcState from "./modules/calcState";
import filter from "./modules/filter";
import pictureSize from "./modules/pictureSize";
import accordion from "./modules/accordion";
import burger from "./modules/burger";
import animated from "./modules/animated";
import scrolling from "./modules/scrolling";
import drop from "./modules/drop";

window.addEventListener("DOMContentLoaded", () => {
  "use strick";

  let state = {}

  animated();

  modals(".button-design", ".popup-design", ".popup-design .popup-close");
  modals(".button-consultation", ".popup-consultation", ".popup-consultation .popup-close");
  modals(".fixed-gift", ".popup-gift", ".popup-gift .popup-close", true);

  sliders(".feedback-slider-item", ".main-prev-btn", ".main-next-btn");
  sliders(".main-slider-item", "", "", "vertical");

  forms("form", "input", state);

  mask("input[name='phone']");

  checkTextInputs("input[name='name']");
  checkTextInputs("textarea[name='message']");

  showMoreStyles(".button-styles");

  calc("#size", "#material", "#options", ".promocode", ".calc-price")

  calcState("#size", "change", "size", state);
  calcState("#material", "change", "materialCoeff", state);
  calcState("#options", "change", "options", state);
  calcState(".promocode", "input", "promocode", state);

  filter(".portfolio-menu", ".portfolio-wrapper", ".portfolio-no");

  pictureSize(".sizes-block");

  accordion(".accordion-heading");

  burger(".burger-menu", ".burger");

  scrolling(".pageup");

  drop();
});