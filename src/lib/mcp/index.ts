import { defineMcp } from "@lovable.dev/mcp-js";
import listApartments from "./tools/list-apartments";
import getContacts from "./tools/get-contacts";
import getBookingPolicies from "./tools/get-booking-policies";
import listBookingPlatforms from "./tools/list-booking-platforms";

export default defineMcp({
  name: "apartments-sochi",
  title: "Apartments Sochi",
  version: "0.1.0",
  instructions:
    "Публичные данные сервиса аренды апартаментов в Сочи: список апартаментов, условия бронирования и оплаты, контакты и ссылки на площадки бронирования.",
  tools: [listApartments, getBookingPolicies, getContacts, listBookingPlatforms],
});
