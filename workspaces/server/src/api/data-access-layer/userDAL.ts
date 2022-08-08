import db from "../../database";

export default {
  async getByEmail(email: string) {
    return await db.userDB.findUnique({ where: { email: email } });
  },

  async getById(id: number) {
    return await db.userDB.findUnique({ where: { id: id } });
  },

  async create(email: string, password: string, username: string) {
    return await db.userDB.create({ data: { email, password, username, active: true } });
  },

  async active(email: string, password: string) {
    return await db.userDB.update({
      where: { email: email },
      data: { password, active: true },
    });
  },

  async disableUserById(id: number) {
    await db.userDB.update({ where: { id: id }, data: { active: false } });
  },
};
