// Menu hamburguesa compartido en todas las paginas
(function () {
    function getElements() {
        return {
            button: document.getElementById("menuBtn"),
            dropdown: document.getElementById("navDropdown")
        };
    }

    function syncMenuA11y(isOpen) {
        const { button } = getElements();
        if (!button) return;
        const label = isOpen ? "Cerrar menu principal" : "Abrir menu principal";
        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
    }

    function closeMenu() {
        const { button, dropdown } = getElements();
        if (!button || !dropdown) return;
        button.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        dropdown.classList.remove("open");
        syncMenuA11y(false);
    }

    function toggleMenu() {
        const { button, dropdown } = getElements();
        if (!button || !dropdown) return;

        const isOpen = button.classList.toggle("open");
        button.setAttribute("aria-expanded", isOpen ? "true" : "false");
        dropdown.classList.toggle("open", isOpen);
        syncMenuA11y(isOpen);
    }

    document.addEventListener("click", function (event) {
        const { button, dropdown } = getElements();
        if (!button || !dropdown) return;

        if (!button.contains(event.target) && !dropdown.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    document.addEventListener("click", function (event) {
        if (event.target.closest("#navDropdown a")) {
            closeMenu();
        }
    });

    const { button } = getElements();
    if (button) {
        button.addEventListener("click", toggleMenu);
        syncMenuA11y(false);
    }
})();
