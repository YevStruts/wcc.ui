import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";

export const GetRating = () => {
    return axios.get(Constants.ApiUrls.rating + '2').then((response) => response.data);
};

export const GetProfile = (id : string) => {
    return axios.get(Constants.ApiUrls.player + 'profile/' + id).then((response) => response.data);
};

export const GetPlayers = () => {
    return axios.get(Constants.ApiUrls.player + 'list').then((response) => response.data);
};