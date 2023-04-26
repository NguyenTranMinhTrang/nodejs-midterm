import axios from "axios";
import constants from "../constants";

const TIME_OUT = 2000;

const instance = axios.create({
    baseURL: constants.BASE_URL,
    timeout: TIME_OUT,
});

export default instance;