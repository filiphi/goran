requirejs.config({
    baseUrl: '/scripts/',
    paths: {
        jquery: 'external/jquery.min',
        foundation: 'external/foundation.min'
    },
    shim: {
        "foundation": ['jquery']
    }
});

require(['replace/replace', 'jquery', 'foundation'], function (replace, $) {
    var body = $('body');

    $(document).ready(function() {
        replace.setup();
    });
});
