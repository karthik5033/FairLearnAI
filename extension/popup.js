document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('examModeToggle');
  const scoreEl = document.getElementById('integrityScore');
  const statusMsg = document.getElementById('statusMsg');

  // Load initial state
  chrome.storage.local.get(['examMode', 'integrityScore'], (result) => {
    toggle.checked = result.examMode || false;
    scoreEl.textContent = result.integrityScore || 100;
    updateStatus(toggle.checked);
  });

  toggle.addEventListener('change', () => {
    const isExamMode = toggle.checked;
    chrome.storage.local.set({ examMode: isExamMode });
    updateStatus(isExamMode);
    
    // Notify background script
    chrome.runtime.sendMessage({ type: 'TOGGLE_EXAM_MODE', value: isExamMode });
  });

  function updateStatus(isExamMode) {
    statusMsg.textContent = isExamMode 
      ? "Strict Monitoring Enabled" 
      : "Monitoring activities...";
    statusMsg.style.color = isExamMode ? "#ef4444" : "#64748b";
  }
});
