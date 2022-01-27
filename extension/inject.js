chrome.storage.sync.get(
  ["username", "token", "apiUrl"],
  ({ username, token, apiUrl }) => {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("submitGuess.js");
    script.setAttribute("data-username", username);
    script.setAttribute("data-token", token);
    script.setAttribute("data-api-url", apiUrl);
    (document.head || document.documentElement).appendChild(script);
  }
);
