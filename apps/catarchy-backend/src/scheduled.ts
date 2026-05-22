import { CatCareService } from "./domain/cat/cat-care.service";

export const scheduledHandler = async () => {
  await CatCareService.remindCare();
};
