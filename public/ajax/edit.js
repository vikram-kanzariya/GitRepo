async function getData(){
  let route = window.location.pathname;
console.log(route)
  route = route.split("/");
  console.log(route[3])
  console.log(`http://localhost:4000/ajax/update/${route[3]}`);
  // route[1] = "user";
  // route = route.join("/");
  // console.log(route[2])


  // console.log(route)
  if(route !== "/"){
    // let details = await fetch(`http://localhost:4000/user/${route}` , {
    let details = await fetch(`http://localhost:4000/ajax/user/${route[3]}` , {
      method:"GET", 
      headers: { 'Content-Type' : 'application/json' },
    });

    details = await details.json();
    // console.log(details);
    putData(details);
  }
}
getData();

function putData(details){
  // console.log(data)
  
  // ---> Basic Details <---
  document.getElementById('candId').value = details.data.candId;

  document.getElementById('fname').value = details.data.fname;
  document.getElementById('lname').value = details.data.lname;
  document.getElementById('desg').value = details.data.designation;
  document.getElementById('email').value = details.data.email;
  document.getElementById('add1').value = details.data.add1;
  document.getElementById('add2').value = details.data.add2;
  document.getElementById('add2').value = details.data.add2;
  document.getElementById('no').value = details.data.phoneNo;
  document.getElementById('city').value = details.data.city;
  document.getElementById('state').value = details.data.state;
  document.getElementById('state').value = details.data.state;
  document.getElementById('rs').value = details.data.relationshipStatus;
  document.getElementById('zip').value = details.data.zipcode;
  document.getElementById('dob').value = details.data.dob;

 
  let male = document.getElementById('male');
  let female = document.getElementById('female') 
  let other = document.getElementById('other');

  if(details.data.gender == "male"){
    male.setAttribute("checked" , 'true');
  }
  if(details.data.gender == "female"){
    female.setAttribute("checked" , 'true');
  }
  if(details.data.gender == "other"){
    other.setAttribute("checked" , 'true');
  }


  // ---> Education Details <---
  document.getElementById('ssc').value = details.edu[0].coursename;
  document.getElementById('py1').value = details.edu[0].passingYear;
  document.getElementById('percentage1').value = details.edu[0].percentage;

  document.getElementById('hsc').value = details.edu[1].coursename;
  document.getElementById('py2').value = details.edu[1].passingYear;
  document.getElementById('percentage2').value = details.edu[1].percentage;

  document.getElementById("bechlor").value = details.edu[2].coursename;
  document.getElementById("py3").value = details.edu[2].passingYear;
  document.getElementById("percentage3").value = details.edu[2].percentage;

  document.getElementById("master").value = details.edu[3].coursename;
  document.getElementById("py4").value = details.edu[3].passingYear;
  document.getElementById("percentage4").value = details.edu[3].percentage;

//  ---> Work-Experience <---
// document.getElementById("company1").value = details.work[0].companyName;
// document.getElementById("desgination1").value = details.work[0].designation;
// document.getElementById("from1").value = details.work[0].startDate;
// document.getElementById("to1").value = details.work[0].endDate;


let companydetails = document.querySelector(".companydetails");

companydetails.innerHTML = "";

if(details.work.length > 0){

  details.work.forEach((data) => {
    let company = document.createElement("div");
    company.classList.add("company");

    company.innerHTML = `
        <table>
        <tr>
        <td>
            <label for="company">Company Name: </label>
            <input type="text" name="company[]" class="compnay" value="${data.companyName}">

            <label for="designation">Designation: </label>
            <input type="text" name="designation[]" value="${data.designation}">

            <label for="from">from</label>
            <input type="text" name="from[]" value="${data.startDate}">

            <label for="to">to</label>
            <input type="text" name="to[]" value="${data.endDate}">
            <input type="hidden" name="workid[]" value="${data.workId}">

            <br><br>
        </td>
    </tr>
    </table>
    `;

    // console.log(details)
    companydetails.appendChild(company);
  })
}
// ---> Reference Details <---

let refDetails = document.querySelector('.ref-data');
refDetails.innerHTML = "";

if(details.ref.length > 0){
  details.ref.forEach((data) => {
    let reference = document.createElement('div');
    reference.classList.add("reference");

    reference.innerHTML = `
    <table>
    <tr>
        <td rowspan="2">
            <label for="name">Name: </label>
            <input type="text" name="name[]" id="name1" value="${data.refName}">
    
            <label for="contact">Contact Number: </label>
            <input type="text" class="contact" name="contact[]" id="contact1" value="${data.refContact}">
    
            <label for="relation">Relation: </label>
            <input type="text" name="relation[]" id="relation1" value="${data.refRelation}"> 
            <input type="hidden" name="refid[]" value="${data.refid}">

            <br><br>
        </td>
    </tr>
</table>
    `;
    refDetails.appendChild(reference)
  });
}


// ---> Preference Details <---
document.getElementById('location').value = details.preference.location;
document.getElementById('np').value = details.preference.noticePeriod;
document.getElementById('expected').value = details.preference.expectedCtc;
document.getElementById('curr').value = details.preference.currCtc;

document.getElementById('dept').value = details.preference.deptName;



// ---> Language Details <---
  // document.getElementById('hindi').value = details.language.langName.checked;
  let hindi = document.getElementById('hindi');
  let english = document.getElementById('english');
  let gujarati = document.getElementById('gujarati');

  details.language.forEach((lang) => {
    if(lang.langName == "hindi"){
      // console.log(lang)
      // console.log(lang.langName)
      let hin = document.getElementsByName("hindiLang");

      lang.canRead? hin[0].setAttribute("checked" , true) : "";
      lang.canWrite? hin[1].setAttribute("checked" , true) : "",
      lang.canSpeak? hin[2].setAttribute("checked" , true) : "";
      hindi.setAttribute('checked' , true);
    }
    else if(lang.langName == "english"){
      let eng = document.getElementsByName("englishLang");

      lang.canRead? eng[0].setAttribute("checked" , true) : "";
      lang.canWrite? eng[1].setAttribute("checked" , true) : "",
      lang.canSpeak? eng[2].setAttribute("checked" , true) : "";
      english.setAttribute('checked' , true); 
    }
    else{
      let guj = document.getElementsByName("gujaratiLang");

      lang.canRead? guj[0].setAttribute("checked" , true) : "";
      lang.canWrite? guj[1].setAttribute("checked" , true) : "",
      lang.canSpeak? guj[2].setAttribute("checked" , true) : "";
      gujarati.setAttribute('checked' , true);
    }
  });


  // ---> Technology Details  <----
  let php = document.getElementById('php');
  let mysql = document.getElementById('mysql')
  let laravel = document.getElementById('laravel')
  let oracle = document.getElementById('oracle');


  details.tech.forEach((tc) => {
    if(tc.techName == "php"){
      let phpData = document.getElementsByName("phptech");

      if(tc.level == "beginer"){
        phpData[0].setAttribute("checked" , true)
      }
      else if(tc.level == "mediator"){
        phpData[1].setAttribute("checked" , true);
      }
      else{
        phpData[2].setAttribute("checked" , true); 
      }

      php.setAttribute("checked" , true);
    }

    else if(tc.techName == "mysql"){
      let sqlData = document.getElementsByName("mysqltech");
      mysql.setAttribute("checked" , true);

      if(tc.level == "beginer"){
        sqlData[0].setAttribute("checked" , true);
      }
      else if(tc.level == "mediator"){
        sqlData[1].setAttribute("checked" , true);
      }
      else{
        sqlData[2].setAttribute("checked" , true); 
      }
    }

    else if(tc.techName == "laravel"){
      let laravelData = document.getElementsByName("laraveltech");
      laravel.setAttribute("checked" , true);

      if(tc.level == "beginer"){
        laravelData[0].setAttribute("checked" , true);
      }
      else if(tc.level == "mediator"){
        laravelData[1].setAttribute("checked" , true);
      }
      else{
        laravelData[2].setAttribute("checked" , true); 
      }
    }

    else{
      let oracleData = document.getElementsByName("oracletech");
      oracle.setAttribute("checked" , true);

      if(tc.level == "beginer"){
        oracleData[0].setAttribute("checked" , true);
      }
      else if(tc.level == "mediator"){
        oracleData[1].setAttribute("checked" , true);
      }
      else{
        oracleData[2].setAttribute("checked" , true); 
      }
    }
  });

}
