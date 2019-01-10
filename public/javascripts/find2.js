$(() => {
    //先剪切前一个页面传过来的name
    //先接收一下产品总页面传过来的路径然后再把他给剪切了
    let getName = () => {
        return new Promise((resolve, reject) => {
            var lujing = decodeURI(location.search.slice(1));
            var shu = {};
            var jianqie = lujing.split("&");
            jianqie.forEach(function(item){
                var arrXiang = item.split("=");
                shu[arrXiang[0]] = arrXiang[1];
            })
            resolve(shu.name)
        })
    }
    //查询前一页1传过来多的name对应的信息
    let getUserList = (name) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/findUser",
                data: {
                    name
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    (async ()=>{
        let name = await getName();
        let data = await getUserList(name);
        console.log(data);
        $("#inputEmail4").val(data[0].name);
        $("#inputPassword4").val(data[0].password);
        $("#inputAddress").val(data[0].age);
        $("#inputCity").val(data[0].description);
        $("#inputAddress2").val(data[0].skill);
    })();
    //输入新的信息然后修改信息
    //先找出需要修改的信息
    let gai = $("#gai");
    let gais = (name,names,age,skill,description,password) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/update",
                data: {
                    name,
                    names,
                    age,
                    skill,
                    description,
                    password
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    gai.click(async () => {
        let name = await getName();
        let names = $("#inputEmail4").val();
        let password = $("#inputPassword4").val();
        let age = $("#inputAddress").val();
        let description = $("#inputCity").val();
        let skill = $("#inputAddress2").val();
        let data = await gais(name,names,age,skill,description,password);
        alert("更改成功");
        location.href = "find.html";
    })
    //放弃更改回到更改页面
    $("#fang").on("click",async function(){
        let name = await getName();
        let data = await getUserList(name);
        console.log(data);
        $("#inputEmail4").val(data[0].name);
        $("#inputPassword4").val(data[0].password);
        $("#inputAddress").val(data[0].age);
        $("#inputCity").val(data[0].description);
        $("#inputAddress2").val(data[0].skill);
    })
})