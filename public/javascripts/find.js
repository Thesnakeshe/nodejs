$(() => {
    //在进去页面之前将数据库所有的数据渲染在页面上
    let getUserList = () => {
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
        let data = await getUserList();
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
    })();
    //先找出需要修改的信息
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
        let data = await login(name);
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
    //输入新的信息然后修改信息
    //失去焦点的时候发送请求，判断是否已存在用户名
    let logins = (name) => {
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
    $("#inputEmail4").blur(async () =>{
        // console.log(666);
        let name = $("#inputEmail4").val();
        let data = await logins(name);
        console.log(data);
        if(data == ""){
            console.log(666);
        }else{
            console.log(999);
            $("#inputEmail4").val("");
        }
    })
    //点击更改跳转更改的页面
    $("#list").on("click",".change",function(){
        let name = $(this).parent().prev().prev().prev().prev().html();
        location.href = "find2.html?name="+name;
    })
})