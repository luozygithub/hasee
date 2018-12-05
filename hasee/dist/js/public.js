define(['jquery'], function($){
    function public(){
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
                            
                        </li>
                        
                         `).appendTo($(`.li${i+1} .details ul`));
                        for(let k = 0; k < data[i][j].goods.length; k++){
                            $(`
                             <b>${data[i][j].goods[k] }</b>
                            `).appendTo($(`.li${i+1} .details li:eq(${j})`));
                        }
                    }
                }
            }
            
        
        })
        

    }
    return {
        publicJs: public
    }
})