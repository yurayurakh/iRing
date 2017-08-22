/**
 * Created by George on 28.05.2017.
 */
$(document).ready(function() {
    $('.iring').click(function (event) {
        var target = event.target;
        var el = target.getAttribute('data-type');
        var inputTypeIring = $('#type-iring');
        inputTypeIring.val(el);
    });
    $('input[type=checkbox]').click(function (event) {
        var hook = event.target;
        var label = hook.getAttribute('id');
        var lb = document.getElementsByClassName(label)[0];
        lb.classList.toggle('unchecked');
        if(hook.getAttribute('data-hook') == 'nohook'){
            $('#ihook').val('hook');
            hook.setAttribute('data-hook','hook');
        }else{
            $('#ihook').val('nohook');
            hook.setAttribute('data-hook','nohook');
        }
    })
});
