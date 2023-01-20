/**
 * Класс позволяет сгруппировать изображения в фотоальбомы, для дальнейшего применения на них колорбокса
 * для определения какое изображение относится к какой группе используется класс rs-gallery-x где x - целое число (номер альбома)
 */

function rsGallery() {
    
    /**
     * свойство содержит галереи и хи фотки
     */
    
    this.gArr = {};
    
    /**
     * метод собирает все изображения, группируя их в альбомы (спец дивы)
     *
     * @return - true или false
     */
    
    this.init = function() {
        var objArr = [];
        var id;
        var html;
        var imgBlock;
        var pBlock;
        var pString;
        
        if ($("img[class*='rs-gallery-']").length == 0)
            return false;
            
        this.replacingPToDiv();
            
        // собираем все необходимые объекты
        $("img[class*='rs-gallery-']").each(function(){
            objArr.push($(this));
        });
        
        // сортируем по галереям
        for (i = 0; objArr[i]; i++) {
            // получаем id альбома
            id = this.getID(objArr[i]);
            
            if (!this.gArr[id])
                this.gArr[id] = [];
                
            this.gArr[id].push(objArr[i]);
        }
        
        // создаем обвертку фотоальбома
        for (index in this.gArr) {
            this.gArr[index][0].before('<div class="rs-gallery rs-gallery-' + index + ' rs-row"></div>');
            
            // обвертка изображений
            imgBlock = this.gArr[index][0].parent().find('.rs-gallery-' + index);
            for (i = 0; this.gArr[index][i]; i++) {
                html = ''
                    + '<div class="rs-x3 rs-m3 rs-s12">'
                        + '<div class="rs-gallery-img">'
                            + '<a href="' + this.gArr[index][i].attr('src') + '" rel="rs-gallery-colorbox-' + index + '">'
                                + '<img src="/preview/300/300/true' + this.gArr[index][i].attr('src') + '" alt="">'
                            + '</a>'
                        + '</div>'
                    + '</div>'
                ;
                
                imgBlock.append(html);
                this.gArr[index][i].remove();
            }
            
            if ($("a[rel='rs-gallery-colorbox-" + index + "']").length > 0)
                $("a[rel='rs-gallery-colorbox-" + index + "']").colorbox();
        }
        
        return true;
    };
    
    /**
     * метод заменят абзацы в которых лежат фотки галереи на дивы
     */
    
    this.replacingPToDiv = function() {
        // листаем все p
        $('p').each(function() {
            if ($(this).find("img[class*='rs-gallery-']").length > 0) {
                $(this).replaceWith('<div class="rs-gallery-p">' + $(this).html() + '</div>');
            }
        });
    };
    
    /**
     * метод получает из класса id альбома
     *
     * @return - id или false
     *
     * @param object obj - объект jquery
     */
    
    this.getID = function(obj) {
        var attr  = obj.attr('class');
        var id    = /([0-9]+)/.exec(attr);
        
        return (id == null) ? false : parseInt(id[0]);
    };
}
