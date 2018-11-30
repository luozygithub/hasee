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
    $isExit = false;
    $row = mysql_fetch_assoc($res1);
    if($row){
        echo '账户已存在';
        exit;
    }
    $sql = "insert loginreg(username,password) values('{$username}','{$password}')";
    $res2 = mysql_query($sql);

    if($res2){
        header("Refresh: 5; url=../html/Login.html");
        ?>
        <!-- <script type="text/javascript">window.location.href='../html/Login.html'</script> -->
        <h1 style='margin: 200px auto; width: 700px; height: 60px; font-size: 40px'>注册成功将于<b id='time'></b>秒后跳转到登录页面***</h1>
        <script>
            var time = document.getElementById('time');
            time.innerHTML = 5;
            var t = 5;
            setInterval(() => {
                t--;
                time.innerHTML = t;
            }, 1000);
        </script>
        <?php
    }else{
        echo '用户名或密码错误';
    }
?>