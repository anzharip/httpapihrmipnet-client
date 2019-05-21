function showModal(message) {
    document.getElementById("modal-message").innerHTML = message;
    $('#exampleModal').modal('show');
};

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

function getPersonalDetail() {
    axios.get('http://anzmbp.local:5000/myinfo/personaldetail', {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("access_token")
            }
        })
        .then(function (response) {
            $("#first_name").val(response.data.first_name);
            $("#middle_name").val(response.data.middle_name);
            $("#last_name").val(response.data.last_name);
            $("#employee_id").val(response.data.employee_id);
            $("#no_ktp").val(response.data.no_ktp);
            $("#drivers_license_number").val(response.data.drivers_license_number);
            $("#license_expiry_date").val(response.data.license_expiry_date);
            $("#no_bpjs_kesehatan").val(response.data.no_bpjs_kesehatan);
            $("#no_npwp").val(response.data.no_npwp);
            $("#no_bpjs_ketenagakerjaan").val(response.data.no_bpjs_ketenagakerjaan);
            $("#work_shift").val(response.data.work_shift);
            if (response.data.gender == "1") {
                $("#gender").val("Male");
            } else {
                $("#gender").val("Female");
            }
            // $("#gender").val(response.data.gender);
            $("#marital_status").val(response.data.marital_status);
            $("#nationality").val(response.data.nationality);
            $("#date_of_birth").val(response.data.date_of_birth);
            $("#religion").val(response.data.religion);
            $("#place_of_birth").val(response.data.place_of_birth);
            console.log(response);
        })
        .catch(function (error) {
            var message = error.response.data.msg;
            showModal(message)
            console.log(error.response);
        })
        .finally(function () {
            // always executed
        });
};

function getGenderByName(gender_name) {
    if (gender_name == "Male") {
        return "1"
    } else {
        return "2"
    }

};

function getNationalityByName(nation_name) {
    var data = JSON.parse(sessionStorage["nationality"]);
    var result = data.filter(function (el) {
        return el.nation_name.indexOf(nation_name) > -1;
    });
    return result[0]["nation_code"];

};

function getReligionByName(religion_name) {
    var data = JSON.parse(sessionStorage["religion"]);
    var result = data.filter(function (el) {
        return el.religion_name.indexOf(religion_name) > -1;
    });
    return result[0]["religion_code"];
};

function getWorkShiftByName(workshift_name) {
    var data = JSON.parse(sessionStorage["work_shift"]);
    var result = data.filter(function (el) {
        return el.workshift_name.indexOf(workshift_name) > -1;
    });
    return result[0]["workshift_code"];
};

function putPersonalDetail() {
    var data = {
        first_name: $("#first_name").val(),
        middle_name: $("#middle_name").val(),
        last_name: $("#last_name").val(),
        no_ktp: $("#no_ktp").val(),
        license_expiry_date: $("#license_expiry_date").val(),
        no_bpjs_kesehatan: $("#no_bpjs_kesehatan").val(),
        no_npwp: $("#no_npwp").val(),
        no_bpjs_ketenagakerjaan: $("#no_bpjs_ketenagakerjaan").val(),
        work_shift: getWorkShiftByName($("#work_shift").val()),
        gender: getGenderByName($("#gender").val()),
        marital_status: $("#marital_status").val(),
        nationality: getNationalityByName($("#nationality").val()),
        date_of_birth: $("#date_of_birth").val(),
        religion: getReligionByName($("#religion").val()),
        place_of_birth: $("#place_of_birth").val()
    };
    console.log(data)
    var config = {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem("access_token")
        }
    };
    axios.put('http://anzmbp.local:5000/myinfo/personaldetail', data, config)
        .then(function (response) {
            getPersonalDetail();
            console.log(response);
        })
        .catch(function (error) {
            var message = error.response.data.msg;
            showModal(message)
            console.log(error.response);
        });


};

function getWorkShift() {
    axios.get('http://anzmbp.local:5000/workshift')
        .then(function (response) {
            // handle success
            $('#work_shift').empty();
            response.data.forEach(element => {
                $('#work_shift').append("<option>" + element.workshift_name + "</option>")
            });
            sessionStorage.setItem("work_shift", JSON.stringify(response.data));
            console.log(response);
        })
        .catch(function (error) {
            var message = error.response.data.msg;
            showModal(message)
            console.log(error.response);
        })
        .finally(function () {
            // always executed
        });
};


function getNationality() {
    axios.get('http://anzmbp.local:5000/nationality')
        .then(function (response) {
            // handle success
            $('#nationality').empty();
            response.data.forEach(element => {
                $('#nationality').append("<option>" + element.nation_name + "</option>")
            });
            sessionStorage.setItem("nationality", JSON.stringify(response.data));
            console.log(response);
        })
        .catch(function (error) {
            var message = error.response.data.msg;
            showModal(message)
            console.log(error.response);
        })
        .finally(function () {
            // always executed
        });

};


function getReligion() {
    axios.get('http://anzmbp.local:5000/religion')
        .then(function (response) {
            // handle success
            $('#religion').empty();
            response.data.forEach(element => {
                $('#religion').append("<option>" + element.religion_name + "</option>")

            });
            console.log(response);
            sessionStorage.setItem("religion", JSON.stringify(response.data));
        })
        .catch(function (error) {
            var message = error.response.data.msg;
            showModal(message)
            console.log(error.response);
        })
        .finally(function () {
            // always executed
        });
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
    checkToken();
    getWorkShift();
    getNationality();
    getReligion();
    getPersonalDetail();
    $('#personalDetailCancel').prop("hidden", true);
    $('#personalDetailSubmit').prop("hidden", true);
    $("#personalDetailEdit").click(function () {
        $('.personalDetailDisabled').prop("disabled", false);
        $('#personalDetailEdit').prop("hidden", true);
        $('#personalDetailCancel').prop("hidden", false);
        $('#personalDetailSubmit').prop("hidden", false);
    });
    $("#personalDetailCancel").click(function () {
        getPersonalDetail();
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
        putPersonalDetail();
    });
});