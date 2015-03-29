(function (travi) {
    'use strict';

    var loader = travi.dependencies.loader,

        siteNamespace = 'org';

    function loadDependencies(dependencies) {
        if (dependencies) {
            var i,
                dependencyCount = dependencies.length,
                promises = [];

            for (i = 0; i < dependencyCount; i += 1) {
                promises.push(loader.load(dependencies[i]));
            }

            return $.when.apply(null, promises);
        }

        return new $.Deferred().resolve().promise();
    }

    function initializeModule(object) {
        if (object.init) {
            object.init();
        }
    }

    function register(namespace, module, dependencies) {
        travi.namespace(
            siteNamespace + '.' + namespace,
            module
        );

        loadDependencies(dependencies).then(function () {
            initializeModule(module);
        });
    }

    travi.namespace(siteNamespace, {
        register: register
    });
}(travi));