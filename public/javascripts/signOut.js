$(() => {
    $(".nav-link").click(() =>{
        var mes = confirm('您确定要退出吗？');
        if(mes){
            localStorage.removeItem("deng");
            location.href = "login.html";
        }
    })
})