const connection = require('../../connection');


exports.getResult = ("/result" , async(req , res)=>{
    // res.send("Hello World")
 
    let [result] = await connection.query("select count(*) as totalRecord from studentMasterr;");
    let recordtoShow = 50;
    let totalRecord = result[0].totalRecord;
    let lastPage = Math.ceil(totalRecord / recordtoShow) ;
 
    let page = Number(req.query.page) || 1;
    let offset = page-1 >= 0 ? page-1 : 0;
    offset = offset * recordtoShow;
 
 
    let sql2 = `select s.sid , s.name ,
    sum(case when e.examType = 1 then e.practicallObtained else 0 end) as terminalPractical,
    sum(case when e.examType = 1 then e.theoryObtained else 0 end) as terminalTheory,
    sum(case when e.examType = 2 then e.practicallObtained else 0 end) as prelimPractical,
    sum(case when e.examType = 2 then e.theoryObtained else 0 end) as prelimTheory,
    sum(case when e.examType = 3 then e.practicallObtained else 0 end) as finalPractical,
    sum(case when e.examType = 3 then e.theoryObtained else 0 end) as finalTheory,
    sum(e.theoryObtained + e.practicallObtained)as Total
    from studentMasterr as s inner join Result as e on s.sid = e.sid group by s.sid limit ? , ?`;
 
    [result] = await connection.query(sql2 , [offset , recordtoShow]);
 
    return res.render('result/resultdata' , { students:result , page:page , lastPage:lastPage , offset , totalRecord , recordtoShow });
 });
 
 
 // click "View" to Get Student Data after
 exports.getResultById = ("/result/:id" , async(req , res)=>{
 
    let sql3 = `select s.sid , s.name , sb.subName , e.examName , r.theoryObtained , r.practicallObtained from studentMasterr as s 
    inner join 
    Result as r on s.sid = r.sid 
    inner join 
    examTypes as e on r.examType = e.examType
    inner join
    subjectMaster as sb on sb.subid = r.subid where s.sid = ?;`;
 
    let [result] = await connection.query(sql3 , [Number(req.params.id)]);
    let data = result;
 
    const result1 = Object.values(data.reduce((acc , {'sid' : sid , 'name' : name , subName , examName , theoryObtained , practicallObtained }) =>{
       acc[sid] ??= { sid , name , terminal:[] , prelim:[] , final:[] };
 
       let data1 = { examName , subName , theoryObtained , practicallObtained };
 
       if(examName === 'terminal'){
          acc[sid].terminal.push(data1);
       }
       else if(examName === 'prelims'){
          acc[sid].prelim.push(data1);
       }
       else{
          acc[sid].final.push(data1);
       }
 
       return acc;
    } , {} ));
 
    // console.log(result);
 
   let sql = `select count(sid) as present , date_format(dateof , '%Y-%m') as month , date_format(LAST_DAY(dateof) , '%d') as lastdate from attendance where sid = ? and present = 1 group by month , lastdate;`;
 
   [result] = await connection.query(sql , [Number(req.params.id)]);
   let attendances = result;
 
   return res.render('result/marks' , { result:result1 , attendances });
 });
 