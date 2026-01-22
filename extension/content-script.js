(function() {
  'use strict';
  
  console.log("🛡️ Fairness Guard v6.0 - FRESH LOAD");

  try {
    // Signal presence to web app
    // Signal presence to web app (Robust)
    if (window.location.href.includes("localhost:3000")) {
        const signalPresence = () => {
             if (!document.getElementById('fairness-guard-installed')) {
                 const marker = document.createElement('div');
                 marker.id = 'fairness-guard-installed';
                 marker.style.display = 'none';
                 marker.setAttribute('data-version', '6.0');
                 document.body.appendChild(marker);
             }
             window.dispatchEvent(new CustomEvent('FAIRNESS_GUARD_DETECTED'));
        };

        // Signal immediately and then periodically to ensure React hydration catches it
        signalPresence();
        setInterval(signalPresence, 1000);
        console.log("🛡️ Signaling to FairLearnAI...");
    }

    // Show blocking overlay
    function showBlockedOverlay(message, suggestion) {
      console.log("🛡️ Showing overlay:", message);
      
      const existing = document.getElementById('fg-overlay');
      if (existing) existing.remove();
      
      const backdrop = document.createElement('div');
      backdrop.id = 'fg-overlay';
      backdrop.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:999999;display:flex;align-items:center;justify-content:center;';
      
      const modal = document.createElement('div');
      modal.style.cssText = 'background:white;padding:40px;border-radius:20px;max-width:500px;text-align:center;border:4px solid #ef4444;box-shadow:0 0 50px rgba(0,0,0,0.5);';
      modal.innerHTML = `
        <div style="font-size:60px;margin-bottom:20px;">⚠️</div>
        <h2 style="color:#111;font-size:24px;margin:0 0 15px 0;font-weight:700;">Action Blocked</h2>
        <p style="color:#666;font-size:16px;margin:0 0 20px 0;line-height:1.6;">${message}</p>
        ${suggestion ? `<div style="background:#f3f4f6;padding:15px;border-radius:10px;margin-bottom:20px;"><p style="margin:0;color:#374151;font-size:14px;"><strong>Try instead:</strong><br/>"${suggestion}"</p></div>` : ''}
        <button id="fg-close" style="background:#111;color:white;border:none;padding:15px 30px;border-radius:10px;font-size:16px;font-weight:600;cursor:pointer;">I Understand</button>
      `;
      
      backdrop.appendChild(modal);
      document.body.appendChild(backdrop);
      
      document.getElementById('fg-close').onclick = () => backdrop.remove();
      backdrop.onclick = (e) => { if (e.target === backdrop) backdrop.remove(); };
    }

    // Get prompt text


    // Main checking logic
    async function checkAndBlock(event, prompt) {
      console.log("🛡️ Intercepting:", prompt.substring(0, 30));
      
      // 1. Check Keywords (Fast Client-Side)
      const lower = prompt.toLowerCase();
      const keywords = [
        "final answer", "give me the solution", "solve completely", "answer key",
        "entire paper", "only answers no explanation", "do my homework", 
        "write the essay", "write an essay", "write a essay", "essay", 
        "summary", "full solution", "get me the answer", "generate an essay",
        "solve this", "write a"
      ];
      let blocked = false;
      
      for (const k of keywords) {
        if (lower.includes(k)) {
          blocked = true;
          break;
        }
      }

      // 2. If valid, check API (Async Background)
      if (!blocked) {
        await new Promise(resolve => {
          try {
            chrome.runtime.sendMessage({ type: 'CHECK_PROMPT', prompt }, (res) => {
              if (res && res.classification !== 'ALLOWED') blocked = true;
              resolve();
            });
          } catch (e) { resolve(); }
        });
      }

      if (blocked) {
        console.log("🛡️ ❌ BLOCKED!");
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        clearPrompt();
        showBlockedOverlay("This request violates academic integrity policies.", "Try asking for hints instead.");
        return true;
      }
      return false;
    }

    // Intercept clicks
    document.addEventListener('click', async function(e) {
      // Find closest button or role="button"
      const btn = e.target.closest('button, [role="button"]');
      if (!btn) return;
      
      // Check for Send intent mechanisms
      const isSend = 
        btn.getAttribute('type') === 'submit' ||
        (btn.getAttribute('aria-label') || '').toLowerCase().includes('send') ||
        (btn.getAttribute('title') || '').toLowerCase().includes('send') ||
        (btn.getAttribute('data-testid') || '').toLowerCase().includes('send') ||
        btn.querySelector('svg, i, span[class*="send"]');

      if (isSend) {
        const prompt = getPrompt();
        if (prompt) await checkAndBlock(e, prompt);
      }
    }, true);

    // Intercept Enter
    document.addEventListener('keydown', async function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        const prompt = getPrompt();
        if (prompt) await checkAndBlock(e, prompt);
      }
    }, true);

    console.log("🛡️ ✅ Ready");

    // Get prompt text (Robust)
    function getPrompt() {
      // 1. Check Active Element (User is typing here)
      const active = document.activeElement;
      if (active) {
          if (active.tagName === 'TEXTAREA') return active.value.trim();
          if (active.isContentEditable || active.getAttribute('contenteditable') === 'true') {
              // Clone to remove hidden text if needed, but innerText usually works
              return (active.innerText || active.textContent || '').trim();
          }
      }

      // 2. Fallback: Search for generic input fields
      const textarea = document.querySelector('textarea:not([style*="display: none"])');
      if (textarea && textarea.value) return textarea.value.trim();

      const editable = document.querySelector('[contenteditable="true"]:not([aria-hidden="true"])');
      if (editable) return (editable.innerText || editable.textContent || '').trim();
      
      return '';
    }

    // Clear input
    function clearPrompt() {
      const textarea = document.querySelector('textarea:not([style*="display: none"])');
      if (textarea) textarea.value = '';

      const editable = document.querySelector('[contenteditable="true"]');
      if (editable) {
        editable.innerHTML = '';
        editable.textContent = '';
      }
    }
    
    // ... (rest of blocking logic matches existing) ... 

    // Visual indicator (Subtle & Professional)
    setInterval(() => {
      const inputs = document.querySelectorAll('textarea, [contenteditable="true"]');
      inputs.forEach(input => {
        if (!input.hasAttribute('data-fg') && input.offsetParent !== null) { // valid and visible
            // Remove the 3px border, use a subtle glow instead
            input.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.2)'; 
            input.setAttribute('data-fg', '1');
            
            // Add a small, floating shield icon inside/near the input
            const badge = document.createElement('div');
            badge.innerHTML = '🛡️';
            badge.title = 'Fairness Guard Active';
            badge.style.cssText = `
                position: absolute;
                bottom: 10px;
                right: 10px;
                z-index: 9999;
                font-size: 16px;
                opacity: 0.7;
                cursor: help;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
            `;
            
            // Try to append relative to parent for better positioning
            if (input.parentElement) {
                 const originalPosition = window.getComputedStyle(input.parentElement).position;
                 if (originalPosition === 'static') {
                     input.parentElement.style.position = 'relative';
                 }
                 input.parentElement.appendChild(badge);
            }
        }
      });
    }, 2000);

  } catch (error) {
    console.error("🛡️ ERROR:", error);
  }
})();
