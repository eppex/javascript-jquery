// Function Check Extension Multi
    (function($) {
        $.fn.checkFileTypeMulti = function(options) {
            let defaults = {
                allowedExtensions: [],
                success: function() {},
                error: function() {}
            };
            options = $.extend(defaults, options);

            return this.each(function() {
                $(this).on('change', function() {
                    let files = $(this).prop("files");
                    let names = $.map(files, function(val) { return val.name; });
                    let extension = [];
                    let successi = [];
                    for(let j = 0; j < names.length; j++) {
                        extension.push(names[j].substring(names[j].lastIndexOf('.') + 1));
                    }
                    for(let k = 0; k < extension.length; k++) {
                        if ($.inArray(extension[k], options.allowedExtensions) == -1) {
                            successi.push(0);
                        } else {
                            successi.push(1);
                        }
                    }

                    if ($.inArray(1, successi) == -1) {
                        options.error();
                        $(this).focus();
                    } else {
                        if($.inArray(0, successi) == -1) {
                            options.success();
                        } else {
                            options.error();
                            $(this).focus();
                        }
                    }
                });
            });
        };
    })(jQuery);

// Check IMG extension
    $("#file_selector").checkFileTypeMulti({
        allowedExtensions: ['jpeg', 'jpg', 'png'],
        success: function() {
            let files_up = document.getElementById("file_selector").files;
            let names_up = $.map(files_up, function(val) { return val.name; });

            if(files_up.length > LIMIT_IMG) {
                Swal.fire('Attenzione!', 'Puoi caricare soltanto ' + LIMIT_IMG + ' immagini.', 'error');
            }
            else {
                for (let i = 0; i < names_up.length; i++) {
                    console.log(names_up[i]);
                }
            }
        },
        error: function() {
            Swal.fire("Attenzione!", "Formato non consentito presente nei files selezionati!", "error");
        }
    });
