let add = document.getElementById('add');
let del = document.getElementById('remove');
let companydetails = document.querySelector('.companydetails');

add.addEventListener('click' , function(e){
    e.preventDefault();
    let div = document.createElement("div");
    div.classList.add("company");

    div.innerHTML = `
    <table>
    <tr>
    <td>
        <label for="company">Company Name: </label>
        <input type="text" name="company[]" id="company" class="compnay">

        <label for="designation">Designation: </label>
        <input type="text" name="designation[]" id="desgination1">

        <label for="from">from</label>
        <input type="text" name="from[]" id="from1">

        <label for="to">to</label>
        <input type="text" name="to[]" id="to1">

        <br><br>
    </td>
</tr>
</table>
    `
    companydetails.appendChild(div);

    let companies = document.querySelectorAll(".company");
    console.log(companies.length)    
});

del.addEventListener('click' , function(e){
    e.preventDefault();
    let companies = document.querySelectorAll(".company");

       if(companies.length > 3){

           companies[companies.length - 1].remove();
           console.log(companies);
   } 

});


let addref = document.getElementById('addref');
let removeref = document.getElementById('removeref');
let refDetail = document.querySelector(".ref-data");

addref.addEventListener("click" , function(e){
    e.preventDefault();
    let div = document.createElement("div");
    div.classList.add("reference");

    div.innerHTML = `
    <table>
    <tr>
        <td rowspan="2">
            <label for="name">Name: </label>
            <input type="text" name="name[]" id="name1">
    
            <label for="contact">Contact Number: </label>
            <input type="text" class="contact" name="contact[]" id="contact1">
    
            <label for="relation">Relation: </label>
            <input type="text" name="relation[]" id="relation1">
    
            <br><br>
        </td>
    </tr>
</table>
    `;

    refDetail.appendChild(div);
});

removeref.addEventListener('click' , function(e){
    e.preventDefault();

    let ref = document.querySelectorAll(".reference");
    if(ref.length > 2){
        ref[ref.length - 1].remove();
    }

})