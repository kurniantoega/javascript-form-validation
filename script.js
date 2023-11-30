const form = document.querySelector("#signup");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");

const isRequired = (value) => {
  return value === "" ? false : true;
};

const isBetween = (length, min, max) => {
  return length < min || length > max ? false : true;
};

const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const isPasswordSecure = (password) => {
  const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
  return re.test(password);
};

const showError = (input, message) => {
  const formField = input.parentElement;

  formField.classList.remove("success");
  formField.classList.add("error");

  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;

  formField.classList.remove("error");
  formField.classList.add("success");

  const error = formField.querySelector("small");
  error.textContent = "";
};

const checkUsername = () => {
  let valid = false;
  const min = 3;
  const max = 20;
  const username = usernameInput.value.trim();

  if (!isRequired(username)) {
    showError(usernameInput, "Username cannot be blank.");
  } else if (!isBetween(username.length, min, max)) {
    showError(usernameInput, `Username must be between ${min} and ${max} characters.`);
  } else {
    showSuccess(usernameInput);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailInput.value.trim();

  if (!isRequired(email)) {
    showError(emailInput, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailInput, "Email is not valid.");
  } else {
    showSuccess(emailInput);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;
  const password = passwordInput.value.trim();

  if (!isRequired(password)) {
    showError(passwordInput, "Password cannot be blank.");
  } else if (!isPasswordSecure(password)) {
    showError(passwordInput, "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)");
  } else {
    showSuccess(passwordInput);
    valid = true;
  }
  return valid;
};

const checkConfirmPassword = () => {
  let valid = false;
  const confirmPassword = confirmPasswordInput.value.trim();
  const password = passwordInput.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordInput, "Please enter the password again.");
  } else if (password !== confirmPassword) {
    showError(confirmPasswordInput, "Confirm password does not match.");
  } else {
    showSuccess(confirmPasswordInput);
    valid = true;
  }
  return valid;
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isUsernameValid = checkUsername();
  let isEmailValid = checkEmail();
  let isPasswordValid = checkPassword();
  let isConfirmPasswordValid = checkConfirmPassword();

  let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

  if (isFormValid) {
    alert("VALID!");
  }
});

form.addEventListener("input", function (e) {
  console.log(e.target.id);
  switch (e.target.id) {
    case "username":
      checkUsername();
      break;
    case "email":
      checkEmail();
      break;
    case "password":
      checkPassword();
      break;
    case "confirm-password":
      checkConfirmPassword();
      break;
  }
});
