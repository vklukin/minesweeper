import { useEffect, useRef, useState } from "react";

import { CreateGame } from "./controllers/CreateGame";
import OpenPlate from "./controllers/OpenPlate";
import {
  ClearFlags,
  ClearTimer,
  CountFlags,
  RenderTimer,
} from "./controllers/RenderCounterPlates";

function App() {
  const mine = -1;
  const size = 16;
  let counter = 0;

  const flags = new Set();
  const questions = new Set();
  let prevValue = [];

  const [fields, setFields] = useState(() => CreateGame(size, 40));
  const [endGame, setEndGame] = useState(false);
  const [startTimer, setStartTimer] = useState(false);

  const smileRef = useRef(null);
  //counter ref
  const counterFirstRef = useRef(null);
  const counterSecondRef = useRef(null);
  const counterThirdRef = useRef(null);
  //timer ref
  const timerFirstRef = useRef(null);
  const timerSecondRef = useRef(null);
  const timerThirdRef = useRef(null);

  useEffect(() => {
    if (endGame) {
      setStartTimer(false);
      return () => window.clearInterval(window.intervalId);
    }
  }, [endGame]);

  return (
    <div className="game">
      <div className="game__wrapper">
        <div className="game__menu">
          <div className="menu__bomb-counter">
            <div className="counter counter-zero" ref={counterFirstRef}></div>
            <div className="counter counter-four" ref={counterSecondRef}></div>
            <div className="counter counter-zero" ref={counterThirdRef}></div>
          </div>
          <div
            className="smile"
            ref={smileRef}
            onMouseDown={() => smileRef.current.classList.add("smile-pressed")}
            onMouseUp={() => smileRef.current.classList.remove("smile-pressed")}
            onClick={() => {
              setFields([]);
              setTimeout(() => {
                setFields(() => CreateGame(size, 40));
              }, 1);

              setEndGame(false);
              setStartTimer(false);
              window.clearInterval(window.intervalId);

              flags.clear();
              questions.clear();
              ClearFlags({
                counterFirstRef,
                counterSecondRef,
                counterThirdRef,
              });

              counter = 0;
              ClearTimer({
                timerFirstRef,
                timerSecondRef,
                timerThirdRef,
              });

              smileRef.current.classList.remove("smile-died");
            }}
          ></div>
          <div className="menu__timer">
            <div className="counter counter-zero" ref={timerFirstRef}></div>
            <div className="counter counter-zero" ref={timerSecondRef}></div>
            <div className="counter counter-zero" ref={timerThirdRef}></div>
          </div>
        </div>
        <div className="plates">
          {fields.map((_, y) => {
            return (
              <div key={y}>
                {fields.map((_, x) => (
                  <div
                    className={`field-game ${
                      endGame &&
                      (fields[y][x] === -1 ||
                        fields[y][x] === -2 ||
                        fields[y][x] === -3 ||
                        fields[y][x] === -4)
                        ? OpenPlate(`${fields[y][x]}`)
                        : ""
                    }`}
                    key={x}
                    onMouseDown={() =>
                      smileRef.current.classList.add("smile-field_pressed")
                    }
                    onMouseUp={() =>
                      smileRef.current.classList.remove("smile-field_pressed")
                    }
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if (endGame) return;
                      if (e.target.classList.contains("open")) return;

                      if (questions.has(`fields[${y}][${x}]`)) {
                        questions.delete(`fields[${y}][${x}]`);

                        fields[y][x] = prevValue[`fields[${y}][${x}]`];
                        delete prevValue[`fields[${y}][${x}]`];
                        e.target.classList.value = "field-game";
                        return;
                      }

                      if (flags.has(`fields[${y}][${x}]`)) {
                        flags.delete(`fields[${y}][${x}]`);
                        CountFlags(flags, {
                          First: counterFirstRef.current,
                          Second: counterSecondRef.current,
                          Third: counterThirdRef.current,
                        });

                        questions.add(`fields[${y}][${x}]`);

                        fields[y][x] = -4;
                        e.target.classList.value = "field-game question";
                        return;
                      }

                      if (flags.size !== 40) {
                        flags.add(`fields[${y}][${x}]`);

                        prevValue[`fields[${y}][${x}]`] = fields[y][x];
                        if (fields[y][x] === mine) {
                          fields[y][x] = -2;
                        }
                        e.target.classList.value = "field-game flagged";
                        return CountFlags(flags, {
                          First: counterFirstRef.current,
                          Second: counterSecondRef.current,
                          Third: counterThirdRef.current,
                        });
                      }
                    }}
                    onClick={(e) => {
                      if (e.target.classList.contains("flagged")) return;
                      if (e.target.classList.contains("question")) return;
                      if (endGame) return;

                      if (fields[y][x] === mine) {
                        fields[y][x] = -3;
                      }
                      const val = OpenPlate(`${fields[y][x]}`);
                      e.target.classList.add(val);
                      e.target.classList.add("open");

                      if (val === "bomb-died") {
                        if (fields[y][x] === -4) {
                          fields[y][x] = -5;
                        }
                        setEndGame(true);

                        window.clearInterval(window.intervalId);
                        smileRef.current.classList.add("smile-died");
                      }

                      if (!startTimer) {
                        setStartTimer(true);

                        window.intervalId = window.setInterval(() => {
                          counter += 1;
                          if (counter === 999) {
                            counter = 0;
                            ClearTimer({
                              timerFirstRef,
                              timerSecondRef,
                              timerThirdRef,
                            });
                          }
                          RenderTimer(counter, {
                            First: timerFirstRef.current,
                            Second: timerSecondRef.current,
                            Third: timerThirdRef.current,
                          });
                        }, 1000);
                      }
                    }}
                  ></div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
