document.addEventListener("mousemove", (e) => {
    const background = document.getElementById("interactive-bg");
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    background.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
});