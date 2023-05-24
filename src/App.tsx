import { useEffect, useState } from "react";
import "./App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // States
  const [text, setText] = useState<string | any>(transcript);
  const [newText, setNewText] = useState<string | any>("");
  const [rtlDir, setRtlDir] = useState<boolean>(false);
  const [changeLang, setChangeLang] = useState<boolean>(true);
  const [isDark, setIsDark] = useState<boolean | any>();

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
            <div
              className="flex items-start w-full lg:w-6/12 hover:cursor-pointer"
              onClick={darkModeSave}
            >
              {isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 bg-slate-500 text-white p-1 rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 bg-yellow-200 p-1 rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              )}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                  </svg>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 group-hover:text-red-600 dark:group-hover:text-red-200 z-10"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span
                      onClick={startListening}
                      className=" text-gray-400 dark:text-slate-400 text-sm relative group mt-2 mb-2 p-1 inline-block rounded-full bg-slate-100 dark:bg-slate-600 active:shadow
                                     hover:cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                        />
                      </svg>
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
                <p className="dark:text-slate-200">{newText}</p>
                <button
                  className="text-gray-400 text-sm relative group p-1 rounded bg-slate-100 dark:bg-slate-600 focus:outline-none "
                  onClick={() => navigator.clipboard.writeText(newText)}
                >
                  <span className="absolute -top-6 left-0 opacity-0 group-hover:opacity-100 ease-in-out duration-300">
                    Copy
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 group-hover:text-slate-600 dark:group-hover:text-slate-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                    />
                  </svg>
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
