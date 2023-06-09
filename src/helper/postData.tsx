
export const postText = async (baseUrl:string) => {
    // const api = "wVue2OkUG31e09cd7b4ff47c83c1d81b926b4ec983m0ck5Utl";
  const res = await fetch(baseUrl, {
    // mode: 'no-cors',
    method: "POST",
    headers: {
      'X-API-KEY': 'wVue2OkUG31e09cd7b4ff47c83c1d81b926b4ec983m0ck5Utl',
      "Content-Type": "application/json",
    },
    body : JSON.stringify( {
        "username":"pardis70@gmail.com",
        "password":"y5PB!$5Ep*dn5Tn",
        "tts_title":"hi",
        "ssml_mode":"0",
        "tts_engine":"neural",
        "tts_format":"mp3",
        "tts_text":"hello",
        "tts_resource_ids":"BIMYaj6ur3c6f288f85180a9130c4e5e10f39dc7fPvuC3LYXA",
        "synthesize_type":"save"
      })
  });
 console.log(res.status);
  
};
