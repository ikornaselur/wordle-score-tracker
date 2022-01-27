// Initialize button with user's preferred color
const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = form.querySelector('input[name="username"]').value;
  const token = form.querySelector('input[name="token"]').value;
  const apiUrl = form.querySelector('input[name="apiUrl"]').value;

  chrome.storage.sync.set({
    username,
    token,
    apiUrl,
  });
});

chrome.storage.sync.get(
  ["username", "token", "apiUrl"],
  ({ username, token, apiUrl }) => {
    const form = document.getElementById("form");

    form.querySelector('input[name="username"]').value = username;
    form.querySelector('input[name="token"]').value = token;
    form.querySelector('input[name="apiUrl"]').value = apiUrl;
  }
);
