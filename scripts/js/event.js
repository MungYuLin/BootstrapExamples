//初始化菜单项
require(['jquery', 'avalon', 'tabs'], function($, _) {

    $(function() {
        $('#tabs').addtabs();
        //多个Model重叠支持
        $('.modal').on('show.bs.modal', '.modal', function(event) {
            $(this).appendTo($('body'));
        }).on('shown.bs.modal', '.modal.in', function(event) {
            setModalsAndBackdropsOrder();
        }).on('hidden.bs.modal', '.modal', function(event) {
            setModalsAndBackdropsOrder();
        });

        function setModalsAndBackdropsOrder() {
            var modalZIndex = 1040;
            $('.modal.in').each(function(index) {
                var $modal = $(this);
                modalZIndex++;
                $modal.css('zIndex', modalZIndex);
                $modal.next('.modal-backdrop.in').addClass('hidden').css('zIndex', modalZIndex - 1);
            });
            $('.modal.in:visible:last').focus().next('.modal-backdrop.in').removeClass('hidden');
        }
    })

    avalon.ready(function() {
        var homeVM = avalon.define({
            $id: "homeVM",
            OldPassword: "",
            NewPassword: "",
            ConfirmNewPassword: "",
            passwork: function() {
                //
            },
            lock: function() {
                //
            },
            exit: function() {
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
                },
                {
                    code: 'M0002',
                    name: '柵格系統',
                    url: 'view/grid.html'
                },
                {
                    code: 'M0003',
                    name: '排版',
                    url: 'view/type.html'
                },
                {
                    code: 'M0004',
                    name: '控件',
                    url: '#',
                    child: [{
                        code: 'M0041',
                        name: '面板',
                        url: 'view/panels.html'
                    },{
                        code: 'M0042',
                        name: '表单',
                        url: 'view/forms.html'
                    },{
                        code: 'M0043',
                        name: '按钮',
                        url: '#'
                    },{
                        code: 'M0044',
                        name: 'input',
                        url: '#'
                    },{
                        code: 'M0045',
                        name: '自动完成',
                        url: '#'
                    },{
                        code: 'M0045',
                        name: '表格',
                        url: 'view/tables.html'
                    }]
                },
                {
                    code: 'M0006',
                    name: '模态框',
                    url: 'view/modals.html'
                },
                {
                    code: 'M0007',
                    name: '警告框',
                    url: 'view/alerts.html'
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
