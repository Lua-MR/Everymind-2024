import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

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
const analytics = getAnalytics(app);
const auth = getAuth(app); 

document.addEventListener('DOMContentLoaded', () => {
  
const authEmailPassButton = document.getElementById("authEmailPassButton");
const authGoogleButton = document.getElementById("authGoogleButton");
const authAnonymouslyButton = document.getElementById("authAnonymouslyButton");
const createUserButton = document.getElementById("createUserButton");


const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");


const displayName = document.getElementById("displayName");


createUserButton.addEventListener("click", () => {
  console.log("entrei");
  createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
 
  .then(() => {
      alert(`Bem-vindo ${emailInput.value}`);
     
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
      alert("Falha ao cadastrar");
    });
});

authEmailPassButton.addEventListener('click', () => {
  signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then((result) => {
      console.log(result);
      alert(`Bem-vindo ${emailInput.value}`);
      if (emailInput.value == "adm@adm.com") {
        //senha adm123
        window.location.href = "../html/produtoconfig.html";
      }
    })
    .catch((error) => {
      console.error(error.code);
      console.error(error.message);
      alert("Email ou senha inválidos");
    });
});


authAnonymouslyButton.addEventListener("click", () => {
  signInAnonymously(auth)
  .then((userCredential) => {
    const user = userCredential.user;
    alert("bem vindo desconhecida(o)");
    window.location.href = "../index.html";
  })
    .catch((error) => {
      console.error("Código do erro:", error.code);
      console.error("Mensagem do erro:", error.message);
      alert("Falha ao autenticar anonimente.");
    });
});


authGoogleButton.addEventListener("click", () => {
    console.log("entrei");
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const token = result.credential.accessToken;
      displayName.innerText = `Bem-vindo, ${result.user.displayName}`;
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.log("google" + error);
      alert("Falha na autenticação gg");
    });
});

});

document.addEventListener('DOMContentLoaded', () => {

  const logOutButton = document.getElementById("logOutButton");

  logOutButton.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        displayName.innerText = "Você não está autenticado";
        alert("Você se deslogou");
        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.error(error);
      });
  });
});