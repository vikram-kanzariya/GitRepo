const connection = require('../../connection');

exports.getData = (req, res) => {
    res.render('dynamicgrid/input', { data: [] });
};


exports.allData = (async (req, res) => {
    try {
        let recordtoShow = 50;
        let sql = req.body.query;

        if (!sql) {
            return res.render('dynamicgrid/input', { page: 1, data: [], lastPage: null });
        }

        sql = sql.split(';')[0];

        let [result] = await connection.query(`select count(*) as total from (${sql}) as sm`);

        let totlRecord = result[0].total;

        let page = Number(req.query.page) || 1;
        let lastPage = Math.floor(totlRecord / recordtoShow) + 1;
        let offset = page - 1 >= 0 ? page - 1 : 0;
        offset = offset * recordtoShow;

        let query = sql;
        query = query + ` limit ? , ?`;

        [result] = await connection.query(query, [offset, recordtoShow]);

        return res.cookie(`query`, sql).render('dynamicgrid/input', { data: result, page, lastPage, offset, totlRecord, sql, field: 1 });
    } catch (error) {
        console.log(new Error(error));
    }
});