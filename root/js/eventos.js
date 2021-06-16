let boton = document.getElementById("boton");
let formulario = document.getElementById("formulario");
let nombre = document.getElementById("name");
let errNombre = document.getElementById("errNombre");
let email = document.getElementById("email");
let errEmail = document.getElementById("errEmail");
let subject = document.getElementById("subject");
let errSubject = document.getElementById("errSubject");
let message = document.getElementById("message");
let errMsg = document.getElementById("errMsg");

let regexEmail =
  /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]:+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/;
let regexNombre = /^[a-z_-\sA-Z]{3,50}$/;

let enviar = () => {
  let errores = [];
  if (!regexNombre.test(nombre.value)) {
    nombre.classList.add("error");
    errNombre.classList.add("text-error");
    errNombre.innerHTML = "El nombre debe contener solo letras";
    errores.push("name");
  } else {
    nombre.classList.remove("error");
    errNombre.classList.remove("text-error");
    errNombre.innerHTML = "";
  }
  if (!regexEmail.test(email.value)) {
    email.classList.add("error");
    errEmail.classList.add("text-error");
    errEmail.innerHTML = "El email debe ser de formato email";
    errores.push("email");
  } else {
    email.classList.remove("error");
    errEmail.classList.remove("text-error");
    errEmail.innerHTML = "";
  }
  if (subject.value === "") {
    subject.classList.add("error");
    errSubject.classList.add("text-error");
    errSubject.innerHTML = "El asunto es requerido";
    errores.push("asunto");
  } else {
    subject.classList.remove("error");
    errSubject.classList.remove("text-error");
    errSubject.innerHTML = "";
  }
  if (message.value === "") {
    message.classList.add("error");
    errMsg.classList.add("text-error");
    errMsg.innerHTML = "El mensaje no puede estar vacio";
    errores.push("msg");
  } else {
    message.classList.remove("error");
    errMsg.classList.remove("text-error");
    errMsg.innerHTML = "";
  }
  /* una ves enviado el formulario limpio los campos */
  if (errores.length === 0) {
    fetch("https://60c697c719aa1e001769f7c8.mockapi.io/marketing/leads", {
      method: "POST",
      body: JSON.stringify({
        name: nombre.value,
        "e-mail": email.value,
        message: message.value,
        subject: subject.value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        /* console.log(response); */
        swal(
          "Enviado!",
          `Se pondran en contacto con usted en la brevedad`,
          "success"
        );
      })
      .catch((error) => {
        /* console.log("Error:", error); */
        swal(
          "Algo salio mal!",
          `Verifique que sus datos esten correctos`,
          "error"
        );
      });
    nombre.value = "";
    nombre.classList.remove("error");
    errNombre.classList.remove("text-error");
    errNombre.innerHTML = "";
    email.value = "";
    email.classList.remove("error");
    errEmail.classList.remove("text-error");
    errEmail.innerHTML = "";
    subject.value = "";
    subject.classList.remove("error");
    errSubject.classList.remove("text-error");
    errSubject.innerHTML = "";
    message.value = "";
    message.classList.remove("error");
    errMsg.classList.remove("text-error");
    errMsg.innerHTML = "";
  }
};
formulario.onsubmit = (e) => {
  e.preventDefault();
  enviar();
};
