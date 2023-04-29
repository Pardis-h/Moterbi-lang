import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState<string | any>("");
  const [newText, setNewText] = useState<string | any>("");
  const [rtlDir, setRtlDir] = useState<boolean>(false);
  const [changeLang, setChangeLang] = useState<boolean>(true);

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
    if (!!e) {
      e.preventDefault();
    }
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
    setNewText(newResult.join(""));
  };

  useEffect(() => {
    showResult();
  }, []);

  return (
    <>
      <section className="container mx-auto">
        <div className=" p-5 flex flex-col gap-5 justify-center items-center mt-12">
          <div className="flex flex-col text-center w-full mb-8 ">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Motrebi Language:
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base opacity-60">
              Write your sentence or word & press the show button to see the
              translate :)
            </p>
          </div>
          <form
            className="mb-10 w-full lg:w-6/12 rounded-md shadow px-6 py-4"
            action=""
            onSubmit={showResult}
          >
            <div className="mb-4 flex items-center">
              <span className="leading-7 text-sm text-gray-600">
                {changeLang ? "Persian" : "Motrebi"}
              </span>
              <span
                onClick={() => {
                  setChangeLang(!changeLang);
                }}
                className="text-gray-400 text-sm relative group mx-4 p-1 rounded bg-slate-100 focus:outline-none hover:cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 group-hover:text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
              </span>
              <span className="leading-7 text-sm text-gray-600">
                {changeLang ? "Motrebi" : "Persian"}
              </span>
            </div>
            <div className=" mb-4">
              <textarea
                // type="text"
                cols={2}
                rows={4}
                id="text"
                name="text"
                value={text}
                placeholder="Write here..."
                onChange={getText}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    showResult();
                  }
                }}
                style={rtlDir ? { direction: "rtl" } : {}}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Show
            </button>
            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 flex justify-between items-center">
              <p>{newText}</p>
              <button
                className="text-gray-400 text-sm relative group p-1 rounded bg-slate-100 focus:outline-none "
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
                  className="w-6 h-6 group-hover:text-slate-600"
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
      </section>
    </>
  );
}

export default App;
