export const createUserDto = (user) => {
  return {
    email: user.email,
    id: user.id,
    isActivated: user.is_activated,
  };
};
