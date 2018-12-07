console.log("加载完毕");
require.config({
    paths:{
        "public": "public",
        "product":"product",
        "jquery": 'jquery-1.11.3',
        "jquery-cookie": "jquery.cookie",
    },
	shim: {
		//设置依赖关系
		"jquery-cookie": ['jquery']
	}

})
require(['public','product'], function(public, product){
    public.publicJs();
    product.product();
})
