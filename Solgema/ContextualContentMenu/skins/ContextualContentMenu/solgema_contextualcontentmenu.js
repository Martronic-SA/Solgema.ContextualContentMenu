function hideAllContextualMenus() {
    $('#contextualContentMenu dl.actionMenu').removeClass('activated').addClass('deactivated');
};

function toggleContextualMenuHandler(event) {
    $(this).parents('.actionMenu:first').toggleClass('deactivated').toggleClass('activated');
    return false;
};

function actionContextualMenuDocumentMouseDown(event) {
    if ($(event.target).parents('.actionMenu:first').length) return true;
    hideAllContextualMenus();
};

function actionContextualMenuMouseOver(event) {
    var menu_id = $(this).parents('.actionMenu:first').attr('id');
    if (!menu_id) return true;
    var switch_menu = $('#contextualContentMenu dl.actionMenu.activated').length > 0;
    $('#contextualContentMenu dl.actionMenu').removeClass('activated').addClass('deactivated');
    if (switch_menu) $('#contextualContentMenu #' + menu_id).removeClass('deactivated').addClass('activated');
};

function initializeContextualMenus() {
    $(document).mousedown(actionContextualMenuDocumentMouseDown);
    hideAllContextualMenus();
    $('#contextualContentMenu dl.actionMenu dt.actionMenuHeader a').click(toggleContextualMenuHandler).mouseover(actionContextualMenuMouseOver);
    $('#contextualContentMenu dl.actionMenu > dd.actionMenuContent').click(hideAllContextualMenus);
};

function closeContextualContentMenu(event) {
    if ($(event.target).parents('#contextualContentMenu:first').length) return true;
    $('.contentmenu_selected').removeClass('contentmenu_selected');
    $('#contextualContentMenu').remove();
};

function openContextualContentMenu(event, element, menuTemplate, afterContextualContentMenuOpened, path, data) {
    if (!menuTemplate) var menuTemplate = '@@contextualContentMenu';
    if (!element) var element = this;
    if (!data) var data = {};
    event.preventDefault();
    $(document).mousedown(closeContextualContentMenu);
    $('.contentmenu_selected').removeClass('contentmenu_selected');
    $(element).addClass('contentmenu_selected');
    $('#contextualContentMenu').remove();
    $('#kss-spinner').show();
    $('.plone-loader').show();
    if (!path) {
        if ($(element).attr('href')) {
            var path = $(element).attr('href');
        } else if ($(element).find('a.contextualContentMenuLink').attr('href')) {
            var path = $(element).find('a.contextualContentMenuLink').attr('href');
        } else if ($(element).find('a').attr('href')) {
            var path = $(element).find('a').attr('href');
        } else if ($(element).parents('a.contextualContentMenuLink').attr('href')) {
            var path = $(element).parents('a.contextualContentMenuLink').attr('href');
        } else if ($(element).parents('a').attr('href')) {
            var path = $(element).parents('a').attr('href');
        }
    }
    if (path.substring(path.length-5, path.length) == '/view') var path = path.substring(0, path.length-5);
    if (path.substring(path.length-16, path.length) == '/folder_contents') var path = path.substring(0, path.length-16);
    $.get(path+'/'+menuTemplate, data,
        function (msg) {
            if (msg) {
                $('body').append(msg);
                var bodywidth = $('body').width();
                var content_menu = $('#contextualContentMenu');
                if (content_menu.length == 0) {
                    var content_menu = $('nav.plone-toolbar-main');
                }
                if ( bodywidth < event.pageX+400) {
                    content_menu.addClass('onleft');
                    if ( bodywidth < event.pageX+150) {
                        content_menu.css('right', bodywidth-event.pageX+20+'px');
                        content_menu.css('top', event.pageY+10+'px');
                    } else {
                    content_menu.css('left', event.pageX+20+'px');
                    content_menu.css('top', event.pageY+10+'px');
                    }
                } else {
                    content_menu.css('left', event.pageX+20+'px');
                    content_menu.css('top', event.pageY+10+'px');
                }
                $(initializeContextualMenus);
            }
            if (afterContextualContentMenuOpened) afterContextualContentMenuOpened(event);
            $('#kss-spinner').css('display','none');
            $('.plone-loader').hide();
        }
    );
    return false;
};

function activateContextualContentMenu() {
    $('.contextualContentMenuEnabled').bind("contextmenu", openContextualContentMenu);
};

$(activateContextualContentMenu);



