"use strict";
class ModelPersonalDetail {
    constructor(config) {
        this.config = config;
        this.url = config["server_url"] + "/myinfo/personaldetail";
        this.axios_config = {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("access_token")
            }
        };
    };

    get() {
        var result = axios.get(this.url, this.axios_config);
        return result;
    };
    put(data) {
        var result = axios.put(this.url, data, this.axios_config);
        return result;
    };
};

class ModelFormSelectData {
    constructor(config) {
        this.config = config;
    };

    get() {
        var result = axios.get(this.url);
        return result;
    };
};

class ModelWorkShift extends ModelFormSelectData {
    constructor(config) {
        super(config);
        this.url = this.config["server_url"] + "/workshift";
    };
}

class ModelNationality extends ModelFormSelectData {
    constructor(config) {
        super(config);
        this.url = this.config["server_url"] + "/nationality";
    };
};

class ModelReligion extends ModelFormSelectData {
    constructor(config) {
        super(config);
        this.url = this.config["server_url"] + "/religion";
    };
};

class ModelAttachment {
    constructor(config) {
        this.config = config;
        this.url = config["server_url"] + "/myinfo/personaldetail/attachment";
        this.axios_config = {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("access_token")
            }
        };
    };

    post(data) {
        var result = axios.post(this.url, data, this.axios_config);
        return result;
    };
    get(data) {
        var result = axios.get(this.url, {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("access_token")
            }, 
            params: data
        });
        return result;
    };
    put(data) {
        var result = axios.put(this.url, data, this.axios_config);
        return result;
    };
    delete(data) {
        var result = axios.delete(this.url, {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("access_token")
            }, 
            data: data
        });
        return result;
    };
}