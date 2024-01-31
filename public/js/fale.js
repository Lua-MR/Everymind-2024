import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyCoEoW2VCx-LDG89lkoG70C-Ntn9BkRRTI",
  authDomain: "everymind-2024.firebaseapp.com",
  databaseURL: "https://everymind-2024-default-rtdb.firebaseio.com",
  projectId: "everymind-2024",
  storageBucket: "everymind-2024.appspot.com",
  messagingSenderId: "501428353388",
  appId: "1:501428353388:web:2b1a2417278a4bc50c9b49",
  measurementId: "G-EYV79T3CNW"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);

    console.log("UID do usuário:", uid);
  } else {
    console.log("Usuário não autenticado");
  }
});


function enviarMensagem() {
    const nomefale = document.getElementById("nome").value;
    const emailfale = document.getElementById("email").value;
    const mensagemfale = document.getElementById("mensagem").value;

    if (!mensagemfale) {
        alert("Por favor, preencha o campo de mensagem.");
        return;
    }

    const user = auth.currentUser;

    if (user) {
        const fale = {
            nome: nomefale || "", 
            email: emailfale || "", 
            mensagem: mensagemfale
        };
    
    enviarParaFirebase(fale);

    alert("Mensagem enviada com sucesso!");

    limparCampos();
} else {
    alert("Usuário não autenticado. Faça login para enviar mensagens.");
}
}

function enviarParaFirebase(fale) {
    const user = auth.currentUser;
    const uid = user.uid;

    const itensRef = ref(db, 'fale/' + uid );
    
    push(itensRef, fale);
    
}


function limparCampos() {
     console.log("entrou");
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mensagem").value = "";
}


document.getElementById("limparCampos").addEventListener("click", limparCampos);
document.getElementById("enviarMensagem").addEventListener("click", enviarMensagem);
