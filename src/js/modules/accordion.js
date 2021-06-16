const accordion = (triggerSelector) => {
  const trigger = document.querySelectorAll(triggerSelector);

  trigger.forEach(item => {
    item.classList.remove('active-style')

    item.nextElementSibling.classList.remove('active-content');
    item.nextElementSibling.style.maxHeight = '0px';
  });

  trigger.forEach(item => {
    item.addEventListener('click', function() {
      if (this.classList.contains('active-style')) {
          this.classList.remove('active-style')

          this.nextElementSibling.classList.remove('active-content');
          this.nextElementSibling.style.maxHeight = '0px';

      } else {
        trigger.forEach(item => {
          item.classList.remove('active-style')

          item.nextElementSibling.classList.remove('active-content');
          item.nextElementSibling.style.maxHeight = '0px';
        });

        this.classList.add('active-style')

        this.nextElementSibling.classList.add('active-content');
        this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";

        //плавный текст
        const i = this.nextElementSibling.className.split(" ")[2];
        document.querySelectorAll(`.${i} p`).forEach(item => item.classList.add("animated", "fadeIn"))
      }
    });
  });   
}

export default accordion;