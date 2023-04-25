import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState<string>("Please enter your text");
  const [newText, setNewText] = useState<string>("");

  const getText = (e) => {
    setText(e.target.value);
    setNewText("");
  };

  const showResult = (e?): any => {
    if (!!e) {
      e.preventDefault();
    }
    const vowles: string[] = ["a", "A", "e", "E", "o", "O", "i", "I", "u", "U"];
    let words: string[] = text.split(" ");
    let newResult: string[] = [];

    words.map((item: string | string[]) => {
      let newFirstWord: string = item[0];
      let resultItem: string[] = item.toLowerCase().split("");
      let newWord: string;

      if (vowles.includes(newFirstWord)) {
        const newAddSh: string[] = resultItem.unshift("Sh");
        const newAddLoo: string[] = resultItem.push("e", "loo", " ");
        newWord = resultItem.join("");
        newResult.push(newWord);
        console.log(newWord);
      } else {
        let newRemove: string[] = resultItem.shift();
        let newAdd: string[];
        if (resultItem[0] == "h") {
          newRemove = resultItem.shift();
          resultItem[0] = resultItem[0].toUpperCase();
          newAdd = resultItem.push(
            "e",
            newFirstWord.toLowerCase(),
            "h",
            "a",
            " "
          );
          newWord = resultItem.join("");
          console.log(newWord);
        } else {
          resultItem[0] = resultItem[0].toUpperCase();
          newAdd = resultItem.push("e", newFirstWord.toLowerCase(), "a", " ");
          newWord = resultItem.join("");
        }
        newResult.push(newWord);
        console.log(newWord);
      }
    });

    setNewText(newResult);
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
          {/* <h1 className="text-3xl font-medium mb-6">Motrebi Language:</h1> */}
          <form
            className="mb-10 w-full lg:w-6/12 rounded-md shadow px-6 py-4"
            action=""
            onSubmit={showResult}
          >
            <div className=" mb-4">
              <label htmlFor="text" className="leading-7 text-sm text-gray-600">
                Your Text
              </label>
              <textarea
                // type="text"
                cols={2}
                rows={4}
                id="text"
                name="text"
                value={text}
                onChange={getText}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    showResult();
                  }
                }}
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
                onClick={() => navigator.clipboard.writeText(newText.join(""))}
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
