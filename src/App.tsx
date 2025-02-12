import { use, useEffect, useRef, useState } from "react";
import "./App.scss";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function App() {
  const [show, setShow] = useState(true);
  const [settingsHide, setSettingsHide] = useState(true);
  const [speed, setSpeed] = useState(0);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(false);
  const [accuracy, setAccuracy] = useState(100);
  const [text, setText] = useState("");
  const [pastText, setPastText] = useState("");
  const [futureText, setFutureText] = useState("");
  const [wrongLetters, setWrongLetters] = useState(0);
  const intervalRef = useRef(null);
  const [letterSpacing, setLetterSpacing] = useState(
    localStorage.getItem("letterSpacing") || "0px"
  );
  const [fontSize, setFontSize] = useState(
    localStorage.getItem("fontSize") || "20px"
  );

  const getRandomText = async () => {
    try {
      const response = await fetch(
        `http://localhost:3052/facts/${getRandomNumber(1, 100)}` //101
      );
      if (!response.ok) {
        throw new Error("Wtf, you stupid man!");
      }
      const result = await response.json();
      setText(result.text);
      setFutureText(result.text);
      setPastText("");
    } catch {
      return "error";
    }
  };

  const startTest = async () => {
    await getRandomText();

    clearInterval(intervalRef.current);

    setShow(false);

    setStartTime(false);
    setSpeed(0);
    setTime(0);

    setWrongLetters(0);
    setAccuracy(100);
  };

  useEffect(() => {
    if (startTime) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  }, [startTime]);

  useEffect(() => {
    setSpeed((pastText.length / time) * 60);
  }, [time]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // console.log(`Нажата клавиша: ${event.key}`,futureText.slice(0, 1), futureText.slice(1))
      if (event.key == "Enter") {
        startTest();
      }
      if (event.key.length == 1) {
        if (futureText.length == 1) {
          console.log("pobeda!");
          clearInterval(intervalRef.current);
        }
        if (event.key == futureText.slice(0, 1)) {
          document.body
            .querySelector("#currentLetter")
            ?.classList.remove("wrong");
          setPastText(pastText + futureText.slice(0, 1));
          setFutureText(futureText.slice(1));
          setStartTime(true);
          // console.log('right letter pressed', futureText.length)
        } else {
          document.body.querySelector("#currentLetter")?.classList.add("wrong");
          setWrongLetters(wrongLetters + 1);
          // console.log('wrong letter pressed')
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [futureText]);

  useEffect(() => {
    setAccuracy(100 - (wrongLetters * 100) / text.length);
  }, [text.length, wrongLetters]);

  useEffect(() => {
    const elements = document.querySelectorAll(".block-text");
    elements.forEach((element) => {
      element.style.letterSpacing = `${letterSpacing}`;
    });
    localStorage.setItem("letterSpacing", letterSpacing);
  }, [letterSpacing, show, settingsHide]);

  useEffect(() => {
    const elements = document.querySelectorAll(".block-text");
    elements.forEach((element) => {
      element.style.fontSize = `${fontSize}`;
    });
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize, show, settingsHide]);

  return (
    <main>
      <div className="container">
        <img
          src="/settings.svg"
          alt=""
          className="settings-icon"
          onClick={() => {
            setSettingsHide(!settingsHide);
            getRandomText();
          }}
        />
        {settingsHide ? (
          <>
            {show ? (
              <div className="window-start">
                <img src="" alt="" />
                <h2>Приготовьте к набору текст. Go go go!</h2>
                <button className="start" onClick={() => startTest()}>
                  Начать тест
                </button>
              </div>
            ) : (
              <div className="window-main">
                <div className="block-text">
                  <h4>
                    <span className="past-text">{pastText}</span>
                    <span
                      className="current-letter"
                      id="currentLetter"
                      style={{ textDecoration: "underline" }}
                    >
                      {futureText.slice(0, 1)}
                    </span>
                    <span className="future-text">{futureText.slice(1)}</span>
                  </h4>
                </div>
                <div className="block-info">
                  <div className="speed">
                    <h3>Скорость</h3>
                    <h4>{Math.round(speed)}</h4>
                  </div>
                  <div className="accuracy">
                    <h3>Точность</h3>
                    <h4>{Math.round(accuracy)}%</h4>
                  </div>
                  <button className="restart" onClick={() => startTest()}>
                    Перезапустить
                  </button>
                </div>
                <p className="help-text">
                  При нажатии Enter, появиться новый текст
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="settings">
            <h2 className="settings-title">Настройки</h2>
            <h3>Настройки текста</h3>
            <div className="settings-category">
              <div className="settings-category-elems">
                <div className="settings-category-elem">
                  Размер
                  <select
                    name="font-size"
                    id=""
                    onChange={(e) => setFontSize(`${e.target.value}px`)}
                    value={parseInt(fontSize)}
                  >
                    {Array(9)
                      .fill(0)
                      .map((_, index) => (
                        <option value={16 + index}>{16 + index}px</option>
                      ))}
                  </select>
                </div>
                <div className="settings-category-elem">
                  Шрифт
                  <select name="font-family" id="">
                    <option value=""></option>
                  </select>
                </div>
                <div className="settings-category-elem">
                  letter spacing
                  <select
                    name="letter-spacing"
                    id=""
                    onChange={(e) => setLetterSpacing(`${e.target.value}px`)}
                    value={parseInt(letterSpacing)}
                  >
                    {Array(11)
                      .fill(0)
                      .map((_, index) => (
                        <option key={index} value={index * 0.2}>
                          {(index * 0.2).toFixed(1)}px
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="settings-category-preview">
                <div className="block-text">
                  <h4>{text.slice(0, 35)}...</h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
