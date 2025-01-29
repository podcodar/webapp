const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "a",
  "b",
];
let konamiCodePosition = 0;

window.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[konamiCodePosition]) {
    konamiCodePosition++;
    if (konamiCodePosition === konamiCode.length) {
      window.location.href = "/admin";
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});
