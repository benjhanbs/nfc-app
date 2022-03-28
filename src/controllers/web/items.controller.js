//var Book = require('../models/book');
var serviceDb = require('../../../src/services/db_service');
const constants = require('../../const');

exports.all = async function(req, res) {
  const items = await serviceDb.select(constants.TABLE_NAMES.ITEMS,[])
  res.json(items);
};

exports.update = async function(req, res) {
  const {manufactureId, name, serialNumber, status, scanResult, lastScannedAt} = req.body
  console.log(req.body);
  const manufactures = await serviceDb.select(constants.TABLE_NAMES.MANUFACTURES,[{field: "id", value:manufactureId}])
  if (!manufactures || manufactures.length === 0) {
    res.statusCode = 401;
    res.json({
      error: "Error while try to update items - manufacture does not exist",
    });
    return;
  }
  // const items = await serviceDb.select(constants.TABLE_NAMES.ITEMS,[])
  res.json([]);
};
