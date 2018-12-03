//1、引入gulp
var gulp = require("gulp");

gulp.task("hello",function(){
	console.log('asd');
})

//任务 task方法
//gulp.task()
//参数1 任务名
//参数2 执行代码 function(){}
gulp.task("copy-html",function(){
	return  gulp.src("html/**/*").pipe(gulp.dest("dist/html")).pipe(connect.reload());
})
gulp.task("images",function(){
	return gulp.src("images/**/*").pipe(gulp.dest("dist/images")).pipe(connect.reload());
})
gulp.task("data",function(){
	return gulp.src(["json/*.json"])
	.pipe(gulp.dest("dist/json"))
	.pipe(connect.reload());
})
gulp.task("phpContral",function(){
	return gulp.src(["php/*.php"])
	.pipe(gulp.dest("dist/php"))
	.pipe(connect.reload());
})
gulp.task("css",function(){
	return gulp.src(["css/*.css"])
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
gulp.task("js",function(){
	return gulp.src(["js/*.js"])
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})
//gulp.src().pipe(gulp.dest())

//执行多个任务
gulp.task("build",["copy-html","images","data","phpContral","css","js"],function(){
	console.log("over"); 
}) 

//监听： gulp.watch

gulp.task("watch",function(){

	//第一个参数  监听要执行的文件
	//第二个参数  当我们监听到改变时时要执行的任务（必须是数组）
	gulp.watch("html/**/*",["copy-html"]);
	gulp.watch("images/**/*",["images"]);
	gulp.watch("json/*",["data"]);
	//gulp.watch("css/*.css",["css"]);
	gulp.watch("js/*.js",["js"])
	gulp.watch("scss/*",["scss","scss"]);
	gulp.watch("php/*",["phpContral"]);
})
/*
*CommonJS规范
*1、下载插件  npm install 插件名字 --save -dev (npm i name -D)
2、引入插件
3、使用插件编写任务


*/
var scss = require("gulp-sass-china");
var minifyCSS = require("gulp-minify-css");
var rename = require("gulp-rename");
gulp.task("scss", function(){
	return gulp.src("scss/*.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	
	.pipe(connect.reload());
});
/*
.pipe(minifyCSS())
.pipe(rename("index.min.css"))
.pipe(gulp.dest("dist/css"))
*/


var connect = require("gulp-connect");
gulp.task("server",function(){
	connect.server ({
		root: "dist",//设置服务器根目录
		livereload: true
	})
});
//默认任务，不需要写任务名
gulp.task("default",["watch","server"]);

