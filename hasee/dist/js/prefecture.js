define(['jquery', 'jquery-cookie'], function($){
    //search data
    function prefecture(){
        $.ajax({
            url:"../json/prefectureSearch.json",
            success:function(data){
                for(let i = 0; i < data.length; i++){
                    $("<li></li>").appendTo($(".search_terms > ul"));
                    $(`<h2>${data[i].title}</h2><div></dev>`).appendTo($(`.search_terms > ul > li:eq(${i})`));
            
                    for(let j = 0; j < data[i].arr.length; j++){
                        $(`<a href="">${data[i].arr[j]}</a>`).appendTo($(`.search_terms > ul > li:eq(${i}) div`));
                    }
                }
            },
            error:function(msg){
                alert("search error" + msg);
            }
        })
        //product_list
        $.ajax({
            url:"../json/productList.json",
            success:function(data){
                for(let i = 0; i < data.length; i++){
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
                                <td><a href="" onclick="addToCart(this);" class="pro_shop_car" id="${data[i].id}">加入购物车</a>
                                </td>
                                <td><a href="" class="pro_tb_a2">${data[i].comment}人评论</a></td>
                            </tr>
                        </tbody></table> 
                    </li>
                    `).appendTo($('.product_list ul'));
                }
            },
            error:function(msg){
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
        
    }
    return {
        prefecture: prefecture
    }
})