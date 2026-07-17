const API_URL = "YOUR_WORKER_URL";

const chat = document.getElementById("chat");
const prompt = document.getElementById("prompt");
const send = document.getElementById("send");
const imageInput = document.getElementById("imageInput");
const clearChat = document.getElementById("clearChat");
const newChat = document.getElementById("newChat");

let image = null;

function addMessage(role, text) {
  const div = document.createElement("div");
  div.className = `message ${role}`;
  div.innerHTML = marked.parse(text);
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const text = prompt.value.trim();

  if (!text && !image) return;

  addMessage("user", text);

  prompt.value = "";

  const loading = document.createElement("div");
  loading.className = "message bot";
  loading.innerHTML = "⏳ ELL KEN AI sedang mengetik...";
  chat.appendChild(loading);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text,
        image
      })
    });

    const data = await res.json();

    loading.remove();

    addMessage("bot", data.reply || "Tidak ada jawaban.");

    image = null;

  } catch (err) {

    loading.remove();

    addMessage(
      "bot",
      "❌ Gagal terhubung ke server."
    );

  }
}

send.onclick = sendMessage;

prompt.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

imageInput.addEventListener("change", e => {

  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {

    image = reader.result;

  };

  reader.readAsDataURL(file);

});

clearChat.onclick = () => {

  chat.innerHTML = "";

};

newChat.onclick = () => {

  chat.innerHTML = `
<div class="message bot">
Halo 👋<br><br>
Saya <b>ELL KEN AI</b>.<br>
Silakan mulai percakapan baru.
</div>
`;

};
