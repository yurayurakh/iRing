$(document).ready(function () {
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
        if (hook.getAttribute('data-hook') == 'nohook') {
            $('#ihook').val('hook');
            hook.setAttribute('data-hook', 'hook');
        } else {
            $('#ihook').val('nohook');
            hook.setAttribute('data-hook', 'nohook');
        }
    });
    $("a").click(function () {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
        return false;
    });
});
(function () {
    var app = {
        initialize: function () {
            this.setUpListeners();
        }, setUpListeners: function () {
            $('form').on('submit', app.submitForm);
            $('form').on('keydown', 'input', app.removeError);
        }, submitForm: function (e) {
            e.preventDefault();
            var form = $(this), submitBtn = form.find('input[type="submit"]');
            if (app.validateForm(form) === false)return false;
            submitBtn.attr('disabled', 'disabled');
            var str = form.serialize();
            $.ajax({url: 'contact_form/contact_process.php', type: 'POST', data: str}).done(function (msg) {
                if (msg === "OK") {
                    setTimeout(function () {
                        $(".close").click();
                    }, 500);
                    setTimeout(function () {
                        $('.success-modal').click();
                    }, 1000);
                    setTimeout(function () {
                        $('.close-modal').click();
                        $('form input[type="text"], form input[type="email"], form input[type="tel"], input[name="type"], input[name="ihook"], input[type="checkbox"] ').val('');
                    }, 3000);
                } else {
                    form.html(msg);
                }
            }).always(function () {
                submitBtn.removeAttr('disabled');
            });
        }, validateForm: function (form) {
            var inputs = form.find('input'), valid = true;
            $.each(inputs, function (index, val) {
                var input = $(val), val = input.val(), formGroup = input.parents('.form-group');
                if (val.length === 0) {
                    formGroup.addClass('has-error').removeClass('has-success');
                    valid = false;
                } else {
                    formGroup.addClass('has-success').removeClass('has-error');
                }
            });
            return valid;
        }, removeError: function () {
            $(this).parents('.form-group').removeClass('has-error')
        }
    };
    app.initialize();
}());