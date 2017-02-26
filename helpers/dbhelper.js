"use strict";
const HOST = process.env.HOST || "http://localhost:8080";
let helper = {
    insertOrFind: (db, url, res) => {
        let urls = db.collection('urls');
        //get the number of records to use as the ID.
        urls.count((count_err, id) => {
            if (id) {
                //Attempt to find the url by the original_url field
                urls.find({
                    original_url: url
                }, {
                    _id: 0,
                    short_url: 1,
                    original_url: 1
                }).toArray((find_err, docs) => {
                    if (docs && docs.length === 0) {
                        //IF NOT FOUND - Add a new record
                        //Id is the length of the array of records
                        helper.createDoc(db, urls, url, id, res);
                    } else if (!docs) {
                      console.log("hello")
                      //IF NOT FOUND - Add a new record
                      //Id is the length of the array of records
                    } else  {
                        //IF FOUND - Return the record
                        res.json(docs[0]);
                        if (find_err)
                            throw find_err;
                        db.close();
                    }
                })

            } else {
                helper.createDoc(db, urls, url, id, res);
                throw count_err;
                db.close();
                res.json(count_err)
            }
        })
    },
    createDoc: (db, urls, url, id, res) => {
      let new_doc = {
          original_url: url,
          short_url: `${HOST}/${id}`,
          url_id: id
      };
      urls.insert(new_doc, (insert_err, doc) => {
          if (insert_err)
              throw insert_err;
          db.close();
          res.json({original_url: new_doc.original_url, short_url: new_doc.short_url});
      })
    }
}

exports.DBHelper = helper;
