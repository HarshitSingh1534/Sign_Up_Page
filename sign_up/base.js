var usernameEl = document.querySelector('#username');
var emailEl = document.querySelector('#email');
var passwordEl = document.querySelector('#password');
var confirmPasswordEl = document.querySelector('#confirm-password');
var form = document.querySelector('#signup')

form.addEventListener('submit', function(e){
    var isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    var isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    if(isFormValid==false){
      e.preventDefault();
    }
});

form.addEventListener('input', function(e){
    switch(e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
});

function isRequired(value){
  if(value===''){
    return false
  }
  return true
}

function isBetween(length,min,max){
    if(length<min || length>max){
      return false
    }
    return true
}

function isEmailValid(email){
  var re = /^\S+@\S+\.\S+$/;
  return re.test(email)
}

function showError(input, message){
    var formField = input.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');

    var error = formField.querySelector('small');
    error.textContent = message;
};

function showSuccess(input){
    var formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    var error = formField.querySelector('small');
    error.textContent = '';
}

function checkUsername(){

    var valid = false;
    var min = 3,max = 25;
    var username = usernameEl.value.trim();

    if(!isRequired(username)){
        showError(usernameEl,'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, 'Username must be between 3 and 25 characters.')
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
}

function checkEmail(){
    var valid = false;
    var email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}

function checkPassword(){
    var valid = false;
    var password = passwordEl.value.trim();
    if(!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    }
    else {
        showSuccess(passwordEl);
        valid = true;
    }
    return valid;
};

function checkConfirmPassword(){
    var valid = false;

    var confirmPassword = confirmPasswordEl.value.trim();
    var password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'The password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }
    return valid;
};
