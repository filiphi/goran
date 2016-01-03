define(['utils', 'vue', 'jquery', 'foundation'], function (Utils, Vue, $) {
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

    var getWords = function (useGETParameters) {
        var $form  = getForm();
        var words  = {};

        useGETParameters = useGETParameters || false;

        $form.find('input[type=text]').each(function(index) {
            var original    = $(this).attr('placeholder');
            var replaceWith = $(this).val();

            if (useGETParameters) {
                replaceWith = Utils.getUrlEncodedKey(original);
                $(this).val(replaceWith);
            }

            if (replaceWith === '') {
                replaceWith = original;
            }

            words[original] = replaceWith;
        });

        settings.wordsToExchange = words;

    };

    var replaceWord = function(original, replaceWith, quote) {
        var capitalOriginal    = Utils.capitalizeFirstLetter(original);
        var capitalReplaceWith = Utils.capitalizeFirstLetter(replaceWith);

        quote = quote.replace(RegExp(original + '(?![0-9a-zA-Z])', "g"), replaceWith);
        quote = quote.replace(RegExp(capitalOriginal + '(?![0-9a-zA-Z])', "g"), capitalReplaceWith);
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

    var updateHistory = function(words) {
        var word, replaceWith, query, originals;

        originals = Object.keys(words);
        query = '';

        if (document.location.search !== '') {
            query = document.location.search;
        }

        for (i = 0; i < originals.length; i++) {
            original           = originals[i];
            replaceWith        = words[original];

            query = Utils.setUrlEncodedKey(original, replaceWith, query);
        }

        if (history.replaceState !== undefined) {
            history.pushState(null, null, query);
        }
    };

    var useGetParameters = function() {
        var originals;

        originals = Object.keys(words);

        for (i = 0; i < originals.length; i++) {
            original           = originals[i];
            replaceWith        = words[original];

            query = Utils.getUrlEncodedKey(original);
        }
    };

    var updateQuote = function(vueObject) {
        getWords();
        updateHistory(settings.wordsToExchange);
        vueObject.newQuote = adaptQuote(settings.wordsToExchange, settings.quote);
    };

    return {
        setup: function () {
            var self = this;

            settings.isOn = shouldBeTurnedOn();
            getWords(true);

            $form = getForm();

            settings.quote = $('#show-quote').data('quote');
            settings.newQuote = settings.quote;

            var vueObject = new Vue({
                el: '#personalize-quote',
                data: {
                    newQuote: settings.newQuote
                },
                methods: {
                    replaceWord: function () {
                        updateQuote(this);
                    }
                }
            });

            updateQuote(vueObject.$data);

            $('#personalize-quote input').first().keyup();

        }
    }
});