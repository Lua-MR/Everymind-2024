  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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