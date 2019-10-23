let newPasswordValue;
let confirmationValue;
const submitBtn = document.getElementById('update-profile');
const newPassword = document.getElementById('new-password');
const confirmation = document.getElementById('password-confirmation');
const validationMessage = document.getElementById('validation-message');
function validatePassword(message, add, remove){
    validationMessage.textContent = message;
    validationMessage.classList.add(add);
    validationMessage.classList.remove(remove);
}
confirmation.addEventListener('input',e =>{
    e.preventDefault();
    newPasswordValue = newPassword.value;
    confirmationValue = confirmation.value;
    if (newPasswordValue !== confirmationValue){
        validatePassword('Passwords must match!','color-red','color-green');
        submitBtn.setAttribute('disabled', true);
    } else{
        validatePassword('Passwords match!','color-green','color-red')
        submitBtn.removeAttribute('disabled');
    }
});

