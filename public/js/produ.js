import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, update, get, set, child, remove } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
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
const db = getDatabase(app);
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


function carregarprodutos() {
  const produtosCards = document.getElementById("produtosCards");
  produtosCards.innerHTML = "";

  const produtosRef = ref(db, 'produ');

  console.log("Database reference:", produtosRef);

  get(produtosRef).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const produto = childSnapshot.val();
        console.log("Produto:", produto);
        const card = criarCard(produto);
        produtosCards.appendChild(card);
      });
    } else {
      console.log("Nenhum produto encontrado no banco de dados.");
    }
  }).catch((error) => {
    console.error("Erro ao carregar produtos:", error);
  });
}

 function criarCard(produto) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.produId = produto.id;
 
  card.innerHTML += `
  <h2>${produto.nome}</h2>
  <p>Codigo: ${produto.cod}</p>
  <p>Preço: ${produto.preco}</p>
  <p>Descrição: ${produto.desc}</p>
  
  `;
 
  return card;
 }
 document.addEventListener("DOMContentLoaded", carregarprodutos);

