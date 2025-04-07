// Login with Google
function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(() => window.location.href = "dashboard.html")
    .catch(alert);
}

// Login with Email/Password (signup fallback)
function loginWithEmail() {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location.href = "dashboard.html")
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        auth.createUserWithEmailAndPassword(email, password)
          .then(() => window.location.href = "dashboard.html");
      } else {
        alert(error.message);
      }
    });
}

// Check if user is logged in on dashboard
window.addEventListener("load", () => {
  if (window.location.pathname.includes("dashboard.html")) {
    auth.onAuthStateChanged(user => {
      if (!user) {
        window.location.href = "index.html";
      } else {
        setupDashboard();
      }
    });
  }
});

function setupDashboard() {
  const slotStatusContainer = document.getElementById("slotStatusContainer");
  const freeSlotCount = document.getElementById("freeSlotCount");
  const logList = document.getElementById("logList");

  const slotsRef = database.ref("slots");
  slotsRef.on("value", snapshot => {
    slotStatusContainer.innerHTML = "";
    let freeSlots = 0;
    const slots = snapshot.val();
    for (let slot in slots) {
      const div = document.createElement("div");
      div.className = "slot " + slots[slot];
      div.textContent = Slot ${slot}: ${slots[slot]};
      slotStatusContainer.appendChild(div);
      if (slots[slot] === "empty") freeSlots++;
    }
    freeSlotCount.textContent = freeSlots;
  });

  const logsRef = database.ref("logs");
  logsRef.on("child_added", snapshot => {
    const log = snapshot.val();
    const li = document.createElement("li");
    li.textContent = ${log.type.toUpperCase()} - ${new Date(log.timestamp).toLocaleString()};
    logList.prepend(li);
  });

  document.getElementById("entryBtn").onclick = () => logGate("entry");
  document.getElementById("exitBtn").onclick = () => logGate("exit");

  // ✅ Logout
  document.getElementById("logoutBtn").onclick = () => {
    auth.signOut().then(() => {
      window.location.href = "index.html";
    });
  };
}

function logGate(type) {
  const logRef = database.ref("logs").push();
  logRef.set({
    type,
    timestamp: new Date().toISOString()
  });
}
