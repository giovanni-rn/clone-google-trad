import React, { useEffect, useState } from "react";
import axios from "axios";

const Translate = () => {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setText(e.target[0].value);
  };

  useEffect(() => {
    const translateText = async () => {
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", text);
      encodedParams.append("target", "fr");
      encodedParams.append("source", "en");

      const options = {
        method: "POST",
        url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "Accept-Encoding": "application/gzip",
          "X-RapidAPI-Key":
            "33a38a48e2msh345936a2215c570p1a003cjsn277d5a16ce04",
          "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
        },
        data: encodedParams,
      };

      const translatedText = await axios.request(options);
      setTranslated(translatedText.data.data.translations[0].translatedText);
    };

    translateText();
  }, [text]);

  return (
    <main>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" />
        <input type="submit" />
      </form>
      <div className="display">{translated}</div>
    </main>
  );
};

export default Translate;
