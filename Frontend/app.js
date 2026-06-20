
const links = document.querySelectorAll("a[href^='#']");
const hero = document.querySelector(".hero");
const sections = document.querySelectorAll(".section");
const navMenu = document.querySelector(".nav-links");

function showSection(id) {
  // hide all sections
  sections.forEach(sec => sec.classList.remove("active-section"));
  hero.classList.remove("active-section");

  // show correct section
  if (id === "home") {
    hero.classList.add("active-section");
  } else {
    const target = document.getElementById(id);
    if (target) target.classList.add("active-section");
  }

  // close mobile menu
  navMenu.classList.remove("nav-open");

  // highlight nav
  document.querySelectorAll(".nav-links a").forEach(l => l.classList.remove("active"));
  const active = document.querySelector(`.nav-links a[href="#${id}"]`);
  if (active) active.classList.add("active");

  // update URL
  history.pushState(null, "", `#${id}`);
}

// NAVBAR + BUTTON CLICK SUPPORT
links.forEach(link => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href").replace("#", "");

    // only handle internal links
    if (link.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      showSection(id);
    }
  });
});

// load correct section on refresh
window.addEventListener("load", () => {
  const hash = window.location.hash.replace("#", "");
  showSection(hash || "home");
});
fetch("php/get_menu.php")
  .then(response => response.json())
  .then(data => {

    const container = document.getElementById("menu-container");

    container.innerHTML = "";

    data.forEach(item => {
      container.innerHTML += `
        <div class="menu-card">
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <span>R${item.price}</span>
        </div>
      `;
    });

  });

document.getElementById("reservationForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    name: this.name.value,
    email: this.email.value,
    phone: this.phone.value,
    guests: this.guests.value,
    date: this.date.value,
    time: this.time.value
  };

  fetch("php/create_reservation.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
    alert(response.message || "Something went wrong");
  });

});