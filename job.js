"use strict";

var app_job = new Vue({
    el: "#app_job",
    data: {
        form: {},
        message: ""
    },
    created: function () {
        var self = this;
        self.get();
    },
    methods: {
        get: function () {
            var model_job = new ModelJob(config);
            var self = this;
            model_job.get().then(function (response) {
                self.form = response.data;
                // self.message = response.data.message;
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        }
    }
});