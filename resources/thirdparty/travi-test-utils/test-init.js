/*global console, jstestdriver*/
console.log = sinon.log = function () {
    jstestdriver.console.log.apply(jstestdriver.console, arguments);
};

travi.test = travi.test || {};
travi.test.testCase = TestCase;

if ($) {
    $.fx.off = true;
}

if (travi.browserProxy) {
    travi.browserProxy.refresh = function () { };
}
