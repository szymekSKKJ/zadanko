import "./RegisterForm.css";

const RegisterForm = () => {
  return (
    <div className="register-form-wrapper">
      <h1>FORMULARZ REJESTRACYJNY</h1>
      <form id="register-form" noValidate onSubmit={(event) => event.preventDefault()}>
        <div className="input-wrapper">
          <label>Login:</label>
          <input type="text" data-input-type="login" required></input>
          <p className="label-wrong">Login nie może być pusty</p>
        </div>
        <div className="input-wrapper">
          <label>Hasło:</label>
          <input type="password" data-input-type="password" required></input>
          <p className="label-wrong">Hasło nie może być pusty</p>
        </div>
        <div className="input-wrapper">
          <label>Email:</label>
          <input type="text" data-input-type="email" required></input>
          <p className="label-wrong">Nieprawidłowy format adresu e-mail</p>
        </div>
        <div className="input-wrapper">
          <label>Numer telefonu:</label>
          <input type="text" data-input-type="phoneNumber" required></input>
          <p className="label-wrong">Nieprawidłowy numer telefonu</p>
        </div>
        <div className="input-wrapper checkbox">
          <input type="checkbox" required></input>
          <label>Akceptuję regulamin:</label>
          <p className="label-wrong">Wymagana akceptacja regulaminu</p>
        </div>
        <button
          className="main-button mb-style-3"
          onClick={() => {
            const formElement = document.querySelector("#register-form")!;
            const isFormValid = validateForm() === null ? true : false;
            if (isFormValid) {
              const data = getDataFromForm(formElement);
              sendData(data);
            }
          }}>
          Zapisz
        </button>
      </form>
    </div>
  );
};

const getDataFromForm = (formElement: Element) => {
  const inputElements = formElement.querySelectorAll("input");
  let data: any = {}; // It should has a type script schema

  inputElements.forEach((inputElement) => {
    if (inputElement.dataset.inputType !== undefined) {
      data[inputElement.dataset.inputType.toString()] = inputElement.value;
    }
  });

  return data;
};

const sendData = async (data: object) => {
  const response = await fetch("https://example/", {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
};

const isEmpty = (str: string) => !str.trim().length;

const validateEmail = (email: string) => {
  return email.includes("@") && email.includes(".") && email.indexOf("@") < email.indexOf(".");
};

const validatePhoneNumber = (phoneNumber: string) => {
  return /^\d+$/.test(phoneNumber) && phoneNumber.length === 9;
};

const validateForm = () => {
  const formElement = document.querySelector("#register-form")!;
  const formInputWrapperElements = formElement.querySelectorAll(".input-wrapper");
  let error = null;

  formInputWrapperElements.forEach((formInputWrapperElement) => {
    const inputElement = formInputWrapperElement.querySelector("input")!;
    const labelElement = formInputWrapperElement.querySelector("label")!;

    // Should remove repetition...

    if (labelElement.innerHTML.toLocaleLowerCase().includes("login")) {
      if (isEmpty(inputElement.value)) {
        error = true;
        formInputWrapperElement.classList.add("wrong");
      } else {
        formInputWrapperElement.classList.remove("wrong");
      }
    }

    if (labelElement.innerHTML.toLocaleLowerCase().includes("hasło")) {
      if (isEmpty(inputElement.value)) {
        error = true;
        formInputWrapperElement.classList.add("wrong");
      } else {
        formInputWrapperElement.classList.remove("wrong");
      }
    }

    if (labelElement.innerHTML.toLocaleLowerCase().includes("email")) {
      const isEmailCorrect = validateEmail(inputElement.value);
      if (isEmailCorrect === false) {
        error = true;
        formInputWrapperElement.classList.add("wrong");
      } else {
        formInputWrapperElement.classList.remove("wrong");
      }
    }
    if (labelElement.innerHTML.toLocaleLowerCase().includes("numer telefonu")) {
      const isPhoneNumberCorrect = validatePhoneNumber(inputElement.value);
      if (isPhoneNumberCorrect === false) {
        error = true;
        formInputWrapperElement.classList.add("wrong");
      } else {
        formInputWrapperElement.classList.remove("wrong");
      }
    }
    if (labelElement.innerHTML.toLocaleLowerCase().includes("akceptuję regulamin")) {
      if (inputElement.checked === false) {
        error = true;
        formInputWrapperElement.classList.add("wrong");
      } else {
        formInputWrapperElement.classList.remove("wrong");
      }
    }
  });
  return error;
};

export default RegisterForm;
