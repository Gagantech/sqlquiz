import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDsphs9Uhgwxr5ygWO-_tGu24uWQeB7u4Y",
  authDomain: "sql-quiz-9b114.firebaseapp.com",
  projectId: "sql-quiz-9b114",
  storageBucket: "sql-quiz-9b114.firebasestorage.app",
  messagingSenderId: "631979981590",
  appId: "1:631979981590:web:f1ca8377cf3b70fd07ee37",
  measurementId: "G-FX4X08H4QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM elements
const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

// Toast function
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.className = `toast show ${type}`;
  toast.textContent = message;
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

// Login event
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  try {
    // Attempt sign in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Admin redirect
    if (email == "admin@gmail.com") {
      showToast("Admin login successful!", "success");
      setTimeout(() => window.location.href = "admin.html", 1500);
    } else {
      // Student login
      showToast("User login successful!", "success");
      setTimeout(() => window.location.href = "student.html", 1500);
    }

  } catch (error) {
    console.error("Login failed:", error.code);

    if (error.code === "auth/wrong-password" || error.code === "auth/invalid-login-credentials") {
      showToast("Incorrect username/password.", "error");
    } else if (error.code === "auth/invalid-email") {
      showToast("Invalid email format.", "error");
    } else if (error.code === "auth/user-not-found") {
      showToast("User not found. Please check your email.", "error");
    } else if (error.code === "auth/too-many-requests") {
      showToast("Too many failed attempts. Try again later.", "error");
    } else {
      showToast("Login failed: " + error.message, "error");
    }
  }
});
