// класс заточен под определенную верстку (в общем кастыль еще тот)

function rsComment() {

    /**
     * свойство массив с полями
     */

    this.fields = {};

    /**
     * свойство содержит форму
     */

    this.form;

    /**
     * свойство содержит id комментария
     */

    this.id = 0;

    /**
     * свойство содержит родителя для ответа
     */

    this.parent = 0;

    /**
     * метод сохраняет чистый html формы
     * @return - сам себя
     */

    this.saveForm = function() {
        this.form = $('#formID').html();

        return this;
    };

    /**
     * метод перемещает форму
     *
     * @return - сам себя
     */

    this.setPosition = function() {
        // сохраняем введенные данные
        this.saveFields();

        // убиваю форму
        $('#formID').remove();

        // перемещаем туда куда нужно
        var html = '<div id="formID" class="rs-comment-form">' + this.form + '</div>';

        if (this.parent == 0)
            $('.form-' + this.parent).html(html);

        else if ($('#comments_block').css('display') != 'none')
            $('#comments_block .form-' + this.parent).html(html);

        else if ($('#comment_block').css('display') != 'none')
            $('#comment_block .form-' + this.parent).html(html);

        // заполняем поля данными
        this.returnFields();

        if (this.parent != 0)
            $('#formID .rs-form-close a').removeClass('rs-hide');
        else
            $('#formID .rs-form-close a').addClass('rs-hide');

        return this;
    };

    /**
     * метод инициализирует бб коды
     * @return - сам себя
     */

    this.setBBCode = function() {
        $('#comment-text').markItUp(myBbcodeSettings);

        return this;
    };

    /**
     * метод переносит юзера к комментарию
     *
     * @return - true или false
     */

    this.goTo = function() {

        if (this.id == 0) {
            // получаем id из хэша
            this.id = this.getIDByHash();

            // если он равен false
            if (this.id == false) {
                // изменяем принудительно на ноль
                this.id = 0;
                // выбрасываем false
                return false;
            }
        }

        // если мы на втором блоке
        if ($('#comments_block').css('display') == 'none')
            this.close();

        $.scrollTo('#comments_block .rs-comment-' + this.id, 300);

        return true;
    };

    /**
     * метод инициализирует защиту от спама
     *
     */

    this.spam = function() {
        // антиспам
        $('#formID input,#formID textarea').keyup(function(e) {
            if ($('#f_event').length > 0)
                $('#f_event').val('');
        });

        $('#formID select').click(function() {
            if ($('#f_event').length > 0)
                $('#f_event').val('');
        });
    };

    /**
     * метод отправляет форму
     *
     */

    this.submitForm = function() {
        // антиспам
        $('#formID > form').attr('onsubmit', '');
        $('#formID > form').find('.rs-btn').attr('disabled', true);
        $('#formID > form').submit();
    };

    /**
     * метод закрывает ответы
     *
     * @return - сам себя
     */

    this.close = function () {
        var self = this;

        self.setParent(0).setPosition().setBBCode().spam();

        // листаем до топа
        $.scrollTo('#rs-comment-top', 300, function () {
            // прячем второй блок
            $('#comment_block').fadeOut(300, function () {
                $('#comment_block #comment').html('');

                $('#comments_block').fadeIn(300, function() {
                    $.scrollTo('.rs-comment-' + self.id, 300);
                });
            });
        });
    };

    /**
     * метод сохраняет поля
     *
     * @return - сам себя
     */

    this.showAnswer = function () {
        var self = this;

        self.setParent(0).setPosition().setBBCode().spam();

        // если нет ответов
        if ($('#comments_block .rs-answer-' + self.id).length == 0)
            return false;

        // если сейчас открыт первый блок и нет ответов
        if ($('#comments_block').css('display') != 'none' && $('#comments_block .rs-answer-' + self.id).length == 0)
            return this;

        // листаем до топа
        $.scrollTo('#rs-comment-top', 300, function () {
            // в случае если находимся на главном блоке
            if ($('#comments_block').css('display') != 'none') {
                // прячем главный блок
                $('#comments_block').fadeOut(300, function () {
                    self.getAnswer();

                    $('#comment_block').fadeIn(300);
                });
            }
            else {
                // прячем второй блок
                $('#comment_block').fadeOut(300, function () {
                    self.getAnswer();

                    $('#comment_block').fadeIn(300);
                });
            }
        });
    };

    /**
     * метод получает ответы
     *
     */

    this.getAnswer = function () {
        // собираем ответы
        var self       = this;
        var commentArr = [];

        // чистим
        $('#comment_block #comment').html('');

        commentArr.push($('#comments_block .rs-comment-' + self.id).clone());

        $('#comments_block .rs-answer-' + self.id).each(function() {
            commentArr.push($(this).clone());
        });

        // листаем комментарии
        for (i = 0; commentArr[i]; i++) {
            // если первый комментарий, то вставляем его как главный
            if (i == 0) {
                $('#comment_block #comment').html(commentArr[i]);
                $('#comment_block #comment > div').eq(0).html('<div class="rs-current-comm">' + $('#comment_block #comment > div').eq(0).html() + '</div>');

                $('#comment_block #comment > div').eq(0).find('.rs-comment-panel a').eq(0).addClass('rs-hide');
                $('#comment_block #comment > div').eq(0).find('.rs-comment-panel a').eq(1).removeClass('rs-hide');
            }
            else {
                $('#comment_block #comment .rs-comment-point:last-child').after(commentArr[i]);
            }
        }

    };

    /**
     * метод получает из класса id альбома
     *
     * @return - сам себя
     *
     * @param integer parent - id родителя
     */

    this.setParent = function(parent) {
        this.parent = parseInt(parent);
        $('#formID #comment-parent').val(this.parent);

        return this;
    };

    /**
     * метод получает id из хэша
     *
     * @return - false или id
     *
     * @param integer id - id комментария
     */

    this.getIDByHash = function(id) {
        // получаем хэш
        var hash  = window.location.hash;

        // если его нет
        if (hash.length == 0)
            return false;

        // чистим
        hash = hash.replace(/#/, '');

        // если не подходит по регулярке
        if (!/^[a-z-]+\_[0-9]+$/.test(hash))
            return false;

        // вырезаем числа
        var id = /([0-9]+)/.exec(hash);

        // вертаем или false или число
        return (id == null) ? false : parseInt(id[0]);
    };

    /**
     * метод запоминает id
     *
     * @return - сам себя
     *
     * @param integer id - id комментария
     */

    this.setID = function(id) {
        this.id = parseInt(id);

        return this;
    };

    /**
     * метод сохраняет поля
     *
     * @return - сам себя
     */

    this.saveFields = function () {
        this.fields['event']  = $("#formID input[name='event']").val();
        this.fields['parent'] = $('#formID #comment-parent').val();
        this.fields['author'] = $('#formID #comment-name').val();
        this.fields['site']   = $('#formID #comment-site').val();
        this.fields['email']  = $('#formID #comment-email').val();
        this.fields['text']   = $('#formID #comment-text').val();

        return this;
    };

    /**
     * метод возвращает поля
     *
     * @return - сам себя
     */

    this.returnFields = function () {

        $("#formID input[name='event']").val(this.fields['event']);
        $('#formID #comment-parent').val(this.fields['parent']);
        $('#formID #comment-name').val(this.fields['author']);
        $('#formID #comment-site').val(this.fields['site']);
        $('#formID #comment-email').val(this.fields['email']);
        $('#formID #comment-text').val(this.fields['text']);

        return this;
    };
}
