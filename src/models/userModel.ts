import tokenModel from '../models/tokenModel';

class userModel {
  id: string;
  email: string;
  name: string;
  birthdate: string;
  phone: string;
  gender: string;
  isValidated: boolean;
  token: tokenModel;

  constructor(
    id: string,
    email: string,
    name: string,
    birthdate: string,
    phone: string,
    gender: string,
    isValidated: boolean,
    token: tokenModel
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.birthdate = birthdate;
    this.phone = phone;
    this.gender = gender;
    this.isValidated = isValidated;
    this.token = token;
  }
}

export default userModel;
