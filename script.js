// THEME TOGGLE
const btn = document.getElementById("themeToggle");

btn.onclick = () => {
  const current = document.body.style.background;

  if (current === "white") {
    document.body.style.background = "#0d0d10";
    document.body.style.color = "white";
  } else {
    document.body.style.background = "white";
    document.body.style.color = "black";
  }
};


// FORM VALIDATION
const form = document.getElementById("contactForm");
const msg = document.getElementById("successMsg");

form.addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if(name === "" || email === "" || message === ""){
    msg.innerText = "Please fill all fields";
    msg.style.color = "red";
  } else {
    msg.innerText = "Message Sent Successfully!";
    msg.style.color = "green";
    form.reset();
  }
});
