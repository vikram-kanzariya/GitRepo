const connection = require('../../connection');

const validateEmail = (email) => {
    return email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
  };
function isValidDate(stringDate) {
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
    return regex.test(stringDate);
  }
  
  
const candidateDetails = async(req , res) => {
    const { fname , lname , email , add1 , add2 , city , desg , no , state , gender , rs , zip , dob } =  req.body;
  
    let values = [
      fname , lname , email , add1 , add2 , city , desg , no , state , gender , rs , zip , new Date(dob) 
    ];
  
    let sql = "insert into candidateDetail ( fname , lname , email , add1 , add2 , city , designation , phoneNo , state , gender , relationshipStatus , zipcode , dob ) values (?) ";
  
    let [result] = await connection.query(sql , [values]);
  
    let id = result.insertId;
  
    return id;
  }
const updateCandidate = async(req , res , id) => {
    const { fname , lname , email , add1 , add2 , city , desg , no , state , gender , rs , zip , dob } =  req.body;
  
    let obj = {
      "fname":fname , 
      "lname":lname , 
      "email":email , 
      "add1":add1 , 
      "add2":add2 , 
      "city":city , 
      "designation":desg , 
      "phoneNo":no , 
      "state":state , 
      "gender":gender , 
      "relationshipStatus":rs , 
      "zipcode":zip , 
      "dob":new Date(dob),
    }
  
    let sql = "update candidateDetail set ? where candId = ?";
  
    let [result] = await connection.query(sql , [obj , id]);
  
    return result;
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
const updateEducation = async(req , res , id) => {
    const { ssc , hsc , bechlor , master , py1 , py2 , py3 , py4 , percentage1 , percentage2 , percentage3 , percentage4 } = req.body;
  
    let sql = "update educationDetail set ? where degree = ? and candId = ?";
  
    let result;
    let sscData = {
          "coursename":ssc,
          "passingYear":py1,
          "percentage":percentage1
        };
  
    let hscData = {
          "coursename":hsc,
          "passingYear":py2,
          "percentage":percentage2
        };
  
    let bechlorData = {
          "coursename":bechlor,
          "passingYear":py3,
          "percentage":percentage3
        };
  
    let masterData = {
          "coursename":master,
          "passingYear":py4,
          "percentage":percentage4
        };
  
        let arr = [sscData , hscData , bechlorData , masterData];
        let degree = ["ssc" , "hsc" , "bechlor" , "master"];
  
        for(let i=0 ; i<arr.length ; i++){
          if(degree[i].includes("ssc") || degree[i].includes("hsc")  || !Object.values(arr[i]).includes("")){
            [result] = await connection.query(sql , [arr[i] , degree[i] , id]);
          }
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
  
const updatePreference = async(req , res , id) => {
    const { location , np , expected , curr , dept } = req.body;
  
    let sql = "update preferenceDetails set ? where candId = ?";
  
    // let values = [id , "6" , location , np , Number(expected) , Number(curr) , dept ];
    let val = { "location":location , "noticePeriod":np , "expectedCtc":expected , "currCtc":curr , "deptName":dept }
  
    let [result] = await connection.query(sql , [val , id]);
  
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
    // if(company3){
    //   sql += " , (?) , (?)";
    // }
    // else if(company2){
    //   sql += " , (?)";
    // }
  
    // let comp1 = [id , company1 , designation1 , from1 , to1];
    // let comp2 = [id , company2 , designation2 , from2 , to2];
    // let comp3 = [id , company3 , designation3 , from3 , to3];
  
  
    // let comp1 = [id , company[0] , designation[0] , from[0] , to[0]];
    // let comp2 = [id , company[1] , designation[1] , from[1] , to[1]];
    // let comp3 = [id , company[2] , designation[2] , from[2] , to[2]];
  
  
    // let result;
    // if(company3){
    //   [result] = await connection.query(sql , [comp1 , comp2 , comp3]);
    // }
    // else if(comp2){
    //   [result] = await connection.query(sql , [comp1 , comp2]);
    // }
    // else{
    //   [result] = await connection.query(sql , [comp1]);
    // } 
    // return result;
  }
const updateWork = async(req , res , id) => {
    const { workid , company , designation , from , to } = req.body;
    
    let sql = "update workExperience set ? where workId = ?";
    
    let result;
    for(let i=0 ; i<company.length ; i++){
      
      // let values = [id , company[i] , designation[i] , new Date(from[i]) , new Date(to[i])];
      let obj = { "companyName":company[i] , "designation":designation[i] , "startDate":new  Date(from[i]) , "endDate": new Date(to[i])};
      [result] = await connection.query(sql , [obj , workid[i]]);
  
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
    // if(name2){
    //   sql += " , (?)";
    // }
  
    // let ref1 = [id , name1 , contact1 , relation1 ];
    // let ref2 = [id , name2 , contact2 , relation2 ];
    
  
    // if(name2){
    //   [result] = await connection.query(sql , [ref1 , ref2]);
    // }
    // else{
    //   [result] = await connection.query(sql , [ref1]);
    // }
    // return result;
  }
const updateReference = async(req, res , id) => {
    const { refid , name , contact , relation } = req.body;
  
    let result;
  
    let sql = "update refDetails set ? where refid = ?";
  
    for(let i=0 ; i<name.length ; i++){
        let obj = { "refName":name[i] , "refContact":contact[i] , "refRelation": relation[i] };
        // console.log(refid);
        [result] = await connection.query(sql , [obj , refid[i]]); 
    }
    return result;
  }
  
const langDetails = async(req , res , id) => {
    const { hindi , hindiLang , english , englishLang , gujarati , gujaratiLang } = req.body;
  
    let sql = "insert into languageDetails (candId , sId , langName , canRead , canWrite , canSpeak) values (?)";
  
    // if(hindi && english && gujarati){
    //   sql += `, (?) , (?)`;
    // }
    // else if((hindi && english) || (hindi && gujarati) || (english && gujarati)){
    //   sql += ` , (?)`;
    // }
  
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
    // console.log(hindiData , " " ,  englishData , " " , gujaratiData )
  
    // let result;
    // if(hindi && english && gujarati){
    //   [result] = await connection.query(sql , [hindiData , englishData , gujaratiData]);
    // }
    // else if(hindi && english){
    //   [result] = await connection.query(sql , [hindiData , englishData]);
    // }
    // else if(hindi && gujarati){
    //   [result] = await connection.query(sql , [hindiData , gujaratiData]);
    // }
    // else if(english && gujarati){
    //   [result] = await connection.query(sql , [englishData , gujaratiData]);
    // }
    // else if(hindi){
    //   [result] = await connection.query(sql , [hindiData]);
    // }
    // else if(english){
    //   [result] = await connection.query(sql , [englishData]);
    // }
    // else{
    //   [result] = await connection.query(sql , [gujaratiData]);
    // }
    // return result;
  }
const updateLanguage = async(req , res , id) => {
    const {  hindi , hindiLang , english , englishLang , gujarati , gujaratiLang } = req.body;
  
    let sql = "update languageDetails set ? where candId = ? and langName = ?";
  
    // console.log(hindi , english , gujarati);
  
    let result;
  
    if(hindi != undefined){
      let hindiData = { 
        "langName":hindi , 
        "canRead":hindiLang?.includes("read")? true : false ,  
        "canWrite":hindiLang?.includes("write")? true : false , 
        "canSpeak":hindiLang?.includes("speak")? true : false  };
  
        [result] = await connection.query(sql , [hindiData , id , "hindi"]);   
    }
  
   
    if(english != undefined){
      // console.log(english)
      let englishData = { 
        "langName":english , 
        "canRead":englishLang?.includes("read")? true : false ,  
        "canWrite":englishLang?.includes("write")? true : false , 
        "canSpeak":englishLang?.includes("speak")? true : false  };
       
        [result] = await connection.query(sql , [englishData , id , "english"]);
       
    }
  
    if(gujarati != undefined){
      let gujaratiData = { 
        "langName":gujarati , 
        "canRead":gujaratiLang?.includes("read")? true : false ,  
        "canWrite":gujaratiLang?.includes("write")? true : false , 
        "canSpeak":gujaratiLang?.includes("speak")? true : false };
        // console.log(gujaratiData)
  
        [result] = await connection.query(sql , [gujaratiData , id , "gujarati"]);  
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
const updateTech = async(req , res , id) => {
    const { php1 , phptech , laravel1 , laraveltech , mysql1 , mysqltech , oracle1 , oracletech } = req.body;
  
    // console.log(php1 , laravel1 , mysql1 ,oracle1)
    let sql = "update techKnown set ? where candId = ? and techName = ?";
  
    let result;
  
    if(php1 != undefined){
      // console.log(php1)
      let phpData = { "techName":php1 , "level":phptech  };
    
      [result] = await connection.query(sql , [phpData , id , "php"]);  
    }
   
    if(mysql1 != undefined){
      let mysqlData = { "techName":mysql1 , "level":mysqltech  };
      [result] = await connection.query(sql , [mysqlData , id , "mysql"]);
      // console.log(2,result);
    }
   
    if(oracle1 != undefined){
      // console.log(php1)
      let oracleData = { "techName":oracle1 , "level":oracletech  };
    
      [result] = await connection.query(sql , [oracleData , id , "oracle"]);  
    }
   
    if(laravel1 != undefined){
      let laravelData = { "techName":laravel1 , "level":laraveltech  };
      [result] = await connection.query(sql , [laravelData , id , "laravel"]);
      // console.log(4,result);
  
    }  
    return result;
  }
  

let getAllData = async(tableName , id , orderBy) => {
  let sql = `select * from ${tableName} where candId = ? order by ${orderBy}`;

  let [result] = await connection.query(sql , [id]);
  return result;
}
  
exports.getForm = (req , res)=>{
    res.render('JobApp/home' , { data:[] });
};

exports.getUser = async(req , res) => {
    // let id = 106;
    let id = req.params.id;
    let basicData = await getAllData("candidateDetail" , id , "candId");
    let eduData = await getAllData("educationDetail" , id , "candId");
    let preferenceData = await getAllData("preferenceDetails" , id , "candId");
    let referenceData = await getAllData("refDetails" , id , "candId");
    let workData = await getAllData("workExperience" , id , "candId");
    let languageData = await getAllData("languageDetails" , id , "candId");
    let techData = await getAllData("techKnown" , id , "candId");
    
    return res.render('JobApp/edit' , { data:basicData[0] , edu:eduData , preference:preferenceData[0] , ref:referenceData , work:workData, language:languageData , tech:techData });
};

exports.geteditForm = (req , res)=>{
    res.render('JobApp/edit', { data:[]});
};


exports.createUser = async(req , res) =>{
    // ---> Basic Details 
  try {
    const { fname , lname , email , add1 , add2 , city , desg , no , state , gender , rs , zip , dob , ssc , hsc , bechlor , master , py1 , py2 , py3 , py4 , percentage1 , percentage2 , percentage3 , percentage4 , 
      company , designation , from , to , 
      hindi , hindiLang , english , englishLang , gujarati , gujaratiLang , php1 , phptech,   mysql1 , mysqltech , laravel1 , laraveltech , oracle1 , oracletech ,
       name , contact , relation ,
      location , np , expected , curr , dept } = req.body;



    if(!fname || !lname || !email || !add1 || !add2 || !city || !desg || !no || !state || !gender || !rs || !zip || !dob || !ssc || !hsc || !bechlor || !master || !py1 || !py2 || !py3 || !py4 || !percentage1 || !percentage2 || !percentage3 || !percentage4   || !hindi || !hindiLang || !english || !englishLang || !gujarati || !gujaratiLang || !php1 || !phptech ||  !mysql1 || !mysqltech || !laravel1 || !laraveltech || !oracle1 || !oracletech ||

      // (hindi && !hindiLang) || (english && !englishLang) || (gujarati && gujaratiLang) || 
      // (!hindi && hindiLang) || (!english && englishLang) || (!gujarati && gujaratiLang) || 

    !name || !contact || !relation ||
    (name && (!contact || !relation)) || 
    (!name && (contact || relation))

    || !location || !np || !expected || !curr || !dept  

    || !company || !designation || !from || !to || 
    (company && (!designation || !from || !to)) ||
    (!company && (designation || from || to)) || 

    (ssc && (!py1 || !percentage1)) || (!ssc && (py1 | percentage1)) || (hsc && (!py2 ||  !percentage2)) || (!hsc && (py2 || percentage2)) || (bechlor && (!py3 || !percentage3)) || (!bechlor && (py3 || percentage3)) || (master && (!py4 || !percentage4)) || (!master && (py4 || percentage4)) || 
      (master && (!ssc || !hsc || !bechlor)) || (bechlor && (!ssc || !hsc)) ||
      (hsc && !ssc) || (ssc && !hsc) || (master && !bechlor) || 

    (no.length != 10) || (email && !validateEmail(email)) || (zip.length != 6)  ||   
    (mysql1 && !mysqltech) || (!mysql1 && mysqltech) || (php1 && !phptech) || (!php1 && phptech) || (oracle1 && !oracletech) || (!oracle1 && oracletech) || (laravel1 && !laraveltech) || (!laravel1 && laraveltech) || 
    (dob && !isValidDate(dob)) 
    ) 
    {
      console.log("Please Enter All Data poperly...")
      return  res.render('JobApp/home' , {message:'All Fields Are Required...'});
    }


    for(let i=0 ; i<company.length ; i++){
      if( (company[i] && (!designation[i] || !from[i] || !to[i])) || (!company[i] && (designation[i] || from[i] || to[i])) ){
        console.log("Please Enter Company Details Properly...");
       return res.render("JobApp/home");
      }
    }

    for(let i=0 ; i<name.length ; i++){
      if((name[i] && (!contact[i] || !relation[i]))  || (!name[i] && (contact[i] || relation[i])) ){
        console.log("Please Enter ReferenceDetails properly...");
       return res.render("JobApp/home");
      }
    }

    let userId , preference , work , reference , education , language , technology;

    try{
       userId = await candidateDetails(req , res);
    }
    catch(e){
      console.log(e);
     return res.render('JobApp/home'); 
    }

    console.log(userId)

    try{
       preference = await preferenceDetails(req , res , userId);
    }
    catch(e){
      console.log(e);
      return res.render('JobApp/home'); 
    }



    try {
      work = await workDetails(req , res , userId)
    } catch (error) {
        console.log(error);
        return res.render('JobApp/home');
    }
   

    try {
      reference = await refDetails(req , res , userId);
    } catch (error) { 
      console.log(error);
      return res.render('JobApp/home');
    }    

   

   if((ssc && hsc) || (ssc && hsc && bechlor) || (ssc && hsc && bechlor && master) || (ssc && py1 && percentage1) || (hsc && py2 && percentage2) || (bechlor && py3 && percentage3) || (master && py4 && percentage4  )){

    try {
      education = await eduDetails(req , res , userId);
    } catch (error) {
      console.log(error);
      return res.render('JobApp/home');
    }

   }
    

  
   try {
    language = langDetails(req, res , userId);
   } catch (error) {
    console.log(error);
    return res.render('JobApp/home');
   }



   try {
      if((php1 && phptech) || (mysql1 && mysqltech) || (laravel1 && laraveltech) || (oracle1 && oracletech)){
        technology = await techDetails(req, res , userId);
      }

   } catch (error) {
    console.log(error);
    return res.render('JobApp/home');
   }

   return res.redirect('/alluser')
  } 
  catch (error) {
    console.log(new Error(error));
  }
  
};

exports.updateUser = async(req , res) => {
    try {
     const { id , refid , langid ,  workid ,  fname , lname , email , add1 , add2 , city , desg , no , state , gender , rs , zip , dob , ssc , hsc , bechlor , master , py1 , py2 , py3 , py4 , percentage1 , percentage2 , percentage3 , percentage4 , 
       company , designation , from , to , 
       hindi , hindiLang , english , englishLang , gujarati , gujaratiLang , php1 , phptech,   mysql1 , mysqltech , laravel1 , laraveltech , oracle1 , oracletech ,
        name , contact , relation ,
       location , np , expected , curr , dept } = req.body;
   
       if(!fname || !lname || !email || !add1 || !add2 || !city || !desg || !no || !state || !gender || !rs || !zip || !dob || (no.length != 10) || (email && !validateEmail(email)) || (zip.length != 6)  || (fname.length < 4) || (lname.length < 4) || 
  
         !name || !contact || !relation ||
         (name && (!contact || !relation)) || 
         (!name && (contact || relation)) ||
         !location || !np || !expected || !curr || !dept  ||
         (location && (!np || !expected || !curr || !dept))  ||
         (!location && (np || expected || curr || dept)) || (!refid) || (!workid) ||
  
         !hindi || !english || !gujarati || !hindiLang || !englishLang || !gujaratiLang ||
         (hindi && !hindiLang) || (!hindi && hindiLang) || (english && ! englishLang) || (!english && englishLang) || (gujarati && !gujaratiLang) || (!gujarati && gujaratiLang) ||
  
         !company || !designation || !from || !to ||
  
         !php1 || !mysql1 || !laravel1 || !oracle1 ||
         (php1 && !phptech) || (!php1 && phptech) || (mysql1 && !mysqltech) || (!mysql1 && mysqltech) || (oracle1 && !oracletech) || (!oracle1 && oracletech) || (laravel1 && !laraveltech) || (!laravel1 && laraveltech) ||
  
         !ssc || !hsc || !bechlor || !master ||
         (ssc && (!py1 || !percentage1)) || (!ssc && (py1 || percentage1)) ||
         (hsc && (!py2 || !percentage2)) || (!hsc && (py2 || percentage2)) ||
         (bechlor && (!py3 || !percentage3)) || (!bechlor && (py3 || percentage3)) ||
         (master && (!py4 || !percentage4)) || (!master && (py4 || percentage4)) ||
         (ssc && !hsc) || (hsc && !ssc) ||
         (master && (!ssc || !hsc || !bechlor)) || (bechlor && (!ssc || !hsc))
  
        ) 
         {
           console.log("Please Enter All Data poperly...")
           return  res.render('JobApp/edit' , { message:'All Fields Are Required...' });
         }
  
           await updateCandidate(req , res , id);
           await updateReference(req , res , refid);
           await updatePreference(req , res , id);
           await updateWork(req ,res , id);
           await updateLanguage(req , res , id);
           await updateTech(req , res , id);
           await updateEducation(req , res , id);
         
      return res.redirect('/alluser')
    } catch (error) {
       return res.json({
         success:false,
         error:error.message
       });
    }
       
};
  
exports.getAllUsers = async (req, res) => {
  try {
    let sql = "select * from candidateDetail limit 30 offset 140";
    let [result] = await connection.query(sql);

    res.render('JobApp/table', { data: result });
  } catch (error) {
      console.log(new Error(error))
  }
};