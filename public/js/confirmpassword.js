var passwordReset = document.getElementById("passwordReset")
  , confirmPassword = document.getElementById("confirmPassword");

function validatePassword(){
  if(passwordReset.value != confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords Don't Match");
  } else {
    confirmPassword.setCustomValidity('');
  }
}
passwordReset.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;