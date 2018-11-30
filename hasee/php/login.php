<?php
    header('content-type:text/html;charset="utf-8"');

    $username = $_POST['username'];
    $password = $_POST['password'];
	$password = md5($password);
    //1、链接数据库
		/*
			第一个参数  服务器地址
			第二个参数  数据库用户名
			第三个参数  密码
		*/
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
	$sql = "SELECT * FROM loginreg where username='{$username}';";
	//6、发送sql语句
	$res1 = mysql_query($sql);
	// echo $res1;


	$row1 = mysql_fetch_assoc($res1);
	//页面上输出
	
    if($row1){
        $sql = "SELECT * FROM loginreg where password='{$password}' AND username = '{$username}';";
		$res2 = mysql_query($sql);
		$row2 = mysql_fetch_assoc($res2);
			//页面上输出
		if($row2){
			echo 1;
			exit;
		}else{
			echo 0;
			exit;
		}
		
	}
	echo '用户名或密码错误';
?>