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


// let i=0;
prev.style.visibility = 'hidden';

// console.log(form.children);
console.log(form.firstElementChild)

let i=0;

next.addEventListener('click' , function(e){
    e.preventDefault();

    if(next.classList.contains("submit")){
        if(validate()){
            const data = new URLSearchParams();

            for(const pair of new FormData(form)){
                data.append(pair[0] , pair[1]);
            }

        }
    }


    if(i == form.children.length-2){
        next.classList.add("submit");
        next.value = 'submit';
    }
    else{
        form.children.item(i).style.display = "none";
        i = i + 1;
        form.children.item(i).style.display = "block";
    }

    if(i == 0){
        prev.style.visibility = 'hidden';  
    }
    else{
        prev.style.visibility = 'visible';  
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
    else{
        prev.style.visibility = 'visible';  
    }
});