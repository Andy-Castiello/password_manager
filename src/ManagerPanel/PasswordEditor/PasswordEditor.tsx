import "./PasswordEditor.scss";
import Button from "../../Components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  changePasswordEditorValue,
  resetPasswordEditorValues,
  setAllEditorValues,
  setPasswordEditorState,
} from "../../store/slices/passwordEditorSlice/passwordEditorSlice";
import { ChangeEvent, MouseEvent, useEffect } from "react";
import {
  addPassword,
  editPassword,
  removePassword,
  setSelectedPassword,
} from "../../store/slices/passwordListSlice/passwordListSlice";
import RandomButton from "./RandomButton/RandomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const PasswordEditor = () => {
  const state = useAppSelector((state) => state.passwordEditorSlice);
  const listState = useAppSelector((state) => state.passwordListSlice);
  const dispatch = useAppDispatch();
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      if (e.target.value.length <= 40) {
        dispatch(
          changePasswordEditorValue({
            key: "name",
            value: e.target.value,
          })
        );
      }
    }
  };
  const handleNewPassChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      if (
        e.target.value.charAt(e.target.value.length - 1) !== " " &&
        e.target.value.length <= 40
      ) {
        dispatch(
          changePasswordEditorValue({
            key: "newPassword",
            value: e.target.value,
          })
        );
      }
    }
  };
  const handleCancelButton = () => {
    dispatch(setPasswordEditorState(null));
    refreshValues();
  };
  const handleDoneClick = () => {
    if (state.state === "new") {
      const id = listState.nextId;
      dispatch(
        addPassword({
          name: state.values.name,
          password: state.values.newPassword,
        })
      );
      dispatch(setSelectedPassword(id));
    } else if (state.state === "edit") {
      dispatch(
        editPassword({
          id: listState.selected,
          name: state.values.name,
          previousPassword: state.values.password,
          password: state.values.newPassword,
        })
      );
    }
    dispatch(setPasswordEditorState(null));
  };
  const handleNewClick = () => {
    if (state.state !== "new") {
      dispatch(resetPasswordEditorValues());
      dispatch(setSelectedPassword(null));
      dispatch(setPasswordEditorState("new"));
    }
  };
  const handleEditClick = () => {
    if (state.state !== "edit") {
      dispatch(setPasswordEditorState("edit"));
    }
  };
  const handleDeleteClick = () => {
    if (listState.selected !== null && !state.state) {
      if (
        window.confirm(
          `Are you sure you want to remove this password?\n\n${
            listState.list.find((pass) => pass.id === listState.selected)?.name
          }`
        )
      ) {
        dispatch(removePassword(listState.selected));
        dispatch(setSelectedPassword(null));
      }
    }
  };
  const refreshValues = () => {
    if (listState.selected !== null) {
      const selectedPass = listState.list.find(
        (pass) => pass.id === listState.selected
      );
      dispatch(setAllEditorValues(selectedPass));
    } else {
      dispatch(resetPasswordEditorValues());
    }
  };
  const copyToClipboard = (event: MouseEvent<HTMLElement>, value: string) => {
    //@ts-ignore
    window.electron.clipboard(value);
    const element = (event.target as Element).querySelector(
      ".clipboard-message"
    );
    if (element) {
      element.setAttribute("style", "opacity:1;transition:none;");

      setTimeout(() => {
        element.setAttribute(
          "style",
          "opacity:0;transition:opacity .3s ease-out;"
        );
      }, 1000);
    }
  };
  useEffect(refreshValues, [listState.selected, state.state]);
  return (
    <div
      className={
        "password-editor" + (!state.state ? " password-editor--disabled" : "")
      }
    >
      <div className="password-editor__section">
        <span>NAME</span>
        <input
          type="text"
          className="text-input"
          value={state.values.name}
          onChange={state.state ? handleNameChange : undefined}
          disabled={!state.state}
        />
      </div>
      <div className="password-editor__section password-editor__section--disabled">
        <span>PREVIOUS PASSWORD</span>
        <div className="password-editor__section__password">
          <input
            type="text"
            className="text-input"
            value={state.values.previousPassword}
            disabled={true}
          />
          <Button
            onClick={(event: MouseEvent<HTMLElement>) =>
              copyToClipboard(event, state.values.previousPassword)
            }
          >
            <span className="clipboard-message">Copied to clipboard</span>
            <FontAwesomeIcon icon={faCopy} />
          </Button>
        </div>
      </div>
      <div className="password-editor__section password-editor__section--disabled">
        <span>PASSWORD</span>
        <div className="password-editor__section__password">
          <input
            type="text"
            className="text-input"
            value={state.values.password}
            disabled={true}
          />
          <Button
            onClick={(event: MouseEvent<HTMLElement>) =>
              copyToClipboard(event, state.values.password)
            }
          >
            <span className="clipboard-message">Copied to clipboard</span>
            <FontAwesomeIcon icon={faCopy} />
          </Button>
        </div>
      </div>
      <div className="password-editor__section">
        <span>NEW PASSWORD</span>
        <input
          type="text"
          className="text-input"
          value={state.values.newPassword}
          onChange={state.state ? handleNewPassChange : undefined}
          disabled={!state.state}
        />
      </div>
      <RandomButton />
      <div className="password-editor__section password-editor__section--last-update">
        <span>LAST UPDATE:</span>
        <span>{state.values.lastUpdate}</span>
      </div>
      <div className="password-editor__buttons">
        <Button
          state={state.state ? "normal" : "disabled"}
          onClick={handleDoneClick}
        >
          DONE
        </Button>
        <Button
          state={state.state ? "normal" : "disabled"}
          onClick={state.state ? handleCancelButton : undefined}
        >
          CANCEL
        </Button>
      </div>
      <div className="password-editor__buttons">
        <Button
          state={
            state.state === "new"
              ? "pressed"
              : state.state === "edit"
              ? "disabled"
              : "normal"
          }
          onClick={handleNewClick}
        >
          NEW
        </Button>
        <Button
          state={
            state.state === "edit"
              ? "pressed"
              : state.state === "new" || listState.selected === null
              ? "disabled"
              : "normal"
          }
          onClick={handleEditClick}
        >
          EDIT
        </Button>
        <Button
          state={
            state.state || listState.selected === null ? "disabled" : "normal"
          }
          onClick={handleDeleteClick}
        >
          DELETE
        </Button>
      </div>
    </div>
  );
};

export default PasswordEditor;
