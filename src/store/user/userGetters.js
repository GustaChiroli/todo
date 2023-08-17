export const getters = {
  GET_USER: (state) => {
    return {
      id: state.id,
      email: state.email,
      name: state.name,
      birthdate: state.birthdate,
      phone: state.phone,
      gender: state.gender,
      isValidated: state.isValidated,
      token: state.token,
    };
  },
};
