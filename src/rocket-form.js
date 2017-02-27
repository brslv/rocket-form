var rocketForm = rocketForm || {};

// ****************************** MODELS ************************************ //

rocketForm.FormModel = (function (rocketForm) {
    var expose = {};

    /**
     * init()
     * Sets the forms properties.
     * 
     * @param {any} opts 
     * @returns 
     */
    expose.init = function init(opts) {
        expose.method = opts.method || 'POST';
        expose.action = opts.action || '';
        expose.name = opts.name || '';
        expose.id = opts.id || '';
        expose.el = opts.el || null;

        return this;
    }
    
    return expose;
}(rocketForm));

// ***************************** SERVICES *********************************** //

rocketForm.FormsRepository = (function(rocketForm) {
    function all() {
        return $(rocketForm.config.selectors.rocketForm);
    }
    
    return {
        all: all
    };
}(rocketForm));

// ****************************** ENGINE ************************************ //

rocketForm.Engine = (function (rocketForm) {
    var forms = $([]);
    
    function init(opts) {
        rocketForm.Bootstrapper.bootstrap(opts || {});

        loadForms();
        runEngine();

        return this;
    }
    
    function loadForms() {
        return forms = rocketForm.services.formsRepository.all();
    }
    
    function runEngine() {
        forms.each(function (index) {
            var formEl = $(this)
                method = formEl.attr('method'),
                action = formEl.attr('action'),
                name = formEl.attr('name'),
                id = formEl.attr('id'),
                form = rocketForm.FormModel.init({
                    method: method,
                    action: action,
                    name: name,
                    id: id,
                    el: formEl
                });

            console.log(form);
        });
    }
    
    return {
        init: init,
    };
}(rocketForm));

// *************************** BOOTSTRAPPER ******************************** //

rocketForm.Bootstrapper = (function (rocketForm) {
    function bootstrap(opts) {
        bootstrapConfig(opts);
        bootstrapServices(opts);
    }

    function bootstrapConfig(opts) {
        opts.config = opts.config || {};

        var defaultConfig = {
            selectors: {
                rocketForm: '[data-rf]'
            }
        }

        return rocketForm.config = $.extend({}, defaultConfig, opts.config);
    }

    function bootstrapServices(opts) {
        opts.services = opts.services || {};

        var defaultServices = {
            formsRepository: rocketForm.FormsRepository
        }

        return rocketForm.services = $.extend({}, defaultServices, opts.services);
    }

    return {
        bootstrap: bootstrap
    }
}(rocketForm));

// Expose an alias to the Engine object inside of rocketForm namespace.
var RocketForm = rocketForm.Engine;