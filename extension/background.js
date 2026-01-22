// Poll for Exam Mode from the platform
async function syncExamMode() {
  try {
    const response = await fetch('http://localhost:3000/api/exam-mode');
    const data = await response.json();
    if (data.examMode !== undefined) {
      chrome.storage.local.set({ examMode: data.examMode });
    }
  } catch (err) {
    console.log('Syncing error (Platform might be offline):', err.message);
  }
}

// Initial sync and then every 5 seconds
syncExamMode();
setInterval(syncExamMode, 5000);

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ 
    examMode: false, 
    integrityScore: 100,
    blockedCount: 0 
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('🛡️ BG: Received message:', request);
  
  if (request.type === 'CHECK_PROMPT') {
    classifyPrompt(request.prompt).then((result) => {
      console.log('🛡️ BG: Sending response:', result);
      sendResponse(result);
    }).catch((error) => {
      console.error('🛡️ BG: Error:', error);
      sendResponse({ classification: 'ALLOWED', message: 'Error occurred', rewrite: null });
    });
    return true; // Keep channel open for async response
  }
});

async function classifyPrompt(prompt) {
  try {
    const { examMode } = await chrome.storage.local.get('examMode');
    
    // If exam mode is on, block everything immediately
    if (examMode) {
      return {
        classification: 'DISALLOWED',
        message: 'Exam Mode Active: All AI assistance is blocked.',
        rewrite: null
      };
    }

    // Try API classification first
    try {
      const response = await fetch('http://localhost:3000/api/ai/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      if (response.ok) {
        const result = await response.json();
        let classification = result.label || 'ALLOWED';
        let message = result.reason || '';
        let rewrite = null;

        if (classification === 'HINT_ONLY') {
          rewrite = "Don't give the final answer. Provide step-by-step hints to help me solve it myself.";
          message = "Direct answer restricted. Switching to Hint Mode.";
        }

        if (classification !== 'ALLOWED') {
          updateIntegrityScore();
        }

        return { classification, message, rewrite };
      }
    } catch (apiError) {
      console.log('🛡️ API unavailable, using client-side classification');
    }

    // Fallback: Client-side keyword matching
    const lowerPrompt = prompt.toLowerCase();
    
    const DISALLOWED = [
      "final answer", "give me the solution", "solve completely", "answer key",
      "entire paper", "do my homework", "write the essay", "write an essay",
      "essay", "summary", "full solution", "get me the answer", "generate an essay"
    ];

    const HINT_ONLY = [
      "solve this", "how to solve", "step by step", "explain this",
      "help me with this question", "derivative of", "integral of", "what is the answer to"
    ];

    for (const keyword of DISALLOWED) {
      if (lowerPrompt.includes(keyword)) {
        updateIntegrityScore();
        return {
          classification: 'DISALLOWED',
          message: `Detected cheating attempt: "${keyword}"`,
          rewrite: null
        };
      }
    }

    for (const keyword of HINT_ONLY) {
      if (lowerPrompt.includes(keyword)) {
        updateIntegrityScore();
        return {
          classification: 'HINT_ONLY',
          message: "Direct answer restricted. Switching to Hint Mode.",
          rewrite: "Don't give the final answer. Provide step-by-step hints to help me solve it myself."
        };
      }
    }

    return { classification: 'ALLOWED', message: '', rewrite: null };

  } catch (error) {
    console.error('🛡️ Classification error:', error);
    // Fail-safe: In case of error, allow (but log it)
    return { classification: 'ALLOWED', message: '', rewrite: null };
  }
}

function updateIntegrityScore() {
  chrome.storage.local.get(['integrityScore', 'blockedCount'], (result) => {
    const newCount = (result.blockedCount || 0) + 1;
    const newScore = Math.max(0, 100 - (newCount * 2));
    chrome.storage.local.set({ 
      integrityScore: newScore,
      blockedCount: newCount
    });
  });
}
