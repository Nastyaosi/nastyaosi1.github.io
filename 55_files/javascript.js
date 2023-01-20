$(document).ready(function() {
    
    var gallery = new rsGallery();
    gallery.init();
    
    // запускаем фотогалерею
    if ($("a[class='rs-colorbox_photo']").length > 0)
        $("a[class='rs-colorbox_photo']").colorbox();
    
    if ($("a[rel='rs-colorbox_group']").length > 0)
        $("a[rel='rs-colorbox_group']").colorbox();
        
    // антиспам
    $('input, textarea').keyup(function(e) {
        if ($('#f_event').length > 0)
            $('#f_event').val('');
    });
    
    $('select').click(function() {
        if ($('#f_event').length > 0)
            $('#f_event').val('');    
    });
    
    setCodeStyle();
});

$(window).load(function() {
    footer();
});

$(window).resize(function() {
    footer();
});

function setCodeStyle()
{
    var IE='\v'=='v';
    if(IE)
        return false;
    
    $('div pre').each(function(i, e) {
        if ($(this).attr('class') == '' || typeof($(this).attr('class')) == 'undefined')
            hljs.highlightBlock(e, '    ')
    });
    
    return true;
}

function stepFile(step)
{
    var hiddenInput = $("input[name='avatar_event']");
    var inp         = $("input[name='avatar']");
    
    if (step == 'update')
    {
        if ($('#delete input:checked'))
            $('#delete input').attr('checked', false);
        
        if (hiddenInput.val() == 'update')
        {
            hiddenInput.val('edit');
         
            if (!inp.hasClass('rs-hide'))
                inp.addClass('rs-hide');
        }
        else
        {
            hiddenInput.val('update');
            
            if (inp.hasClass('rs-hide'))
                inp.removeClass('rs-hide');
        }
    }
    
    if (step == 'delete')
    {
        if ($('#update input:checked'))
            $('#update input').attr('checked', false);

        if (!inp.hasClass('rs-hide'))
            inp.addClass('rs-hide');

        if (hiddenInput.val() == 'delete')
            hiddenInput.val('edit');
        else
            hiddenInput.val('delete');
    }
}

function checkRequired(obj) {
    var subjectID = obj.val();

    if ($('#s-' + subjectID).length == 0)
        return false;

    if ($('#s-' + subjectID).text() == 'true')
        $('#required-text').removeClass('rs-hide');
    else
        $('#required-text').addClass('rs-hide');
        
    return true;
}

function footer()
{
    var h = $('.rs-footer-block').innerHeight();
    
    $('.rs-content').css({
        'padding-bottom': (h + 25) + 'px'
    });
   
    $('.rs-footer-block').css({
       'margin-top': '-' + h + 'px'
    });
}

/*
function maxHeightTopNews()
{
    var box = 0;
    
    $('.rs-top-news').each(function(){
        if ($(this).height() > box)
            box = $(this).height();
    });
    
    $('.rs-top-news').css('height', box + 'px');
   
}
*/
