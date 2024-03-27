
const validateEmail = (email) => {
    return email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
};


    // const date = new Date("2012/2/30");
    
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

        var bechlor = document.getElementById('bechlor').value;
        var be = document.getElementById('be').value;
        var py3 = document.getElementById('py3').value;
        var percentage3 = document.getElementById('percentage3').value;

        var master = document.getElementById('master').value;
        var me = document.getElementById('me').value;
        var py4 = document.getElementById('py4').value;
        var percentage4 = document.getElementById('percentage4').value;

    
        if(ssc == "" || py1 == "" || percentage1 == "" || hsc == "" || py2 == "" || percentage2 == "" || bechlor == "" || be == "" || py3 == "" || percentage3 == ""){
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
        var company1 = document.getElementById('company1').value;
        var desgination1 = document.getElementById('desgination1').value;

        var compan2 = document.getElementById('company2').value;
        var desgination2 = document.getElementById('desgination2').value;

        var company3 = document.getElementById('company3').value;
        var desgination3 = document.getElementById('desgination3').value;

        var from1 = document.getElementById('from1').value;
        var to1 = document.getElementById('to1').value;
        var from2 = document.getElementById('from2').value;
        var to2 = document.getElementById('to2').value;
        var from3 = document.getElementById('from3').value;
        var to3 = document.getElementById('to3').value;
        var workErr = document.getElementById('workErr');

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