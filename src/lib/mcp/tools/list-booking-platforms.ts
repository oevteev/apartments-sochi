import { defineTool } from "@lovable.dev/mcp-js";
import { BOOKING_PLATFORMS } from "../data";

export default defineTool({
  name: "list_booking_platforms",
  title: "Площадки бронирования",
  description: "Внешние площадки (Avito, Суточно.ру, Островок, Циан, Яндекс Путешествия, Отелло) с прямыми ссылками.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(BOOKING_PLATFORMS, null, 2) }],
    structuredContent: { platforms: BOOKING_PLATFORMS },
  }),
});
