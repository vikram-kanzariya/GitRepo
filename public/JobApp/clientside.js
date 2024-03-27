

function ValidateForm(){
    var fields  = document.querySelectorAll(".valid");
    var errorDiv = document.querySelector('.errorMessages');

  

    fields.forEach((field) => {
        if(field.value.trim() == ""){
            event.preventDefault();
            const fieldName = field.getAttribute('name');
            const Message = document.createElement('p');
            Message.textContent = `${fieldName} is Required....`;
            errorDiv.appendChild(Message);
            // error.innerHTML = `${fieldName} is Required...`;
            return false;
        }
    });

}


// console.log(field);
// console.log(error)