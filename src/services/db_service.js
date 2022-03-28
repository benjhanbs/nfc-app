const squel = require('squel')
const squelP = squel.useFlavour('postgres');
const log = console.log;

module.exports = {
  init: db => {
    this.db = db;
    this.forceLog = false;
  },

  insert: (tableName, obj, printLog = false) => new Promise((resolve, reject) => {
    const queryString = squelP.insert()
                              .into(tableName)
                              .setFields(obj)
                              .returning('*')
                              .toParam();
    if(printLog || this.forceLog) {
      log('Query:', queryString);
      log('Object:', obj);
    }
    
    this.db.query(queryString).then((result) => {
      resolve(result.rows)
    })
    .catch((err) => {
      console.log('error inserting data to table: ' + tableName + '\n' + err);
      reject(err);
    });
  }),

  insertBulk: (tableName, arr, printLog = false) =>  new Promise((resolve, reject) => {
    const queryString = squelP.insert()
                              .into(tableName)
                              .setFieldsRows(arr)
                              .returning('id')
                              .toParam();
    if(printLog || this.forceLog) {
      log('Query:', queryString);
      log('arr:', arr);
    }

    this.db.query(queryString).then((result) => {
      resolve(result.rows)
    })
    .catch((err) => {
      console.log('error bulk inserting data to table: ' + tableName + '\n' + err);
      reject(err);
    });
  }),

  select: (tableName, whereConditions, printLog = false) => new Promise((resolve, reject) => {
    var wherePart = '';
    for(var i = 0; i < whereConditions.length; i++) {
      wherePart += whereConditions[i].field + ' = ' + `'${whereConditions[i].value}'` + (i !== whereConditions.length - 1 ? ' and ' : '');
    }
    const queryString = squelP.select()
                              .from(tableName)
                              .where(wherePart)
                              .toString()
    
    if(printLog || this.forceLog) {log(queryString);}
    this.db.query(queryString).then((result) => {
      resolve(result.rows)
    })
    .catch((err) => {
      console.log('error reading data from table ' + tableName + '\n' + err);
      reject(err);
    });
  }),

  selectWithOrder: (tableName, whereConditions, orderByCol, direction = 'asc', printLog = false) => new Promise((resolve, reject) => {
    var wherePart = '';
    for(var i = 0; i < whereConditions.length; i++) {
      wherePart += whereConditions[i].field + ' = ' + `'${whereConditions[i].value}'` + (i !== whereConditions.length - 1 ? ' and ' : '');
    }
    const queryString = squelP.select()
                              .from(tableName)
                              .where(wherePart)
                              .order(orderByCol, direction === 'asc')
                              .toString()
    
    if(printLog || this.forceLog) {log(queryString);}
    this.db.query(queryString).then((result) => {
      resolve(result.rows)
    })
    .catch((err) => {
      console.log('error reading data from table ' + tableName + '\n' + err);
      reject(err);
    });
  }),

  find: (tableName, id, printLog = false) => new Promise((resolve, reject) => {
    const queryString = squelP.select()
                              .from(tableName)
                              .where('id =? ', id)
                              .toString()
    
    if(printLog || this.forceLog) {log(queryString);}
    this.db.query(queryString).then((result) => {
      resolve(result.rows)
    })
    .catch((err) => {
      console.log('error reading data from table ' + tableName + '\n' + err);
      reject(err);
    });
  }),

  update: (tableName, whereConditions, fieldsToUpdate, printLog = false) => new Promise((resolve, reject) => {
    var wherePart = '';
    for(var i = 0; i < whereConditions.length; i++) {
      wherePart += whereConditions[i].field + ' = ' + `'${whereConditions[i].value}'` + (i !== whereConditions.length - 1 ? ' and ' : '');
    }
    const queryString = squelP.update()
                              .table(tableName)
                              .setFields(fieldsToUpdate)
                              .where(wherePart)
                              .returning('*')
                              .toParam();
    
    if(printLog || this.forceLog) {log(queryString);}
    this.db.query(queryString).then((result) => {
      console.log(`${tableName} table was UPDATED`)
      resolve(result.rows)
    })
    .catch((err) => {
      console.log(`${tableName} table was NOT UPDATED`)
      console.log('error updating data from table ' + tableName + '\n' + err);
      reject(err);
    });
  }),

  findOrCreate: (tableName, obj, whereConditions, printLog = false) => new Promise((resolve, reject) => {
    var wherePart = '';
    for(var i = 0; i < whereConditions.length; i++) {
      wherePart += whereConditions[i].field + ' = ' + `'${whereConditions[i].value}'` + (i !== whereConditions.length - 1 ? ' and ' : '');
    }
    const queryString = squelP.select()
                              .from(tableName)
                              .where(wherePart)
                              .toString()
    
    if(printLog || this.forceLog) {log(queryString);}

    this.db.query(queryString).then((result) => {
      if(result.rows.length === 0) {
        resolve(module.exports.insert(tableName, obj))
      } else {
        resolve(result.rows)
      }
    })
    .catch((err) => {
      console.log('error findOrCreate data from table ' + tableName + '\n' + err);
      reject(err);
    });

  }),

  delete: (tableName, whereConditions, printLog = false) => new Promise((resolve, reject) => {
    var wherePart = '';
    for(var i = 0; i < whereConditions.length; i++) {
      wherePart += whereConditions[i].field + ' = ' + `'${whereConditions[i].value}'` + (i !== whereConditions.length - 1 ? ' and ' : '');
    }
    const queryString = squelP.delete()
                              .from(tableName)
                              .where(wherePart)
                              .toString()
    
    if(printLog || this.forceLog) {log(queryString);}
    this.db.query(queryString).then((result) => {
      resolve(result)
    })
    .catch((err) => {
      console.log('error deleting data from table ' + tableName + '\n' + err);
      reject(err);
    })
  }),

  deleteById: (tableName, id, printLog = false) => new Promise((resolve, reject) => {
    const queryString = squelP.delete()
                              .from(tableName)
                              .where('id =? ', id)
                              .toString()
    
    if(printLog || this.forceLog) {log(queryString);}
    this.db.query(queryString).then((result) => {
      resolve(result)
    })
    .catch((err) => {
      console.log('error deleting data from table ' + tableName + '\n' + err);
      reject(err);
    })
  }),

  getDB: () => {
    return this.db;
  }
};