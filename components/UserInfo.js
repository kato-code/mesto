// import { nameProfileInput, professionProfileInput} from "./utils.js";

export default class UserInfo {
    constructor(nameProfile, professionProfile) {
        this._nameProfile = nameProfile;
        this._professionProfile = professionProfile;
    }

    getUserInfo() {
        return {
            name: this._nameProfile.textContent,
            profession: this._professionProfile.textContent
        }
    }

    setUserInfo({name, profession}) {
        this._nameProfile.textContent = name;
        this._professionProfile.textContent = profession; 
    }
}
