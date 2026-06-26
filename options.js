// Vitality Clock - Options Page Script

document.addEventListener('DOMContentLoaded', () => {
  const openShortcutInput = document.getElementById('open-shortcut');
  const setOpenShortcutBtn = document.getElementById('set-open-shortcut');
  const resetOpenShortcutBtn = document.getElementById('reset-open-shortcut');
  const statusMessage = document.getElementById('status-message');

  const DEFAULT_SHORTCUT = 'Ctrl+Shift+O';

  function showStatus(msg) {
    statusMessage.textContent = msg;
    statusMessage.classList.add('show');
    setTimeout(() => {
      statusMessage.classList.remove('show');
    }, 2000);
  }

  function loadShortcuts() {
    chrome.storage.sync.get(['openShortcut'], (result) => {
      if (result.openShortcut) {
        openShortcutInput.value = result.openShortcut;
      } else {
        openShortcutInput.value = DEFAULT_SHORTCUT;
      }
    });
  }

  function saveShortcut(shortcut) {
    chrome.storage.sync.set({ openShortcut: shortcut }, () => {
      showStatus('Shortcut settings saved!');
    });
  }

  setOpenShortcutBtn.addEventListener('click', () => {
    openShortcutInput.readOnly = false;
    openShortcutInput.focus();
    openShortcutInput.value = '';

    const handleKeyDown = (e) => {
      e.preventDefault();

      let shortcut = '';
      if (e.ctrlKey) shortcut += 'Ctrl+';
      if (e.metaKey) shortcut += 'Command+';
      if (e.shiftKey) shortcut += 'Shift+';
      if (e.altKey) shortcut += 'Alt+';

      if ((e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) ||
          e.key.startsWith('F') ||
          ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'Enter', 'Escape'].includes(e.key)) {
        shortcut += e.key.toUpperCase();

        openShortcutInput.value = shortcut;
        saveShortcut(shortcut);
        openShortcutInput.readOnly = true;
        document.removeEventListener('keydown', handleKeyDown);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
  });

  resetOpenShortcutBtn.addEventListener('click', () => {
    openShortcutInput.value = DEFAULT_SHORTCUT;
    saveShortcut(DEFAULT_SHORTCUT);
  });

  loadShortcuts();
});
