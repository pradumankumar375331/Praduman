// THEME TOGGLE
const toggle = document.getElementById("themeToggle");

toggle.onclick = () => {
  document.body.classList.toggle("light");
};


// TYPING EFFECT
const text = ["Python Developer", "CSE Student", "Web Learner"];
let i = 0, j = 0, current = "", isDeleting = false;
const typing = document.querySelector(".typing");

function type() {
  current = text[i];

  if (!isDeleting) {
    typing.innerText = current.substring(0, j++);
    if (j > current.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  } else {
    typing.innerText = current.substring(0, j--);
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % text.length;
    }
  }
  setTimeout(type, isDeleting ? 50 : 100);
}
type();


// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});


// SKILL ANIMATION
const fills = document.querySelectorAll(".fill");

window.addEventListener("scroll", () => {
  fills.forEach(f => {
    const pos = f.getBoundingClientRect().top;
    if (pos < window.innerHeight - 50) {
      f.style.width = f.dataset.width + "%";
    }
  });
});


// SCROLL TOP BUTTON
const topBtn = document.getElementById("topBtn");

window.onscroll = () => {
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
};

topBtn.onclick = () => window.scrollTo({top:0, behavior:"smooth"});


// FORM VALIDATION
const form = document.getElementById("form");
const status = document.getElementById("status");

form.onsubmit = (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const msg = document.getElementById("msg").value;

  if (!name || !email || !msg) {
    status.innerText = "Fill all fields!";
    status.style.color = "red";
  } else {
    status.innerText = "Message sent!";
    status.style.color = "green";
    form.reset();
  }
};
