$(() => {
    let signIn = $("#signIn");
    let login = (name,age,skill,description,password,imgs) => {
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
    signIn.click(async () => {
        let name = $("#inputEmail4").val();
        let password = $("#inputPassword4").val();
        let age = $("#inputAddress").val();
        let description = $("#inputCity").val();
        let skill = $("#inputAddress2").val();
        let imgs = $("#img").attr("src");
        console.log(imgs);
        if(name.trim() != "" && password.trim() != "" && age.trim() != "" && description.trim() != "" && skill.trim() != ""){
            let data = await login(name,age,skill,description,password,imgs);
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
        // console.log(data);
        if(data == ""){
            // console.log(666);
        }else{
            // console.log(999);
            $("#inputEmail4").val("");
        }
    })
})
// document.addEventListener("DOMContentloaded",() => {
    
//     var fileNode = document.getElementById("file");
//     fileNode.onchange = function () {
//         console.log(fileNode.files)
//         var xmlhttp = new XMLHttpRequest();
//         //设置回调，当请求的状态发生变化时，就会被调用  
//         xmlhttp.onreadystatechange = function () {
//             //上传成功，返回的文件名，设置到父节点的背景中  
//             if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//                 console.log(JSON.parse(xmlhttp.responseText))
//                 let data = JSON.parse(xmlhttp.responseText);
//                 document.getElementById("img").src = `http://10.3.143.15:3000/${data.file.filename}`
//             }
//         }
//         //构造form数据 你可以用它传输文件流 它是基于form-data的传输方案
//         var data = new FormData();
//         // 单图上传，默认选第一张，如果是多图的话，就要for循环遍历fileNode.files数组，并全部append到data里面传输
//         data.append("abc",fileNode.files[0])
//         xmlhttp.open("post", "http://10.3.143.15:3000/users/upload", true);
//         //不要缓存  
//         //xmlhttp.setRequestHeader("If-Modified-Since", "0");  
//         //提交请求  
//         xmlhttp.send(data);
//         //清除掉，否则下一次选择同样的文件就进入不到onchange函数中了  
//         fileNode.value = null;
//     }
// })