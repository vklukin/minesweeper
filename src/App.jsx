import { useRef, useState } from "react";

import { CreateGame } from "./controllers/CreateGame";
import OpenPlate from "./controllers/OpenPlate";

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

  const [fields, setFields] = useState(() => CreateGame(size, 40));
  const smileRef = useRef(null);
  const [mask, setMask] = useState(() =>
    new Array(size * size).fill(Mask.FILL)
  );
  const [endGame, setEndGame] = useState(false);

  return (
    <div className="game">
      <div className="game__wrapper">
        <div className="game__menu">
          <div className="menu__bomb-counter">
            <div className="counter counter-zero"></div>
            <div className="counter counter-four"></div>
            <div className="counter counter-zero"></div>
          </div>
          <div
            className="smile"
            ref={smileRef}
            onMouseDown={() => smileRef.current.classList.add("smile-pressed")}
            onMouseUp={() => smileRef.current.classList.remove("smile-pressed")}
            onClick={(e) => {
              setFields([]);
              setEndGame(false);
              smileRef.current.classList.remove("smile-died");
              setTimeout(() => setFields(() => CreateGame(size, 40)), 1);
            }}
          ></div>
          <div className="menu__timer">
            <div className="counter counter-zero"></div>
            <div className="counter counter-zero"></div>
            <div className="counter counter-zero"></div>
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
                      if (val === "bomb-died") {
                        smileRef.current.classList.add("smile-died");
                        setEndGame(true);
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
