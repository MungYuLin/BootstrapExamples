define(['jquery', 'bootstrap', 'avalon'], function() {
    var loginVM = avalon.define({
        $id: "loginVM",
        LoginName: "",
        LoginPwd: "",
        login: function() {
            window.location.href = "index.html";
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
