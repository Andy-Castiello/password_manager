import "./Bar.scss";
import { MouseEvent, TouchEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setBarValue } from "../../../store/slices/accessValues/accessValues";

const barImage = require("../../../assets/bar.png");

type props = {
  barId: number;
};

const Bar = ({ barId }: props) => {
  const value = useAppSelector((state) => state.accessValues.bars[barId]);
  const accessPanelState = useAppSelector((state) => state.accessPanel.state);
  const dispatch = useAppDispatch();
  const [size, setSize] = useState([0, 0]);

  let numbers = [];
  for (let i = 0; i <= 10; i++) {
    numbers.push(i * 10);
  }

  const convertRemToPixels = (rem: number) => {
    return (
      rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  };

  const min = 0.1;
  const length = 60.1;
  const step = length / 100;

  const placeSelector = (newPos: number) => {
    const selector = document.getElementById(`bar-select${barId}`);
    if (selector instanceof HTMLDivElement) {
      selector.style.top = `${convertRemToPixels(newPos * step + min)}px`;
    }
  };

  useEffect(() => {
    setSize([window.innerWidth, window.innerHeight]);
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    placeSelector(value);
  }, [value, size]);

  const moveSelector = (
    initialSelectorPosition: number,
    initialY: number,
    clientY: number
  ) => {
    let newPos = initialSelectorPosition + clientY - initialY;
    if (newPos <= convertRemToPixels(min)) {
      newPos = 0;
    } else if (newPos >= convertRemToPixels(length)) {
      newPos = 100;
    } else {
      newPos = Math.floor(newPos / convertRemToPixels(step));
    }
    dispatch(setBarValue({ barId, value: newPos }));
  };
  const mouseMove = (event: MouseEvent) => {
    const initialY = event.clientY;

    if (event.target instanceof HTMLDivElement) {
      let selector: HTMLDivElement = event.target;

      const initialSelectorPosition = parseFloat(
        getComputedStyle(selector).top
      );

      const onMove = (e: MouseEventInit) => {
        if (e.clientY) {
          moveSelector(initialSelectorPosition, initialY, e.clientY);
        }
      };
      document.addEventListener("mousemove", onMove);
      document.onmouseup = () => {
        document.removeEventListener("mousemove", onMove);
        document.onmouseup = null;
      };
    }
  };
  const touchMove = (event: TouchEvent) => {
    const initialY = event.changedTouches[0].clientY;

    if (event.target instanceof HTMLDivElement) {
      let selector: HTMLDivElement = event.target;

      const initialSelectorPosition = parseFloat(
        getComputedStyle(selector).top
      );

      const onMove = (e: TouchEventInit) => {
        if (e.changedTouches) {
          moveSelector(
            initialSelectorPosition,
            initialY,
            e.changedTouches[0].clientY
          );
        }
      };
      document.addEventListener("touchmove", onMove);
      document.ontouchend = () => {
        document.removeEventListener("touchmove", onMove);
        document.ontouchend = null;
      };
    }
  };
  return (
    <div className="bar-body">
      <div className="bar-rail">
        {accessPanelState === "edit" ? (
          <span className="bar-rail__number">{value}</span>
        ) : (
          <></>
        )}
        <div
          className={`bar-selector${
            accessPanelState === "disabled" ? " bar-selector--disabled" : ""
          }`}
          id={"bar-select" + barId}
          onMouseDown={
            accessPanelState === "normal" || accessPanelState === "edit"
              ? mouseMove
              : undefined
          }
          onTouchStart={
            accessPanelState === "normal" || accessPanelState === "edit"
              ? touchMove
              : undefined
          }
        />
      </div>
      <div
        className="bar-image"
        style={{ backgroundImage: `url(${barImage})` }}
      />
      <div className="bar-numbers">
        {numbers.map((n) => (
          <span
            className={`bar-number${
              accessPanelState !== "disabled" ? "" : " bar-number--disabled"
            }`}
            key={n}
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Bar;
