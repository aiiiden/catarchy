import { CatCareService } from "./domain/cat/cat-care.service";

export const scheduledHandler = async (
  _event: ScheduledEvent,
  _env: unknown,
  _ctx: ExecutionContext,
) => {
  await CatCareService.remindCare();
};
