$.fn.addtabs = function(options) {
    obj = $(this);
    options = $.extend({
        content: '', //直接指定所有页面TABS内容
        close: false, //是否可以关闭
        monitor: 'body', //监视的区域
        iframeUse: true, //使用iframe还是ajax
        iframeHeight: $(document).height() - 105, //固定TAB中IFRAME高度,根据需要自己修改
        callback: function() { //关闭后回调函数
        }
    }, options || {});

    $(options.monitor).on('click', '[addtabs]', function() {
        _add({
            id: $(this).attr('addtabs'),
            title: $(this).attr('title') ? $(this).attr('title') : $(this).html(),
            content: options.content ? options.content : $(this).attr('content'),
            url: $(this).attr('url'),
            ajax: $(this).attr('ajax') ? true : false
        });
    });

    obj.on('click', '.close-tab', function() {
        id = $(this).prev("a").attr("aria-controls");
        _close(id);
    });

    $(window).resize(function() {
        obj.find('iframe').attr('height', options.iframeHeight);
        _drop();
    });

    $("#btnCloseCurrentTab").on('click', function() {
        _close(obj.find("li.active").attr('id'));
    });
    $("#btnCloseTab").on('click', function() {
        _close(obj.find("li.active").attr('id'));
    });
    $("#btnCloseOtherTabs").on('click', function() {

        $('#myTab>li[class!="pider-vertical"]').not('.active').each(function() {
            $(this).remove();
        });
        obj.find(".tab-content>div").not(".active").each(function() {
            $(this).remove();
        });
    });


    _add = function(opts) {
        id = 'tab_' + opts.id;
        obj.find('.active').removeClass('active');
        //如果TAB不存在，创建一个新的TAB
        if (!$("#" + id)[0]) {
            //创建新TAB的title
            title = $('<li role="presentation" id="tab_' + id + '"><a href="#' + id + '" aria-controls="' + id + '" role="tab" data-toggle="tab">' + opts.title + '</a></li>');
            //是否允许关闭
            if (options.close) {
                title.append(' <i class="close-tab glyphicon glyphicon-remove"></i>');
            }
            //创建新TAB的内容
            content = $('<div role="tabpanel" class="tab-pane" id="' + id + '"></div>');
            //是否指定TAB内容
            if (opts.content) {
                content.append(opts.content);
            } else if (options.iframeUse && !opts.ajax) { //没有内容，使用IFRAME打开链接
                content.append('<iframe src="' + opts.url + '" width="100%" height="' + options.iframeHeight +
                    '" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling-x="no" scrolling-y="auto" allowtransparency="yes"></iframe></div>');
            } else {
                if (opts.url != "#") {
                    $.get(opts.url, function(data) {
                        //alert(data);
                        content.append(data);
                    });
                }
            }
            //加入TABS
            obj.find('.nav-tabs').append(title);
            obj.find(".tab-content").append(content);
        }

        //激活TAB
        $("#tab_" + id).addClass('active');
        $("#" + id).addClass("active");
        _drop();
    };

    _close = function(id) {
        if ($("#myTab>li").length <= 3) {
            //alert("this is last");
            return;
        } else {
            if (id != undefined) {

                //如果关闭的是当前激活的TAB，激活他的前一个TAB
                if (obj.find("li.active").attr('id') == id) {
                    $("#" + id).prev().addClass('active');
                    $("#" + id.substring(4, id.length)).prev().addClass('active');
                }
                if (obj.find("li.active").attr('id') == "tabOpMenm") {
                    $("#tabOpMenm").attr("class", "pider-vertical");
                    $("#tabOpMenm").prev().addClass('active');
                }
                if (obj.find("li.active").attr("class") == "dropdown pull-right hide tabdrop active") {
                    $("#tabblank").attr("class", "dropdown pull-right hide tabdrop");
                    $("#tabblank").next().next().next().addClass('active');
                    var nexid = $("#tabblank").next().next().next().attr("id");

                    $("#" + nexid.substring(4, nexid.length)).addClass('active');
                }
                //关闭TAB
                $("#" + id).remove();
                $("#" + id.substring(4, id.length)).remove();
                _drop();
                options.callback();
            }
        }

    };

    _drop = function() {
        element = obj.find('.nav-tabs');
        //创建下拉标签
        var dropdown = $('<li id="tabblank" class="dropdown pull-right hide tabdrop"><a class="dropdown-toggle" data-toggle="dropdown" href="#">' +
            '<i class="glyphicon glyphicon-align-justify"></i>' +
            ' <b class="caret"></b></a><ul class="dropdown-menu"></ul></li>');
        //检测是否已增加
        if (!$('.tabdrop').html()) {
            dropdown.prependTo(element);
        } else {
            dropdown = element.find('.tabdrop');
        }
        //检测是否有下拉样式
        if (element.parent().is('.tabs-below')) {
            dropdown.addClass('dropup');
        }
        var collection = 0;

        //检查超过一行的标签页
        element.append(dropdown.find('li'))
            .find('>li')
            .not('.tabdrop')
            .each(function() {
                if (this.offsetTop > 0) {
                    dropdown.find('ul').append($(this));
                    collection++;
                }
            });

        //如果有超出的，显示下拉标签
        if (collection > 0) {
            dropdown.removeClass('hide');
            if (dropdown.find('.active').length == 1) {
                dropdown.addClass('active');
            } else {
                dropdown.removeClass('active');
            }
        } else {
            dropdown.addClass('hide');
        }
    };
};
