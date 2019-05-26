"use strict";

var app_personal_detail = new Vue({
    el: "#app_personal_detail",
    data: {
        form: {
            first_name: "",
            middle_name: "",
            last_name: "",
            employee_id: "",
            no_ktp: "",
            drivers_license_number: "",
            license_expiry_date: "",
            no_bpjs_kesehatan: "",
            no_npwp: "",
            no_bpjs_ketenagakerjaan: "",
            work_shift: "",
            gender: "",
            marital_status: "",
            nationality: "",
            date_of_birth: "",
            religion: "",
            place_of_birth: "",
        },
        message: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        employee_id: "",
        no_ktp: "",
        drivers_license_number: "",
        license_expiry_date: "",
        no_bpjs_kesehatan: "",
        no_npwp: "",
        no_bpjs_ketenagakerjaan: "",
        selected_workshift: "",
        selected_gender: "",
        selected_marital_status: "",
        selected_nationality: "",
        date_of_birth: "",
        selected_religion: "",
        place_of_birth: "",
        work_shift: [],
        nationality: [],
        religion: [],
        marital_status: [{
                marital_status_name: "Single"
            },
            {
                marital_status_name: "Married"
            },
            {
                marital_status_name: "Divorced"
            },
            {
                marital_status_name: "Other"
            }
        ],
        gender: [{
                gender_code: "1",
                gender_name: "Male"
            },
            {
                gender_code: "2",
                gender_name: "Female"
            }
        ],
    },
    created: function () {
        var self = this;
        var model_workshift = new ModelWorkShift(config);
        var model_nationality = new ModelNationality(config);
        var model_religion = new ModelReligion(config);
        model_workshift.get().then(function (response) {
            var aescipher = new AESCipher(config.key, response.data.data);
            self.work_shift = JSON.parse(aescipher.decrypt());
            // self.work_shift = response.data.data;
        });
        model_nationality.get().then(function (response) {
            var aescipher = new AESCipher(config.key, response.data.data);
            self.nationality = JSON.parse(aescipher.decrypt());
            // self.nationality = response.data.data;
        });
        model_religion.get().then(function (response) {
            var aescipher = new AESCipher(config.key, response.data.data);
            self.religion = JSON.parse(aescipher.decrypt());
            // self.religion = response.data.data;
        });
        self.get();
        $('#personalDetailEdit').prop("hidden", false);
        $('#personalDetailCancel').prop("hidden", true);
        $('#personalDetailSubmit').prop("hidden", true);
    },
    methods: {
        get: function () {
            var model_personal_detail = new ModelPersonalDetail(config);
            var self = this;
            model_personal_detail.get().then(function (response) {
                var aescipher = new AESCipher(config.key, response.data.data);
                self.form = JSON.parse(aescipher.decrypt());
                // self.form = response.data.data;
                // self.message = response.data.message;
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        },
        put: function () {
            var model_personal_detail = new ModelPersonalDetail(config);
            var self = this;
            var data = self.form;
            model_personal_detail.put(data).then(function (response) {
                self.get();
                self.message = response.data.message;
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        },
        edit: function () {
            $('#personalDetailEdit').prop("hidden", true);
            $('#personalDetailCancel').prop("hidden", false);
            $('#personalDetailSubmit').prop("hidden", false);
            $('.personalDetailDisabled').prop("disabled", false);
        },
        cancel: function () {
            var self = this;
            $('#personalDetailEdit').prop("hidden", false);
            $('#personalDetailCancel').prop("hidden", true);
            $('#personalDetailSubmit').prop("hidden", true);
            $('.personalDetailDisabled').prop("disabled", true);
            self.get();
        },
        submit: function () {
            var self = this;
            $('#personalDetailEdit').prop("hidden", false);
            $('#personalDetailCancel').prop("hidden", true);
            $('#personalDetailSubmit').prop("hidden", true);
            $('.personalDetailDisabled').prop("disabled", true);
            self.put();
        }
    }
});

var app_personal_detail_attachment = new Vue({
    el: "#app_personal_detail_attachment",
    data: {
        attachment: [],
        selected_attachment: {},
        upload_attachment: {
            select_file: "",
            file_name: "",
            comment: ""
        },
        download_attachment: {},
        message: ""
    },
    created: function () {
        var self = this;
        self.getAttachment("all");
    },
    methods: {
        deleteAttachment: function (file_id) {
            var model_attachment = new ModelAttachmentPersonalDetail(config);
            var data = {
                file_id: file_id
            }
            var self = this;
            model_attachment.delete(data).then(function (response) {
                console.log(response);
                self.message = response.data.message;
                $('#attachmentPersonalDetailModal').modal('show');
                self.getAttachment("all");
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
                $('#attachmentPersonalDetailModal').modal('show');
            });
            console.log(self.message);
        },
        getAttachment: function (file_id) {
            var model_attachment = new ModelAttachmentPersonalDetail(config);
            var data = {
                file_id: file_id
            }
            var self = this;
            model_attachment.get(data).then(function (response) {
                var aescipher = new AESCipher(config.key, response.data.data);
                self.attachment = JSON.parse(aescipher.decrypt());
                // self.attachment = response.data.data;
                // Don't enable this as this will cause the modal to always show file succesfully retrieved
                // self.message = response.data[0].message;
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
                $('#attachmentPersonalDetailModal').modal('show');
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
            var model_attachment = new ModelAttachmentPersonalDetail(config);
            var self = this;
            var data = self.selected_attachment;
            model_attachment.put(data).then(function (response) {
                console.log(response);
                self.message = response.data.message;
                $('#attachmentPersonalDetailModal').modal('show');
                self.getAttachment("all");
                self.cancelEditAttachment();
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
                $('#attachmentPersonalDetailModal').modal('show');
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
            var model_attachment = new ModelAttachmentPersonalDetail(config);
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
        },
        downloadAttachment: function (file_id) {
            var model_attachment = new ModelAttachmentPersonalDetail(config);
            var data = {
                file_id: file_id
            }
            var self = this;
            model_attachment.get(data).then(function (response) {
                var aescipher = new AESCipher(config.key, response.data.data);
                self.download_attachment = JSON.parse(aescipher.decrypt());
                // self.download_attachment = response.data.data;
                // Don't enable this as this will cause the modal to always show file succesfully retrieved
                // self.message = response.data[0].message;
                var element = document.createElement('a');
                var type = self.download_attachment.type;
                var base64file = self.download_attachment.file;
                var file_name = self.download_attachment.file_name;
                element.setAttribute('href', 'data:' + type + ';base64,' + base64file);
                element.setAttribute('download', file_name);
                element.style.display = 'none';
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
                $('#attachmentPersonalDetailModal').modal('show');
            });
        }
    }
});