//校验
var isRight1 = false;
var isRight2 = false;
var isRight3 = false;
var isRight4 = false;
$(function(){
    //邮箱手机号检验
    $('#txtUserName').blur(function(){
        if($('#txtUserName').val().indexOf('@') != -1){
            if($('#txtUserName').val().length > 18 || $('#txtUserName').val().length < 6){
                $('#usernameTip').html("长度应为6~20个字符");
            }else{
                $('#usernameTip').css('color','green');
                $('#usernameTip').html("√");
                isRight1 = true;
            }
        }else{
            if($('#txtUserName').val().length != 11){
                $('#usernameTip').html("请填写正确的手机号邮箱");
            }else if(/\D/g.test($('#txtUserName').val())){
                $('#usernameTip').html("请填写正确的手机号邮箱");
            }else if('1'!=$('#txtUserName').val()[0]){
                $('#usernameTip').html("请填写正确的手机号邮箱");
            }else{
                $('#usernameTip').css('color','green');
                $('#usernameTip').html("√");
                isRight1 = true;
               
            }
        }

    })
    //密码检验
    $('#txtPwd').blur(function(){
      
        if($('#txtPwd').val().length < 6 || $('#txtPwd').val().length > 20){
            $("#passwordHint").html("密码长度应为6~20个字符");
        }else if(!/\D/g.test($('#txtPwd').val())){
            $("#passwordHint").html("密码过于简单，请尝试“字母+数字”的组合");
        }else{
            $('#passwordHint').css('color','green')
            $("#passwordHint").html("√");
            isRight2 = true;
        }
    })

    //确认密码
    $('#txtRePwd').blur(function(){

        if($('#txtRePwd').val() != $('#txtPwd').val()){
            $('#txtRePwdTip').html(" 两次填写的密码不一致");
        }else if($('#txtRePwd').val() == ''){
            $('#txtRePwdTip').html("不能为空");
        }else{
            $('#txtRePwdTip').css('color','green')
            $('#txtRePwdTip').html( "√");
            isRight3 = true;
        }
    })
    //验证码
    var codeArr = ['7','p','o','i','u','6'];
    function qrCodeCreate(n){
        codeArr = [];
        for(var i = 0; i < n; i++){
            var num = parseInt(Math.random()*62);
            if(num > 0 && num < 10){
                codeArr.push(num);
            }else if(num <= 35){
                codeArr.push(String.fromCharCode(num + 55));
            }else{
                codeArr.push(String.fromCharCode(num + 61))
            }
        }
        return codeArr.join("");
    }
    $('#qrCode').html(qrCodeCreate(6)) ;
    $('#qrCode').click(function(){
        $('#qrCode').html(qrCodeCreate(6)) ;
    })
    $('#submit').click(function(){
        if($('#txtValidateCode').val().toString().toLowerCase() != codeArr.join("").toString().toLowerCase()){
            $('#tipsinfo').css('display','block');
            $('#tipsinfo').html("验证码不正确请重新输入".fontcolor("red"));
            $('#qrCode').html(qrCodeCreate(6)) ;
        }else{
            $('#tipsinfo').css('display','none');
            isRight4 = true;
        }
    })
    //同意协议
    
    //提交验证
    $('#submit').click(function(event){
        if(!isRight1){
            event.preventDefault();
            $('#txtUserName').focus();
        }
        if(!isRight2){
            event.preventDefault();
            $('#txtPwd').focus();
        }
        if(!isRight3){
            event.preventDefault();
            $('#txtRePwd').focus();
        }
        if(!isRight4){
            event.preventDefault();
            $('#txtValidateCode').focus();
        }
     
        if(document.getElementById('chkIsRead').checked == false){
            event.preventDefault();
            $('#chkIsRead').focus();
            $('#tipsinfo').css('display','block');
            $('#tipsinfo').html("请同意协议".fontcolor("red"));
        }
        
    })

})