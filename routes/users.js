// var express = require('express');
// var router = express.Router();
// var {
//   find,
//   inster,
//   del,
//   update
// } = require("../libs/db.js");
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.post('/findUser',async(req,res,next) => {
//   let {
//     id,
//     zhanghao,
//     mima,
//     hobby
//   } = req.body
//   let data = await find('mysqlss',{
//     id
//   })
//   res.send(data);
// });

// router.post('/login',async(req,res,next) => {
//   // console.log(req,body);
//   let {
//     inputEmail,
//     inputPassword
//   } = req.body
//   let data = await find(`mysql`,{
//     zhanghao:inputEmail
//   })
//   console.log(data)
//   if(data[0].mima === inputPassword) {
//     res.send("success");
//   }else {
//     res.send("fail");
//   }
// });

// module.exports = router;
// var express = require('express');
// var router = express.Router();
// var {
//   find,
//   insert,
//   del,
//   update
// } = require("../libs/mysql.js");

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });
// router.post('/findUser', async (req, res, next) => {
//   let {
//     id,
//     zhanghao,
//     hobby
//   } = req.body
//   let data = await find(`mysqlss`, {
//     id
//   })
//   res.send(data);
// });

// router.post('/login', async (req, res, next) => {
//   let {
//     inputEmail,
//     inputPassword
//   } = req.body
//   let data = await find(`mysqlss`, {
//     zhanghao: inputEmail
//   })
//   console.log(data);
//   console.log(data[0].mima)
//   if (data[0].mima === inputPassword) {
//     res.send("success");
//   }else {
//     res.send("fail");
//   }
// });

// module.exports = router;
var express = require('express');
var router = express.Router();
var multer = require("multer");
var token = require("../libs/token.js");
var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    console.log(1)
    cb(null, './uploads')
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    //给图片加上时间戳格式防止重名名
    //比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});
var upload = multer({
  storage: storage
});
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/upload', upload.single('abc'), function (req, res, next) {
  // console.log(req)
  res.json({
    status: "success",
    file: req.file
  });
});

router.post('/autoLogin', async (req, res, next) => {
  // console.log(req.headers)
  res.send({
    status: token.checkToken(req.headers.token)
  })
})

module.exports = router;