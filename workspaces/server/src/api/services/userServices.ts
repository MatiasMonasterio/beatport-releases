import db from "../../database";

interface User {
  id: string | number;
  name: string | null;
  email: string;
}

const createNewArtist = async ({ id, name, email }: User): Promise<User> => {
  id = +id;

  const user = await db.user.findFirst({ where: { email: email } });
  if (user) throw { status: 409, message: "User already exist" };

  const newUser = await db.user.create({ data: { id, name, email } });
  return newUser;
};

export default {
  createNewArtist,
};
