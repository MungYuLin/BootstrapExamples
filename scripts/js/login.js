define(['jquery', 'bootstrap', 'avalon', 'config'], function() {

    var loginVM = avalon.define({
        $id: "loginVM",
        LoginName: "",
        LoginPwd: "",
        login: function() {
            if(objCustom.validation.isNullOrWhiteSpace(loginVM.LoginName)) {
                objCustom.message.warning("登錄帳號不能爲空！")
                return false
            }
            if(objCustom.validation.isNullOrWhiteSpace(loginVM.LoginPwd)) {
                objCustom.message.warning("登錄密碼不能爲空！")
                return false
            }
            window.location.href = "index.html"
        }
    })
    avalon.scan();

    document.onkeydown = function(e) {
        var ev = (typeof event != 'undefined') ? window.event : e;
        if (ev && ev.keyCode == 13) {
            loginVM.login();
        }
    }
})
