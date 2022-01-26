const element = document
  .getElementsByTagName("game-app")[0]
  .shadowRoot.getElementById("board");
const rows = element.getElementsByTagName("game-row");

const eventType = "game-last-tile-revealed-in-row";
const emojiMap = {
  absent: "⬛️",
  present: "🟨",
  correct: "🟩",
};

let guess = 1;
for (let row of rows) {
  const rowGuess = guess;
  guess++;
  row.addEventListener(eventType, () => {
    const evaluations = Array.from(row.shadowRoot.children[1].children).map(
      (tile) => emojiMap[tile.getAttribute("evaluation")]
    );
    console.log(rowGuess, evaluations);
  });
}
