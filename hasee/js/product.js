define(['jquery','jquery-cookie'], function($){

    
  
    function product(){
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
        if (v["id"] == undefined) {
            prodctId = 0;
        } else {
            prodctId = v["id"];
        }
        //点击切换图片
        let picNumber = 1;
        $('.spec-items ul li').click(function(){
            $(this).addClass("on");
            $(this).siblings().removeAttr("class");
            $('.MagTargetImg').attr("src", $(this).find('img').attr('src'));
            picNumber = $(this).attr('name');
            //放大镜切换图片
            $(".magnifying_glass").css("background","url(" + $(this).find('img').attr('src') + ")");
        })
        $('.spe_rightBtn').click(function(){
            $(this).addClass("on");
            $(this).siblings().removeClass("on");
            if(picNumber == 5){
                $('.MagTargetImg').attr('src',$(`.spec-items ul li:eq(0) img`).attr('src'));
                $('.spec-items ul li:eq(0)').addClass("on");
                $('.spec-items ul li:eq(0)').siblings().removeAttr("class");
                $(".magnifying_glass").css("background","url(" +$(`.spec-items ul li:eq(0) img`).attr('src') + ")");

                picNumber = 1;
            }else{
                // alert($(`.spec-items ul li:eq(${picNumber})  img`).attr('src'))
                $('.MagTargetImg').attr('src',$(`.spec-items ul li:eq(${picNumber}) img`).attr('src'));
                $(`.spec-items ul li:eq(${picNumber})`).addClass("on");
                $(`.spec-items ul li:eq(${picNumber})`).siblings().removeAttr("class");
                $(".magnifying_glass").css("background","url(" + $(`.spec-items ul li:eq(${picNumber}) img`).attr('src') + ")");
                picNumber++;
            }
            
        })
        $('.spe_leftBtn').click(function(){
            $(this).addClass("on");
            $(this).siblings().removeClass("on");
            if(picNumber == 0){
                $('.MagTargetImg').attr('src',$(`.spec-items ul li:eq(4) img`).attr('src'));
                $('.spec-items ul li:eq(4)').addClass("on");
                $('.spec-items ul li:eq(4)').siblings().removeAttr("class");
                picNumber = 5;
            }else{
                $(`.spec-items ul li:eq(${picNumber - 2})`).addClass("on");
                $(`.spec-items ul li:eq(${picNumber - 2})`).siblings().removeAttr("class");
                $('.MagTargetImg').attr('src',$(`.spec-items ul li:eq(${picNumber - 2}) img`).attr('src'));
                picNumber--;
            }
            
        })
        //main data
        $.ajax({
            url:"../json/product.json",
            success:function(data){
                $(` <span>${data[0].title}</span>`).appendTo($(".main .title2")); 
                $(`<h2>${(data[0].title)}</h2>`).appendTo($(".prod_buy>h2"));
                $(`<p>${data[0].tip}</p>`).appendTo($(".prod_buy>p"));
                $(".prod_price>b").append($(`<b>${data[0].price}</b>`));
                $(".prod_pri_r p:first >i").append($(`<i>${data[0].sales}</i>`));
                $(".prod_pri_r p:eq(1) >i").append($(`<i>${data[0].comments}</i>`));
                //versions
                for(let i = 0; i < data[0].versions.length; i++){
                    $(".prod_buy .versions dd ul").append(`<li><a href="">${data[0].versions[i]}</a></li>`);
                }
                //color
                $(".color .pro_attr .cur a").append(data[0].color);
                //套餐
                for(let i = 0; i < data[0].package.length; i++){
                    $(".packages .pro_attr .cur").append($(`<a>${data[0].package[i]}</a>`));
                }
                //库存
                $('.prod_dl_stock .prod_stock_num').append(data[0].inventory);
                //imgs,
                for(let i = 0; i < data[0].img.length; i++){
                    $(`
                    <img src="${data[0].img[i]}">
                    `).appendTo($(".prod_d1 .prod_i_show  .spec-items ul li").eq(i));
                }
                //初始化图片

                $("#MagnifierWrap2 .MagnifierMain").append($(`<img src="${data[0].img[0]}" class="MagTargetImg">`));
                $(".magnifying_glass").css("background","url(" + data[0].img[0] + ")");
            },
            error:function(msg){
                alert("main data error " + msg);
            }
           
        })
        //放大镜
        $(".MagnifierMain").mouseenter(function(){
            $(".magnifying_glass_box").css("display","block");
            $(".magnifying_glass").css("display","block");
            $(document).mousemove(function(ev){
  
                $(".magnifying_glass").css(`backgroundPosition`,`-${(ev.pageX - $(".MagnifierMain").offset().left)}px -${(ev.pageY - $(".MagnifierMain").offset().top)}px`)
                $(".magnifying_glass_box").css("left",(ev.pageX - $(".MagnifierMain").offset().left) -50);
                $(".magnifying_glass_box").css("top",(ev.pageY - $(".MagnifierMain").offset().top) - 50);
               
                if((ev.pageX - $(".MagnifierMain").offset().left) < 0 || (ev.pageX - $(".MagnifierMain").offset().left) > 450 || (ev.pageY - $(".MagnifierMain").offset().top) < 0 || (ev.pageY - $(".MagnifierMain").offset().top) > 450){
                    $(".magnifying_glass").css("display","none");
                    $(document).mousemove();
                    $(".magnifying_glass_box").css("display","none"); 
                }
            });
           
        })
        //计算购物车 内商品数量
        
        function shop_car() {
            var sc_str = $.cookie("goods");
            var sc_num = 0;
            if (sc_str) { //判断字符串是否存在
                var sc_arr = eval(sc_str);
                for (var i in sc_arr) {
                    sc_num = Number(sc_arr[i].num) + sc_num;
                }
                 
               
            }
            $(".shopCarNumber").html(sc_num);  
        }
        shop_car();
         
    }
    return {
        product: product
    }
})