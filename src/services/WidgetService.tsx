import axios from "axios";
import { Constants } from "../helpers/ConstantHelper";
import { LiveScoreType } from "../pages/widgets/livescore";
import { id } from "date-fns/locale";

export const GetLiveScore = (id : string) => {
    return axios.get(Constants.ApiUrls.widget_livescore + encodeURIComponent(id)).then((response) => response.data);
}

export const SaveLiveScore = (liveScore: LiveScoreType) => {
    return axios.post(Constants.ApiUrls.widget_livescore, liveScore);
}