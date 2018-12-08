define(['ballMove','jquery', 'jquery-cookie'], function (ballMove,$) {
    //search data
    var productCount = 12; //一页下多少个
    var maxPage = 999;
    //解析参数
    function parseUrl() {

        var url = location.href;
        var i = url.indexOf('?');
        if (i == -1) return;
        var querystr = url.substr(i + 1);
        var arr1 = querystr.split('&');
        var arr2 = new Object();
        for (i in arr1) {
            var ta = arr1[i].split('=');
            arr2[ta[0]] = ta[1];

        }
        return arr2;
    }
    var v = parseUrl(); //解析所有参数
    // alert(v['id']);//就是你要的结果
    var page = v['page'];
    //页面跳转限定
    if (page < 1) {
        page = 1;
    } else if(page > maxPage){
        page = maxPage;
    }else{
        page = v['page'];
    }


    function prefecture() {
        $.ajax({
            url: "../json/prefectureSearch.json",
            success: function (data) {
                for (let i = 0; i < data.length; i++) {
                    $("<li></li>").appendTo($(".search_terms > ul"));
                    $(`<h2>${data[i].title}</h2><div></dev>`).appendTo($(`.search_terms > ul > li:eq(${i})`));
                    for (let j = 0; j < data[i].arr.length; j++) {
                        $(`<a href="">${data[i].arr[j]}</a>`).appendTo($(`.search_terms > ul > li:eq(${i}) div`));
                    }
                }
            },
            error: function (msg) {
                alert("search error" + msg);
            }
        })
        //product_list 分页  每页显示固定数据
 
        $.ajax({
            url: "../json/productList.json",
            success: function (data) {
                maxPage = Math.ceil(data.length/productCount);
                $(".pages span i").append(maxPage);
                for (let i = (page - 1) * productCount, j = 0; i < data.length && j < productCount; i++, j++) {
                    $(`
                    <li><a href="" class="pro_img">
                        <img src="${data[i].img}"></a>
                        <a href="">
                            <h2>${data[i].tip}</h2>
                        </a>
                        <p>${data[i].title}</p>
                        <h3>￥${data[i].price}</h3>
                        <table>
                            <tbody><tr>
                                <td><a href="" class="pro_shop_car" id="${data[i].id}">加入购物车</a>
                                </td>
                                <td><a href="" class="pro_tb_a2">${data[i].comment}人评论</a></td>
                            </tr>
                        </tbody></table> 
                    </li>
                    `).appendTo($('.product_list ul'));
                }
            },
            error: function (msg) {
                alert("productList data error" + msg);
            }
        })
        //数据库交互
        // $.ajax({
        //     url:"../php/productList.php",
        //     success:function(data){
        //         alert(JSON.stringify(data))
        //         $(`
        //         <li><a href="" class="pro_img">
        //             <img src="${data[i].img}"></a>
        //             <a href="">
        //                 <h2>${data[i].tip}</h2>
        //             </a>
        //             <p>${data[i].title}</p>
        //             <h3>￥${data[i].price}</h3>
        //             <table>
        //                 <tbody><tr>
        //                     <td><a href="javascript:" onclick="addToCart(this);" class="pro_shop_car">加入购物车</a>
        //                         <input type="hidden" class="hdProID" value="10865">
        //                         <input type="hidden" class="hdProDefaultAttr" value="4,23">
        //                     </td>
        //                     <td><a href="javascript:" class="pro_tb_a2">0人评论</a></td>
        //                 </tr>
        //             </tbody></table> 
        //         </li>
        //         `).appendTo($('.product_list ul'));
        //     },
        //     error:function(msg){
        //         alert("productList data error" + msg);
        //     }
        // })


        //分页按钮
        $('.pages_next').click(function (event) {
            ev = event || window.event;
            ev.preventDefault();
            location.href = "prefecture1.html?page=" + (parseInt(page) + 1);
        })
        $('.pages_prev').click(function (event) {
            ev = event || window.event;
            ev.preventDefault();
            location.href = "prefecture1.html?page=" + (parseInt(page) - 1);
        })

        //按钮样式
        if (page == 1) {
            $('.pages a:eq(1)').addClass('cur');
        }
        if (page == 2) {
            $('.pages a:eq(2)').addClass('cur');
        }
        $("#btngopage").click(function(){
            location.href = "prefecture1.html?page=" + $("#pageindex").val();
        })


        //购物车

        // //点击清空购物车
        // $("#clearBtn").click(function(){
        //     $.cookie("goods", null);
        //     $(".sc_right .sc_num").html(0);

        // })



        //给购物车按钮添加事件
        //页面控件非常多，非常容易叠加，很容易造成事件冒泡

        $(".product_list").on("click", ".pro_shop_car", function (event) {
            
            event = event || window.event;
            event.preventDefault();
            //抛物线运动
            ballMove.ballMove(this);
            // alert(this.id);
            //是否是第一次添加cookie
            var id = this.id;
            var first = $.cookie("goods") == null ? true : false;
            if (first) {
                //第一次添加  [{id:id,num:2}]
                $.cookie("goods", '[{id:' + id + ',num:1}]', {
                    expires: 7
                });
            } else {
                var str = $.cookie("goods");
                var arr = eval(str);
                var same = false; //代表是否有相同商品

                //遍历所有的对象，判断是否id相同，num++
                for (var i in arr) {
                    if (arr[i].id == id) {
                        arr[i].num = arr[i].num + 1;
                        var cookieStr = JSON.stringify(arr);
                        $.cookie("goods", cookieStr, {
                            expires: 7
                        });
                        same = true;
                        break;
                    }
                }

                //没有相同的商品
                if (!same) {
                    var obj = {
                        id: id,
                        num: 1
                    };
                    arr.push(obj);
                    var cookieStr = JSON.stringify(arr);
                    $.cookie("goods", cookieStr, {
                        expires: 7
                    });
                }

            }
            shop_car();
            // alert($.cookie("goods"));


            return false;
        })


        /*
            mouseenter  移入
            mouseleave  移出
        */
        $(".sc_right").mouseenter(function () {
            $(this).stop().animate({
                right: 0
            })
            sc_msg();
        });
        $(".sc_right").mouseleave(function () {
            $(this).stop().animate({
                right: -270
            })
        });

        //购物车数字
        function shop_car() {
            var sc_str = $.cookie("goods");
            if (sc_str) { //判断字符串是否存在
                var sc_arr = eval(sc_str);
                var sc_num = 0;
                for (var i in sc_arr) {
                    sc_num = Number(sc_arr[i].num) + sc_num;
                }
                $(".sc_right .sc_num").html(sc_num);
                $(".shop_car a span").html(sc_num);
            }
        }

        //已经存储在cookie数据进行加载
        function sc_msg() {
            $.ajax({
                url: "../json/productList.json",
                type: "get",
                success: function (res) {
                    if ($.cookie("goods")) {
                        var sc_arr = eval($.cookie("goods"));
                        var html = '';
                        for (var i in sc_arr) {
                            html += '<li><div class="sc_goodsPic"><img src="' + res[sc_arr[i].id].img + '" alt=""></div><div class="sc_goodsTitle"><p>'+res[sc_arr[i].id].title + '</p></div><div class="sc_goodsBtn" id="' + sc_arr[i].id + '">购买</div><div class="sc_goodsNum">商品数量:' + sc_arr[i].num + '</div></li>';
                        }
                        $(".sc_right ul").html(html);
                    }
                }
            })
        }
        shop_car();
        sc_msg();
        //清空购物车
        $("#clearBtn").click(function(){
            $.cookie("goods", null);
            $(".sc_right .sc_num").html(0);
            $('.shopCar .sc_right ul').html("");
            shop_car();
            history.go(0);
        })

    }

    return {
        prefecture: prefecture
    }
})