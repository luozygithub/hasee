$(function(){
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
})