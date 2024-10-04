import axios from "axios";
import * as DataBaseUtils from "./DataBaseUtils";

// export const ENDPOINT_API = 'http://localhost:8081/ctv/api/users';
export const ENDPOINT_API = 'http://flaviocecca00server:8081/ctv/api/users';
export const ENDPOINT_LOGIN = ENDPOINT_API + '/login';
export const ENDPOINT_BACKUP = ENDPOINT_API + '/backup';
export const ENDPOINT_GET_JSON = ENDPOINT_API + '/getJson';

//CHIAMATA API PER CARICARE IL JSON SU MONGO
export const uploadJson = async () => {
    const username = localStorage.getItem('user');
    const json = await DataBaseUtils.getData();
    const request = {
        username: username,
        json: json
    };
    const response = await axios.post(ENDPOINT_BACKUP, request);

    console.log(response.data);
    return response.data;
};

//CHIAMATA API PER SCARICARE IL JSON SU MONGO
export const getJson = async () => {
    const username = localStorage.getItem('user');
    const response = await axios.get(ENDPOINT_GET_JSON + '?username=' + username);

    await DataBaseUtils.saveData(response.data.json);

    console.log(response.data.msg);
    return response.data.msg;
};

//CHIAMATA API PER FARE IL LOGIN
export const login = async (username, password) => {
    const response = await axios.get(ENDPOINT_LOGIN + '?username=' + username + '&password=' + password);

    DataBaseUtils.saveData(response.data.json).then(() => {});

    console.log(response.data);
    return response.data;
};