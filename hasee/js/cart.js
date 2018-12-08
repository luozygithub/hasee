define(['jquery','jquery-cookie'],function($){
    function cart(){
        //已经存储在cookie数据进行加载
        let goodsNum = 0;//商品数量
        let goodsTotalprice = 0;
        // if($.cookie('goods')){
        //     $.cookie("selectedGoods",($.cookie('goods')),{
        //         expires: 1
        //     })
        // }
        // alert($.cookie("selectedGoods"))
        function sc_msg() {
            $.ajax({
                url: "../json/productList.json",
                type: "get",
                success: function (res) {
                    
                    if ($.cookie("goods")) {
                        var sc_arr = eval($.cookie("goods"));
                        goodsNum = 0;//商品数量
                        goodsTotalprice = 0;
                        let html = '';
                        for (var i in sc_arr) {
                            goodsNum += parseFloat(sc_arr[i].num);
                            goodsTotalprice += sc_arr[i].num * res[sc_arr[i].id].price;
                            html += `<tr class="cartitem">
                                     <td><input checked="checked" type="checkbox"></td>
                                    <td><img src="${res[sc_arr[i].id].img}">
                                        <p><a href="" target="_blank">${res[sc_arr[i].id].title}</a></p>
                                    </td>
                                    <td>${res[sc_arr[i].id].price}</td>
                                        <td>
                                        <div class="shop_car_tbd1">
                                            <span class="shop_car_bl">-</span>
                                            <input value="${sc_arr[i].num}" name="${sc_arr[i].id}" type="text">
                                            <span  class="shop_car_br">+</span>
                                        </div>
                                    </td>
                                    <td class="shop_car_price">${parseFloat(parseFloat(res[sc_arr[i].id].price)* parseInt(sc_arr[i].num))}</td>
                                     <td class="delete">
                                        <a class="addfavorite">移入收藏夹</a><br>
                                        <a class="delitem">删除</a>
                                        <input class="hdAttrinfo" value="4,23" type="hidden">
                                        <input class="hdProid" value="" type="hidden">
                                    </td>
                                </tr>`
                        }
                        $(".shop_car_tb table tbody").html(html);
                        $(".goodsNum").html('(' + goodsNum + ')');
                        $(".chooseGoodsNum").html(goodsNum);
                        $(".goodsTotalPrice").html(goodsTotalprice);
                    }
                },
                error: function(msg){
                    alert(" cart data error" + msg);
                }
            })
        }
        //当有数量变化 选中或取消商品 时 刷新数据
        function sg_refresh(){
            $.ajax({
                url: "../json/productList.json",
                type: "get",
                success: function(data){
                    if ($.cookie("goods")) {
                        goodsNum = 0;
                        goodsTotalprice = 0;
                        var sc_arr = eval($.cookie("goods"));
                        for (var i in sc_arr) {
                            //在这个商品 的多选框被选中的时候 才计算进总数量 和总价格
                            if($(".shop_car_tb table tbody tr").eq(i).find("input[type='checkbox']").prop("checked")){
                                goodsNum += parseFloat(sc_arr[i].num);
                                goodsTotalprice += sc_arr[i].num * data[sc_arr[i].id].price;
                            }
                            // 修改每个商品后面的 总价
                            $(".shop_car_tb table tbody tr").eq(i).find(".shop_car_price").html(parseFloat(parseFloat(data[sc_arr[i].id].price)* parseInt(sc_arr[i].num))); 

                        }
                        // 修改总的商品数量 以及 商品价格
                        $(".goodsNum").html('(' + goodsNum + ')');
                        $(".chooseGoodsNum").html(goodsNum);
                        $(".goodsTotalPrice").html(goodsTotalprice);
                    }
                },
                error:function(msg){
                    alert("selected goods data error" + msg);
                }

            })
        }
        sc_msg();
        //加载完毕
        //变更商品数量 ++
        $(".main").on("click",".shop_car_br", function(){
            //页面上显示的 的 数量  +1
            $(this).prev().val( (parseInt($(this).prev().val()) + 1));
            // var num = parseInt(JSON.parse($.cookie('goods'))[0].num);
            //cookie 里面的 对应id 商品的num +1
            var jsonArr = JSON.parse($.cookie('goods'));
            for(let i in jsonArr){
                if(jsonArr[i].id == $(this).prev().attr("name")){
                    jsonArr[i].num = parseInt(jsonArr[i].num) + 1;
                    let cookieStr =  JSON.stringify(jsonArr);
                    $.cookie("goods",cookieStr,{
                        expires: 7
                    })
                    sg_refresh();
                    
                }
            }
            
        })
    
        //数量变化 --
        $(".main").on("click",".shop_car_bl", function(){
            //页面上显示的 的 数量  - 1
            if((parseInt($(this).next().val()) > 0)){
                $(this).next().val( (parseInt($(this).next().val()) - 1));
            }
            
            //cookie 里面的 对应id 商品的num - 1
            let jsonArr = JSON.parse($.cookie('goods'));
            for(let i in jsonArr){
                if(jsonArr[i].id == $(this).next().attr("name")){
                    if(jsonArr[i].num > 1){
                        jsonArr[i].num = jsonArr[i].num - 1;
                        if($(this).parent().parent().parent().find("input[type='checkbox']").prop("checked")){
                            // refresh();
                            sg_refresh();
                        }
                        
                        
                    }else{
                        // jsonArr.splice(i,1);
                        if($(this).parent().parent().parent().find("input[type='checkbox']").prop("checked")){
                            // refresh();
                            sg_refresh();
                        }
                        // history.go(0)
                    }
                    let cookieStr =  JSON.stringify(jsonArr);
                    $.cookie("goods",cookieStr,{
                        expires: 7
                    })
                }
            }
        })
        //input 内值改变触发事件
        $('.shop_car_tb table tbody').on("blur",".shop_car_tbd1 input",function(){
            // alert($('.shop_car_tbd1 input').val())
            //要注意 这里要改变的值 要用this去找 而不是选择器
            if(/^[0-9]+.?[0-9]*$/.test($(this).val())){
                var jsonArr = JSON.parse($.cookie('goods'));
                for(let i in jsonArr){
                    if(jsonArr[i].id == $(this).attr("name")){
                        jsonArr[i].num = $(this).val();
                        let cookieStr =  JSON.stringify(jsonArr);
                        $.cookie("goods",cookieStr,{
                            expires: 7
                        })
                        sg_refresh();
                        
                    }
                }
            }else{
                $(this).val(1);
                var jsonArr = JSON.parse($.cookie('goods'));
                for(let i in jsonArr){
                    if(jsonArr[i].id == $(this).attr("name")){
                        jsonArr[i].num = $('.shop_car_tbd1 input').val();
                        let cookieStr =  JSON.stringify(jsonArr);
                        $.cookie("goods",cookieStr,{
                            expires: 7
                        })
                        sg_refresh();
                    }
                }
            }
        })
        $('.shop_car_tbd1 input').blur(function(){
            alert($('.shop_car_tbd1 input').val())
        })
        //全选
        $('.CheckAll').click(function(){
            // alert($(this).attr("checked"));
            // prop  jq1.6 以后建议用prop  可获取 当前checked状态
            if($(this).prop("checked")){
                $('.cartitem input[type="checkbox"]').prop("checked",true);
                $('.CheckAll').prop("checked",true);
            }else{
                $('.cartitem input[type="checkbox"]').prop("checked",false);
                $('.CheckAll').prop("checked",false);

            }
            sg_refresh();
        })
        $('.main').on('click','.cartitem input[type="checkbox"]',function(){
            if($(this).prop("checked")){
                //状态 转换为未选中状态时  把它的价格在总的里面去掉
                sg_refresh();

            }else{
                sg_refresh();
            }
        })
        //删除商品
        $('.main table').on("click",".delitem",function(ev){
            ev.preventDefault();
            let jsonArr = JSON.parse($.cookie('goods'));
            for(let i in jsonArr){
                //
                if(jsonArr[i].id == $(this).parent().parent().find("input[name]").attr("name")){
                    jsonArr.splice(i,1);
                }
            }
            let cookieStr =  JSON.stringify(jsonArr);
            $.cookie("goods",cookieStr,{
                expires: 7
            })
            $(this).parents(".cartitem").remove();
            sg_refresh();

        })
        
    }
    return {
        cart: cart
    }
})