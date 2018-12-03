define(["jquery"],function($){
    function index(){
        $(function(){
            var banner_index = 1;
            $('.img-btn li').click(function(event){
                clearInterval(Bannertimer);
                event.preventDefault();
                $('.img-box img').css('display','none');
                $('.img-box .img'+$(this).html()).fadeIn(500);
                var banner_index = $(this).html();
                $('.img-btn li').css('background','black');
                $(this).css('background','red');
                banner_index = $(this).html();
                // document.title = banner_index + "asd" +$(this).html();
                BannertimerStart();
            })
           
            var Bannertimer = null;
            var BannertimerStart = function(){
                Bannertimer = setInterval(function(){
                    banner_index++;
                    // document.title = banner_index;
                    if(banner_index == 5){
                        banner_index = 1; 
                    }
                    $('.img-box img').fadeOut(300);
                    $('.img-box .img'+ banner_index).fadeIn(500);
            
                    $('.img-btn li').css('background','black');
                    $('.img-btn li:nth-child(' + banner_index + ')').css('background','red');
                },3000)
            }
            BannertimerStart();
        　　
            $('.all_class .li1 a').hover(function(){
                $(`.all_class .li1 .details`).css('z-index',10);
            },function(){
                $(`.all_class .li1 .details`).css('z-index',0);
            })
            $('.all_class .li2 a').hover(function(){
                $(`.all_class .li2 .details`).css('z-index',10);
            },function(){
                $(`.all_class .li2 .details`).css('z-index',0);
            })
            $('.all_class .li3 a').hover(function(){
                $(`.all_class .li3 .details`).css('z-index',10);
            },function(){
                $(`.all_class .li3 .details`).css('z-index',0);
            })
            $('.all_class .li4 a').hover(function(){
                $(`.all_class .li4 .details`).css('z-index',10);
            },function(){
                $(`.all_class .li4 .details`).css('z-index',0);
            })
            $('.all_class .li5 a').hover(function(){
                $(`.all_class .li5 .details`).css('z-index',10);
            },function(){
                $(`.all_class .li5 .details`).css('z-index',0);
            })
            $('.all_class .li6 a').hover(function(){
                $(`.all_class .li6 .details`).css('z-index',10);
            },function(){
                $(`.all_class .li6 .details`).css('z-index',0);
            })
            $('.all_class .li7 a').hover(function(){
                $(`.all_class .li7 .details`).css('z-index',10);
            },function(){
                $(`.all_class .li7 .details`).css('z-index',0);
            })
            $.ajax({
                
                url:'../json/navLink.json',
                success:function(data){
          
                    for(var i = 0; i < data.length; i++){
                        for(var j = 0; j < data[i].length; j++){
                            $(` 
                            <li>
                                <div class='detailImg'>
                                    <img src="${data[i][j].img}" alt="" >                    
                                </div>
                                <h4>${data[i][j].title}</h4>
                                <h5>${data[i][j].name}</h5>
                                <b>${data[i][j].good1 ? data[i][j].good1 : ''}</b>
                                <b>${data[i][j].good2 ? data[i][j].good2 : ''}</b>
                                <b>${data[i][j].good3 ? data[i][j].good3 : ''}</b>
                                <b>${data[i][j].good4 ? data[i][j].good4 : ''}</b>
                                <b>${data[i][j].good5 ? data[i][j].good5 : ''}</b>
                            </li>
                            
                        `).appendTo($(`.li${i+1} .details ul`));
                    
                        }
                    }
                }
                
        
            })
        // end nav
        // side left nav
        
        // side left nav 1锚点
        $(function(){
            $('.sidetop').click(function(event){
                event.preventDefault();
                $('html,body').animate({scrollTop:0},300);
            })
        })
        //side left nava 2 滑动显示
        $(function(){
            $(document).scroll(function(ev){
                // document.title = $('html,body').scrollTop();
                if($('html,body').scrollTop() > 500){
                    $('.side').fadeIn(800);
                }else{
                    $('.side').fadeOut(1000);
                }
            })
        })
        //side end left nav
        
        // main-top data
            $.ajax({
                url:"../json/mainTop.json",
                success:function(data){
                    for(var i = 0; i < 4; i++){
                        $(`<img src='${data[i].img}'></img>`).appendTo($(`.idx_top ul li a:eq(${i})`));
                    }
                },
                error:function(msg){
                    alert( "main-top data error" + msg);
                }
            })
        //end main
        })
        
        
        //main floor 数据
        // floor0 data
        $(function(){
            $.ajax({
                url:"../json/floor0.json",
                success:function(data){
                    for(let i = 0; i < data[0].length; i++){
                        if(i<2){
                            $(`<li class="bgcolor1 label_news"><a target="_blank" href="product1.html">
                            <img src="${data[0][i].img}">
                        <div class="star_d1">
                            <h3>${data[0][i].title}</h3>
                            <p>${data[0][i].describe}</p>
                            <p>商城价：<span>￥${data[0][i].price}</span></p>
                        </div></a>
                        </li>`).appendTo($('.star_ul1'));
                        }else{
                            $(`<li class="bgcolor3 label_news"><a target="_blank" href="">
                            <img src="${data[0][i].img}">
                            <div class="star_d2">
                                <h3>${data[0][i].title}</h3>
                                <p>${data[0][i].describe}</p>
                                <p><span>￥${data[0][i].price}</span></p>
                            </div></a>
                            </li>`).appendTo($('.star_ul2'));
                        }
                    }
                },
                error:function(msg){
                    alert("floor0 data error" + msg);
                }
                
            })
        })
        // floor1 data
        $(function(){
           
            $.ajax({
                url:"../json/floor1.json",
                success:function(data){
                    //part1
                    for(let i = 0; i < data.part1.length; i++){
                        $(` <li class="label_bargains">
                        <a target="_blank" href="">
                            <img src="${data.part1[i].img}">
                            <div class="notebook_d1">
                                <h3>${data.part1[i].title}</h3>
                                <h4>&nbsp;</h4><p>${data.part1[i].describe}</p>
                                <span>￥${data.part1[i].price}</span>
                            </div>
                        </a>
                    </li>`).appendTo($('.notebook_l .notebook_li1 ul'));
                    }
                    
                    //part2
                    for(let i = 0; i < data.part2.length; i++){
                        $(`
                        <a target="_blank" href="">
                            <div class="spaimg1">
                                <img src="${data.part2[i].img}">
                            </div>
                            <div class="notebook_d2">
                                <h3>${data.part2[i].title}</h3>
                                <p>${data.part2[i].describe}</p>
                                <span>￥${data.part2[i].price}</span>
                            </div>
                        </a>
                    `).appendTo($('.notebook_l > ol .li' + (i+1)));
                    }
                    //part3
                    for(let i = 0; i < data.part3.length; i++){
                        $(` <li>
                        <a target="_blank" href="">
                            <span>${i+1}</span>
                            <img src="${data.part3[i].img}">
                           
                            <h3>${data.part3[i].title}</h3>
                            <h4>${data.part3[i].price}</h4>
                            <p>月销量<b>${data.part3[i].sales}</b></p>
                        </a>
                    </li>`).appendTo($(".notebook .notebook_r ul"));
                    }
                },
                error:function(msg){
                    alert("floor1 data error" + msg);
                }
            })
            //floor1 banner
            $('.floor1 .notebook_li1 .btn2').click(function(){
                clearInterval(floor1BannerTime);
                $(this).css("background","orange").siblings().css("background","black");
                $('.notebook_l .notebook_li1 ul li:nth-child(2)').animate({left:0},1000);
                $('.notebook_l .notebook_li1 ul li:nth-child(1)').animate({left:-621},1000);
                fl1 = 0;
                fl1TimeStart();
            })
            $('.floor1 .notebook_li1 .btn1').click(function(){
                clearInterval(floor1BannerTime);
                $(this).css("background","orange").siblings().css("background","black");
                $('.notebook_l .notebook_li1 ul li:nth-child(1)').animate({left:0},1000);
                $('.notebook_l .notebook_li1 ul li:nth-child(2)').animate({left:621},1000);
                fl1 = 1;
                fl1TimeStart();
            })
            var fl1 = 0;
            var floor1BannerTime = null;
            var fl1TimeStart = function(){
                floor1BannerTime = setInterval(function(){
                    if(fl1 % 2 == 0){
                        $('.floor1 .notebook_li1 .btn1').css("background","orange").siblings().css("background","black");
                        $('.notebook_l .notebook_li1 ul li:nth-child(1)').animate({left:0},1000);
                        $('.notebook_l .notebook_li1 ul li:nth-child(2)').animate({left:621},1000);
                    }else{
                        $('.floor1 .notebook_li1 .btn2').css("background","orange").siblings().css("background","black");
                        $('.notebook_l .notebook_li1 ul li:nth-child(2)').animate({left:0},1000);
                        $('.notebook_l .notebook_li1 ul li:nth-child(1)').animate({left:-621},1000);
                    }
                    fl1++;
                },4000)
            }
            fl1TimeStart();
            //floor2 data
            $.ajax({
                url:"../json/floor2.json",
                success:function(data){
                    for(let i = 0; i < data.length; i++){
                        $(`<li><a target="_blank" href="">
                        <img src="${data[i].img}" width="1240"></a></li>
                        `).appendTo($(".pcpad_box ul"));
                    }
                },
                error:function(msg){
                    alert("floor2 data error" + msg);
                }
            })
            //floor2 banner
            var aBtns = $(".pcpad_box ol li");
            var oUl = $(".pcpad_box").find("ul");
        
            var iNow = 0;
            var timer = null;
        
            aBtns.click(function(){
                iNow = $(this).index();
                tab();
            })
            function tab(){
                $(".pcpad_box ol li").removeAttr("class");
                aBtns.eq(iNow%2).attr("class", 'active');
                
                oUl.stop().animate({top: -308 * iNow}, 500, function(){
                    if(iNow == aBtns.size()){
                        iNow = 0;
                        oUl.css("top", 0);
                    }
                });
            }
            function timerInner(){
                iNow++;
                tab();
                if(iNow > aBtns.size() ){
                    aBtns.eq(0).attr("class", 'active');
                }
            }
            timer = setInterval(timerInner, 2000);
            $("#play").hover(function(){
                clearInterval(timer);
            }, function(){
                timer = setInterval(timerInner, 2000);
        
            })
            //floor4 data
            $.ajax({
                url:"../json/floor4.json",
                success: function(data){
                    for(let i = 0; i < data.length; i++){
                        $(`
                        <li class="label_news li1">
                            <a target="_blank" href="">
                                <div class="ardimg">
                                    <img width="200" heigth="200" src="${data[i].img}"></div>
                                <div class="around_d1">
                                    <h3>${data[i].title}</h3>
                                    <p>${data[i].describe}</p>
                                    <span>￥${data[i].price}</span>
                                </div>
                            </a>
                        </li>
                        `).appendTo($('.floor4 .around ul'));
                    }
                },
                error: function(msg){
                    alert("floor4 data error" + msg);
                }
            })
        })
        //end main floor 数据
    }
    return {
        index: index
    }
})