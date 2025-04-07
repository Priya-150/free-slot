// script.js
import { db, ref, onValue, set, push } from './firebase.js';

// ========== DASHBOARD FUNCTIONALITY ==========
const slotContainer = document.getElementById('slotStatusContainer');
const freeCount = document.getElementById('freeCount');

if (slotContainer && freeCount) {
  const slotsRef = ref(db, 'slots');

  onValue(slotsRef, (snapshot) => {
    const data = snapshot.val() || {};
    let freeSlots = 0;
    slotContainer.innerHTML = '';

    Object.keys(data).forEach((slotId) => {
      const status = data[slotId];
      if (status === "empty") freeSlots++;

      const div = document.createElement('div');
      div.className = status;
      div.textContent = Slot ${slotId}: ${status};
      slotContainer.appendChild(div);
    });

    freeCount.textContent = freeSlots;
  });
}

// ========== GATE ENTRY LOG FUNCTIONALITY ==========
const entryBtn = document.getElementById('entryBtn');
const exitBtn = document.getElementById('exitBtn');
const logContainer = document.getElementById('logContainer');

if (entryBtn && exitBtn && logContainer) {
  const logRef = ref(db, 'logs');

  entryBtn.addEventListener('click', () => {
    push(logRef, {
      type: 'entry',
      timestamp: new Date().toISOString()
    });
  });

  exitBtn.addEventListener('click', () => {
    push(logRef, {
      type: 'exit',
      timestamp: new Date().toISOString()
    });
  });

  onValue(logRef, (snapshot) => {
    const data = snapshot.val() || {};
    logContainer.innerHTML = '';

    Object.keys(data).reverse().forEach((key) => {
      const { type, timestamp } = data[key];
      const log = document.createElement('div');
      log.textContent = ${type.toUpperCase()} at ${new Date(timestamp).toLocaleString()};
      logContainer.appendChild(log);
    });
  });
}
