import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDsphs9Uhgwxr5ygWO-_tGu24uWQeB7u4Y",
  authDomain: "sql-quiz-9b114.firebaseapp.com",
  projectId: "sql-quiz-9b114",
  storageBucket: "sql-quiz-9b114.appspot.com",
  messagingSenderId: "631979981590",
  appId: "1:631979981590:web:f1ca8377cf3b70fd07ee37",
  measurementId: "G-FX4X08H4QZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Elements
const greetingEl = document.getElementById("user-greeting");
const listContainer = document.getElementById("blockings-list");

// ✅ Auth check
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    const userData = userSnap.data();
    greetingEl.textContent = `Hello, ${userData?.name || "Admin"}`;

    // 🚨 Temporarily bypass role check
    loadAllBlockings(); 
  } catch (err) {
    console.error("Auth check error:", err);
    listContainer.innerHTML = "<p>Error loading user info.</p>";
  }
});


// ✅ Logout
document.getElementById("logout-btn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});

// ✅ Nav switching
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll(".section");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));
    link.classList.add("active");

    const sectionId = link.getAttribute("data-section");
    document.getElementById(sectionId).classList.add("active");

    if (sectionId === "block") loadAllBlockings();
  });
});

// ✅ Load All Quiz Scores (for admin)
async function loadAllBlockings() {
  console.log("Loading scores...");
  listContainer.innerHTML = "<p>Loading quiz scores...</p>";

  try {
    const scoresQuery = query(collection(db, "quizScores"), orderBy("score", "desc"));
    const snapshot = await getDocs(scoresQuery);

    console.log("Snapshot size:", snapshot.size);

    if (snapshot.empty) {
      listContainer.innerHTML = "<p>No scores found.</p>";
      return;
    }

    listContainer.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log("Score Doc:", data);

      const card = document.createElement("div");
      card.className = "booking-card";
      card.innerHTML = `
        <h3>${data.email || 'Unknown Email'}</h3>
        <p><strong>Name:</strong> ${data.name ?? 'N/A'}</p>
        <p><strong>Score:</strong> ${data.score ?? 'N/A'}</p>
      `;
      listContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading quiz scores:", err);
    listContainer.innerHTML = "<p>Error loading quiz scores.</p>";
  }
}

