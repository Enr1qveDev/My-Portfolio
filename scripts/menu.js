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

    function closeMoreMenu() {
        const { moreGroup, moreButton, moreSubmenu } = getElements();
        if (!moreGroup || !moreButton || !moreSubmenu) return;
        moreGroup.classList.remove("open");
        moreSubmenu.classList.remove("open");
        moreButton.setAttribute("aria-expanded", "false");
    }

    function closeMenu() {
        const { button, dropdown } = getElements();
        if (!button || !dropdown) return;
        button.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        dropdown.classList.remove("open");
        closeMoreMenu();
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
    }

    function toggleMoreMenu() {
        const { moreGroup, moreButton, moreSubmenu } = getElements();
        if (!moreGroup || !moreButton || !moreSubmenu) return;

        const isOpen = moreGroup.classList.toggle("open");
        moreSubmenu.classList.toggle("open", isOpen);
        moreButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
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

    window.toggleMenu = toggleMenu;
    window.toggleMoreMenu = toggleMoreMenu;
})();
