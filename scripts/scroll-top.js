// Boton subir arriba con desplazamiento suave y rapido
(function () {
    const button = document.getElementById("scrollTopBtn");
    if (!button) return;

    const durationMs = 320;
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    function getShowAfter() {
        return mobileQuery.matches ? 120 : 300;
    }

    function updateVisibility() {
        const y = window.scrollY || document.documentElement.scrollTop;
        button.classList.toggle("visible", y > getShowAfter());
    }

    function scrollToTopFast() {
        const startY = window.scrollY || document.documentElement.scrollTop;
        if (startY <= 0) return;

        const startTime = performance.now();

        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const nextY = Math.round(startY * (1 - eased));

            window.scrollTo(0, nextY);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    if (typeof mobileQuery.addEventListener === "function") {
        mobileQuery.addEventListener("change", updateVisibility);
    }
    button.addEventListener("click", scrollToTopFast);

    updateVisibility();
})();
