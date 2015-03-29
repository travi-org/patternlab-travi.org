module.exports = function (config) {
    config.set({
        frameworks: ['referee'],

        files: [
            {pattern: 'templates/**/*.tmpl', included: false},
            {pattern: 'test/templates/**/*.tmpl', included: false},

            'bower_components/travi-test-utils/tools/assert-cache.js',
            'node_modules/karma-jstd-adapter/jstd-adapter.js',
            'bower_components/travi-test-utils/tools/assert-fix.js',

            'bower_components/jquery/dist/jquery.js',
            'bower_components/jsrender/jsrender.js',
            'bower_components/jquery-equalizebottoms/jquery.ba-equalizebottoms.js',
            'thirdparty/lightbox/jquery.lightbox.js',

            'test/stubs/sublimevideo.js',
            'test/stubs/ReflectionStub.js',
            'bower_components/travi-test-utils/stubs/modernizrStub.js',
            'bower_components/travi-test-utils/stubs/amplifyStub.js',

            'bower_components/travi-core/js/travi.js',
            'bower_components/travi-core/js/travi/templates.js',
            'bower_components/travi-core/js/travi/events.js',
            'bower_components/travi-core/js/travi/dependencies/loader.js',
            'test/resources/load-templates.js',

            'js/video/*.js',
            'js/photos/previewPane.js',
            'js/photos/*.js',
            'js/org.js',
            'js/**/*.js',


            'bower_components/travi-test-utils/test-init.js',
            'bower_components/travi-test-utils/tools/common.js',

            'test/**/*.js*'
        ],

        browsers: ['PhantomJS']
    });
};
