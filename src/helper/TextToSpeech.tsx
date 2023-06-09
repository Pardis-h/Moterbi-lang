import { useEffect, useState } from "react";
import Speaker from "../components/icons/Speaker";
import SpeakerX from "../components/icons/SpeakerX";

function TextToSpeech({ text }: any) {
  const [isEN, setIsEN] = useState<boolean>(false);

  // Text to Speech code
  const handleSynthesis = () => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = "";
    utterance.text = text;
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Check is text Finglish or Farsi
    if (/^[\u0600-\u06FF\s^]+$/.test(text)) {
      setIsEN(false);
    } else {
      setIsEN(true);
    }
  }, [isEN, text]);

  return (
    <>
      {isEN ? (
        <button onClick={handleSynthesis} className="text-gray-400 dark:text-slate-400 text-sm relative group mt-2 mb-2 p-1 inline-block rounded-full bg-slate-100 dark:bg-slate-600 active:shadow
        hover:cursor-pointer">
          <Speaker />
        </button>
      ) : (
        <button onClick={handleSynthesis} disabled className="text-gray-300 dark:text-gray-500 ">
          <SpeakerX />
        </button>
      )}
    </>
  );
}

export default TextToSpeech;
