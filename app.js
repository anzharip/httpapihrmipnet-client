"use strict";
var config = {
    "server_url": "http://anzmbp.local:5000"
}

var app_personal_detail = new Vue({
    el: "#app_personal_detail",
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
            var model_attachment = new ModelAttachment(config);
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
            var model_attachment = new ModelAttachment(config);
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
            var model_attachment = new ModelAttachment(config);
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
            var model_attachment = new ModelAttachment(config);
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
    var model_attachment = new ModelAttachment(config);
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