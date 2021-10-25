import { USER_DATA } from "../constants/localStorageKeys";

class UserModel {
  public userID: string;
  public username: string;
  public accessToken: string;
  public refreshToken: string;

  constructor(
    userID: string,
    username: string,
    accessToken: string,
    refreshToken: string
  ) {
    this.userID = userID;
    this.username = username;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  save() {
    localStorage.setItem(
      USER_DATA,
      JSON.stringify({
        userID: this.userID,
        username: this.username,
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
      })
    );
  }

  static deleteSave() {
    localStorage.removeItem(USER_DATA);
  }

  static get(): UserModel | null {
    const savedData: string | null = localStorage.getItem(USER_DATA);

    if (!savedData) return null;

    const jsonFormat: {
      userID: string;
      username: string;
      accessToken: string;
      refreshToken: string;
    } = JSON.parse(savedData);

    return new UserModel(
      jsonFormat.userID,
      jsonFormat.username,
      jsonFormat.accessToken,
      jsonFormat.refreshToken
    );
  }
}

export default UserModel;
