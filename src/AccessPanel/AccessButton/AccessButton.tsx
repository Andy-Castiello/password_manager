import Button from "../../Components/Button/Button";
import Led from "../../Components/Led/Led";
import crypto from "simple-crypto-js";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./AccessButton.scss";
import {
  setAccessPanelState,
  setAccessState,
  setFileName,
  setOnEditCombination,
} from "../../store/slices/accessPanel/accessPanel";
import { setFileData, setPanel } from "../../store/slices/global/globalState";
import {
  resetAccessValues,
  accessValuesType,
} from "../../store/slices/accessValues/accessValues";
import { uploadPasswordData } from "../../store/slices/passwordListSlice/passwordListSlice";
import createFile from "../../functions/createFile";
import { useEffect } from "react";

const AccessButton = () => {
  const accessPanelState = useAppSelector((state) => state.accessPanel.state);
  const accessState = useAppSelector((state) => state.accessPanel.access);
  const accessValues = useAppSelector((state) => state.accessValues);
  const passwordsListState = useAppSelector((state) => state.passwordListSlice);
  const fileName = useAppSelector((state) => state.accessPanel.fileName);
  const fileData = useAppSelector((state) => state.globalState.fileData);
  const onEditCombination = useAppSelector(
    (state) => state.accessPanel.onEditCombination
  );
  const dispatch = useAppDispatch();

  const validateConbination = (accessValues: accessValuesType) => {
    return (
      accessValues.password === accessValues.confirmPassword &&
      accessValues.password !== "" &&
      accessValues.lock[0] !== null &&
      accessValues.lock[1] !== null &&
      accessValues.lock[2] !== null
    );
  };

  const handleDoneClick = () => {
    const createKey = () =>
      accessValues.bars.reduce((acum, actual) => acum + `${actual}+`, "") +
      accessValues.lock.reduce((acum, actual) => acum + `${actual}+`, "") +
      accessValues.password;
    if (accessPanelState === "normal") {
      const cryptoDataInstance = new crypto(createKey());
      try {
        if (typeof fileData === "string") {
          const decryptedData = JSON.parse(
            JSON.stringify(cryptoDataInstance.decrypt(fileData))
          );
          dispatch(setFileData(decryptedData));
          dispatch(
            uploadPasswordData({
              list: decryptedData.passwordsList.list,
              nextId: decryptedData.passwordsList.nextId,
            })
          );
          dispatch(setAccessState("granted"));
          setTimeout(() => {
            if (onEditCombination) {
              dispatch(setAccessPanelState("edit"));
            } else {
              dispatch(setAccessPanelState("disabled"));
              dispatch(setPanel("manager"));
            }
            dispatch(setAccessState("off"));
          }, 1000);
        } else {
          dispatch(setAccessState("denied"));
          setTimeout(() => {
            dispatch(setAccessState("off"));
          }, 1000);
        }
      } catch (error) {
        dispatch(setAccessState("denied"));
        setTimeout(() => {
          dispatch(setAccessState("off"));
        }, 1000);
      }
    } else if (accessPanelState === "edit") {
      if (validateConbination(accessValues)) {
        dispatch(setAccessState("granted"));
        setTimeout(() => {
          if (onEditCombination) {
            dispatch(setOnEditCombination(false));
            dispatch(setAccessPanelState("disabled"));
            dispatch(setAccessState("off"));
            dispatch(resetAccessValues());
            dispatch(setFileData(null));
            dispatch(setFileName(""));
          } else {
            dispatch(setAccessState("off"));
            dispatch(setPanel("manager"));
          }
        }, 1000);
      } else {
        dispatch(setAccessState("denied"));
        setTimeout(() => {
          dispatch(setAccessState("off"));
        }, 1000);
      }
    }
  };
  const handleSave = async (saveAs = false) => {
    if (validateConbination(accessValues)) {
      dispatch(setAccessState("granted"));
      let response;
      if (saveAs) {
        //@ts-ignore
        response = await window.electron.fileManagement("saveAs", {
          fileName,
          data: createFile(accessValues, passwordsListState),
        });
      } else if (window.confirm("Are you sure you want to save?")) {
        //@ts-ignore
        response = await window.electron.fileManagement("save", {
          fileName,
          data: createFile(accessValues, passwordsListState),
        });
      } else return;
      if (response === "success") {
        alert("The file was successfully saved!");
        dispatch(setOnEditCombination(false));
        dispatch(setAccessPanelState("disabled"));
        dispatch(setAccessState("off"));
        dispatch(resetAccessValues());
        dispatch(setFileData(null));
        dispatch(setFileName(""));
      } else if ("canceled") {
        dispatch(setAccessState("off"));
      } else {
        alert("Something went wrong!");
        dispatch(setAccessState("off"));
      }
    } else {
      dispatch(setAccessState("denied"));
      setTimeout(() => {
        dispatch(setAccessState("off"));
      }, 1000);
    }
  };
  useEffect(() => {
    const enter = (event: KeyboardEvent) => {
      if (event.key === "Enter") document.getElementById("enter-bind")?.click();
    };
    document.addEventListener("keypress", enter);
    return () => document.removeEventListener("keypress", enter);
  }, []);
  return accessPanelState === "edit" && onEditCombination ? (
    <div className="access-button-panel">
      <Button id="enter-bind" onClick={() => handleSave()}>
        SAVE
      </Button>
      <Led
        on={accessState !== "off"}
        color={accessState === "granted" ? "GREEN" : "RED"}
      />
      <Button onClick={() => handleSave(true)}>SAVE AS</Button>
    </div>
  ) : (
    <div className="access-button-panel">
      <Button
        onClick={handleDoneClick}
        state={accessPanelState === "disabled" ? "disabled" : undefined}
        id="enter-bind"
      >
        DONE
      </Button>
      <Led
        on={accessState !== "off"}
        color={accessState === "granted" ? "GREEN" : "RED"}
      />
    </div>
  );
};

export default AccessButton;
