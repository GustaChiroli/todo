import tokenModel from '../../models/tokenModel';

interface UserState {
  id: string | null;
  email: string | null;
  name: string | null;
  birthdate: string | null;
  phone: string | null;
  gender: string | null;
  isValidated: boolean | false;
  token: tokenModel | null;
}

const state: UserState = {
  id: null,
  email: null,
  name: null,
  birthdate: null,
  phone: null,
  gender: null,
  isValidated: false,
  token: null,
};

export default state;
