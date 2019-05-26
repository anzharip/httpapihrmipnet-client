"use strict";

var app_dependent = new Vue({
    el: "#app_dependent",
    data: {
        dependent: [],
        selected_dependent: {
            dependent_id: "",
            name: "",
            relationship: "",
            gender: "",
            date_of_birth: ""
        },
        upload_dependent: {
            dependent_id: "",
            name: "",
            relationship: "",
            gender: "",
            date_of_birth: ""
        },
        gender_list: [{
                gender_code: "1",
                gender_name: "Male"
            },
            {
                gender_code: "2",
                gender_name: "Female"
            },

        ],
        relationship_list: [{
                relationship_code: "wife",
                relationship_name: "Wife"
            },
            {
                relationship_code: "child",
                relationship_name: "Child"
            },
            {
                relationship_code: "other",
                relationship_name: "Other"
            },
        ],
        message: ""
    },
    created: function () {
        var self = this;
        self.get("all");
        self.hideEditDependent();
    },
    methods: {
        get: function (dependent_id) {
            var model_dependent = new ModelDependent(config);
            var self = this;
            var data = {
                dependent_id: dependent_id
            }
            model_dependent.get(data).then(function (response) {
                var aescipher = new AESCipher(config.key, response.data.data);
                self.dependent = JSON.parse(aescipher.decrypt());
                // self.dependent = response.data.data;
                // self.message = response.data.message;
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        },
        delete: function (dependent_id) {
            var model_dependent = new ModelDependent(config);
            var self = this;
            var data = {
                dependent_id: dependent_id
            }
            model_dependent.delete(data).then(function (response) {
                var aescipher = new AESCipher(config.key, response.data.data);
                self.dependent = JSON.parse(aescipher.decrypt());
                // self.dependent = response.data.data;
                self.message = response.data.message;
                self.get("all");
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        },
        put: function (data) {
            var model_dependent = new ModelDependent(config);
            var self = this;
            var data = data;
            model_dependent.put(data).then(function (response) {
                self.message = response.data.message;
                self.get("all");
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        },
        post: function (data) {
            var model_dependent = new ModelDependent(config);
            var self = this;
            var data = data;
            model_dependent.post(data).then(function (response) {
                self.message = response.data.message;
                self.get("all");
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        },
        selectEditDependent: function (data) {
            var self = this;
            self.selected_dependent = data;
            self.showEditDependent();
        },
        deleteDependent: function (dependent_id) {
            var self = this;
            self.delete(dependent_id);
            $('#dependentModal').modal('show');
        },
        cancelEditDependent: function () {
            var self = this;
            self.selected_dependent = {
                dependent_id: "",
                name: "",
                relationship: "",
                gender: "",
                date_of_birth: ""
            };
            self.hideEditDependent();
        },
        submitEditDependent: function () {
            var self = this;
            var data = self.selected_dependent;
            self.put(data);
            self.cancelEditDependent();
            $('#emergencyDependent').modal('show');
        },
        cancelUploadDependent: function () {
            var self = this;
            self.upload_dependent = {
                dependent_id: "",
                name: "",
                relationship: "",
                gender: "",
                date_of_birth: ""
            }
        },
        submitUploadDependent: function () {
            var self = this;
            var data = self.upload_dependent;
            self.post(data);
            self.cancelUploadDependent();
            $('#dependentModal').modal('show');
        },
        hideEditDependent: function () {
            $('.editDependent').prop("hidden", true);
        },
        showEditDependent: function () {
            $('.editDependent').prop("hidden", false);
        }
    }
});

var app_dependent_attachment = new Vue({
    el: "#app_dependent_attachment",
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
        self.hideEditAttachment();
    },
    methods: {
        deleteAttachment: function (file_id) {
            var model_attachment = new ModelAttachmentDependent(config);
            var data = {
                file_id: file_id
            }
            var self = this;
            model_attachment.delete(data).then(function (response) {
                console.log(response);
                self.message = response.data.message;
                $('#attachmentDependentModal').modal('show');
                self.getAttachment("all");
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
                $('#attachmentDependentModal').modal('show');
            });
            console.log(self.message);
        },
        getAttachment: function (file_id) {
            var model_attachment = new ModelAttachmentDependent(config);
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
                $('#attachmentDependentModal').modal('show');
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
            var model_attachment = new ModelAttachmentDependent(config);
            var self = this;
            var data = self.selected_attachment;
            model_attachment.put(data).then(function (response) {
                console.log(response);
                self.message = response.data.message;
                $('#attachmentDependentModal').modal('show');
                self.getAttachment("all");
                self.cancelEditAttachment();
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
                $('#attachmentDependentModal').modal('show');
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
            var model_attachment = new ModelAttachmentDependent(config);
            var data = self.upload_attachment;
            model_attachment.post(data).then(function (response) {
                console.log(response);
                self.message = response.data.message;
                $('#attachmentDependentModal').modal('show');
                self.getAttachment("all");
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        }, 
        downloadAttachment: function (file_id) {
            var model_attachment = new ModelAttachmentDependent(config);
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