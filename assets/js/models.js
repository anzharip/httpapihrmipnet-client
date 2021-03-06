"use strict";

class ModelReadUpdate {
    constructor(config) {
        this.config = config;
        this.url = config["server_url"] + "";
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

class ModelPersonalDetail extends ModelReadUpdate {
    constructor(config) {
        super(config);
        this.url = config["server_url"] + "/myinfo/personaldetail";
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

class ModelCRUD {
    constructor(config) {
        this.config = config;
        this.url = config["server_url"] + "";
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
            params: data
        });
        return result;
    };
}

class ModelAttachmentPersonalDetail extends ModelCRUD {
    constructor(config) {
        super(config);
        this.url = config["server_url"] + "/myinfo/personaldetail/attachment";
    };
}

class ModelContactDetail extends ModelCRUD {
    constructor(config) {
        super(config);
        this.url = config["server_url"] + "/myinfo/contactdetail";
    };
};

class ModelCountry extends ModelFormSelectData {
    constructor(config) {
        super(config);
        this.url = this.config["server_url"] + "/country";
    };
};

class ModelAttachmentContactDetail extends ModelCRUD {
    constructor(config) {
        super(config);
        this.url = config["server_url"] + "/myinfo/contactdetail/attachment";
    };
}

class ModelEmergencyContact extends ModelCRUD {
    constructor(config) {
        super(config);
        this.url = config["server_url"] + "/myinfo/emergencycontact";
    };
}

class ModelAttachmentEmergencyContact extends ModelCRUD {
    constructor(config) {
        super(config);
        this.url = config["server_url"] + "/myinfo/emergencycontact/attachment";
    };
}

class ModelDependent extends ModelCRUD {
    constructor(config) {
        super(config);
        this.url = config["server_url"] + "/myinfo/dependent";
    };
}

class ModelAttachmentDependent extends ModelCRUD {
    constructor(config) {
        super(config);
        this.url = config["server_url"] + "/myinfo/dependent/attachment";
    };
}

class ModelJob extends ModelReadUpdate {
    constructor(config) {
        super(config);
        this.url = config["server_url"] + "/myinfo/job";
    };
}