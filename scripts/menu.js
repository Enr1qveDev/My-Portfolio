// Menu hamburguesa compartido en todas las paginas
(function () {
    function getElements() {
        return {
            button: document.getElementById("menuBtn"),
            dropdown: document.getElementById("navDropdown"),
            moreGroup: document.getElementById("moreMenuGroup"),
            moreButton: document.getElementById("moreMenuBtn"),
            moreSubmenu: document.getElementById("moreSubmenu")
        };
    }

    function syncMenuA11y(isOpen) {
        const { button } = getElements();
        if (!button) return;
        const label = isOpen ? "Cerrar menu principal" : "Abrir menu principal";
        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
    }

    function syncMoreMenuA11y(isOpen) {
        const { moreButton } = getElements();
        if (!moreButton) return;
        const label = isOpen ? "Cerrar submenu Mas sobre mi" : "Abrir submenu Mas sobre mi";
        moreButton.setAttribute("aria-label", label);
    }

    function closeMoreMenu() {
        const { moreGroup, moreButton, moreSubmenu } = getElements();
        if (!moreGroup || !moreButton || !moreSubmenu) return;
        moreGroup.classList.remove("open");
        moreSubmenu.classList.remove("open");
        moreButton.setAttribute("aria-expanded", "false");
        syncMoreMenuA11y(false);
    }

    function closeMenu() {
        const { button, dropdown } = getElements();
        if (!button || !dropdown) return;
        button.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        dropdown.classList.remove("open");
        closeMoreMenu();
        syncMenuA11y(false);
    }

    function toggleMenu() {
        const { button, dropdown } = getElements();
        if (!button || !dropdown) return;

        const isOpen = button.classList.toggle("open");
        button.setAttribute("aria-expanded", isOpen ? "true" : "false");
        dropdown.classList.toggle("open", isOpen);
        if (!isOpen) {
            closeMoreMenu();
        }
        syncMenuA11y(isOpen);
    }

    function toggleMoreMenu() {
        const { moreGroup, moreButton, moreSubmenu } = getElements();
        if (!moreGroup || !moreButton || !moreSubmenu) return;

        const isOpen = moreGroup.classList.toggle("open");
        moreSubmenu.classList.toggle("open", isOpen);
        moreButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
        syncMoreMenuA11y(isOpen);
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

    const { button, moreButton } = getElements();
    if (button) {
        button.addEventListener("click", toggleMenu);
        syncMenuA11y(false);
    }
    if (moreButton) {
        moreButton.addEventListener("click", toggleMoreMenu);
        syncMoreMenuA11y(false);
    }
})();
