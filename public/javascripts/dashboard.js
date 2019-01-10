$(() => {
    //在进去之前先判断token是否有效，有效则进去，无效则退出
    let getToken = (name, currentPage, qty) => {
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
    }
    //分页的在进去页面之前将数据库所有的数据渲染在页面上
    // let getUserList = (name, currentPage, qty) => {
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             type: "POST",
    //             headers: {
    //                 token: localStorage.getItem("deng")
    //             },
    //             url: "http://localhost:3000/setting/findFen",
    //             data: {
    //                 name,
    //                 currentPage,
    //                 qty
    //             },
    //             success(data) {
    //                 resolve(data)
    //             }
    //         })
    //     })
    // }
    (async () => {
        let fn ={
            true: async () => {
                let currentPage = 1;
                let qty = 5;
                let data = await fn.getUserList(name, currentPage, qty);
                let dd = JSON.parse(data);
                console.log(dd.aa);
                let html = dd.ss.map((item, index) => {
                    return `
                        <tr>
                            <td>${item._id}</td>
                            <td>${item.name}</td>
                            <td>${item.age}</td>
                            <td>${item.skill}</td>
                            <td>${item.description}</td>
                        </tr>            
                    `
                }).join("");
                $("#list").html(html);
                $totalPage = Math.ceil(dd.aa / dd.qq);
                console.log($totalPage);
                $(".kk3").html($totalPage);
                $(".kk2").html(dd.cc);
            },
            false() {
                location.href = "login.html";
                return this;
            },
            getUserList : (name, currentPage, qty) => {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        type: "POST",
                        headers: {
                            token: localStorage.getItem("deng")
                        },
                        url: "http://localhost:3000/setting/findFen",
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
            }
        }
        let wites = await fn.getToken();
        // 异步 awiat和async
        fn[wites.status]();
        //2.点击page，获取当前页码，再次发起请求
        $(".kk1").on("click", async function () {
            // if(e.target.tagName == "SPAN"){
            $currentPage = $(".kk2").html();
            $currentPage--;
            console.log($currentPage);
            if ($currentPage == 0) {
                $currentPage = $totalPage;
            }
            $(".kk2").html($currentPage);
            let qty = 5;
            let data = await getUserList(name, $currentPage, qty);
            let dd = JSON.parse(data);
            let html = dd.ss.map((item, index) => {
                return `
                    <tr>
                        <td>${item._id}</td>
                        <td>${item.name}</td>
                        <td>${item.age}</td>
                        <td>${item.skill}</td>
                        <td>${item.description}</td>
                    </tr>            
                `
            }).join("");
            $("#list").html(html);
            $(".kk2").html(dd.cc);
            // }
        });
        $(".kk4").on("click", async function () {
            // if(e.target.tagName == "SPAN"){
            $currentPage = $(".kk2").html();
            $currentPage++;
            console.log($currentPage);
            if ($currentPage == $totalPage + 1) {
                $currentPage = 1;
            }
            $(".kk2").html($currentPage);
            let qty = 5;
            let data = await getUserList(name, $currentPage, qty);
            let dd = JSON.parse(data);
            let html = dd.ss.map((item, index) => {
                return `
                    <tr>
                        <td>${item._id}</td>
                        <td>${item.name}</td>
                        <td>${item.age}</td>
                        <td>${item.skill}</td>
                        <td>${item.description}</td>
                    </tr>            
                `
            }).join("");
            $("#list").html(html);
            $(".kk2").html(dd.cc);
        });
    })();
    //======================================================================================================
    let signIn = $("#seach");
    let login = (name) => {
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
    signIn.click(async () => {
        let name = $("#seachText").val();
        console.log(name);
        let data = await login(name);
        let html = data.map((item, index) => {
            return `
                <tr>
                    <td>${item._id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.skill}</td>
                    <td>${item.description}</td>
                </tr>            
            `
        }).join("");
        $("#list").html(html);
        $("h6").html("");
    })


    //给一个复选框可以通过复选框的类型搜索一样的东西
    let logins = (date) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/findNews",
                data: date,
                success(res) {
                    resolve(res)
                }
            })
        })
    }
    $("#seach2").click(async () => {
        let date = {}
        hello = $("#leixing").val();
        date[hello] = $("#cha").val();
        console.log(date);
        let data = await logins(date);
        // console.log(data);
        let html = data.map((item, index) => {
            return `
                <tr>
                    <td>${item._id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.skill}</td>
                    <td>${item.description}</td>
                </tr>            
            `
        }).join("");
        $("#list").html(html);
        $("h6").html("");
    })







})