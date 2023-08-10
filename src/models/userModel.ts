class userModel {
  email: string;
  password: string;
  name: string;
  birthdate: string;
  phone: string;
  gender: string;

  constructor(
    email: string,
    password: string,
    name: string,
    birthdate: string,
    phone: string,
    gender: string
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.birthdate = birthdate;
    this.phone = phone;
    this.gender = gender;
  }
}

export default userModel;
