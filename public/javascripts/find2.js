$(() => {
    //先剪切前一个页面传过来的name
    
    (async ()=>{
        let fn ={
            true: async () => {
                let name = await fn.getName();
                let data = await fn.getUserList(name);
                console.log(data);
                $("#inputEmail4").val(data[0].name);
                $("#inputPassword4").val(data[0].password);
                $("#inputAddress").val(data[0].age);
                $("#inputCity").val(data[0].description);
                $("#inputAddress2").val(data[0].skill);
                $("#img").attr("src",data[0].imgs);
            },
            false() {
                location.href = "login.html";
                return this;
            },
            //先接收一下产品总页面传过来的路径然后再把他给剪切了
            getName : () => {
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
            },
            //查询前一页1传过来多的name对应的信息
            getUserList : (name) => {
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
            },
            getToken : (name, currentPage, qty) => {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: "POST",
                        headers: {
                            token: localStorage.getItem("deng")
                        },
                        url: "http://localhost:3000/users/autoLogin",
                        data: {
                            name,
                            currentPage,
                            qty
                        },
                        success(data) {
                            resolve(data)
                        }
                    })
                })
            },
            gais : (name,names,age,skill,description,password,imgs) => {
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
                            password,
                            imgs
                        },
                        success(data) {
                            resolve(data)
                        }
                    })
                })
            }
        }
        let wites = await fn.getToken();
        // 异步 awiat和async
        fn[wites.status]();
        //输入新的信息然后修改信息
        //先找出需要修改的信息
        let gai = $("#gai");
        gai.click(async () => {
            let name = await fn.getName();
            let names = $("#inputEmail4").val();
            let password = $("#inputPassword4").val();
            let age = $("#inputAddress").val();
            let description = $("#inputCity").val();
            let skill = $("#inputAddress2").val();
            let imgs = $("#img").attr("src");
            console.log(imgs);
            let data = await fn.gais(name,names,age,skill,description,password,imgs);
            alert("更改成功");
            location.href = "find.html";
        })
        //放弃更改回到更改页面
        $("#fang").on("click",async function(){
            let name = await fn.getName();
            let data = await fn.getUserList(name);
            console.log(data);
            $("#inputEmail4").val(data[0].name);
            $("#inputPassword4").val(data[0].password);
            $("#inputAddress").val(data[0].age);
            $("#inputCity").val(data[0].description);
            $("#inputAddress2").val(data[0].skill);
            $("#img").attr("src",data[0].imgs);
        })
    })();
})