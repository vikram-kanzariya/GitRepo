const express = require('express');
const connection = require('../../connection');

exports.getSearch = async (req, res) => {

    let sql = "select * from studentMaster limit 1000;";

    let [result] = await connection.query(sql);
    res.render('delimited/student', { students: result });
};


exports.postSearch = async (req, res) => {
    try {

        let fname = [], lname = [], phoneNo = [], address = [], city = [];
        // str = "_vikram^kanzariya}9265645799{halvad:kharivadi";
        let str = req.body.data?.trim();


        // split string and add data into arrays 
        let i = 0;
        while (i < str.length) {
            if (str[i] == '_') {
                let val = "";
                i++;
                while (str[i] !== '_' && str[i] !== '^' && str[i] !== '}' && str[i] !== '{' && str[i] !== ':' && i < str.length) {
                    val += str[i];
                    i++;
                }
                fname.push(val);
                // console.log(fname);
                continue;
            }

            if (str[i] == '^') {
                let val = "";
                i++;
                while (str[i] !== '_' && str[i] !== '^' && str[i] !== '}' && str[i] !== '{' && str[i] !== ':' && i < str.length) {
                    val += str[i];
                    i++;
                }
                lname.push(val);
                continue;
            }

            if (str[i] == '}') {
                let val = "";
                i++;
                while (str[i] !== '_' && str[i] !== '^' && str[i] !== '}' && str[i] !== '{' && str[i] !== ':' && i < str.length) {
                    val += str[i];
                    i++;
                }

                phoneNo.push(val);
                continue;
            }

            if (str[i] == '{') {
                let val = "";
                i++;
                while (str[i] !== '_' && str[i] !== '^' && str[i] !== '}' && str[i] !== '{' && str[i] !== ':' && i < str.length) {
                    val += str[i];
                    i++;
                }
                city.push(val);
                continue;
            }

            if (str[i] == ':') {
                let val = "";
                i++;
                while (str[i] !== '_' && str[i] !== '^' && str[i] !== '}' && str[i] !== '{' && str[i] !== ':' && i < str.length) {
                    val += str[i];
                    i++;
                }
                address.push(val);
                continue;
            }
            i++;
        }

        let sql = `select * from studentMaster where `;

        fname = fname.filter((data) => data !== "");
        lname = lname.filter((data) => data !== "");
        phoneNo = phoneNo.filter((data) => data !== "");
        city = city.filter((data) => data !== "");
        address = address.filter((data) => data !== "");


        if (fname.length > 0) {
            if (fname.length == 1) {
                sql += `fname like '%${fname[0]}%' and `;
            }
            else {
                sql += "(";
                for (let j = 0; j < fname.length; j++) {
                    if (j + 1 < fname.length) {
                        sql += `fname like '%${fname[j]}%' OR `
                    }
                    else {
                        sql += `fname like '%${fname[j]}%') AND `;
                    }
                }
            }
        }

        if (lname.length > 0) {
            if (lname.length == 1) {
                sql += `lname like '%${lname[0]}%' AND `;
            }
            else {
                sql += "(";
                for (let j = 0; j < lname.length; j++) {
                    if (j + 1 < lname.length) {
                        sql += `lname like '%${lname[j]}%' OR `
                    }
                    else {
                        sql += `lname like '%${lname[j]}%') AND `;
                    }
                }
            }
        }

        if (phoneNo.length > 0) {
            if (phoneNo.length == 1) {
                sql += `phoneNo like '%${phoneNo[0]}%' AND `;
            }
            else {
                sql += "(";
                for (let j = 0; j < phoneNo.length; j++) {
                    if (j + 1 < phoneNo.length) {
                        sql += `phoneNo like '%${phoneNo[j]}%' OR `
                    }
                    else {
                        sql += `phoneNo like '%${phoneNo[j]}%') AND `;
                    }
                }
            }
        }

        if (address.length > 0) {
            if (address.length == 1) {
                sql += `address like '%${address[0]}%' AND `;
            }
            else {
                sql += "(";
                for (let j = 0; j < address.length; j++) {
                    if (j + 1 < address.length) {
                        sql += `address like '%${address[j]}%' OR `
                    }
                    else {
                        sql += `address like '%${address[j]}%') AND `;
                    }
                }
            }
        }

        if (city.length > 0) {
            if (city.length == 1) {
                sql += `city like '%${city[0]}%' and `;
            }
            else {
                sql += "(";
                for (let j = 0; j < city.length; j++) {
                    if (j + 1 < city.length) {
                        sql += `city like '%${city[j]}%' OR `
                    }
                    else {
                        sql += `city like '%${city[j]}%') and `;
                    }
                }
            }
        }

        sql += 'true limit 1000';

        let [result] = await connection.query(sql);
        let total = result.length;
        res.render('delimited/student', { students: result })

    } catch (error) {
        console.log(new Error(error))
    }
};
