var rocketForm = rocketForm || {};

rocketForm.FormModel = (function (rocketForm) {
    var action,
        method;

    function init(opts) {
        action: opts.action || '';
        method: opts.method || 'POST';

        return this;
    }
    
    return {
        init: init
    }
}(rocketForm));

rocketForm.FormsRepository = (function(rocketForm) {
    function all() {
        return $(rocketForm.config.selectors.rocketForm);
    }
    
    return {
        all: all
    };
}(rocketForm));


rocketForm.Engine = (function (rocketForm) {
    var config = {};

    function init(opts) {
        rocketForm.Bootstrapper.bootstrap(config, opts);
        config = rocketForm.config;

        loadForms();

        return this;
    }
    
    function loadForms() {
        console.log(config.services.formsRepository.all());
    }
    
    return {
        init: init,
    };
}(rocketForm));

rocketForm.Bootstrapper = (function (rocketForm) {
    function bootstrap(config, opts) {
        var defaultConfig = {};

        defaultConfig.selectors = {
            rocketForm: '[data-rf]'
        }

        defaultConfig.services = {
            formsRepository: rocketForm.FormsRepository
        }

        return rocketForm.config = $.extend({}, defaultConfig, opts);
    }

    return {
        bootstrap: bootstrap
    }
}(rocketForm));

// Expose an alias to the Engine object inside of rocketForm namespace.
var RocketForm = rocketForm.Engine;