//初始化菜单项
require(['jquery', 'avalon'], function($, _){
    avalon.ready(function() {
        //目前仅支持二级菜单
        var menus = avalon.define({
            $id: "menus",
            datas: [{
                    code: 'M0001',
                    name: '首頁',
                    url: '#'
                },
                {
                    code: 'M0002',
                    name: '柵格系統',
                    url: '#'
                },
                {
                    code: 'M0003',
                    name: '排版',
                    url: '#'
                },
                {
                    code: 'M0004',
                    name: '控件',
                    url: '#',
                    child: [{
                        code: 'M0041',
                        name: '面板',
                        url: 'view/panel.html'
                    },{
                        code: 'M0042',
                        name: '表单',
                        url: 'view/form.html'
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
                        url: 'view/table.html'
                    }]
                },
                {
                    code: 'M0006',
                    name: '模态框',
                    url: 'view/model.html'
                },
                {
                    code: 'M0007',
                    name: '警告框',
                    url: 'view/prompt.html'
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
