import { CatCareService } from "@/domain/cat";

export const scheduledHandler = async () => {
  await CatCareService.remindCare();
};
