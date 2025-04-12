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
  getDocs
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC2V8c3jz9_9pHQAsERZp-rEGh7-_Co9nM",
  authDomain: "eventmanagement-31f6c.firebaseapp.com",
  projectId: "eventmanagement-31f6c",
  storageBucket: "eventmanagement-31f6c.appspot.com",
  messagingSenderId: "257752741631",
  appId: "1:257752741631:web:74df84b10a15485db0feca",
  measurementId: "G-DBJ84RLTNY"
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

    if (!userSnap.exists()) {
      greetingEl.textContent = "Hello";
      return;
    }

    const userData = userSnap.data();
    greetingEl.textContent = `Hello, ${userData.name || "Admin"}`;

    if (userData.role === "admin") {
      loadAllBlockings();
    } else {
      listContainer.innerHTML = "<p>You do not have permission to view this page.</p>";
    }
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

// ✅ Load All Bookings (for admin)
async function loadAllBlockings() {
  listContainer.innerHTML = "<p>Loading blockings...</p>";

  try {
    const snapshot = await getDocs(collection(db, "bookedEvents"));
    if (snapshot.empty) {
      listContainer.innerHTML = "<p>No blockings found.</p>";
      return;
    }

    listContainer.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const card = document.createElement("div");
      card.className = "booking-card";
      card.innerHTML = `
        <h3>${data.eventType || 'Event'}</h3>
        <p><strong>Customer Name:</strong> ${data.userName || 'N/A'}</p>
        <p><strong>Date:</strong> ${data.date || 'N/A'}</p>
        <p><strong>Place:</strong> ${data.city || data.location || 'N/A'}</p>
        <p><strong>Status:</strong> ${data.status || 'Unknown'}</p>
      `;
      listContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading blockings:", err);
    listContainer.innerHTML = "<p>Error loading blockings.</p>";
  }
}
