import { useEffect } from "react";
import Button from "../../Components/Button/Button";
import createFile from "../../functions/createFile";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setAccessPanelState,
  setFileName,
} from "../../store/slices/accessPanel/accessPanel";
import { resetAccessValues } from "../../store/slices/accessValues/accessValues";
import { setFileData, setPanel } from "../../store/slices/global/globalState";
import { clearPasswordsList } from "../../store/slices/passwordListSlice/passwordListSlice";
import "./ManagerButtons.scss";

const ManagerButtons = () => {
  const accessValues = useAppSelector((state) => state.accessValues);
  const passwordsList = useAppSelector((state) => state.passwordListSlice);
  const fileName = useAppSelector((state) => state.accessPanel.fileName);
  const dispatch = useAppDispatch();

  const handleSave = async (saveAs = false) => {
    let response;
    if (saveAs) {
      //@ts-ignore
      response = await window.electron.fileManagement("saveAs", {
        fileName,
        data: createFile(accessValues, passwordsList),
      });
    } else if (window.confirm("Are you sure you want to save?")) {
      //@ts-ignore
      response = await window.electron.fileManagement("save", {
        fileName,
        data: createFile(accessValues, passwordsList),
      });
    } else return;
    if (response === "success") {
      alert("The file was successfully saved!");
    } else if (response === "error") {
      alert("Something went wrong!");
    }
  };
  const close = () => {
    dispatch(clearPasswordsList());
    dispatch(resetAccessValues());
    dispatch(setFileName(""));
    dispatch(setAccessPanelState("disabled"));
    dispatch(setFileData(null));
    dispatch(setPanel("access"));
  };
  useEffect(() => {
    const enter = (event: KeyboardEvent) => {
      if (event.key === "Enter") document.getElementById("enter-bind")?.click();
    };
    document.addEventListener("keypress", enter);
    return () => document.removeEventListener("keypress", enter);
  }, []);
  return (
    <div className="manager-buttons">
      <Button id="enter-bind" onClick={() => handleSave()}>SAVE</Button>
      <Button onClick={() => handleSave(true)}>SAVE AS</Button>
      <Button onClick={close}>CLOSE</Button>
    </div>
  );
};

export default ManagerButtons;
