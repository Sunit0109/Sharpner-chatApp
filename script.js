// On login page
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    localStorage.setItem("username", username);
    window.location.href = "/Project-2/";
  });
}

// On chat page
const messageForm = document.getElementById("messageForm");
if (messageForm) {
  const username = localStorage.getItem("username");
  if (!username) {
    window.location.href = "/Project-2/login";
  } else {
    messageForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const message = document.getElementById("messageInput").value;
      fetch("/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, message }),
      }).then(() => {
        document.getElementById("messageInput").value = "";
        loadMessages();
      });
    });

    function loadMessages() {
      fetch("/Project-2/message")
        .then((response) => response.json())
        .then((data) => {
          const messageDisplay = document.getElementById("messageDisplay");
          messageDisplay.innerHTML = ""; // Clear previous messages
          data.forEach((msg) => {
            messageDisplay.innerHTML += `<p><strong>${msg.username}:</strong> ${msg.message}</p>`;
          });
        });
    }

    loadMessages(); // Load messages on page load
  }
}