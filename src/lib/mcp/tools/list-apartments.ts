import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { APARTMENTS } from "../data";

export default defineTool({
  name: "list_apartments",
  title: "Список апартаментов",
  description: "Список апартаментов в Сочи с площадью, жилым комплексом и ссылкой на видеообзор.",
  inputSchema: {
    minArea: z.number().optional().describe("Минимальная площадь в м²."),
    maxArea: z.number().optional().describe("Максимальная площадь в м²."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ minArea, maxArea }) => {
    const items = APARTMENTS.filter(
      (a) => (minArea === undefined || a.area >= minArea) && (maxArea === undefined || a.area <= maxArea),
    );
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { apartments: items },
    };
  },
});
