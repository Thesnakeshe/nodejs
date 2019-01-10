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
                    <td><input type="checkbox"></td>
                    <td>${item._id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.skill}</td>
                    <td>${item.description}</td>
                    <td><button class="shan">删除</button></td>
                </tr>            
            `
        }).join("");
        $("#list").html(html);
    })();
    //通过搜索键搜索需要删除的信息
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
        let html = data.map((item,index)=>{
            return `
                <tr>
                    <td>${item._id}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.skill}</td>
                    <td>${item.description}</td>
                    <td><button class="shan">删除</button></td>
                </tr>            
            `
        }).join("");
        $("#list").html(html);
    })
    //给删除键一个点击事件，删除当前信息
    let logins = (name) => {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/setting/shan",
                data: {
                    name
                },
                success(data) {
                    resolve(data)
                }
            })
        })
    }
    $("#list").on("click",".shan",async function(){
        let name = $(this).parent().prev().prev().prev().prev().html();
        // console.log(name);
        let data = await logins(name);
        alert("删除成功");
        $(this).parent().parent().remove();
    })
    
            //全选反选
            $('#all').on('click', function() {
                $('tr input').prop('checked', this.checked);
            });

        //全选补充
        $('#list').on('click', 'tr', function() {
            var $trs = $("#list tr");
            // console.log($trs.length);
            var $xuanze = $("#list :checked").length;
            // console.log($xuanze);
            if($xuanze == $trs.length){
                $('#all').prop("checked",true);
            }else{
                $('#all').prop("checked",false);
            }
        });
        //批量删除
        //点击删除键，删除选中的商品
        $('#shanchu').on('click',async function(){
            var mes = confirm('您确定要删除选中的信息吗？');
            if(mes){
                // var arr = checknum();
                var $xuanze = $("#list tr").length;
                for(let i = $xuanze; i >=0; i--) {
                    if($('#list input').eq(i).prop('checked')){
                        var name = $('#list input').eq(i).parent().next().next().html();
                        console.log(name);
                        let datas = await logins(name);
                        $('#list input').eq(i).parent().parent().remove();
                    }
                }
            }
        })

})