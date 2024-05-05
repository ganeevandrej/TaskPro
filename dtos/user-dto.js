export const createUserDto = (user) => {
  return {
    email: user.email,
    id: user.id,
    phone: user.phone ? totTransorformationPhone(user.phone) : user.phone,
    name: user.user_name,
    dateBirth: user.phone
      ? totTransorformationDateBirth(user.date_birth)
      : user.date_birth,
    isActivated: user.is_activated,
  };
};

const totTransorformationPhone = (str) => {
  return `${str[0]}(${str.slice(1, 4)}) ${str.slice(4, 7)}-${str.slice(
    7,
    9
  )}-${str.slice(9, 11)}`;
};

const totTransorformationDateBirth = (dateBirth) => {
  const parts = dateBirth.split(".");
  const monthNumber = parseInt(parts[1], 10);
  const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];
  parts[1] = months[monthNumber - 1];
  return parts.join(" ");
};
