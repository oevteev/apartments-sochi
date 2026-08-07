import { defineTool } from "@lovable.dev/mcp-js";
import { CONTACTS, PAGES } from "../data";

export default defineTool({
  name: "get_contacts",
  title: "Контакты и разделы сайта",
  description: "Контактные данные (телефон, email, часы работы) и список публичных страниц сайта.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ contacts: CONTACTS, pages: PAGES }, null, 2) }],
    structuredContent: { contacts: CONTACTS, pages: PAGES },
  }),
});
