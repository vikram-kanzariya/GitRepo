const connection = require('../../connection');

exports.getSearchbar = async(req , res)=>{
    let [result] = await connection.query("select count(*) as totalRecord from studentMaster;");
    let totalRecord = result[0].totalRecord;

    let recordShown = 100;
    let lastPage = Math.floor(totalRecord / recordShown) + 1;
    let page = Number(req.query.page) || 1;
    let orderBy = req.query.orderBy || 'sid';

    let offset = page - 1 >= 0 ? page-1:0;
    offset = offset * recordShown;

    // let offset = 0;
    // if(page - 1 >= 0){
    //     offset = (page-1) * recordShown;
    // }

    let id = req.body.id;
    let fname = req.body.fname;
    let lname = req.body.lname;


    let sql = ("select * from studentMaster where fname like '%"+fname+"%' and '%"+lname+"%';");
    
      [result] = await connection.query(sql , [offset , recordShown])
            // console.log(result)
    res.render('Search/input' , { students :result , fname , lname , id , page , offset , lastPage , totalRecord , recordShown , orderBy});
};

exports.getSearch = async(req , res)=>{
    let [result] = await connection.query("select count(*) as totalRecord from studentMaster;");

    let recordShown = 200;
    let orderBy = req.query.orderBy || 'sid';
    let order = req.query.order || 'ASC';
    let totalRecord = result[0].totalRecord;
    let lastPage = Math.floor(totalRecord / recordShown);

    let field1 = `select * from studentMaster order by ${orderBy} ${order} limit ? , ?`;

    let page = Number(req.query.page) || 1;

    if(page - 1 >= 0){
        offset = page-1;
    }
    else{
        offset = 0;
    }
    offset = offset * recordShown;

    // Query Runs here
    [result] = await connection.query( field1 , [offset , recordShown]);

    return res.render('Search/student' , { students:result , page:page , totalRecord ,  lastPage:lastPage  , orderBy , field1 , order })

};

exports.postData = async(req , res)=>{

    let [result] = await connection.query("select count(*) as totalRecord from studentMaster;");
    let totalRecord = result[0].totalRecord;

    let id = req.body.id;
    let fname = req.body.fname;
    let lname = req.body.lname
    let city = req.body.city

    // res.cookie(cv , {fname , lname } , { httpOnly:true });

    // console.log({id , fname , lname});

    if(!id && (!fname || !lname || !city)){
        res.send('please Enter all data ');
    }

    if(id){

        let recordShown = 100;
        let page = Number(req.query.page) || 1;
        let orderBy = req.query.orderBy || 'sid';
    
        let offset = page - 1 >= 0 ? page-1:0;
        offset = offset * recordShown;


        id = id.split(",");

        for(let i=0 ; i<id.length ; i++){
            id[i] = Number(id[i]);
        }

        let [result] = await connection.query(`select * from studentMaster where sid in (?)` , [id]);

        let total = result.length;
        let lastPage = Math.floor(total / recordShown) + 1;
        
        return res.render('Search/student' , {students:result , page , total , totalRecord , offset , lastPage ,orderBy})
    }
    
    else{

        // let id = req.body.id;
        let fname = req.body.fname;
        let lname = req.body.lname
        let city = req.body.city
    
        // console.log(fname , lname)

        let [result] = await connection.query("select count(*) as totalRecord from studentMaster;");
        let totalRecord = result[0].totalRecord;

        // console.log(result)

        let recordShown = 100;
        let page = Number(req.query.page) || 1;
        let orderBy = req.query.orderBy || 'sid';
    
        let offset = page - 1 >= 0 ? page-1:0;
        offset = offset * recordShown;
    

        [result] = await connection.query(`select * from studentMaster where fname like '%${fname}%' and  lname like '%${lname}%' and city like '%${city}' limit ? , ?` , [offset , recordShown]);
        let total = result.length;
        let lastPage = Math.floor(total / recordShown) + 1;


        console.log(total)

        return res.render('Search/student' , {students:result , page , total , totalRecord , offset , lastPage ,orderBy})
    }
  
};

exports.getData = async(req , res)=>{
    // const PageCount = 100;
  let [result] = await connection.query("select count(*) as totalRecord from studentMaster;");
  let totalRecord = result[0].totalRecord;

  let recordShown = 100;

  let orderBy = req.query.orderBy || 'sid';
  let order = req.query.order || 'ASC';


  let lastPage = Math.floor(totalRecord / recordShown);

  // let sql = "select * from studentMaster limit ? , ?;";
  let field1 = `select * from studentMaster order by ${orderBy} ${order} limit ? , ?`;

  let page = Number(req.query.page) || 1;

  if(page - 1 >= 0){
      offset = page-1;
  }
  else{
      offset = 0;
  }
  offset = offset * recordShown;


  // Query Runs here
  [result] = await connection.query( field1 , [offset , recordShown]);
  // [result] = await connection.query(field2 , [orderBy , offset , recordShown]);

  return res.render('Search/student' , { students:result , page:page , lastPage:lastPage  , orderBy , field1 , order })
};
