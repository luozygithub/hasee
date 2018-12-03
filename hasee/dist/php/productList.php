<?php
    header('content-type:text/html;charset="utf-8"');
    $link = mysql_connect("localhost:3308", "root", "123456");
	//2、判断数据库是否链接成功
	if(!$link){
		echo '数据库链接失败';
		exit; //退出整个php程序
	}
	// echo '已连接';
	//3、设置字符集
	mysql_set_charset('utf8');

	//4、选择数据库
	mysql_select_db("hasee");

	//5、准备sql语句
	$sql = "SELECT * FROM product";
	//6、发送sql语句
	$res = mysql_query($sql);
	// echo $res1;


	$row = mysql_fetch_assoc($res);
	//页面上输出
	
    if($row){
        echo json_encode($row);;
        exit;
    }else{
        echo 0;
        exit;
    }
		
	
	echo '无数据';
	//8关闭数据库
	mysql_close($link);
?>