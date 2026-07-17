const chatBox = document.getElementById("chatBox");
const promptBox = document.getElementById("prompt");
const sendBtn = document.getElementById("send");

const newChatBtn = document.getElementById("newChat");
const clearBtn = document.getElementById("clear");
const themeBtn = document.getElementById("theme");

const typing = document.getElementById("typing");
const historyBox = document.getElementById("history");


let chats = loadChat();


// LOAD HISTORY SAAT START

renderHistory();





// KIRIM PESAN

sendBtn.onclick = sendMessage;


promptBox.addEventListener("keydown",e=>{

    if(e.key==="Enter" && !e.shiftKey){

        e.preventDefault();

        sendMessage();

    }

});





async function sendMessage(){

    let text = promptBox.value.trim();

    if(!text)return;


    addMessage("user",text);


    promptBox.value="";


    typing.classList.remove("hidden");


    saveMessage("user",text);



    try{


        let answer = await askAI(text);


        typing.classList.add("hidden");


        addMessage("ai",answer);


        saveMessage("ai",answer);



    }catch(err){


        typing.classList.add("hidden");


        addMessage(
            "ai",
            "Terjadi kesalahan koneksi."
        );


    }


}






// TAMBAH CHAT KE LAYAR

function addMessage(type,text){


    const div=document.createElement("div");


    div.className="message "+type;


    div.innerHTML=`
    <b>${type==="ai"?"Ell Ken AI":"Kamu"}</b>
    <br>
    ${escapeHTML(text)}
    `;


    chatBox.appendChild(div);


    chatBox.scrollTop=chatBox.scrollHeight;


}





// AMANKAN TEXT

function escapeHTML(text){

    return text
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;");

}






// CHAT BARU

newChatBtn.onclick=()=>{


    chatBox.innerHTML="";


    localStorage.removeItem("current");


    createWelcome();


};





function createWelcome(){

chatBox.innerHTML=`

<div class="welcome">

<div class="ai-logo">
<i class="fa-solid fa-robot"></i>
</div>


<h2>
Halo 👋
</h2>


<p>
Saya Ell Ken AI.
Ada yang ingin kamu tanyakan?
</p>

</div>

`;

}






// HAPUS RIWAYAT

clearBtn.onclick=()=>{


    localStorage.clear();


    chats=[];


    historyBox.innerHTML="";


    createWelcome();


};







// DARK MODE

themeBtn.onclick=()=>{


document.body.classList.toggle("light");


};






// TAMPIL HISTORY

function renderHistory(){


historyBox.innerHTML="";


chats.forEach((chat,index)=>{


let item=document.createElement("div");


item.className="history-item";


item.innerHTML=`

<i class="fa-solid fa-message"></i>

${chat.substring(0,25)}

`;



historyBox.appendChild(item);



});



}






// SIMPAN PESAN

function saveMessage(role,text){


let data=JSON.parse(
localStorage.getItem("messages")||"[]"
);



data.push({

role:role,

text:text,

time:new Date()

});



localStorage.setItem(
"messages",
JSON.stringify(data)
);


}







function loadChat(){


return JSON.parse(
localStorage.getItem("history")||"[]"
);


}
