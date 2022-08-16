import bcrypt from "../../utils/bcrypt";
import { userMock, artistsMock, labelsMock } from "../../__mocks__";

import { seedDAL } from "../data-access-layer";

const generateData = async (): Promise<void> => {
  const passwordEncrypted = await bcrypt.hash(userMock.password);
  const user = { ...userMock, password: passwordEncrypted };

  await seedDAL.restartAndLoadData(user, artistsMock, labelsMock);

  return;
};

export default {
  generateData,
};
