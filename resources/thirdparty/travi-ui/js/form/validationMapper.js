(function (travi) {
    'use strict';

    function addErrorFor($field, errorText) {
        $field
            .addClass('ui-state-error')
            .after('<label class="ui-state-error" for="' + $field.attr('name') + '">' + errorText + '</label>');
    }

    function showErrors(form, errors) {
        var $form = $(form),
            fieldName;

        for (fieldName in errors) {
            if (errors.hasOwnProperty(fieldName)) {
                addErrorFor($form.find('input[name=' + fieldName + ']'), errors[fieldName]);
            }
        }
    }

    travi.register('ui.form.validationMapper', {
        showErrors: showErrors
    });
}(travi));