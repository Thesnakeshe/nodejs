$(() => {
    //在进去页面之前将数据库所有的数据渲染在页面上
    (async ()=>{
        let fn ={
            true: async () => {
                let data = await fn.getUserList();
                let html = data.map((item,index)=>{
                    return `
                        <tr>
                            <td>${item._id}</td>
                            <td>${item.name}</td>
                            <td>${item.age}</td>
                            <td>${item.skill}</td>
                            <td>${item.description}</td>
                            <td><button class="change">更改</button></td>
                        </tr>            
                    `
                }).join("");
                $("#list").html(html);
            },
            false() {
                location.href = "login.html";
                return this;
            },
            getUserList : () => {
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
            login : (name) => {
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
            }
        }
        let wites = await fn.getToken();
        // 异步 awiat和async
        fn[wites.status]();
        //先找出需要修改的信息
        let signIn = $("#seach");
        signIn.click(async () => {
            let name = $("#seachText").val();
            let data = await fn.login(name);
            // console.log(data);
            let html = data.map((item,index)=>{
                return `
                    <tr>
                        <td>${item._id}</td>
                        <td>${item.name}</td>
                        <td>${item.age}</td>
                        <td>${item.skill}</td>
                        <td>${item.description}</td>
                        <td><button class="change">更改</button></td>
                    </tr>            
                `
            }).join("");
            $("#list").html(html);
        })
        //点击更改跳转更改的页面
        $("#list").on("click",".change",function(){
            let name = $(this).parent().prev().prev().prev().prev().html();
            location.href = "find2.html?name="+name;
        })
    })();
})