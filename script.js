const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// passing joke to voiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "8140ae0c013646a8871ec20cbba10855",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// get jokes form joke api
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // TTS
    tellMe(joke);
    // disable button
    toggleButton();
  } catch (error) {
    console.error("whoops", error);
  }
}
