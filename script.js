
window.addEventListener('load', () => {
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }
});


const form = document.getElementById('reservationForm');
const confirmation = document.getElementById('confirmation');

if (form && confirmation) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = form.name.value;
    const date = form.date.value;
    const time = form.time.value;
    const party_size = form.party_size.value;
    const now = new Date();
    const selectedDateTime = new Date(date + 'T' + time);
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);


    if (selectedDate.getTime() === today.getTime()) {
      const [hour, minute] = time.split(':').map(Number);
      if (hour < now.getHours() || (hour === now.getHours() && minute <= now.getMinutes())) {
        alert("Please select a time later than the current time.");
        return;
      }
     
    }


    const hour = selectedDateTime.getHours();
    if (hour < 10 || hour > 22) {
      alert("Please choose a time between 10:00 and 22:00.");
      return;
    }


    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('confirm-name').textContent = name;
    document.getElementById('confirm-date').textContent = date;
    document.getElementById('confirm-time').textContent = time;
    document.getElementById('confirm-party').textContent = party_size;

    confirmation.style.display = 'block';
    form.reset();
  
  });
}
function myFunction() {
  var myWindow = window.open("", "MsgWindow", "width=600,height=800");
  myWindow.document.write(document.getElementById('print').innerHTML);
  myWindow.print();
}

function translatePage(lang) {
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach(el => {
    const key = el.getAttribute("data-translate");
    el.textContent = translations[lang][key];
  });
}


function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  translatePage(lang);

  const body = document.body;
  if (lang === "ar") {
    body.classList.add("rtl");
  } else {
    body.classList.remove("rtl");
  }
}

window.addEventListener("load", () => {
  const savedLang = localStorage.getItem("lang") || "en";
  translatePage(savedLang);

  if (savedLang === "ar") {
    document.body.classList.add("rtl");
  }
});
