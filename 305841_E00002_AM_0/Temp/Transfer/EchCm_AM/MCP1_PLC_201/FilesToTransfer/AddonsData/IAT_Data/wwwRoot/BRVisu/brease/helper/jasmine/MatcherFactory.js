define(function () {

    'use strict';
    
    var version = (jasmine.version_ && jasmine.version_.major === 1) ? 'v1' : 'v3';
    
    function customMatcherFactory(fn) {
        if (version === 'v1') {
            return function () {
                var args = [this.actual],
                    l = arguments.length;

                for (var i = 0; i < l; i += 1) {
                    args.push(arguments[i]);
                }
                var result = fn.apply(this, args);
                this.message = function () { return result.message; };
                return result.pass;
            };
        } else {
            return function () {
                return {
                    compare: function () {
                        return fn.apply(this, arguments);
                    } 
                }; 
            };
        }
    }
    
    var matcherFactory = {

        createMatcher: function (fn) {
            return customMatcherFactory(fn);
        },
        
        addMatchers: function (testcase, objMatchers) {
            if (version === 'v1') {
                testcase.addMatchers(objMatchers);
            } else {
                jasmine.addMatchers(objMatchers);
            }
                
        },

        addSingleMatcher: function (testcase, matcherName, fn) {
            var matcher = {
                [matcherName]: customMatcherFactory(fn)
            };
            
            if (version === 'v1') {
                testcase.addMatchers(matcher);
            } else {
                jasmine.addMatchers(matcher);
            }
        }
    };
    
    return matcherFactory;
});
