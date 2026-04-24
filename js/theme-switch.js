(function initThemeSwitch() {
    const storageKey = 'yimc-theme-mode';
    const html = document.documentElement;
    const toggleButton = document.querySelector('[data-theme-toggle]');
    const resetButton = document.querySelector('[data-theme-reset]');
    const tip = document.querySelector('[data-theme-tip]');
    const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    let tipTimer = null;

    function getAutoTheme() {
        return media && media.matches ? 'dark' : 'light';
    }

    function showTip() {
        if (!tip) return;
        tip.textContent = '点击“↩︎”恢复默认';
        tip.classList.add('is-visible');
        if (tipTimer) clearTimeout(tipTimer);
        tipTimer = setTimeout(() => {
            tip.classList.remove('is-visible');
        }, 3000);
    }

    function updateControlState(mode) {
        if (!toggleButton) return;
        const visualMode = mode === 'auto' ? getAutoTheme() : mode;
        toggleButton.textContent = visualMode === 'dark' ? '☽' : '☀︎';
        toggleButton.setAttribute('aria-label', visualMode === 'dark' ? '切换到日间模式' : '切换到夜间模式');
        toggleButton.setAttribute('title', visualMode === 'dark' ? '切换到日间模式' : '切换到夜间模式');
        if (resetButton) {
            resetButton.hidden = mode === 'auto';
        }
    }

    function applyMode(mode) {
        const resolved = mode === 'auto' ? getAutoTheme() : mode;
        html.setAttribute('data-theme', resolved);
        updateControlState(mode);
    }

    function getStoredManualMode() {
        try {
            const mode = localStorage.getItem(storageKey);
            return mode === 'light' || mode === 'dark' ? mode : null;
        } catch {
            return null;
        }
    }

    function setStoredManualMode(mode) {
        try {
            localStorage.setItem(storageKey, mode);
        } catch {
            // Ignore storage failures.
        }
    }

    function clearStoredMode() {
        try {
            localStorage.removeItem(storageKey);
        } catch {
            // Ignore storage failures.
        }
    }

    let currentMode = getStoredManualMode() || 'auto';
    applyMode(currentMode);

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const base = currentMode === 'auto' ? getAutoTheme() : currentMode;
            const next = base === 'dark' ? 'light' : 'dark';
            const fromAuto = currentMode === 'auto';
            currentMode = next;
            setStoredManualMode(next);
            applyMode(currentMode);
            if (fromAuto) showTip();
        });
    }

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            currentMode = 'auto';
            clearStoredMode();
            applyMode(currentMode);
        });
    }

    if (media) {
        const onSystemThemeChange = () => {
            if (currentMode === 'auto') {
                applyMode('auto');
            }
        };
        if (typeof media.addEventListener === 'function') {
            media.addEventListener('change', onSystemThemeChange);
        } else if (typeof media.addListener === 'function') {
            media.addListener(onSystemThemeChange);
        }
    }
})();
