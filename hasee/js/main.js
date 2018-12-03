console.log('加载成功');

//配置我们要引入的模块的路径了
require.config({
    paths:{
        "jquery": 'jquery-1.11.3',
        "jquery-cookie": "jquery.cookie",
        "prefecture":"prefecture",
        "public":"public"
    },
	shim: {
		//设置依赖关系
		"jquery-cookie": ['jquery']
	},
	/*
		定义不遵从AMD规范的js文件

	 */
    // "prefecture": {
	// 	exports: "_"
    // },
    // "public":{
    //     exports: "_"
    // }
})
require(['prefecture', 'public'], function(prefecture, public){
    prefecture.prefecture();
    public.publicJs();

})
