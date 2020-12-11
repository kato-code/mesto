export default class UserInfo {
    constructor({nameProfile, professionProfile, avatarProfile}) {
        this._nameProfile = document.querySelector(nameProfile);
        this._professionProfile = document.querySelector(professionProfile);
        this._avatarProfile = document.querySelector(avatarProfile);
    }

    getUserInfo() {
        return {
            name: this._nameProfile.textContent,
            profession: this._professionProfile.textContent,
        }
    }

    setUserInfo(data) {
        this._nameProfile.textContent = data.name;
        this._professionProfile.textContent = data.profession; 
    }

    setUserAvatar(data) {
        this._avatarProfile.src = data.avatar;
    }
}
