// Theme toggle compartido en todas las paginas
(function () {
    const root = document.documentElement;
    const storageKey = "theme";
    const prefersLight = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches;
    const button = document.getElementById("themeBtn");

    const saved = localStorage.getItem(storageKey);
    const initialTheme = saved === "light" || saved === "dark"
        ? saved
        : (prefersLight ? "light" : "dark");

    applyTheme(initialTheme);

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        localStorage.setItem(storageKey, theme);
        updateToggle(theme);
    }

    function updateToggle(theme) {
        const isDark = theme === "dark";
        const nextLabel = isDark ? "modo claro" : "modo oscuro";
        const icon = document.getElementById("themeIcon");

        if (icon) {
            icon.textContent = isDark ? "\uD83C\uDF19" : "\u2600";
        }

        if (button) {
            button.setAttribute("aria-label", "Cambiar a " + nextLabel);
            button.setAttribute("title", "Cambiar a " + nextLabel);
        }
    }

    function toggleTheme() {
        const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
    }

    if (button) {
        button.addEventListener("click", toggleTheme);
    }
})();
