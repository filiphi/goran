define(['vue', 'jquery', 'foundation'], function (Vue, $) {
    var settings = {
        quote: '',
        newQuote: '',
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

        $form.find('input[type=text]').each(function(index) {
            var original    = $(this).attr('placeholder');
            var replaceWith = $(this).val();

            if (replaceWith === '') {
                replaceWith = original;
            }

            words[original] = replaceWith;
        });

        settings.wordsToExchange = words;

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

            settings.quote = $('#show-quote').data('quote');
            settings.newQuote = settings.quote;

            new Vue({
                el: '#personalize-quote',
                data: {
                    newQuote: settings.newQuote
                },
                methods: {
                    replaceWord: function () {
                        getWords();
                        this.newQuote = adaptQuote(settings.wordsToExchange, settings.quote);
                    }
                }
            });

        }
    }
});