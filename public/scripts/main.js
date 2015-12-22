requirejs.config({
    baseUrl: '/scripts/',
    paths: {
        jquery: 'external/jquery.min',
        foundation: 'external/foundation.min',
        vue: 'external/vue'
    },
    shim: {
        "foundation": ['jquery']
    }
});

require(['replace/replace',  'vue', 'jquery', 'foundation'], function (replace, Vue, $) {
    var body = $('body');

    $(document).ready(function() {
        replace.setup();
    });
});
