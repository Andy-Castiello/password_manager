import { accessValuesType } from "../store/slices/accessValues/accessValues";
import { PasswordsListType } from "../store/slices/passwordListSlice/passwordListSlice";
import crypto from "simple-crypto-js";
import createKey from "./createKey";

const createFile = (
  accessValues: accessValuesType,
  passwordsListState: PasswordsListType
) => {
  const key = createKey(accessValues);
  const cryptoInstance = new crypto("PassMan");
  const cryptoDataInstance = new crypto(key);
  let textContent = {
    app: "password_manager",
    version: "1.0",
    data: cryptoDataInstance.encrypt(
      JSON.stringify({
        accessValues: {
          bars: accessValues.bars,
          lock: accessValues.lock,
          password: accessValues.password,
        },
        passwordsList: {
          list: passwordsListState.list,
          nextId: passwordsListState.nextId,
        },
      })
    ),
  };

  return cryptoInstance.encrypt(textContent);
};
export default createFile;
