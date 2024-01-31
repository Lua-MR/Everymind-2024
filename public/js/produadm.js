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
    alert("Adm não autenticado");
    window.location.href = "../html/login.html";
  }
});


function carregarprodutos() {
  const produtosCards = document.getElementById("produtosCards");
  produtosCards.innerHTML = "";

  const produtosRef = ref(db, 'produ');

  get(produtosRef).then((snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const produto = childSnapshot.val();
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

 function adicionarproduto() {
  const nome = document.getElementById("nome").value;
  const desc = document.getElementById("desc").value;
  const cod = parseInt(document.getElementById("cod").value);
  const preco = parseFloat(document.getElementById("preco").value);

  const produ = {
    nome: nome,
    desc: desc,
    cod: cod,
    preco: preco
  };

  enviarParaFirebase(produ);
  carregarprodutos();
  limparCampos();
  alert("Produto adicionado");
}

function atualizarproduto() {

  const nome = document.getElementById("nomeAlterar").value;
  const desc = document.getElementById("descAlterar").value;
  const cod = parseInt(document.getElementById("codAlterar").value);
  const preco = parseFloat(document.getElementById("precoAlterar").value);

  const produ = {
    nome: nome,
    desc: desc,
    cod: cod,
    preco: preco
  };

  const itensRef = ref(db, 'produ/' + produ.cod);
  update(itensRef, produ);
  carregarprodutos();
}

function excluirproduto() {
  const cod = parseInt(document.getElementById("codAlterar").value);
console.log(cod);
  if (!isNaN(cod)) {
    const confirmacao = confirm('Tem certeza de que deseja excluir este produto?');

    if (confirmacao) {
      const itensRef = ref(db, 'produ/' + cod);
      remove(itensRef).then(() => {
        console.log('Produto excluído com sucesso!');
        limparCampos();
        carregarprodutos();
      }).catch((error) => {
        console.error('Erro ao excluir produto:', error);
      });
    } else {
      console.log('Exclusão cancelada pelo usuário.');
    }
  } else {
    console.error('Código de produto inválido.');
  }
}


 function enviarParaFirebase(produ) {

  const itensRef = ref(db, 'produ/' + produ.cod);
  set(itensRef, produ);
}


function limparCampos() {
   document.getElementById("nome").value = "";
   document.getElementById("desc").value = "";
   document.getElementById("cod").value = "";
   document.getElementById("preco").value = "";
 
   document.getElementById("nomeAlterar").value =  "";
   document.getElementById("descAlterar").value =  "";
   document.getElementById("codAlterar").value =  "";
   document.getElementById("precoAlterar").value =  "";
 }
 

document.addEventListener("DOMContentLoaded", carregarprodutos);
document.getElementById("btlimparper").addEventListener("click", limparCampos);
document.getElementById("btsalvarper").addEventListener("click", adicionarproduto);
document.getElementById("btsalvarperatt").addEventListener("click", atualizarproduto);
document.getElementById("excluirp").addEventListener("click", excluirproduto);