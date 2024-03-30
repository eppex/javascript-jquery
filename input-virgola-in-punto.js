// Trasformo la virgola in punto
$('#id_selector_of_input_text').on('change keyup', function () {
    $(this).val($(this).val().replace(/,/g, '.'));
});
