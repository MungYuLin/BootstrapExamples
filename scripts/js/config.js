define(['jquery'], function($, _) {
    window.objCustom = {
        validation: {
            isNullOrWhiteSpace: function(a) {
                return (a === null || (typeof a === 'undefined') || (typeof a === 'string' && a === ''));
            },
            isArray: function(o) {
                return toString.call(o) === '[object Array]';
            },
            isBoolean: function(o) {
                return o === true || o === false || toString.call(o) === '[object Boolean]';
            },
            isDate: function(o) {
                return toString.call(o) === '[object Date]';
            },
            isError: function(o) {
                return toString.call(o) === '[object Error]';
            },
            isFunction: function(o) {
                return toString.call(o) === '[object Function]' || typeof o === 'function';
            },
            isNan: function(o) {
                return o !== o;
            },
            isNull: function(o) {
                return o === null;
            },
            isNumber: function(o) {
                return this.isNan(o) && toString.call(o) === '[object Number]';
            },
            isObject: function(o) {
                var type = typeof o;
                return type === 'function' || type === 'object' && !!o;
            },
            isIDCard: function(a) {
                //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                return reg.test(a);
            },
            isPhone: function(a) {
                //电话号码正则表达式（支持手机号码，3-4位区号，7-8位直播号码，1－4位分机号）
                //var reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
                var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
                return reg.test(a);
            },
            isEmail: function(a) {
                var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return reg.test(a);
            }
        },
        format: {
            /**
             * 替换字符串
             * eg: sprintf('xxx%sxxx',xxx)
            **/
            sprintf: function(str) {
                var args = arguments,
                    flag = true,
                    i = 1;

                str = str.replace(/%s/g, function() {
                    var arg = args[i++];

                    if (typeof arg === 'undefined') {
                        flag = false;
                        return '';
                    }
                    return arg;
                });
                return flag ? str : '';
            },
            /**
             * 获取日期时间，可进行加减日期
             * @param   {date}      日期
             * @param   {String}    进行加减的类型
             * @param   {number}    加减日期的数值
             * eg: getDateTime(new Date(), 'date', -1)
            **/
            getDateTime: function(date, type, o) {
                var d = date;
                if(!window.vb.validate.isNullOrWhiteSpace(type) && window.vb.validate.isNumber(o)) {
                    switch (type) {
                        case 'date':
                            d = date.setDate(date.getDate() + o);
                            break;
                        case 'month':
                            d = date.setMonth(date.getMonth() + o);
                            break;
                        case 'year':
                            d = date.setFullYear(date.getYear() + o);
                            break;
                        default:
                            break;
                    }
                }
                return new Date(d);
            },
            /**
             * http://www.cnblogs.com/zhangpengshou/archive/2012/07/19/2599053.html
             * 对Date的扩展，将 Date 转化为指定格式的String
             * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符
             * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
             * @param   {date}      日期
             * @param   {String}    格式
             * eg: dateToString(new Date(), 'yyyy-MM-dd hh:mm:ss.S')
            **/
            dateToString: function(date, o) {
                if (date instanceof Date) {
                    var d = {
                        "M+": date.getMonth() + 1,
                        "d+": date.getDate(),
                        "h+": date.getHours(),
                        "m+": date.getMinutes(),
                        "s+": date.getSeconds(),
                        "q+": Math.floor((date.getMonth() + 3) / 3),
                        "S": date.getMilliseconds()
                    };
                    if (/(y+)/.test(o)) o = o.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                    for (var k in d)
                        if (new RegExp("(" + k + ")").test(o)) o = o.replace(RegExp.$1, (RegExp.$1.length == 1) ? (d[k]) : (("00" + d[k]).substr(("" + d[k]).length)));
                }
                return o;
            }
        },
        message: {
            extend: function(type, msg, title, icon, btnok, btncl, timeout) {
                var _model = function(options) {
                    var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
                    var alr = $("#alertModel-MessageBox");
                    var ahtml = alr.html();
                    var timer;

                    var _alert = function(options) {
                        alr.html(ahtml);
                        alr.find('.ok').removeClass('btn-success').addClass('btn-primary');
                        alr.find('.cancel').hide();

                        _dialog(options);

                        return {
                            on: function(callback) {
                                if (callback && callback instanceof Function) {
                                    alr.find('.ok').click(function() {
                                        callback(true)
                                    });
                                    alr.find('.close').click(function() {
                                        callback(true)
                                    })
                                }
                            }
                        };
                    };

                    var _confirm = function(options) {
                        alr.html(ahtml);
                        alr.find('.ok').removeClass('btn-primary').addClass('btn-success');
                        alr.find('.cancel').show();

                        _dialog(options);

                        return {
                            on: function(callback) {
                                if (callback && callback instanceof Function) {
                                    alr.find('.ok').click(function() {
                                        callback(true)
                                    });
                                    alr.find('.cancel').click(function() {
                                        callback(false)
                                    });
                                }
                            }
                        };
                    };

                    var _dialog = function(options) {
                        var ops = {
                            msg: "提示内容",
                            title: "操作提示",
                            icon: "",
                            color: "",
                            btnok: "确定",
                            btncl: "取消",
                            timeout: 3000
                        };

                        $.extend(ops, options);

                        var html = alr.html().replace(reg, function(node, key) {
                            return {
                                Title: ops.title,
                                Message: ops.msg,
                                Icon: ops.icon,
                                Color: ops.color,
                                BtnOk: ops.btnok,
                                BtnCancel: ops.btncl
                            }[key];
                        });

                        alr.html(html);
                        alr.modal({
                            width: 500
                        });

                        if(ops.timeout != 0){
                            timer = setTimeout(function() {
                                alr.modal('hide');
                            }, ops.timeout);
                        }

                        alr.on('hidden.bs.modal', function (e) {
                            clearTimeout(timer);
                            alr.html(ahtml);
                        })
                    }

                    return {
                        alert: _alert,
                        confirm: _confirm,
                    }
                }

                var opt = {
                    msg: msg,
                    title: title,
                    icon: icon,
                    color: '',
                    btnok: btnok,
                    btncl: btncl,
                    timeout: timeout
                }
                if(type === "confirm") {
                    opt.color = '#ec971f';
                    return _model().confirm(opt);
                } else {
                    switch (type) {
                        case 'success':
                            opt.color = '#5cb85c';
                            break;
                        case 'warning':
                            opt.color = '#ec971f';
                            break;
                        case 'danger':
                            opt.color = '#c9302c';
                            break;
                        case 'info':
                            opt.color = '#31b0d5';
                            break;
                        default:
                            break;
                    }
                    return _model().alert(opt);
                }
            },
            /**
             * 成功提示框
             * @param   {String}      内容
             * @param   {String}    标题
             * @param   {String}    图标
             * @param   {String}    确认按钮
             * @param   {int}    自动关闭时间（秒）
            **/
            success: function(msg, title, icon, btnok, timeout) {
                if(msg == null || msg == "" || typeof(msg) == "undefined")
                    msg = "操作成功了！";
                if(title == null || title == "" || typeof(title) == "undefined")
                    title = "成功信息";
                if(icon == null || icon == "" || typeof(icon) == "undefined")
                    icon = "glyphicon glyphicon-ok-sign";
                return this.extend('success', msg, title, icon, btnok, "取消", timeout);
            },
            /**
             * 警告提示框
             * @param   {String}      内容
             * @param   {String}    标题
             * @param   {String}    图标
             * @param   {String}    确认按钮
             * @param   {int}    自动关闭时间（秒）
            **/
            warning: function(msg, title, icon, btnok, timeout) {
                if(msg == null || msg == "" || typeof(msg) == "undefined")
                    msg = "操作中出现警告！";
                if(title == null || title == "" || typeof(title) == "undefined")
                    title = "警告信息";
                if(icon == null || icon == "" || typeof(icon) == "undefined")
                    icon = "glyphicon glyphicon-warning-sign";
                return this.extend('warning', msg, title, icon, btnok, "取消", timeout);
            },
            /**
             * 错误提示框
             * @param   {String}      内容
             * @param   {String}    标题
             * @param   {String}    图标
             * @param   {String}    确认按钮
             * @param   {int}    自动关闭时间（秒）
            **/
            danger: function(msg, title, icon, btnok, timeout) {
                if(msg == null || msg == "" || typeof(msg) == "undefined")
                    msg = "操作中出现错误！";
                if(title == null || title == "" || typeof(title) == "undefined")
                    title = "错误信息";
                if(icon == null || icon == "" || typeof(icon) == "undefined")
                    icon = "glyphicon glyphicon-remove-sign";
                return this.extend('danger', msg, title, icon, btnok, "取消", timeout);
            },
            /**
             * 信息提示框
             * @param   {String}      内容
             * @param   {String}    标题
             * @param   {String}    图标
             * @param   {String}    确认按钮
             * @param   {int}    自动关闭时间（秒）
            **/
            info: function(msg, title, icon, btnok, timeout) {
                if(msg == null || msg == "" || typeof(msg) == "undefined")
                    msg = "操作中出现信息！";
                if(title == null || title == "" || typeof(title) == "undefined")
                    title = "提示信息";
                if(icon == null || icon == "" || typeof(icon) == "undefined")
                    icon = "glyphicon glyphicon-info-sign";
                return this.extend('info', msg, title, icon, btnok, "取消", timeout);
            },
            /**
             * 确认提示框
             * @param   {String}      内容
             * @param   {String}    标题
             * @param   {String}    图标
             * @param   {String}    确认按钮
             * @param   {String}    取消按钮
             * @param   {int}    自动关闭时间（秒）
            **/
            confirm: function(msg, title, icon, btnok, btncl, timeout) {
                if(timeout == null || timeout == "" || typeof(timeout) == "undefined") {
                    timeout = 0;//不自动关闭
                }
                if(msg == null || msg == "" || typeof(msg) == "undefined")
                    msg = "是否确定进行此操作？";
                if(title == null || title == "" || typeof(title) == "undefined")
                    title = "操作提示";
                if(icon == null || icon == "" || typeof(icon) == "undefined")
                    icon = "glyphicon glyphicon-question-sign";
                return this.extend('confirm', msg, title, icon, btnok, btncl, timeout);
            }
        },
        ajax: function(o) {
            var AJAX = function(ops) {
                var fn = {
                    error: function(XMLHttpRequest, textStatus, errorThrown) {},
                    success: function(data, textStatus) {},
                    complete: function(XMLHttpRequest, textStatus) {},
                    beforeSend: function(XMLHttpRequest, settings) {},
                }
                if (ops.success)
                    fn.success = ops.success;
                if (ops.error)
                    fn.error = ops.error;
                if (ops.complete)
                    fn.complete = ops.complete;
                if (ops.beforeSend)
                    fn.beforeSend = ops.beforeSend;
                var url = ""
                $.ajax({
                    url : url + ops.url,
                    type: (ops.type == null || ops.type == "" || typeof(ops.type) == "undefined") ? "get" : ops.type,
                    dataType: (ops.dataType == null || ops.dataType == "" || typeof(ops.dataType) == "undefined")? "json" : ops.dataType,
                    data: ops.data,
                    async: (ops.async == null || ops.async == "" || typeof(ops.async) == "undefined")? "true" : ops.async,
                    context: ops.context,
                    timeout: ops.timeout,
                    // beforeSend: function(XMLHttpRequest, settings){
                    //     if (settings.type == 'GET' || settings.type == 'POST' || settings.type == 'PUT' || settings.type == 'DELETE') {
                    //         XMLHttpRequest.setRequestHeader("Token", 'token');
                    //     }
                    //     fn.beforeSend(XMLHttpRequest, settings);
                    // },
                    success: function(data, textStatus) {
                        if(data != null) {
                            fn.success(data, textStatus);
                        } else {
                            fn.error("數據爲空！", textStatus);
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        if(XMLHttpRequest.readyState === 0) {
                            objCustom.message.danger("未找到數據連接！");
                        } else {
                            objCustom.message.danger(XMLHttpRequest.responseText);
                        }
                        fn.error(XMLHttpRequest, textStatus, errorThrown);
                    },
                    complete: function(XMLHttpRequest, textStatus) {
                        fn.complete(XMLHttpRequest, textStatus);
                    }
                });
            };
            return new AJAX(o);
        },
        session: {
            get: function(key) {
                //return sessionStorage.getItem(key);
                return localStorage.getItem(key)
            },
            set: function(key, value) {
                //sessionStorage.setItem(key, value);
                localStorage.setItem(key, value);
                return true;
            },
            remove: function(key) {
                //sessionStorage.removeItem(key);
                localStorage.removeItem(key)
                return true;
            },
            clear: function() {
                //sessionStorage.clear();
                localStorage.clear();
                return true;
            }
        },
        initWindow: {
            /**
             * 获取可顯示内容页高度
            **/
            getDisplayHeight: function() {
                var height = $(window).height() - $('body').find('nav.navbar').height() - $('body').find('footer.footer').height();
                var $element = $('body').find('div#tabs');
                return height - $element.find('ul.nav-tabs').height();
            },
            /**
             * 設置內容页高度
            **/
            setTabsHeight: function() {
                $element = $('body').find('div#tabs');
                var height = this.getDisplayHeight();
                $element.find('div.tab-content').css(
                    "max-height", function(index, value) {
                        return height;
                    }
                );
            },
            /**
             * 多个Model重叠設置
            **/
            setModalsAndBackdropsOrder: function() {
                var modalZIndex = 1040;
                $('.modal.in').each(function(index) {
                    var $modal = $(this);
                    modalZIndex++;
                    $modal.css('zIndex', modalZIndex);
                    $modal.next('.modal-backdrop.in').addClass('hidden').css('zIndex', modalZIndex - 1);
                });
                $('.modal.in:visible:last').focus().next('.modal-backdrop.in').removeClass('hidden');
            }
        }
    }
})
