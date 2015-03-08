(function (travi) {
    'use strict';

    var moduleStatuses = {};

    function getDeferred(namespace) {
        return travi.getFromObject(moduleStatuses, namespace.split('.'));
    }

    function getModule(namespace) {
        var parts = namespace.split('.');

        parts.shift();

        return travi.getFromObject(travi, parts);
    }

    function initAndResolve(module, namespace, dependencies) {
        var dependency,
            references = {};

        if (module.init) {
            for (dependency in dependencies) {
                if (dependencies.hasOwnProperty(dependency)) {
                    references[dependency] = getModule(dependencies[dependency]);
                }
            }

            module.init(references);
        }

        getDeferred(namespace).resolve();
    }

    function determineLoadedState(dependency) {
        var deferred = new $.Deferred();

        if (getModule(dependency)) {
            deferred.resolve();
        }

        travi.putInObject(moduleStatuses, dependency, deferred);

        return deferred;
    }

    function getLoadedStateFor(dependency) {
        var deferred = getDeferred(dependency);

        if (!deferred) {
            deferred = determineLoadedState(dependency);
        }

        return deferred.promise();
    }

    function getPromiseListForDependencies(dependencies) {
        var promises = [],
            key;

        for (key in dependencies) {
            if (dependencies.hasOwnProperty(key)) {
                promises.push(getLoadedStateFor(dependencies[key]));
            }
        }

        return promises;
    }

    function ensureDependenciesAreLoaded(dependencies) {
        return $.when.apply(null, getPromiseListForDependencies(dependencies));
    }

    function checkIfLoaded(namespace, dependencies) {
        var module = getModule(namespace);

        if (module) {
            if (dependencies) {
                ensureDependenciesAreLoaded(dependencies).then(function () {
                    initAndResolve(module, namespace, dependencies);
                });
            } else {
                initAndResolve(module, namespace);
            }
        }
    }

    function check(namespace, dependencies) {
        travi.putInObject(moduleStatuses, namespace, new $.Deferred());

        checkIfLoaded(namespace, dependencies);

        return getDeferred(namespace).promise();
    }

    function init() {
        moduleStatuses = {};
    }

    travi.namespace('dependencies.checker', {
        init: init,
        check: check
    });
}(travi));