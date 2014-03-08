var Component = require("montage/ui/component").Component;

exports.CatFlow = Component.specialize({

    catImages: {
        value: []
    },

    constructor: {
        value: function CatFlow() {
            this.super();
        }
    }

});

