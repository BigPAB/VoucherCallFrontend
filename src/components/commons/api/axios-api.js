import axios from 'axios'

export const getDataset = (path, set, config) => {
    getAxios(path, config)
        .then(result => {
            set(result.data === "" ? [] : result.data);
        })
        .catch(error => {
            console.error(error);
        });

};

const getAxios = (path, config) => {
    config = config || {};
    return axios.get(path, config);
};

export const postData = (path, data, config) => {
    config = config || {};
    return axios.post(path, data, config);
};

export const putData = (path, id, data, config) => {
    config = config || {};
    return axios.put(path, data, config);
};

export const deleteData = (path, id, config) => {
    config = config || {};
    return axios.delete(path, config);
};
