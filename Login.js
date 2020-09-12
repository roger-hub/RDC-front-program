function myLogin() {
    if (self != top) {

        top.location = "/";
    };
    // <script type = "text/javascript"
    // src = "/static/js/aes.js" > < /script> <
    //     script type = "text/javascript"
    // src = "/styles/js/avalon.min.js" > < /script> <
    //     script type = "text/javascript" >
    avalon.config({
        debug: false,
        paths: {
            jquery: "jquery-1.8.0.min.js",
            layer: "../layer-v3.0.1/layer.js"
        },
        shim: {
            jquery: {
                exports: "jQuery" //这是原来jQuery库的命名空间，必须写上
            },
            layer: {
                //deps:['jquery-1.8.0.min.js'],
                exports: "layer"
            }
        }
    });
    require(['jquery', 'layer', 'domReady!'], function($) {
        layer.config({
            path: "styles/layer-v3.0.1/"
        });

        if ('' != '') {
            layer.alert("", 8);
        }
        if (!isOK()) {
            layer.alert("您的浏览器版本过低,可能会导致部分功能异常,建议使用chrome浏览器或升级到更高版本!", 8);
        }

        //获取在线人数
        var getOnlineUser = function() {
            $.get("login!getOnlineCount.action", function(data) {
                model.online = data;
            }, "text");
        }

        // 间隔5000获取一次
        getOnlineUser();
        // var interval = setInterval(getOnlineUser, 5000);

        var model = avalon.define({
            $id: "login",
            account: "",
            password: "",
            j_captcha: "",
            accountErr: false,
            pwdErr: false,
            captchaErr: false,
            disabled: true,
            online: 0,
            msblur: function() {
                $(this.parentNode).removeClass("csfocus");
            },
            msfocus: function() {
                // 判断是否为验证码
                if ($(this).attr('id') == 'j_captcha' &&
                    $('#captcha_img').is(':hidden')) {
                    $('#captcha_img').show();
                    changeVerifyCode();
                }

                $(this.parentNode).addClass("csfocus");
            },
            submit: function() {
                var l_index = layer.load(1, {
                    shade: [0.1, '#fff']
                        //0.1透明度的白色背景
                });

                var account = $("#account").val();
                var password = $("#password").val();
                var verifycode = $("#j_captcha").val()

                // 密码加密
                var key = CryptoJS.enc.Utf8.parse(verifycode + verifycode + verifycode + verifycode);
                var srcs = CryptoJS.enc.Utf8.parse(password);
                var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
                password = encrypted.ciphertext.toString();

                //ajax提交表单，#login_form为表单的ID。 如：$('#login_form').ajaxSubmit(function(data) { ... });
                $.ajax({
                    url: "/new/login",
                    type: "post",
                    data: {
                        account: account,
                        pwd: password,
                        verifycode: verifycode
                    },
                    dataType: "json",
                    complete: function() {
                        layer.close(l_index);
                    },
                    success: function(result) {
                        if (result.code >= 0) { //登录成功
                            layer.msg('登录成功  正在为您跳转...');
                            // 								clearInterval(interval);
                            window.location.href = result.data;
                        } else { //登录失败
                            changeVerifyCode();
                            layer.alert(result.message);
                        }
                    },
                    error: function() {
                        layer.alert("登录超时，请稍后重试！");
                    }
                });
            }
        });
        var fn = function(val) {
            // 			verify();
            if (val == "") {
                return true;
            }
            return false;
        };
        var isDisabled = function() {
            if (model.account != "" && model.password != "" &&
                !model.accountErr && !model.pwdErr &&
                model.j_captcha != "" && !model.captchaErr) {
                model.disabled = false;
            } else {
                model.disabled = true;
            }
        };

        model.$watch("account", function() {
            model.accountErr = fn(model.account);
            isDisabled();
        });
        model.$watch("password", function() {
            model.pwdErr = fn(model.password);
            isDisabled();
        });
        model.$watch("j_captcha", function() {
            model.captchaErr = fn(model.j_captcha);
            isDisabled();
        });
        avalon.scan(document.body); //现在只要传入扫描范围的根节点就行

        //阻止登陆事件
        $("#login_form").bind("submit", function(e) {
            e.preventDefault();
            //  	return false;  //也可以用e.preventDefault(); 
        });


    });

    //检查浏览器是否满足要求
    function isOK() {
        if ($.browser.msie) {
            var bResult = document.implementation.hasFeature("org.w3c.svg",
                "1.0");
            if (parseInt($.browser.version, 10) <= 7 && !bResult) {
                return false;
            }
        }
        return true;
    }

    function isInputNull(idName) {
        if ($(idName).val() != "") {
            return true;
        }
        return false;
    }
    var currentTime = ''; //定义全局方便验证码同步
    function changeVerifyCode(obj) {
        currentTime = new Date().getTime();
        if (obj)
            obj.src = "/yzm?d=" + currentTime;
        else
            $("img.j_captcha").attr("src",
                "/yzm?d=" + currentTime);
    }

    function showFetch() {
        layer
            .open({
                type: 1, //Page层类型
                area: ['500px', '300px'],
                skin: "",
                title: ['找回密码',
                    'border:none; background:#CAE1FF; color:#000;'
                ],
                shade: 0.6, //遮罩透明度
                maxmin: false, //允许全屏最小化
                anim: 0, //0-6的动画形式，-1不开启
                content: '<div class="findMM" ><table>' +
                    '<tr><td class="label">账号：</td><td><input type="text" id="f_account" value="" class="login_I" tabIndex="1" placeholder="请输入账号"></td></tr>' +
                    '<tr><td class="label">凭据：</td><td><input type="text" id="f_mmtip" value="" class="login_I" tabIndex="2" placeholder="请输入凭据"></td></tr>' +
                    '<tr><td class="label">验证码：</td><td><input id="f_verifycode" class="login_I verifycode" tabIndex="3"  value=""  type="text" maxlength=4 placeholder="请输入验证码">' +
                    '<img src="yzm?d=' +
                    currentTime +
                    '" class="j_captcha verifytxt" onClick="changeVerifyCode()"/></td></tr>' +
                    '</table>' + (true ? '' : '凭据默认为身份证号或护照号') + '<input type="button" onclick="fetch();" value="找回" class="btn btn-primary btn-lg" style="float:right;"></div>'
            });
    }

    function fetch() {
        var account = $("#f_account").val();
        var verifycode = $("#f_verifycode").val();
        var mmtip = $("#f_mmtip").val();

        if (account == "") {
            layer.msg('请输入账号！', {
                time: 800
            });
            $('#f_account').focus();
            return false;
        }

        if (mmtip == "") {
            layer.msg('请输入您的密码找回凭据(在个人基本信息中设定)!', {
                time: 800
            });
            $('#f_mmtip').focus();
            return false;
        }

        if (verifycode == "") {
            layer.msg('请输入验证码！', {
                time: 800
            });
            $('#f_verifycode').focus();
            return false;
        }

        var l_index = layer.load(1, {
            shade: [0.1, '#fff']
                //0.1透明度的白色背景
        });;
        $.ajax({
            url: "/login!fetchMm.action",
            type: "POST",
            data: {
                account: account,
                mmtip: mmtip,
                verifycode: verifycode
            },
            dataType: "json",
            complete: function() {
                layer.close(l_index);
            },
            success: function(result) {
                if (result.status == 'y') { //成功
                    layer.alert("密码重置成功：" + result.msg + "，<br>登陆后请尽快修改",
                        7,
                        function() {
                            layer.closeAll();
                        });
                } else { //失败
                    changeVerifyCode();
                    layer.alert(result.msg);
                }
            },
            error: function() {
                layer.alert("登录超时，请稍后重试！");
            }
        });
    }
}

export { myLogin }