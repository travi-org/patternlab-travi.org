travi.register = function (ns, provided, dependencies) {
    'use strict';

    travi.namespace.call(this, ns, provided);

    travi.dependencies.checker.check('travi.' + ns, dependencies);
};