import type { SeedService } from "./seed.service.d";

import { userMock, artistsMock, labelsMock } from "../../../../__mocks__";
import { seedRepository } from "../../repository";

const seedService: SeedService = {
  generateData: async (): Promise<void> => {
    await seedRepository.restartAndLoadData(userMock, artistsMock, labelsMock);
  },
};

export default seedService;
