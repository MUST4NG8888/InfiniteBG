export const getTokenObject = (obj: any) => {
  const tokenObject = {
    email: obj.email,
    name: obj.name,
    avatar: obj.avatar,
    profile: obj.profile,
    id: obj._id
  };
  return tokenObject;
};
