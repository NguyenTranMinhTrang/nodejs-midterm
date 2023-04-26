const saveToLocal = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

const getDataFromLocal = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    saveToLocal,
    getDataFromLocal,
}