import { makeVar, TypePolicy } from "@apollo/client";
import { IUser } from "./userVar";

export const userVar = makeVar<null | IUser>(null);

export default {
  read() {
    return userVar();
  },
} as TypePolicy["fields"];