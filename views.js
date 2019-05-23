"use strict";
class ViewPersonalDetail {
    init() {
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
        this.get();
    };
    get() {
        var model_personal_detail = new ModelPersonalDetail(config);
        model_personal_detail.get().then(function (response) {
            app_personal_detail.first_name = response.data.first_name,
                app_personal_detail.middle_name = response.data.middle_name,
                app_personal_detail.last_name = response.data.last_name,
                app_personal_detail.employee_id = response.data.employee_id,
                app_personal_detail.no_ktp = response.data.no_ktp,
                app_personal_detail.drivers_license_number = response.data.drivers_license_number,
                app_personal_detail.license_expiry_date = response.data.license_expiry_date,
                app_personal_detail.no_bpjs_kesehatan = response.data.no_bpjs_kesehatan,
                app_personal_detail.no_npwp = response.data.no_npwp,
                app_personal_detail.no_bpjs_ketenagakerjaan = response.data.no_bpjs_ketenagakerjaan,
                app_personal_detail.selected_workshift = response.data.work_shift,
                app_personal_detail.selected_gender = response.data.gender,
                app_personal_detail.selected_marital_status = response.data.marital_status,
                app_personal_detail.selected_nationality = response.data.nationality,
                app_personal_detail.date_of_birth = response.data.date_of_birth,
                app_personal_detail.selected_religion = response.data.religion,
                app_personal_detail.place_of_birth = response.data.place_of_birth,
                app_personal_detail.message = response.data.message
            $('#personalDetailModal').modal('show');
            console.log(response)
        }).catch(function (error) {
            $('#personalDetailModal').modal('show');
            app_personal_detail.message = error.response.data.message; 
            console.log(error.response)
        });
    };
    put() {
        var model_personal_detail = new ModelPersonalDetail(config);
        var data = {
            first_name: app_personal_detail.first_name,
            middle_name: app_personal_detail.middle_name,
            last_name: app_personal_detail.last_name,
            no_ktp: app_personal_detail.no_ktp,
            license_expiry_date: app_personal_detail.license_expiry_date,
            no_bpjs_kesehatan: app_personal_detail.no_bpjs_kesehatan,
            no_npwp: app_personal_detail.no_npwp,
            no_bpjs_ketenagakerjaan: app_personal_detail.no_bpjs_ketenagakerjaan,
            work_shift: app_personal_detail.selected_workshift,
            gender: app_personal_detail.selected_gender,
            marital_status: app_personal_detail.selected_marital_status,
            nationality: app_personal_detail.selected_nationality,
            religion: app_personal_detail.selected_religion,
            place_of_birth: app_personal_detail.place_of_birth
        }
        model_personal_detail.put(data).then(function (response) {
            app_personal_detail.message = response.data.message
            $('#personalDetailModal').modal('show');
            console.log(response)
        }).catch(function (error) {
            app_personal_detail.message = error.response.data.message; 
            $('#personalDetailModal').modal('show');
        });
    };
}