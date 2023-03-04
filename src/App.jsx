import { useEffect, useRef, useState } from "react";

import { CreateGame } from "./controllers/CreateGame";
import OpenPlate from "./controllers/OpenPlate";
import { ClearTimer, RenderTimer } from "./controllers/RenderCounterPlates";

export const Mask = {
  TRANSPARENT: "field-game pressed-field",
  FILL: "field-game",
  FLAG: "field-game flagged",
  QUESTION: "field-game question",
  BOMB: "field-game bomb",
  BOMB_DIED: "field-game bomb-died",
  BOMB_FLAGGED: "field-game bomb-flagged",
};

function App() {
  const mine = -1;
  const size = 16;
  let counter = 0;

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
            onClick={(e) => {
              setFields([]);
              setTimeout(() => setFields(() => CreateGame(size, 40)), 1);

              setEndGame(false);
              setStartTimer(false);
              window.clearInterval(window.intervalId);

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
                      endGame && OpenPlate(fields[y][x])
                    }`}
                    key={x}
                    onMouseDown={() =>
                      smileRef.current.classList.add("smile-field_pressed")
                    }
                    onMouseUp={() =>
                      smileRef.current.classList.remove("smile-field_pressed")
                    }
                    onClick={(e) => {
                      if (fields[y][x] === mine) {
                        fields[y][x] = -3;
                      }
                      const val = OpenPlate(fields[y][x]);
                      e.target.classList.add(val);

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
                            timerFirstRef,
                            timerSecondRef,
                            timerThirdRef,
                          });
                        }, 1000);
                      }

                      if (val === "bomb-died") {
                        setEndGame(true);
                        window.clearInterval(window.intervalId);
                        smileRef.current.classList.add("smile-died");
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
