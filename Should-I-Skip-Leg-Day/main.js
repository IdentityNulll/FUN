let yes = document.querySelector(".yes");
let no = document.querySelector(".no");

yes.addEventListener("click", () => {
  alert("Lezz goo gng🎉");
});

const really = document.querySelector(".really")

no.addEventListener("mouseenter", (e) => {
  const maxX = window.innerWidth - no.offsetWidth;
  const maxY = window.innerHeight - no.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  no.style.position = "fixed";
  no.style.left = `${randomX}px`;
  no.style.top = `${randomY}px`;

  really.innerHTML = "Realllyyyy gnggg.."
});

