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
        let data = await logins(inputEmail, inputPassword);
        let fn = {
            success() {
                localStorage.setItem("deng", data.tokes)
                location.href = "dashboard.html"
            },
            fail() {
                alert("用户名或者密码错误");
            },
            other(){
                alert("该用户名不存在");
            }
        }
        fn[data.status]();
    })
})

