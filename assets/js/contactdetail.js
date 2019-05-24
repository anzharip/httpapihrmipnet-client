"use strict";

var app_contact_detail = new Vue({
    el: "#app_contact_detail",
    data: {
        form: {
            address_street_1: "",
            address_street_2: "",
            city: "",
            state_province: "",
            zip_postal_code: "",
            country: "",
            home_telephone: "",
            mobile: "",
            work_telephone: "",
            work_email: "",
            other_email: ""
        },
        message: "",
        country_list: "",
    },
    created: function () {
        checkToken();
        var model_country = new ModelCountry(config);
        var self = this;
        model_country.get().then(function (response) {
            self.country_list = response.data.data;
        }).catch(function (error) {
            console.log(error.response);
            self.message = error.response.data.message;
        });
        self.get();
        $('#contactdDetailCancel').prop("hidden", true);
        $('#contactdDetailSubmit').prop("hidden", true);
    },
    methods: {
        get: function () {
            var model_contact_detail = new ModelContactDetail(config);
            var self = this;
            model_contact_detail.get().then(function (response) {
                self.form = response.data.data;
                // self.message = response.data.message;
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        },
        put: function () {
            var model_contact_detail = new ModelContactDetail(config);
            var self = this;
            var data = self.form;
            model_contact_detail.put(data).then(function (response) {
                self.get();
                self.message = response.data.message;
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        },
        contactDetailEdit: function () {
            $('.contactDetailDisabled').prop("disabled", false);
            $('#contactdDetailEdit').prop("hidden", true);
            $('#contactdDetailCancel').prop("hidden", false);
            $('#contactdDetailSubmit').prop("hidden", false);
        },
        contactDetailCancel: function () {
            $('.contactDetailDisabled').prop("disabled", true);
            $('#contactdDetailEdit').prop("hidden", false);
            $('#contactdDetailCancel').prop("hidden", true);
            $('#contactdDetailSubmit').prop("hidden", true);
        },
        contactDetailSubmit: function () {
            var self = this;
            self.put();
            $('.contactDetailDisabled').prop("disabled", true);
            $('#contactdDetailEdit').prop("hidden", false);
            $('#contactdDetailCancel').prop("hidden", true);
            $('#contactdDetailSubmit').prop("hidden", true);
        }
    }
})

var app_contact_detail_attachment = new Vue({
    el: "#app_contact_detail_attachment",
    data: {
        attachment: [],
        selected_attachment: {},
        upload_attachment: {
            select_file: "",
            file_name: "",
            comment: ""
        },
        message: ""
    },
    created: function () {
        var self = this;
        self.getAttachment("all");
    },
    methods: {
        deleteAttachment: function (file_id) {
            var model_attachment = new ModelAttachmentContactDetail(config);
            var data = {
                file_id: file_id
            }
            var self = this;
            model_attachment.delete(data).then(function (response) {
                console.log(response);
                self.message = response.data.message;
                $('#attachmentContactDetailModal').modal('show');
                self.getAttachment("all");
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
                $('#attachmentContactDetailModal').modal('show');
            });
            console.log(self.message);
        },
        getAttachment: function (file_id) {
            var model_attachment = new ModelAttachmentContactDetail(config);
            var data = {
                file_id: file_id
            }
            var self = this;
            model_attachment.get(data).then(function (response) {
                self.attachment = response.data.data;
                // Don't enable this as this will cause the modal to always show file succesfully retrieved
                // self.message = response.data[0].message;
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
                $('#attachmentContactDetailModal').modal('show');
            });
        },
        selectAttachment: function (file) {
            var self = this;
            self.selected_attachment = file;
            self.showEditAttachment();
        },
        cancelEditAttachment: function () {
            var self = this;
            self.selected_attachment = {};
            self.hideEditAttachment();
        },
        submitEditAttachment: function () {
            var model_attachment = new ModelAttachmentContactDetail(config);
            var self = this;
            var data = self.selected_attachment;
            model_attachment.put(data).then(function (response) {
                console.log(response);
                self.message = response.data.message;
                $('#attachmentContactDetailModal').modal('show');
                self.getAttachment("all");
                self.cancelEditAttachment();
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
                $('#attachmentContactDetailModal').modal('show');
            });
        },
        hideEditAttachment: function () {
            $('.editAttachment').prop("hidden", true);
        },
        showEditAttachment: function () {
            $('.editAttachment').prop("hidden", false);
        },
        convertUploadAttachment: function (event) {
            var self = this;
            console.log(event.target.files[0]);
            self.upload_attachment.file_name = event.target.files[0].name;
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = function () {
                self.upload_attachment.select_file = reader.result.split(",")[1];
                console.log(reader.result.split(",")[1]);
            };
        },
        cancelUploadAttachment: function () {
            var self = this;
            self.upload_attachment = {
                select_file: "",
                file_name: "",
                comment: ""
            }
        },
        submitUploadAttachment: function () {
            var self = this;
            var model_attachment = new ModelAttachmentContactDetail(config);
            var data = self.upload_attachment;
            model_attachment.post(data).then(function (response) {
                console.log(response);
                self.message = response.data.message;
                $('#attachmentPersonalDetailModal').modal('show');
                self.getAttachment("all");
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        }
    }
});