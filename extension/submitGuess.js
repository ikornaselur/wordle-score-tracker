const element = document
  .getElementsByTagName("game-app")[0]
  .shadowRoot.getElementById("board");
const rows = element.getElementsByTagName("game-row");

const eventType = "game-last-tile-revealed-in-row";
const username = document.currentScript.getAttribute("data-username");
const token = document.currentScript.getAttribute("data-token");
const apiUrl = document.currentScript.getAttribute("data-api-url");

let guess = 1;
for (let row of rows) {
  const rowGuess = guess;
  guess++;
  row.addEventListener(eventType, () => {
    const evaluations = Array.from(row.shadowRoot.children[1].children).map(
      (tile) => tile.getAttribute("evaluation")
    );
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        rowGuess,
        evaluations,
        username,
        token,
      }),
    });
  });
}
