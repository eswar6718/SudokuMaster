var SudokuTimer = {
    seconds: 0,
    intervalId: null,

    start: function (elementId) {
        this.stop();
        this.seconds = 0;
        this.show(elementId);

        var self = this;
        this.intervalId = setInterval(function () {
            self.seconds++;
            self.show(elementId);
        }, 1000);
    },

    stop: function () {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    },

    reset: function (elementId) {
        this.stop();
        this.seconds = 0;
        this.show(elementId);
    },

    show: function (elementId) {
        var element = document.getElementById(elementId);
        if (!element) {
            return;
        }

        var minutes = Math.floor(this.seconds / 60);
        var seconds = this.seconds % 60;
        element.textContent =
            String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    },

    getSeconds: function () {
        return this.seconds;
    }
};
