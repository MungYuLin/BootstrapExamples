//初始化菜单项
require(['jquery', 'avalon', 'tabs'], function($, _) {

    $(function() {
        $('#tabs').addtabs()
        objCustom.initWindow.setTabsHeight()
        //多个Model重叠支持
        $('.modal').on('show.bs.modal', '.modal', function(event) {
            $(this).appendTo($('body'))
        }).on('shown.bs.modal', '.modal.in', function(event) {
            objCustom.initWindow.setModalsAndBackdropsOrder()
        }).on('hidden.bs.modal', '.modal', function(event) {
            objCustom.initWindow.setModalsAndBackdropsOrder()
        });
    })

    avalon.ready(function() {
        var homeVM = avalon.define({
            $id: "homeVM",
            OldPassword: "",
            NewPassword: "",
            ConfirmNewPassword: "",
            lockName: "用戶名",
            lockPassword: "",
            passwork: function() {
                if(objCustom.validation.isNullOrWhiteSpace(homeVM.OldPassword)) {
                    objCustom.message.warning("舊密碼不能爲空！")
                    return false
                }
                if(objCustom.validation.isNullOrWhiteSpace(homeVM.NewPassword)) {
                    objCustom.message.warning("新密碼不能爲空！")
                    return false
                }
                if(objCustom.validation.isNullOrWhiteSpace(homeVM.ConfirmNewPassword)) {
                    objCustom.message.warning("確認新密碼不能爲空！")
                    return false
                }
                if(homeVM.NewPassword != homeVM.ConfirmNewPassword) {
                    objCustom.message.danger("兩次輸入的密碼不一致！")
                    return false
                }
                objCustom.message.success("密碼修改成功！")
                $('#passworkModel').modal('hide');
            },
            lock: function() {
                $('#lockModel').modal({
                    keyboard: false,
                    backdrop: false
                })
            },
            unLock: function() {
                if(objCustom.validation.isNullOrWhiteSpace(homeVM.lockPassword)) {
                    objCustom.message.warning("密碼不能爲空！")
                    return false
                }
                $('#lockModel').modal('toggle')
            },
            exit: function() {
                objCustom.session.clear()
                window.location.href = 'login.html';
            }
        })
        //仅支持二级菜单
        var menusVM = avalon.define({
            $id: "menusVM",
            datas: [{
                    code: 'M0001',
                    name: '首頁',
                    url: '#'
                }, {
                    code: 'M0002',
                    name: '柵格系統',
                    url: 'view/grid.html'
                }, {
                    code: 'M0003',
                    name: '排版',
                    url: 'view/type.html'
                }, {
                    code: 'M0004',
                    name: '控件',
                    url: '#',
                    child: [{
                        code: 'M0041',
                        name: '面板',
                        url: 'view/panels.html'
                    }, {
                        code: 'M0042',
                        name: '表單',
                        url: 'view/forms.html'
                    }, {
                        code: 'M0043',
                        name: '表格',
                        url: 'view/tables.html'
                    }, {
                        code: 'M0044',
                        name: '自動完成',
                        url: '#'
                    }, {
                        code: 'M0045',
                        name: '按鈕',
                        url: 'view/buttons.html'
                    }, {
                        code: 'M0046',
                        name: '下拉菜單',
                        url: 'view/dropdowns.html'
                    }, {
                        code: 'M0047',
                        name: '其他',
                        url: 'view/others.html'
                    }, ]
                }, {
                    code: 'M0005',
                    name: '工具',
                    url: '#',
                    child: [{
                        code: 'M0051',
                        name: '模态框',
                        url: 'view/modals.html'
                    }, {
                        code: 'M0052',
                        name: '警告框',
                        url: 'view/alerts.html'
                    }, {
                        code: 'M0053',
                        name: '彈窗框',
                        url: 'view/popovers.html'
                    }, {
                        code: 'M0054',
                        name: '提示框',
                        url: 'view/tooltips.html'
                    }, {
                        code: 'M0055',
                        name: '標籤頁',
                        url: 'view/tabs.html'
                    }]
                }
            ]
        });
        avalon.scan();
    })
})

//初始化标签TAB
require(['tabs'], function() {
    $('#tabs').addtabs();
    var element = $('body').find('ul.navbar-nav')[0];
    $(element).find('li>a')[0].click();
})
