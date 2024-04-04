const connection = require('../../connection');


exports.getAttendance = async (req, res) => {
    try {
        let [result] = await connection.query("select count(*) as totalRecord from studentMaster;");

        let recordShown = 50;

        let filter = req.query.filter || '2023-12-31';

        let totalRecord = result[0].totalRecord;

        let lastPage = Math.floor(totalRecord / recordShown) + 1;
        let dt = filter.split("-");

        let sql = `select studentMasterr.sid , studentMasterr.name , count(attendance.present) as present  from studentMasterr left join attendance on studentMasterr.sid = attendance.sid  where attendance.present = 1 and attendance.dateof BETWEEN '${dt[0]}-${dt[1]}-01' and '${dt[0]}-${dt[1]}-${dt[2]}' group by studentMasterr.sid , attendance.present order by studentMasterr.sid limit ? , ?;`;

        let page = Number(req.query.page) || 1;

        let offset = page - 1 >= 0 ? page - 1 : 0;
        offset = offset * recordShown;

        [result] = await connection.query(sql, [offset, recordShown]);

        return res.render('attendance/attendance', { students: result, page: page, lastPage: lastPage, days: Number(dt[2]), month: Number(dt[1]), filter: filter, offset, recordShown, totalRecord });
    } catch (error) {
        console.log(new Error(error));
    }
};
