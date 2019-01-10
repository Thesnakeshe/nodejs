$(() => {
    let signIn = $("#signIn");
    let logins = (inputEmail, inputPassword) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/login",
                data: {
                    inputEmail,
                    inputPassword
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    signIn.click(async () => {
        let inputEmail = $("#inputEmail").val();
        let inputPassword = $("#inputPassword").val();
        console.log(inputEmail, inputPassword);
        let data = await logins(inputEmail, inputPassword);
        console.log(data);
        if (data === 'fail') {
            alert("登录失败");
        } else {
            alert(data.tokes);
            localStorage.setItem("deng",data.tokes);
            location.href = "dashboard.html";
            token.checkToken("deng");
        }
    })
})

