console.log("加载完毕");
require.config({
    paths:{
        "public": "public",
        "jquery": 'jquery-1.11.3'
    }

})
require(['public'], function(public){
    public.publicJs();
})
