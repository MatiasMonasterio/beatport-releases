import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export default {
  hash: async (value: string) => {
    return await bcrypt.hash(value, SALT_ROUNDS);
  },

  compare: async (data: string, encrypted: string) => {
    const dataEncrypted = /^\$2y\$/.test(encrypted) ? "$2a$" + encrypted.slice(4) : encrypted;
    return await bcrypt.compare(data, dataEncrypted);
  },
};
