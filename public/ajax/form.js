const validateEmail = (email) => {
    return email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
};


    
    function isValidDate(stringDate) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(stringDate);
    }

    function ValidateForm(){

        let a = true;
        // ---> Basic Detail
        var error = document.getElementById('error');
        var fname = document.getElementById('fname').value;
        var lname = document.getElementById('lname').value;
        var desgination = document.getElementById('desg').value;
        var email = document.getElementById('email').value;
        var add1 = document.getElementById('add1').value;
        var add2 = document.getElementById('add2').value;
        var Number = document.getElementById('no').value;
        var city = document.getElementById('city').value;
        var zipcode = document.getElementById('zip').value;
        var dob = document.getElementById('dob').value;

        if(fname == "" || lname == "" || desgination== "" || email == "" || add1 == "" || add2 == "" || Number == "" || city == "" || zipcode == "" || dob == ""){
            a = false;
            event.preventDefault();
            error.innerHTML = "Please Enter All Fields...";
            // return false;
        }

        if(fname.length < 5 || lname.length < 5){
            a = false;
            event.preventDefault();
            error.innerHTML = "Fname and Lname Should be of more than 5 characters...";
            // return false;
        }
        
        if(!validateEmail(email)){
            a = false;
            event.preventDefault();
            error.innerHTML = "Email is Not Validate...";
            // return false;
        }



        if((Number >= 'a' && Number <= 'z') || (Number >= 'A' && Number <= 'Z')){
            a = false;
            event.preventDefault()
            error.innerHTML = "Number should not Contain Alphabets..."
            // return false;
        }

        if(Number.length != 10){
            a = false;
            event.preventDefault()
            error.innerHTML = "Number should be of 10-digits..."
            // return false;
        }


        if(zipcode.length != 6){
            a = false;
            event.preventDefault();
            error.innerHTML = "Zipcode should be of 6-digits"
            // return false;
        }

        if((zipcode >= 'a' && zipcode <= 'z') || (zipcode >= 'A' && zipcode <= 'Z')){
            a = false;
            event.preventDefault()
            error.innerHTML = "ZipCode should not Contain Alphabets..."
            // return false;
        }


    //    if(!isValidDate(dob)){
    //         a = false;
    //         event.preventDefault()
    //         error.innerHTML = "Date is Not Valid..."
    //         // return false;
    //    }
        

        // ---> For Selecting States <---
        var state = document.getElementById('state');
        if(document.jobapp.state.selectedIndex == ""){
            a = false;
            event.preventDefault();
            error.innerHTML = "Please Select State..."
            // return false;
        }
     

        // ---> For RelationShip Status <---
        var relation = document.getElementById('rs');
        if(document.jobapp.rs.selectedIndex == ""){
            a = false;
            event.preventDefault();
            error.innerHTML = "Please Select RelationShip..."
            // return false;
        }

     
        // ---> For CheckBox
        var gender_checked = document.querySelector('input[name = "gender"]:checked');

        if(gender_checked == "" || gender_checked == null){
            a = false;
            event.preventDefault();
            error.innerHTML = "Please Select Gender..."
            // return false;
        }
       

        // ---> Education Detail
        var eduerr = document.getElementById('eduerr');

        var ssc = document.getElementById('ssc').value;
        var py1 = document.getElementById('py1').value;
        var percentage1 = document.getElementById('percentage1').value;
        
        var hsc = document.getElementById('hsc').value;
        var py2 = document.getElementById('py2').value;
        var percentage2 = document.getElementById('percentage2').value;


        var bechlor = document.getElementById('bechlor');
        var master = document.getElementById('master');

        if(document.jobapp.bechlor.selectedIndex == ""){
            a = false;
            event.preventDefault();
            eduerr.innerHTML = "Please Select Bechlors..."
        }
        if(document.jobapp.master.selectedIndex == ""){
            a = false;
            event.preventDefault();
            eduerr.innerHTML = "Please Select Masters..."
        }

        var py3 = document.getElementById('py3').value;
        var percentage3 = document.getElementById('percentage3').value;

    
        var py4 = document.getElementById('py4').value;
        var percentage4 = document.getElementById('percentage4').value;

    
        if(ssc == "" || py1 == "" || percentage1 == "" || hsc == "" || py2 == "" || percentage2 == "" ){
            a = false;
            event.preventDefault();
            eduerr.innerHTML = "Please Enter All Education Fields...";
            // return false;
        }


        if((ssc > 0  && ssc < 9) || (hsc > 0  && hsc < 9) || (bechlor > 0 && bechlor < 9) || (master > 0 && master < 9) ){
            a = false;
            event.preventDefault();
            eduerr.innerHTML = "Board_Name shold not contain digits..."
            // return false;
        }


        if((py1 >= 'a' && py1 <= 'z') || (py1 >= 'A' && py1 <= 'Z') || (py2 >= 'a' && py2 <= 'z') || (py2 >= 'A' && py2 <= 'Z' || (py3 >= 'a' && py3 <= 'z') || (py3 >='A' && py3 <= 'Z') || ((py4 >= 'a' && py4 <= 'z') || (py4 >= 'A' && py4 <= 'Z')) )){
            a = false;
            event.preventDefault();
            eduerr.innerHTML = "PassingYear should not Contain Alphabets...";
            // return false;
        }

        if((percentage1 >= 'a' && percentage1 <= 'z') || (percentage1 >= 'A' && percentage1 <= 'Z') || (percentage2 >= 'a' && percentage2 <= 'z') || (percentage2 >= 'A' && percentage2 <= 'Z'  || (percentage3 >= 'a' && percentage3 <= 'z') || (percentage3 >='A' && percentage3 <= 'Z') || (percentage4 >= 'a' && percentage4 <= 'z') || (percentage4 >='A' && percentage4 <= 'Z') )){
            a = false;
            event.preventDefault();
            eduerr.innerHTML = "Percentage should not Contain Alphabets...";
            // return false;
        }


        // ----> Work Details <---
        // var company1 = document.getElementById('company1').value;
        // var desgination1 = document.getElementById('desgination1').value;

        // var compan2 = document.getElementById('company2').value;
        // var desgination2 = document.getElementById('desgination2').value;

        // var company3 = document.getElementById('company3').value;
        // var desgination3 = document.getElementById('desgination3').value;

        
        // var from1 = document.getElementById('from1').value;
        // var to1 = document.getElementById('to1').value;
        // var from2 = document.getElementById('from2').value;
        // var to2 = document.getElementById('to2').value;
        // var from3 = document.getElementById('from3').value;
        // var to3 = document.getElementById('to3').value;
        // var workErr = document.getElementById('workErr');

        // if(!isValidDate(from1) || !isValidDate(from2) || !isValidDate(from3) || !isValidDate(to1) || !isValidDate(to2) || !isValidDate(to3)){
        //     event.preventDefault();
        //     workErr.innerHTML = "Date is Not Valid...";
        //     return false;
        // }


        // ---> Languages Known <--- 
        
        var hindi = document.getElementById('hindi');
        var english = document.getElementById('english');
        var gujarati = document.getElementById('gujarati');

        var read1 = document.getElementById('read1');
        var write1 = document.getElementById('write1');
        var speak1 = document.getElementById('speak1');

        var read2 = document.getElementById('read2');
        var write2 = document.getElementById('write2');
        var speak2 = document.getElementById('speak2');

        var read3 = document.getElementById('read3');
        var write3 = document.getElementById('write3');
        var speak3 = document.getElementById('speak3');

        var langErr = document.getElementById('langErr');

        // ---> for Language Selection
        if(!hindi.checked && !english.checked && !gujarati.checked){
            a = false;
            event.preventDefault();

            langErr.innerHTML = "Please select atleast one Lanuage"
            // return false;
        }

        // // ---> For Hindi
        if(hindi.checked && (!read1.checked && !write1.checked && !speak1.checked)){
            a = false;
            event.preventDefault();

            langErr.innerHTML = "Please check atleast one Level"
            // return false;
        }
        
        if(!hindi.checked && (read1.checked || write1.checked || speak1.checked)){
            a = false;
            event.preventDefault();
            langErr.innerHTML = "Please Select Language..."
            // return false;
        }

        // if(hindi.checked && (read1.checked || write1.checked || speak1.checked)){
        //     alert('Select Successful...');
        //     return true;
        // }

        // if(english.checked && (read2.checked || write2.checked || speak2.checked)){
        //     alert('Select Successful...');
        //     return true;
        // }

        // if(gujarati.checked && (read3.checked || write3.checked || speak3.checked)){
        //     alert('Select Successful...');
        //     return true;
        // }

        // ---> For English
        if(english.checked && (!read2.checked && !write2.checked && !speak2.checked)){
            a = false;
            event.preventDefault();
            langErr.innerHTML = "Please check atleast one Level";
            // return false;
        }
        
        if(!english.checked && (read2.checked || write2.checked || speak2.checked)){
            a = false;
            event.preventDefault();
            langErr.innerHTML = "Please Select Language...";
            // return false;
        }


        // ---> For Gujarati
        if(gujarati.checked && (!read3.checked && !write3.checked && !speak3.checked)){
            a = false;
            event.preventDefault();
            langErr.innerHTML = "Please check atleast one Level";
            // return false;
        }
        
        if(!gujarati.checked && (read3.checked || write3.checked || speak3.checked)){
            a = false;
            event.preventDefault();
            langErr.innerHTML = "Please Select Language...";
            // return false;
        }



        // ---> For Technologies <---
        var php = document.getElementById('php');
        var mysql = document.getElementById('mysql');
        var laravel = document.getElementById('laravel');
        var oracle = document.getElementById('oracle');

        var skillErr = document.getElementById('skillErr');

        if(!php.checked && !mysql.checked && !laravel.checked && !oracle.checked){
            a = false;
            event.preventDefault();
            skillErr.innerHTML = "Please Select one Technology"
            // return false;
        }

        var php_check = document.querySelector('input[name = "php"]:checked');
        var mysql_check = document.querySelector('input[name = "mysql"]:checked');
        var laravel_check = document.querySelector('input[name = "laravel"]:checked');
        var oracle_check = document.querySelector('input[name = "oracle"]:checked');

        // if(!mysql_check){
        //     event.preventDefault();

        //     skillErr.innerHTML = "please select levels";
        //     return false;
        // }
        // if(!php_check){
        //     event.preventDefault();
        //     skillErr.innerHTML = "please select levels";
        //     return false;
        // }
        // if(!laravel_check){
        //     event.preventDefault();
        //     skillErr.innerHTML = "please select levels";
        //     return false;
        // }
        // if(!oracle_check){
        //     event.preventDefault();
        //     skillErr.innerHTML = "please select levels";
        //     return false;
        // }


        
        // if(php.checked && !php_check){
        //     a = false;
        //     event.preventDefault();
        //     skillErr.innerHTML = "select PHP level";
        //     // return false;
        // } 
        // if(mysql.checked && !mysql_check){
        //     a = false;
        //     event.preventDefault();
        //     skillErr.innerHTML = "select Mysql level";
        //     // return false;
        // }
        // if(laravel.checked && !laravel_check){
        //     a = false;
        //     event.preventDefault();
        //     skillErr.innerHTML = "select Laravel level";
        //     // return false;
        // }
        // if(oracle.checked && !oracle_check){
        //     a = false;
        //     event.preventDefault();
        //     skillErr.innerHTML = "select Oracle level";
        //     // return false;
        // }
       

        // ---> Reference Validation <---
        // var name1 = document.getElementById('name1').value;
        // var contact1 = document.getElementById('contact1').value;
        // var relation1 = document.getElementById('relation1').value;
        let contact = document.querySelectorAll('.contact').value;
        let contactErr = document.getElementById('contactErr');

        // if(contact.length != 10){
        //     event.preventDefault();
        //     contactErr.innerHTML = "Contact should be of 10-Digits"
        //     return false;
        // }

        // ---> Preferance Validation <---
        var location = document.getElementById('location').value;
        var noticePeriod = document.getElementById('np').value;
        var expected = document.getElementById('expected').value;
        var curr = document.getElementById('curr').value;

        var prefErr = document.getElementById('prefErr');

        if(noticePeriod == "" || location == "" || expected == "" || curr == ""){
            a = false;
            // event.preventDefault();
            prefErr.innerHTML = "Please Enter Preference Details...";
            // return false;
        }

        if((curr >= 'a' && curr <= 'z') || (curr >= 'A' && curr <= 'Z') && (expected >= 'a' && expected <= 'z') && expected >= 'A' && expected <= 'Z'){
            a = false;
            event.preventDefault();
            prefErr.innerHTML = "CTC Should not contain alphabets...";
            // return false;   
        }

        var dept = document.getElementById('dept');

        if(document.jobapp.dept.selectedIndex == ""){
            a = false;
            event.preventDefault();
            prefErr.innerHTML = "Please select Department...";
            // return false;
        }


            // event.preventDefault()
            // document.getElementById('success').innerHTML = "Submitted SuccessFully...";
            // return true;     
            return a;   
    }




let form = document.getElementById('jobapp');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let basic = document.querySelector(".basicContainer");
let education = document.querySelector(".eduContainer");
let work = document.querySelector(".workContainer");
let language = document.querySelector(".langContainer");
let tech = document.querySelector(".techContainer");
let ref = document.querySelector(".referenceContainer");
let pref = document.querySelector(".preferenceContainer");
let btn = document.querySelector(".buttons");

education.style.display = 'none';
work.style.display = 'none';
language.style.display = 'none';
tech.style.display = 'none';
ref.style.display = 'none';
pref.style.display = 'none';

const candidateDetails = async(req , res) => {
    const { fname , lname , email , add1 , add2 , city , desg , no , state , gender , rs , zip , dob } =  req.body;
  
    let values = [
      fname , lname , email , add1 , add2 , city , desg , no , state , gender , rs , zip , new Date(dob) 
    ];
  
    let sql = "insert into candidateDetail ( fname , lname , email , add1 , add2 , city , designation , phoneNo , state , gender , relationshipStatus , zipcode , dob ) values (?) ";
  
    let [result] = await connection.query(sql , [values]);
  
    // console.log(result);
    let id = result.insertId;
  
    return id;
}
const eduDetails = async(req , res , id) => {
    const { ssc , hsc , bechlor , master , py1 , py2 , py3 , py4 , percentage1 , percentage2 , percentage3 , percentage4 , university1 , university2 } = req.body;
  
  
    const SSC = [id , "6" , "ssc" , ssc , py1 , percentage1 ];
    const HSC = [id , "6" , "hsc" , hsc , py2 , percentage2 ];
    const BE =  [id , "6" , "bechlor" , bechlor, py3 , percentage3 ];
    const ME =  [id , "6" , "master" ,  master , py4 , percentage4 ];
  
    let sql = "insert into educationDetail(candId , sId , degree , coursename , passingYear , percentage) values (?) ";

  
  
    if(master){
      sql += " , (?) , (?) , (?)";  
    }
    else if(bechlor){
      sql += " , (?) , (?)";
    }
    else{
      sql += " , (?)";
    }
  
    let result;
    if(master){
      [result] = await connection.query(sql , [SSC , HSC , BE , ME]);
    }
    else if(bechlor){
      [result] = await connection.query(sql , [SSC , HSC , BE]);
    }
    else{
      [result] = await connection.query(sql , [SSC , HSC]);
    }
    return result;
}
const preferenceDetails = async(req , res , id) => {
    const { location , np , expected , curr , dept } = req.body;
  // console.log(id)
    let sql = "insert into preferenceDetails (candId , sId ,  location , noticePeriod , expectedCtc , currCtc , deptName) values (?)";
  
    let values = [id , "6" , location , np , Number(expected) , Number(curr) , dept ];
  
    let [result] = await connection.query(sql , [values]);
  
    return result;
}
const workDetails = async(req , res , id) => {
    // const { company1 , company2 , company3 , designation1 , designation2 , designation3 , from1 , from2 , from3 , to1 , to2 , to3 } = req.body;
  
    const { company , designation , from , to } = req.body;
  
    let result;
  
    let sql = "insert into workExperience(candId , companyName , designation , startDate , endDate) values (?)";
  
    for(let i=0 ; i<company.length ; i++){
     if(company[i] != "" && designation[i] != "" && from[i] != "" && to[i] != ""){
  
      let values = [id , company[i] , designation[i] , new Date(from[i]) , new Date(to[i])];
      [result] = await connection.query(sql , [values]);
  
     }
    }
  
    return result;
  
}
const refDetails = async(req ,res , id) => {  
    // const { name1 , name2 , contact1 , contact2 , relation1 , relation2 } = req.body;
    const { name , contact , relation } = req.body;
  
    let result;
  
    let sql = "insert into refDetails (candId , refName , refContact , refRelation) values (?)";
  
    for(let i=0 ; i<name.length ; i++){
      if(name[i] != "" && contact[i] != "" && relation[i] != ""){
        let val = [id , name[i] , contact[i] , relation[i]];
  
        [result] = await connection.query(sql , [val]);
      }
    }
    return result;
 
}
const langDetails = async(req , res , id) => {
    const { hindi , hindiLang , english , englishLang , gujarati , gujaratiLang } = req.body;
  
    let sql = "insert into languageDetails (candId , sId , langName , canRead , canWrite , canSpeak) values (?)";
  
    let hindiData = [id , "6" , hindi , 
      hindiLang?.includes("read") ? true : false ,  
      hindiLang?.includes("write") ? true : false , 
      hindiLang?.includes("speak") ? true : false 
    ];
  
    let englishData = [id , "6" , english , 
      englishLang?.includes("read") ? true : false ,  
      englishLang?.includes("write") ? true : false , 
      englishLang?.includes("speak") ? true : false 
    ];
  
    let gujaratiData = [id , "6" , gujarati , 
      gujaratiLang?.includes("read") ? true : false ,  
      gujaratiLang?.includes("write") ? true : false , 
      gujaratiLang?.includes("speak") ? true : false 
    ];
  
    let result;
    let data = [hindiData , englishData , gujaratiData];
  
    for(let i=0 ; i<data.length ; i++){
      if(!data[i].includes(undefined)){
        [result] = await connection.query(sql , [data[i]]);
      }
    }
  
    return result; 
}
const techDetails = async(req , res , id) => {
    const { php1 , phptech , laravel1 , laraveltech , mysql1 , mysqltech , oracle1 , oracletech } = req.body;
  
    // let values = [ php1 , phptech , mysql1 , mysqltech , laravel1 , laraveltech , oracle1 , oracletech ];
  
    let sql = "insert into techKnown(candId , sId , techName , level) values (?)";
  
    let result;
    let phpData , mysqlData , laravelData , oracleData;
    if(php1 && phptech){
      phpData = [id , "6" , php1 , phptech];
    }
    if(mysql1 && mysqltech){
      mysqlData = [id , "6" , mysql1 , mysqltech];
    }
    if(laravel1 && laraveltech){
      laravelData = [id , "6" , laravel1 , laraveltech];
    }
    if(oracle1 && oracletech){
      oracleData = [id , "6" , oracle1 , oracletech];
    }
  
    let data = [phpData , mysqlData , laravelData , oracleData];
    console.log(phpData , mysqlData , laravelData , oracleData)
  
    for(let i=0 ; i<data.length ; i++){
      if(Array.isArray(data[i])){
        [result] = await connection.query(sql , [data[i]]);
      }
    }
    return result;
}

let arr = [candidateDetails , eduDetails , workDetails , langDetails , techDetails , refDetails , preferenceDetails];


prev.style.visibility = 'hidden';

console.log(form.children);

let i=0;


var route = window.location.pathname;
// console.log(route)
// route = route.split("/")
// console.log(route[2])

next.addEventListener('click' , async function(e){
    e.preventDefault();

    if(next.classList.contains("submit")){
        // console.log(route)

        if(ValidateForm()){
            const data = new URLSearchParams();

            for(const pair of new FormData(form)){
                data.append(pair[0] , pair[1]);
            }
            console.log("vikram")

         
            // ---> Create User
            if(route == "/ajax/send"){
                console.log(`http://localhost:4000${route}`)
                // alert()
                let d = await fetch(`http://localhost:4000${route}` , {
                    method:"POST",
                    body:data,
                    headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                });    
                window.location.href = "http://localhost:4000/ajax/users";
            }
            else{
                // ----> Update
                console.log(route)
                // console.log(route[2])
                // // route = route.split("/");
                // // console.log(route[1])
                // route = route.split("/")
                console.log(`fghjhttp://localhost:4000${route}`)

                let d = await fetch(`http://localhost:4000${route}` , {
                    method:"POST",
                    body:data,
                    headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                });  

                // if(d.success){
                    window.location.href = "http://localhost:4000/ajax/users";

                    let msg =  document.querySelector('.msg');
                    msg.innerHTML = "Data Updated Successfully"
                // }

                // console.log(d.body);
            }
          
            // let d = await fetch("http://localhost:8080/send" , {
            //     method:"POST",
            //     body:data,
            //     headers: { 'Content-Type' : 'application/x-www-form-urlencoded' }
            // });

            // console.log(await d.json());

            // form.children.item(i).style.display = "none";
            // form.reset();
            // next.value = 'next';
            // prev.style.visibility = 'hidden';
            // i = 0;
        }
    }

    if(getComputedStyle(prev).visibility == "hidden"){
        prev.style.visibility = "visible";
    }


    if(i < form.children.length-2){
     
        form.children.item(i).style.display = "none";
        i = i + 1;
        form.children.item(i).style.display = "block";
    }

    if(i == form.children.length-2){
        next.value = 'submit';
        next.classList.add("submit");
    }


});

prev.addEventListener('click' , function(e){
    e.preventDefault();

    if(i > 0){
        if(next.value == 'submit'){
            next.value = 'next';
            next.classList.remove('submit');
        }
        form.children.item(i).style.display = 'none';
        i = i - 1;
        form.children.item(i).style.display = 'block';
    }


    if(i == 0){
        prev.style.visibility = 'hidden';  
    }
    // else{
    //     prev.style.visibility = 'visible';  
    // }
});



