/**
 * @module ui/main.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

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
            window["catfn"] = function(jsonData) {
                for (var i = 0; i < jsonData.data.children.length; i++) {
                    var item = jsonData.data.children[i];
                    
                    if (item.data.url.toLowerCase().match(/i.imgur.com\/[a-zA-Z0-9]+.jpg/))
                        component.catImages.push(item.data.url.replace(".jpg", "m.jpg"));
                }
            };

            this.addPathChangeListener("selectedSub", this, "handleSelectedSubChange");
            this.templateObjects.selectSub.content = [
                {label: "Cats Standing Up", sub: "catsstandingup"},
                {label: "Animated GIFs", sub: "gifs"}
            ];
        }
    },
    
    handleSelectedSubChange: {
        value: function(selectedSub) {
            var script = document.createElement("script");
            
            script.src = "http://www.reddit.com/r/" + selectedSub + ".json?limit=100&jsonp=catfn";
            document.head.appendChild(script);
        }
    }
});
