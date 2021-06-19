import { postData } from "../services/service";

const drop = (inputSelector) => {
  const fileInput = document.querySelectorAll(inputSelector);

  ["dragenter", "dragleave", "dragover", "drop"].forEach(eventName => {
    fileInput.forEach(item => {
      item.addEventListener(eventName, preventDefaults, false);
    });
  });

  function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function highLight(item) {
    item.closest(".file_upload").style.border = "5px solid yellow";
    item.closest(".file_upload").style.borderRadius = "30px";
    item.closest(".file_upload").style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  }

  function unhighLight(item) {
    item.closest(".file_upload").style.border = "none";
    item.closest(".file_upload").style.borderRadius = "30px";

    if (item.closest(".form_calc")) {
      item.closest(".file_upload").style.backgroundColor = "#ffffff";
    } else {
      item.closest(".file_upload").style.backgroundColor = "#ededed";
    }    
  }

  ["dragenter", "dragover"].forEach(eventName => {
    fileInput.forEach(item => {
      item.addEventListener(eventName, () => highLight(item), false);
    });
  });

  ["dragleave", "drop"].forEach(eventName => {
    fileInput.forEach(item => {
      item.addEventListener(eventName, () => unhighLight(item), false);
    });
  });

  fileInput.forEach(item => {
    item.addEventListener("drop", (event) => {
      let files = event.dataTransfer.files;

      let dots;
      const arr = files[0].name.split(".");
      arr[0].lenght > 6 ? dots = "..." : dots = ".";
      const name = arr[0].substring(0, 6) + dots + arr[1];
      item.previousElementSibling.textContent = name;

      if (item.getAttribute("drop") === "image") {
        [...files].forEach(item => {
          const formData = new FormData();
          formData.append("upload", item.name);
          const data = JSON.stringify(Object.fromEntries(formData.entries()));
          postData("http://localhost:3000/designer", data)
          .then(res => {
            console.log(res)
          })
        });
      }
    });
  })
}

export default drop;