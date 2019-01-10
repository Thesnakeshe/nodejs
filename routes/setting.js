var express = require('express');
var router = express.Router();
var {
    connect,
    insert,
    find,
    findsz,
    findz,
    finds,
    ObjectId,
    del,
    update
} = require("../libs/mongo.js");
var token = require("../libs/token.js");
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/findUser', async (req, res, next) => {
    let {
        name
    } = req.body
    let data = await find(`xiang`, name ? {
        name
    } : {})
    res.send(data);
});

router.post('/signs', async (req, res, next) => {
    let {
        name,
        age,
        skill,
        description,
        password,
        imgs
    } = req.body
    // console.log(name,age,skill,description,password,imgs);
    // console.log(666);
    let data = await insert(`xiang`, [{
        name,
        age,
        skill,
        description,
        password,
        imgs
    }])
    res.send(data);
    // console.log(666);
});

router.post('/shan', async (req, res, next) => {
    let {
        name
    } = req.body
    // console.log(name,age,skill,description,password);
    let data = await del(`xiang`, {
        name
    })
    res.send(data);
});
router.post('/update', async (req, res, next) => {
    // console.log(name,names,age,skill,description,password);
    // console.log(666);
    let {
        name,
        names,
        age,
        skill,
        description,
        password,
        imgs
    } = req.body
        // console.log(imgs);
        // console.log(666);
    let data = await update(`xiang`, {
        name:name
    },{
        name:names,
        age:age,
        skill:skill,
        description:description,
        password:password,
        imgs:imgs
    })
    res.send(data);
});
router.post('/login', async (req, res, next) => {
//   console.log(inputEmail,inputPassword);
  let {
    inputEmail,
    inputPassword
  } = req.body
  let data = await finds(`xiang`, {
    name: inputEmail
  })
    try {
        if (data[0].password == inputPassword) {
            res.send({
                status: "success",
                tokes : token.createToken({
                    inputEmail,
                    inputPassword
                },100)
            });
        } else {
                res.send({
                status: "fail",
                });
        }
    } catch{
        res.send({ status: "other" });

    }
  
});

//新增的查找方法呀
router.post('/findNews', async (req, res, next) => {
    if(req.body._id){
        req.body= ObjectId(req.body._id);
    }
    // console.log(req.body);
    let data = await findz(`xiang`,req.body);
    res.send(data);
});

//新增查找的可分页git push origin master 推  常见错误...'git pull...') before pushing again.
// 解决：git pull origin master拉取  常见错误fatal: refusing to merge unrelated histories
// 解决：git pull origin master --allow-unrelated-histories
// Shift+:退出
// q：结束
router.post('/findFen', async (req, res, next) => {
    let {
        name,
        currentPage,
        qty
    } = req.body
    let shuzu = await findsz(`xiang`, name ? {
        name
    } : {})
    let len = shuzu.length;
    currentPage? currentPage:1;
    qty? qty:5;
    // console.log(currentPage, qty);
    let datas =shuzu.slice((currentPage-1)*qty,qty*currentPage);
    // console.log(datas);
    let ras = {
        ss : datas,
        aa : len,
        qq : qty,
        cc : currentPage
    }
    // console.log(ras);
    res.send(JSON.stringify(ras));
});

// $len = count($content);
// $data = array_slice($content,($currentPage-1)*$qty,$qty);
// $res = array(
//     "data" => $data,
//     "len" => $len,
//     "qty" => $qty,
//     "currentPage" => $currentPage
// );







module.exports = router;