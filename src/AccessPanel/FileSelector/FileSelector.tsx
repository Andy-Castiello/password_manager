import Button from "../../Components/Button/Button";
import "./FileSelector.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setAccessPanelState,
  setFileName,
  setOnEditCombination,
} from "../../store/slices/accessPanel/accessPanel";
import { resetAccessValues } from "../../store/slices/accessValues/accessValues";
import crypto from "simple-crypto-js";
import { setFileData } from "../../store/slices/global/globalState";
import { clearPasswordsList } from "../../store/slices/passwordListSlice/passwordListSlice";

type state = "normal" | "new" | "edit";

const FileSelector = () => {
  const [state, setState] = useState<state>("normal");
  const accessPanelState = useAppSelector((state) => state.accessPanel.state);
  const panel = useAppSelector((state) => state.globalState.panel);
  const fileName = useAppSelector((state) => state.accessPanel.fileName);
  const dispatch = useAppDispatch();
  const onEditCombination = useAppSelector(
    (state) => state.accessPanel.onEditCombination
  );
  const handleFiles = async () => {
    //@ts-ignore
    const { path, data } = await window.electron.fileManagement("open",{});

    dispatch(resetAccessValues());
    dispatch(setFileName(path));

    if (data) {
      const cryptoInstance = new crypto("PassMan");
      if (typeof data === "string") {
        try {
          const decryptedData = JSON.stringify(cryptoInstance.decrypt(data));
          if (JSON.parse(decryptedData).app === "password_manager") {
            dispatch(setFileData(JSON.parse(decryptedData).data));
            dispatch(setAccessPanelState("normal"));
          } else {
            dispatch(setAccessPanelState("disabled"));
            alert("El archivo seleccionado no es correcto!");
          }
        } catch (error) {
          dispatch(setAccessPanelState("disabled"));
          alert("El archivo seleccionado no es correcto!");
        }
      }
    }
  };
  const handleText = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFileName(event.target.value));
  };
  const handleNewClick = () => {
    dispatch(resetAccessValues());
    dispatch(setFileName(""));
    dispatch(setFileData(null));
    dispatch(setOnEditCombination(false));
    if (accessPanelState !== "edit") dispatch(setAccessPanelState("edit"));
    else {
      dispatch(setAccessPanelState("disabled"));
    }
    if (state !== "new") setState("new");
    else setState("normal");
  };
  const handleEditClick = () => {
    if (state !== "edit") {
      setState("edit");
      dispatch(setOnEditCombination(true));
    } else {
      setState("normal");
      dispatch(clearPasswordsList());
      dispatch(resetAccessValues());
      dispatch(setFileName(""));
      dispatch(setAccessPanelState("disabled"));
      dispatch(setFileData(null));
      dispatch(setOnEditCombination(false));
    }
  };
  useEffect(() => {
    if (onEditCombination) {
      setState("edit");
    } else if (panel === "manager") {
      setState("normal");
      dispatch(setAccessPanelState("disabled"));
    } else {
      setState("normal");
    }
  }, [onEditCombination, panel]);

  return (
    <div className="file-selector">
      <span>FILE</span>
      <div className="file-selector__selector">
        <input
          type="text"
          className="text-input file-selector__selector__text"
          value={fileName}
          onChange={handleText}
          disabled={accessPanelState !== "edit" ? true : false}
        />
        <Button onClick={handleFiles}>
          <FontAwesomeIcon icon={faPaperclip} />
        </Button>
      </div>
      <div className="file-selector__buttons">
        <Button
          onClick={handleNewClick}
          state={
            state === "new"
              ? "pressed"
              : state === "edit"
              ? "disabled"
              : undefined
          }
        >
          NEW
        </Button>
        <Button
          onClick={handleEditClick}
          state={
            fileName === "" || state === "new"
              ? "disabled"
              : state === "edit"
              ? "pressed"
              : undefined
          }
        >
          EDIT
        </Button>
      </div>
    </div>
  );
};

export default FileSelector;
