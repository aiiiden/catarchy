export const scheduledHandler = async (
  event: ScheduledEvent,
  _env: unknown,
  _ctx: ExecutionContext,
) => {
  console.warn(`[Scheduled] Unknown cron: ${event.cron}`);
};
