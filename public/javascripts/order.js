$(() => {
    //在进去页面之前将数据库所有的数据渲染在页面上
    (async ()=>{
        let fn ={
            true: async () => {
            },
            false() {
                location.href = "login.html";
                return this;
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
            //失去焦点的时候发送请求，判断是否已存在用户名
            logins : (name) => {
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
            login : (name,age,skill,description,password,imgs) => {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:3000/setting/signs",
                        data: {
                            name,
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
        let signIn = $("#signIn");
        signIn.click(async () => {
            let name = $("#inputEmail4").val();
            let password = $("#inputPassword4").val();
            let age = $("#inputAddress").val();
            let description = $("#inputCity").val();
            let skill = $("#inputAddress2").val();
            let imgs = $("#img").attr("src");
            if(name.trim() != "" && password.trim() != "" && age.trim() != "" && description.trim() != "" && skill.trim() != ""){
                let data = await fn.login(name,age,skill,description,password,imgs);
                alert("添加成功");
                $("#inputEmail4").val("");
                $("#inputPassword4").val("");
                $("#inputAddress").val("");
                $("#inputCity").val("");
                $("#inputAddress2").val("");
                $("#img").attr("src","");
            }else{
                alert("请填写完整您的信息！");
            }
        })
        $("#inputEmail4").blur(async () =>{
            // console.log(666);
            let name = $("#inputEmail4").val();
            let data = await fn.logins(name);
            // console.log(data);
            if(data == ""){
                // console.log(666);
            }else{
                // console.log(999);
                $("#inputEmail4").val("");
            }
        })
    })();
})