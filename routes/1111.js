const {
    MongoClient,
    ObjectId
  } = require('mongodb');
  // Connection URL
  const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'movies';
  router.post('/findFen', async (req, res, next) => {
    let {
        name,
        currentPage,
        qty
    } = req.body
    let shuzu = await findsz(`doubanlist`, name ? {
        name
    } : {})
    let len = shuzu.length;
    qty=6;
    let yema = len/qty;
    // console.log(currentPage, qty);
    let datas =shuzu.slice((currentPage-1)*qty,qty*currentPage);
    // console.log(datas);
    let ras = {
        ss : datas,
        aa : len,//共多少条
        qq : qty,//页数
        bb : yema//页码
    }
    // console.log(ras);
    res.send(JSON.stringify(ras));
});
