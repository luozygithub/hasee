console.log("加载完毕");
require.config({
    paths:{
        "public": "public",
        "product":"product",
        "jquery": 'jquery-1.11.3'
    }

})
require(['public','product'], function(public, product){
    public.publicJs();
    product.product();
})
