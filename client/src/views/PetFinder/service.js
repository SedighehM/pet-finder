import request from "@/utils/request";
import { getToken } from "@/utils/auth";

//return a promise for statics
export function getStatics(attribute) {
  // we can logout user in intreceptor if token is expired
  return request({
    url: "/statics?token=" + getToken() + "&attribute=" + attribute,
    method: "get",
  });
}
