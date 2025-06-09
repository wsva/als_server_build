/**
 * GS: good sentences, gute Sätze
 */
// @ts-ignore
var AlsGS;
(function (AlsGS) {
    var GlobalList = new Array();
    var GlobalTest;
    var Data = /** @class */ (function () {
        function Data(e) {
            var _this = this;
            this.S = "";
            this.N = "";
            Array.from(e.children).forEach(function (c) {
                switch (c.tagName) {
                    case "S":
                        _this.S = c.innerHTML.trim();
                        break;
                    case "N":
                        _this.N = c.innerHTML.trim();
                        break;
                }
            });
        }
        Data.prototype.validate = function () {
            return this.S.length > 0;
        };
        Data.prototype.html = function () {
            var innerHTML = "<div class=\"qsa\">";
            if (this.S != "") {
                innerHTML += "<div class=\"qsa-q\">".concat(this.S, "</div>");
            }
            if (this.N != "") {
                innerHTML += "<div class=\"qsa-a\">".concat(this.N, "</div>");
            }
            innerHTML += "</div>";
            return innerHTML;
        };
        Data.prototype.getQuestion = function () {
            var innerHTML = "<div style=\"display: flex; flex-direction: column;\">";
            innerHTML += "<div>".concat(this.S, "</div>");
            innerHTML += "</div>";
            return innerHTML;
        };
        Data.prototype.getAnswer = function () {
            var innerHTML = "".concat(this.N);
            return innerHTML;
        };
        return Data;
    }());
    /*
        Complete one round of testing before starting the next,
        in order to prevent randomness from being uneven
        and causing some items to rarely be tested.
    */
    var Test = /** @class */ (function () {
        function Test() {
            this.list = [];
            this.list = Array.from(GlobalList);
        }
        Test.prototype.random = function () {
            var index = Math.floor(Math.random() * 123456789) % this.list.length;
            var d = this.list[index];
            this.list.splice(index, 1);
            console.log("left in this round", this.list.length);
            return d;
        };
        Test.prototype.empty = function () {
            return this.list.length == 0;
        };
        Test.prototype.left = function () {
            return this.list.length;
        };
        return Test;
    }());
    function init(showButton) {
        var elementList = Array.from(document.getElementsByClassName("GS"));
        elementList.forEach(function (e) {
            var w = new Data(e);
            if (w.validate()) {
                e.innerHTML = w.html();
                GlobalList.push(w);
            }
            else {
                e.innerHTML += "<span style=\"background-color: red;\">validate error<span >";
            }
        });
        if (GlobalList.length > 0 && showButton) {
            var container = document.getElementById("top-container");
            container === null || container === void 0 ? void 0 : container.appendChild(newButton("GS Test"));
        }
    }
    AlsGS.init = init;
    function newButton(text) {
        var button = document.createElement("button");
        button.setAttribute("class", "btn btn-primary btn-lg");
        button.setAttribute("style", "margin: 0 0.5em 0 0;");
        button.setAttribute("onclick", "AlsGS.nextTest()");
        button.innerHTML = text;
        return button;
    }
    function hiddenAnswer() {
        // @ts-ignore
        $("#modal1-answer").css("visibility", "hidden");
    }
    AlsGS.hiddenAnswer = hiddenAnswer;
    function showAnswer() {
        // @ts-ignore
        $("#modal1-answer").css("visibility", "visible");
    }
    AlsGS.showAnswer = showAnswer;
    function nextTest() {
        hiddenAnswer();
        // @ts-ignore
        $("#modal1-show").attr("onclick", "AlsGS.showAnswer()");
        // @ts-ignore
        $("#modal1-next").attr("onclick", "AlsGS.nextTest()");
        if (!GlobalTest || GlobalTest.empty()) {
            console.log("new round started");
            GlobalTest = new Test();
        }
        var d = GlobalTest.random();
        if (d) {
            // @ts-ignore
            $("#modal1-question").html(d.getQuestion());
            // @ts-ignore
            $("#modal1-answer").html(d.getAnswer());
            // @ts-ignore
            $("#modal1-num").html("left: " + GlobalTest.left());
        }
        // @ts-ignore
        $("#modal1").modal('show');
    }
    AlsGS.nextTest = nextTest;
})(AlsGS || (AlsGS = {}));
// generate js
// tsc als_gs.ts --target "es5" --lib "es2015,dom" --downlevelIteration
