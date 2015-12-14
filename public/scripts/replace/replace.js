define(['jquery', 'foundation'], function ($) {
    var settings = {
        quote: '',
        wordsToExchange: {},
        isOn: false,
        $form: ''
    };

    var shouldBeTurnedOn = function () {
        if ($('body').data('page') === 'replace') {
            return true;
        }
        return false;
    };

    var getForm = function(reset) {
        if (settings.$form === '' || reset === true) {
            var form = $('form#personalize-quote');
            settings.$form = form;
        }
        return settings.$form;
    };

    var getWords = function () {
        var $form  = getForm();
        var words  = {};
        console.log('here');

        $form.find('input[type=text]').each(function(index) {
            var original    = $(this).attr('placeholder');
            var replaceWith = $(this).val();

            if (replaceWith === '') {
                replaceWith = original;
            }

            words[original] = replaceWith;
        });

        settings.wordsToExchange = words;
        console.log(settings.wordsToExchange);
    };

    var replaceWord = function(original, replaceWith, quote) {
        var capitalOriginal    = capitalizeFirstLetter(original);
        var capitalReplaceWith = capitalizeFirstLetter(replaceWith);

        quote = quote.replace(RegExp(original, "g"), replaceWith);
        quote = quote.replace(RegExp(capitalOriginal, "g"), capitalReplaceWith);
        return quote;
    };

    var adaptQuote = function(words, quote) {
        var word, replaceWith;
        var originals = Object.keys(words);

        for (i = 0; i < originals.length; i++) {
            original           = originals[i];
            replaceWith        = words[original];

            quote = replaceWord(original, replaceWith, quote);
        }
        return quote;
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return {
        setup: function () {
            var self = this;

            settings.isOn = shouldBeTurnedOn();
            getWords();

            $form = getForm();
            $form.find('input[type=text]').on('keyup', Foundation.utils.debounce(function(e){
                getWords();
            }, 300));

            settings.quote = $('p[data-quote]').html();

            $form.find("input[type=submit]").click(function(e) {
                e.preventDefault();
                self.replace();
            });

        },
        replace: function() {
            var quote = settings.quote;
            var words = settings.wordsToExchange;

            quote = adaptQuote(words, quote);

            $('#show-quote #adapted-quote-container').html(quote);
            $('#show-quote').foundation('reveal', 'open');
        }


    }
});