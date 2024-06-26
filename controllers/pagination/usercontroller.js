const connection = require('../../connection');

exports.getGrid =  async(req , res)=>{
    let [result] = await connection.query("select count(*) as totalRecord from studentMaster;");

    let recordShown = 100;

    let orderBy = req.query.orderBy || 'sid';
    let order = req.query.order || 'ASC';

    let totalRecord = result[0].totalRecord;

    let lastPage = Math.floor(totalRecord / recordShown);

    let field1 = `select * from studentMaster order by ${orderBy} ${order} limit ? , ?`;

    let page = Number(req.query.page) || 1;

    // ---> Ternary Operator <---
    // let offset = page - 1 >= 0 ? page-1:0;
    // offset = offset * recordShown;

    if(page - 1 >= 0){
        offset = page-1;
    }
    else{
        offset = 0;
    }
    offset = offset * recordShown;

    [result] = await connection.query( field1 , [offset , recordShown]);

    return res.render('pagination/student' , { students:result , page:page , lastPage:lastPage  , orderBy , field1 , order })
};
