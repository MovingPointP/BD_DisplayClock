module.exports = (Plugin, Api) => {
    const css = require("styles.css");
    const clockHTML = require("clock.html");
    const { PluginUtilities, DOMTools } = Api;
    return class DisplayClock extends Plugin {

        constructor() {
            super();
            this.clock = DOMTools.createElement(clockHTML);
            this.time;
            this.minute = '';
        }

        onStart() {
            PluginUtilities.addStyle(this.getName(), css);
            const header = document.querySelector("div.wordmarkWindows-1v0lYD.wordmark-2iDDfm");
            if (header) this.addClock(header);
        }

        onStop() {
            const sel_clock = document.querySelector(".clock-plugin");
            if (sel_clock) sel_clock.remove();
            clearInterval(this.time);
            PluginUtilities.removeStyle(this.getName());
        }
        
        fillZero(num) {
            const filled = num < 10 ? '0' + num : String(num);
            return filled;
        }

        getTime() {
            const nowTime = new Date();
            const nowMin = this.fillZero(nowTime.getMinutes());
            if (this.minute === nowMin) return;

            const nowHour = this.fillZero(nowTime.getHours());
            const weekIndex = nowTime.getDay();
            const nowWeek = ["日", "月", "火", "水", "木", "金", "土"][weekIndex];
            this.minute = nowMin;
            const msg = nowHour + ':' + nowMin + "(" + nowWeek + ")";
            this.clock.innerHTML = msg;
        }

        addClock(elem) {
            if (elem.querySelector(".clock-plugin")) return;
            this.time = setInterval(() => { this.getTime() }, 1000);
            elem.appendChild(this.clock);
        }

    };
};