console.log("加载成功");

require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "cart":"cart",
        "public":"public"
    },
    shim:{
        "jquery-cookie":["jquery"]
    }

})
require(['cart','public'],function(cart,public){
    public.publicJs();
    cart.cart();
})