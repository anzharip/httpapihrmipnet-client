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
                var aescipher = new AESCipher(config.key, response.data.data);
                self.form = JSON.parse(aescipher.decrypt());
                // self.form = response.data.data;
                // self.message = response.data.message;
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
                $('#jobModal').modal('show');
            });
        }
    }
});