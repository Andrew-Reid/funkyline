import {
    curveLinear
} from "d3";

export default function funkyLine(context) {
    var referenceMargin = 10;
    var interval = 10;
    var magnitude = 50;

    function line(context) {
        let custom = d3.curveLinear(context);
        custom._context = context;
        custom.point = function(x, y) {
            x = +x, y = +y;
            switch (this._point) {
                case 0:
                    this._point = 1;
                    this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                    this.x0 = x;
                    this.y0 = y;
                    break;
                case 1:
                    this._point = 2;
                default:
                    var dx = this.x0 - x;
                    var dy = this.y0 - y;
                    //var interval = 10;//referenceInterval;
                    var margin = referenceMargin;
                    var r = dx * dx + dy * dy;
                    r = Math.sqrt(r);
                    var number = Math.round((r - margin * 2) / interval);
                    if (number % 4 > 0) number -= number % 4;

                    margin = (r - number * interval) / 2;

                    var m = (y - this.y0) / (x - this.x0);
                    m = -1 / m;

                    var start = margin / r;
                    var percentage = (r - margin * 2) / r;

                    for (var i = 0; i < number; i++) {
                        var mag = Math.min(i / number, 1 - i / number) * 50;

                        var x1 = x * (i / number * percentage + start) + this.x0 * (1 - (i / number * percentage + start));
                        var y1 = y * (i / number * percentage + start) + this.y0 * (1 - (i / number * percentage + start));

                        if (m == Infinity || m == -Infinity) {
                            if (i % 2 == 0) this._context.lineTo(x1, y1 + mag);
                            else this._context.lineTo(x1, y1 - mag);
                        } else {
                            var k = mag / Math.sqrt(1 + (m * m));
                            if (i % 2 == 0) this._context.lineTo(x1 + k, y1 + (m * k));
                            else this._context.lineTo(x1 - k, y1 - (m * k));
                        }
                    }

                    var x1 = x * (1 - start) + this.x0 * (start);
                    var y1 = y * (1 - start) + this.y0 * (start);
                    this._context.lineTo(x1, y1);
                    this._context.lineTo(x, y);

                    this.x0 = x;
                    this.y0 = y;
                    break;
            }
        };
        return custom;
    }

    line.interval = function(_) {
        return arguments.length ? (interval = _, line) : interval;
    };
    line.margin = function(_) {
        return arguments.length ? (referenceMargin = _, line) : referenceMargin;
    };

    return line;
}

