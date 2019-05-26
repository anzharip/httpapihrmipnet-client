"use strict";

var app_emergency_contact = new Vue({
    el: "#app_emergency_contact",
    data: {
        emergency_contact: [],
        selected_emergency_contact: {
            name: "",
            relationship: "",
            mobile: "",
            home_telephone: "",
            work_telephone: "",
            address: ""
        },
        upload_emergency_contact: {
            name: "",
            relationship: "",
            mobile: "",
            home_telephone: "",
            work_telephone: "",
            address: ""
        },
        message: ""
    },
    created: function () {
        var self = this;
        self.get("all");
        self.hideEditEmergencyContact();
    },
    methods: {
        get: function (emergencycontact_id) {
            var model_emergency_contact = new ModelEmergencyContact(config);
            var self = this;
            var data = {
                emergencycontact_id: emergencycontact_id
            }
            model_emergency_contact.get(data).then(function (response) {
                var aescipher = new AESCipher(config.key, response.data.data);
                self.emergency_contact = JSON.parse(aescipher.decrypt());
                // self.emergency_contact = response.data.data;
                // self.message = response.data.message;
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        },
        delete: function (emergencycontact_id) {
            var model_emergency_contact = new ModelEmergencyContact(config);
            var self = this;
            var data = {
                emergencycontact_id: emergencycontact_id
            }
            model_emergency_contact.delete(data).then(function (response) {
                var aescipher = new AESCipher(config.key, response.data.data);
                self.emergency_contact = JSON.parse(aescipher.decrypt());
                // self.emergency_contact = response.data.data;
                self.message = response.data.message;
                self.get("all");
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        },
        put: function (data) {
            var model_emergency_contact = new ModelEmergencyContact(config);
            var self = this;
            var data = data;
            model_emergency_contact.put(data).then(function (response) {
                self.message = response.data.message;
                self.get("all");
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        },
        post: function (data) {
            var model_emergency_contact = new ModelEmergencyContact(config);
            var self = this;
            var data = data;
            model_emergency_contact.post(data).then(function (response) {
                self.message = response.data.message;
                self.get("all");
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        },
        selectEditEmergencyContact: function (data) {
            var self = this;
            self.selected_emergency_contact = data;
            self.showEditEmergencyContact();
        },
        deleteEmergencyContact: function (emergencycontact_id) {
            var self = this;
            self.delete(emergencycontact_id);
            $('#emergencyContactModal').modal('show');
        },
        cancelEditEmergencyContact: function () {
            var self = this;
            self.selected_emergency_contact = {
                name: "",
                relationship: "",
                mobile: "",
                home_telephone: "",
                work_telephone: "",
                address: ""
            };
            self.hideEditEmergencyContact();
        },
        submitEditEmergencyContact: function () {
            var self = this;
            var data = self.selected_emergency_contact;
            self.put(data);
            self.cancelEditEmergencyContact();
            $('#emergencyContactModal').modal('show');
        },
        cancelUploadEmergencyContact: function () {
            var self = this;
            self.upload_emergency_contact = {
                name: "",
                relationship: "",
                mobile: "",
                home_telephone: "",
                work_telephone: "",
                address: ""
            }
        },
        submitUploadEmergencyContact: function () {
            var self = this;
            var data = self.upload_emergency_contact;
            self.post(data);
            self.cancelUploadEmergencyContact();
            $('#emergencyContactModal').modal('show');
        },
        hideEditEmergencyContact: function () {
            $('.editEmergencyContact').prop("hidden", true);
        },
        showEditEmergencyContact: function () {
            $('.editEmergencyContact').prop("hidden", false);
        }
    }
});

var app_emergency_contact_attachment = new Vue({
    el: "#app_emergency_contact_attachment",
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
            var model_attachment = new ModelAttachmentEmergencyContact(config);
            var data = {
                file_id: file_id
            }
            var self = this;
            model_attachment.delete(data).then(function (response) {
                console.log(response);
                self.message = response.data.message;
                $('#attachmentEmergencyContactModal').modal('show');
                self.getAttachment("all");
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
                $('#attachmentEmergencyContactModal').modal('show');
            });
            console.log(self.message);
        },
        getAttachment: function (file_id) {
            var model_attachment = new ModelAttachmentEmergencyContact(config);
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
                $('#attachmentEmergencyContactModal').modal('show');
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
            var model_attachment = new ModelAttachmentEmergencyContact(config);
            var self = this;
            var data = self.selected_attachment;
            model_attachment.put(data).then(function (response) {
                console.log(response);
                self.message = response.data.message;
                $('#attachmentEmergencyContactModal').modal('show');
                self.getAttachment("all");
                self.cancelEditAttachment();
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
                $('#attachmentEmergencyContactModal').modal('show');
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
            var model_attachment = new ModelAttachmentEmergencyContact(config);
            var data = self.upload_attachment;
            model_attachment.post(data).then(function (response) {
                console.log(response);
                self.message = response.data.message;
                $('#attachmentEmergencyContactModal').modal('show');
                self.getAttachment("all");
            }).catch(function (error) {
                console.log(error.response);
                self.message = error.response.data.message;
            });
        }, 
        downloadAttachment: function (file_id) {
            var model_attachment = new ModelAttachmentEmergencyContact(config);
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