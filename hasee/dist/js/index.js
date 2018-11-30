$(function(){
    var banner_index = 1;
    $('.img-btn li').click(function(event){
        event.preventDefault();
        $('.img-box img').css('display','none');
        $('.img-box .img'+$(this).html()).fadeIn(500);
        var banner_index = $(this).html();
        $('.img-btn li').css('background','black');
        $(this).css('background','red');
        banner_index = $(this).html();
        // document.title = banner_index + "asd" +$(this).html();
    })
   
    var timer =setInterval(function(){
        
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

    // nav
// 　　$('.all_class ol').hover(
//         function(ev){
//     　　　　var target = ev.target;
//     　　　　if(target.nodeName.toLowerCase() == 'a'){
//     　　　　　　　 target.style.zIndex = 20;
//     　　　　}
//         },
//         function(ev){
//     　　　　var target = ev.target;
//     　　　　if(target.nodeName.toLowerCase() == 'a'){
//     　　　　　　　 target.style.zIndex = 0;
//     　　　　}
//         }
//     )
　　
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
//side end left nav
// main-top
    $.ajax({
        url:"../json/mainTop.json",
        success:function(data){
            for(var i = 0; i < 4; i++){
                $(`<img src='${data[i].img}'></img>`).appendTo($(`.idx_top ul li:eq(${i})`));
            }
        },
        error:function(msg){
            alert(msg);
        }
    })
//end main
})