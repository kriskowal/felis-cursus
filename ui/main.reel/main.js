/**
 * @module ui/main.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;
var Jsonp = require("../../core/jsonp");
var Q = require("q");

/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize(/** @lends Main# */ {

    catImages: {
        value: []
    },

    constructor: {
        value: function Main() {
            this.super();
        }
    },

    templateDidLoad: {
        value: function() {
            var component = this;

            this.addPathChangeListener("selectedSub", this, "handleSelectedSubChange");
            this.templateObjects.subSelect.content = [
                {label: "Cats Standing Up", sub: "catsstandingup"},
                {label: "DIY", sub: "diy"},
                {label: "Lord of the Rings", sub: "lotr"},
            ];

        }
    },

    handleSelectedSubChange: {
        value: function (selectedSub) {

            if (!selectedSub) {
                this.catImagesPromise = null;
                return;
            }

            this.catImagesPromise = Jsonp.request(
                "http://www.reddit.com/r/" + selectedSub + ".json?limit=100", "jsonp"
            ).then(function (jsonData) {
                var catImages = [];
                for (var i = 0; i < jsonData.data.children.length; i++) {
                    var item = jsonData.data.children[i];
                    if (item.data.url.toLowerCase().match(/i.imgur.com\/[a-zA-Z0-9]+.(jpg|gif)/)) {
                        catImages.push(item.data.url.replace(".jpg", "m.jpg"));
                    }
                }
                return catImages;
            })
            .delay(1000);
        }
    }
});
