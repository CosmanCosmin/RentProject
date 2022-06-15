import {houseHttp} from "../http-common"
import authHeader from "./authHeader";

const create = data => {
    return houseHttp.post("/create", data, {headers: authHeader()});
}

const get = id => {
    return houseHttp.get(`/${id}`);
}

const remove = id => {
    return houseHttp.delete(`/${id}`, {headers: authHeader()});
}

const getByCriteria = data => {
    return houseHttp.get(`/search?county=${data.county}&type=${data.type}&sellType=${data.sellType}`)
}

const houseService = {
    create, 
    get,
    remove,
    getByCriteria
};

export default houseService;