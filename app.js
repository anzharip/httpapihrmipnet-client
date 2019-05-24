"use strict";
var config = {
    "server_url": "http://anzmbp.local:5000"
}

var app_personal_detail = new Vue({
    el: "#app_personal_detail",
    created: function () {
        var model_workshift = new ModelWorkShift(config);
        var model_nationality = new ModelNationality(config);
        var model_religion = new ModelReligion(config);
        model_workshift.get().then(function (response) {
            app_personal_detail.work_shift = response.data;
        });
        model_nationality.get().then(function (response) {
            app_personal_detail.nationality = response.data;
        });
        model_religion.get().then(function (response) {
            app_personal_detail.religion = response.data;
        });
    },
    data: {
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
        message: ""
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
                self.attachment = response.data;
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
        }
    }
});

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
        var model_country = new ModelCountry(config);
        var self = this;
        model_country.get().then(function (response) {
            self.country_list = response.data;
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
                self.form = response.data;
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
                self.attachment = response.data;
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
                self.emergency_contact = response.data;
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
                self.emergency_contact = response.data;
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
                self.attachment = response.data;
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
        }
    }
});

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
                self.dependent = response.data;
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
                self.dependent = response.data;
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
                self.attachment = response.data;
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
        }
    }
});

function checkToken() {
    if (sessionStorage["access_token"] == undefined) {
        console.log("Token does not exist");
        document.getElementById("modal-message").innerHTML = "You are not logged in";
        $('#exampleModal').modal('show');
        setTimeout(function () {
            window.location.href = "/login.html";
        }, 1000);
    }
};

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

function tokenExpired() {
    document.getElementById("modal-message").innerHTML = "Token is expired";
    $('#exampleModal').modal('show');
    setTimeout(function () {
        window.location.href = "/login.html";
    }, 1000);
};

function logout() {
    sessionStorage.removeItem("access_token");
    document.getElementById("modal-message").innerHTML = "Logging out";
    $('#exampleModal').modal('show')
    setTimeout(function () {
        window.location.href = "/login.html";
    }, 1000);
};

$(document).ready(function () {
    //
    var model_attachment = new ModelAttachmentPersonalDetail(config);
    var data = {
        file_id: "all"
    }
    model_attachment.get(data).then(function (response) {
        app_personal_detail_attachment.attachment = response.data;
        console.log(response);
    });
    //
    checkToken();
    var view_personal_detail = new ViewPersonalDetail();
    view_personal_detail.init();
    $('#personalDetailCancel').prop("hidden", true);
    $('#personalDetailSubmit').prop("hidden", true);
    $("#personalDetailEdit").click(function () {
        $('.personalDetailDisabled').prop("disabled", false);
        $('#personalDetailEdit').prop("hidden", true);
        $('#personalDetailCancel').prop("hidden", false);
        $('#personalDetailSubmit').prop("hidden", false);
    });
    $("#personalDetailCancel").click(function () {
        view_personal_detail.init();
        $('.personalDetailDisabled').prop("disabled", true);
        $('#personalDetailEdit').prop("hidden", false);
        $('#personalDetailCancel').prop("hidden", true);
        $('#personalDetailSubmit').prop("hidden", true);
    });
    $("#personalDetailSubmit").click(function () {
        $('.personalDetailDisabled').prop("disabled", true);
        $('#personalDetailEdit').prop("hidden", false);
        $('#personalDetailCancel').prop("hidden", true);
        $('#personalDetailSubmit').prop("hidden", true);
        view_personal_detail.put();
    });
    $("#attachmentEdit").click();
    $("#attachmentDelete").click();
});