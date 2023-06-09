import { useEffect, useState } from "react";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Switch from "react-switch";
import TextToSpeech from "./helper/TextToSpeech";
import Copy from "./components/icons/Copy";
import Sun from "./components/icons/Sun";
import Moon from "./components/icons/Moon";
import Toggle from "./components/icons/Toggle";
import MicOn from "./components/icons/MicOn";
import Mic from "./components/icons/Mic";

function App() {
  const {
    transcript,
    listening,
    // resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // States
  const [text, setText] = useState<string | any>(transcript);
  const [newText, setNewText] = useState<string | any>("");
  const [rtlDir, setRtlDir] = useState<boolean>(false);
  const [changeLang, setChangeLang] = useState<boolean>(true);
  const [isDark, setIsDark] = useState<boolean | any>();

  // const baseUrl = `https://www.speakatoo.com/api/v1/voiceapi`;

  const getText = (e: any) => {
    setText(e.target.value);
    setNewText("");
    if (/^[\u0600-\u06FF\s^]+$/.test(e.target.value)) {
      setRtlDir(true);
    } else {
      setRtlDir(false);
    }
  };

  const showResult = (e?: any): any => {
    if (!!e) e.preventDefault();
    const vowlesEn: string[] = [
      "a",
      "A",
      "e",
      "E",
      "o",
      "O",
      "i",
      "I",
      "u",
      "U",
    ];
    const vowlesFa: string[] = ["ا", "آ", "ی", "ي", "ع"];
    let words: string[] = text.split(" ");
    let newResult: string[] = [];

    // check spaces
    if (words[words.length - 1] == "") {
      words = words.filter((item) => item !== "");
    }

    // maping input
    words.map((item: string | string[] | any) => {
      let newFirstWord: string = item[0];
      let resultItem: string[] | any = item.toLowerCase().split("");
      let newWord: string;
      if (changeLang) {
        // check input language
        if (/^[a-zA-Z]+$/.test(item)) {
          setRtlDir(false);
          if (vowlesEn.includes(newFirstWord)) {
            resultItem.unshift("Sh");
            resultItem.push("e", "loo", " ");
            newWord = resultItem.join("");
            newResult.push(newWord);
          } else {
            resultItem.shift();
            if (resultItem[0] == "h") {
              resultItem.shift();
              resultItem[0] = resultItem[0].toUpperCase();
              resultItem.push("e", newFirstWord.toLowerCase(), "h", "a", " ");
              newWord = resultItem.join("");
            } else {
              resultItem[0] = resultItem[0].toUpperCase();
              resultItem.push("e", newFirstWord.toLowerCase(), "a", " ");
              newWord = resultItem.join("");
            }
            newResult.push(newWord);
          }
        } else if (/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?؟]/.test(item)) {
          newResult.push(item, " ");
        } else if (/^[\u0600-\u06FF\s^]+$/.test(item)) {
          setRtlDir(true);
          if (vowlesFa.includes(newFirstWord)) {
            resultItem.unshift("ش");
            resultItem.push("ِ", "لو", " ");
            newWord = resultItem.join("");
            newResult.push(newWord);
          } else {
            resultItem.shift();

            if (resultItem[0] == "ا") resultItem[0] = "آ";
            if (!vowlesFa.includes(resultItem[0])) {
              resultItem.unshift("ا");
            }
            resultItem.push("ِ", newFirstWord, "ا", " ");
            newWord = resultItem.join("");
            newResult.push(newWord);
          }
        }
      } else {
        let secondWord: string = item[1];
        let lastSecondWord: string = item[item.length - 2];
        let lastThirdWord: string = item[item.length - 3];
        let lastForthWord: string = item[item.length - 4];
        let lastWord: string = item[item.length - 1];
        // console.log(newFirstWord,secondWord,lastForthWord,lastThirdWord,lastSecondWord,lastWord);

        // check input language
        if (/^[a-zA-Z]+$/.test(item)) {
          setRtlDir(false);
          if (
            newFirstWord.toLowerCase() == "s" &&
            secondWord.toLowerCase() == "h" &&
            lastWord.toLowerCase() == "o" &&
            lastSecondWord.toLowerCase() == "o" &&
            lastThirdWord.toLowerCase() == "l" &&
            lastForthWord.toLowerCase() == "e"
          ) {
            resultItem.shift();
            resultItem.shift();
            resultItem.pop();
            resultItem.pop();
            resultItem.pop();
            resultItem.pop();
            resultItem[0] = resultItem[0].toUpperCase();
            resultItem.push(" ");
            newWord = resultItem.join("");
            newResult.push(newWord);
          } else {
            if (
              lastSecondWord.toLowerCase() == "h" &&
              (lastThirdWord.toLowerCase() == "s" ||
                lastThirdWord.toLowerCase() == "c" ||
                lastThirdWord.toLowerCase() == "g")
            ) {
              resultItem.unshift(lastThirdWord, lastSecondWord);
              resultItem[0] = resultItem[0].toUpperCase();
              resultItem.pop();
              resultItem.pop();
              resultItem.pop();
              resultItem.pop();
              resultItem.push(" ");
              newWord = resultItem.join("");
            } else {
              resultItem.unshift(lastSecondWord);
              resultItem[0] = resultItem[0].toUpperCase();
              resultItem.pop();
              resultItem.pop();
              resultItem.pop();
              resultItem.push(" ");
              newWord = resultItem.join("");
            }
            newResult.push(newWord);
          }
        } else if (/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?؟]/.test(item)) {
          newResult.push(item, " ");
        } else if (/^[\u0600-\u06FF\s^]+$/.test(item)) {
          setRtlDir(true);
          if (
            newFirstWord == "ش" &&
            lastWord == "و" &&
            lastSecondWord == "ل" &&
            lastThirdWord == "ِ"
          ) {
            resultItem.shift();
            resultItem.pop();
            resultItem.pop();
            resultItem.pop();
            resultItem.push(" ");
            newWord = resultItem.join("");
            newResult.push(newWord);
          } else {
            if (resultItem[0] == "ا") resultItem.shift();
            if (resultItem[0] == "آ") resultItem[0] = "ا";
            resultItem.unshift(lastSecondWord);
            if (lastThirdWord == "ِ") resultItem.pop();
            resultItem.pop();
            resultItem.pop();
            resultItem.push(" ");
            newWord = resultItem.join("");
            newResult.push(newWord);
          }
        }
      }
    });

    //set translate
    setNewText(newResult.join(""));
  };

  // set DarkMode
  useEffect(() => {
    // postText(baseUrl);
    showResult();
    const darkLocal = localStorage.getItem("darkMode");
    if (darkLocal) {
      setIsDark(JSON.parse(darkLocal));
    } else {
      setIsDark(false);
    }
  }, []);
  const darkModeSave = () => {
    setIsDark(!isDark);
    localStorage.setItem("darkMode", JSON.stringify(!isDark));
  };

  // Set mic
  useEffect(() => {
    listening && setText(transcript);
    showResult();
  }, [transcript]);
  const startListening = () => {
    setText(transcript);
    showResult();
    SpeechRecognition.startListening({
      language: "fa-IR",
      // grammer:
      //   "#JSGF V1.0; grammar my-grammar; public <phrase> = اردیسِپا | افتر | من تِره غش;",
    });
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>
      <section className={isDark ? "dark" : ""}>
        <div className="dark:bg-slate-800 min-h-screen">
          <div className="container mx-auto p-5 flex flex-col gap-5 justify-center items-center">
            <div className="w-full lg:w-6/12">
              <Switch
                onChange={darkModeSave}
                checked={!isDark}
                checkedIcon={<Sun />}
                uncheckedIcon={<Moon />}
                offHandleColor="#f1f5f9"
                onHandleColor="#64758b"
                onColor="#fef9c3"
                offColor="#64758b"
                height={40}
                width={76}
                handleDiameter={32}
                boxShadow="0px 1px 3px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 6px rgba(0, 0, 0, 0.2)"
                className="react-switch shadow-inner dark:shadow-slate-400  rounded-full"
                id="icon-switch"
              />
            </div>
            <div className="flex flex-col text-center w-full mb-8 ">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 dark:text-slate-200">
                Motrebi Language :
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base opacity-60 dark:text-slate-300">
                Write your sentence or word & press the show button to see the
                translate :)
              </p>
            </div>
            <form
              className="mb-10 w-full lg:w-6/12 rounded-md shadow dark:shadow-sm dark:shadow-slate-700 dark:bg-slate-700 px-6 py-4"
              action=""
              onSubmit={showResult}
            >
              <div className="mb-4 flex items-center">
                <span className="leading-7 text-sm text-gray-600 dark:text-slate-400">
                  {changeLang ? "Farsi Or Finglish" : "Motrebi"}
                </span>
                <span
                  onClick={() => {
                    setChangeLang(!changeLang);
                  }}
                  className="text-gray-400 dark:text-slate-400 text-sm relative group mx-4 p-1 rounded bg-slate-100 dark:bg-slate-600 focus:outline-none hover:cursor-pointer"
                >
                  <Toggle />
                </span>
                <span className="leading-7 text-sm text-gray-600 dark:text-slate-400">
                  {changeLang ? "Motrebi" : "Farsi Or Finglish"}
                </span>
              </div>
              <div className=" mb-4">
                <textarea
                  cols={2}
                  rows={4}
                  id="text"
                  name="text"
                  value={text}
                  placeholder="Write here..."
                  onChange={getText}
                  autoFocus
                  onKeyDown={(e) => {
                    // console.log('keydown');
                    if (e.key === "Enter") {
                      e.preventDefault();
                      showResult();
                    }
                  }}
                  style={rtlDir ? { direction: "rtl" } : {}}
                  className="w-full bg-white dark:bg-slate-500 rounded border border-gray-300 dark:border-slate-400  focus:border-indigo-500 dark:focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-slate-500 text-base outline-none text-gray-700 dark:text-slate-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {changeLang ? (
                  <div className="flex items-center">
                    {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
                    {listening ? (
                      <span
                        onClick={SpeechRecognition.stopListening}
                        className=" text-green-300 dark:text-green-200 text-sm relative group mt-2 mb-2 p-1 inline-block rounded-full bg-slate-100 dark:bg-slate-600 active:shadow
                                       hover:cursor-pointer"
                      >
                        <span className="absolute inset-0 w-full h-full border-2 rounded-full shadow border-green-300 animate-ping z-0"></span>
                        <MicOn />
                      </span>
                    ) : (
                      <span
                        onClick={startListening}
                        className=" text-gray-400 dark:text-slate-400 text-sm relative group mt-2 mb-2 p-1 inline-block rounded-full bg-slate-100 dark:bg-slate-600 active:shadow
                                     hover:cursor-pointer"
                      >
                        <Mic />
                      </span>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <button
                type="submit"
                className="text-white bg-indigo-500 dark:bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 dark:hover:bg-indigo-700 rounded text-lg"
              >
                Show
              </button>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 dark:border-slate-400 flex justify-between items-center">
                <TextToSpeech text={newText.toString()} />
                <p className="dark:text-slate-200 flex-1 ms-2">{newText}</p>
                <button
                  className="text-gray-400 text-sm relative group p-1 rounded bg-slate-100 dark:bg-slate-600 focus:outline-none "
                  onClick={() => navigator.clipboard.writeText(newText)}
                >
                  <span className="absolute -top-6 left-0 opacity-0 group-hover:opacity-100 ease-in-out duration-300">
                    Copy
                  </span>
                  <Copy />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
