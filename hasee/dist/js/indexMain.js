console.log("加载完毕");
require.config({
    paths: {
        "index": "index",
        "jquery": 'jquery-1.11.3',
        "jquery-cookie": "jquery.cookie"
    },
    shim:{
        "jquery-cookie":["jquery"]
    }
})
require(["index"],function(index){
    index.index();
})