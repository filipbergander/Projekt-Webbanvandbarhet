"use strict";

console.log("JS laddad");
const navbar = document.getElementById("navbar");

const main = document.querySelector(".main-content");

const openButton = document.getElementById("open-sidebarbutton");

const closeButton = document.getElementById("close-sidebarbutton");

const overlay = document.getElementById("overlay");

const mobileQuery = window.matchMedia("(max-width: 920px)"); // Matchar om skärmen är mindre än 876px, alltså mobilläge

mobileQuery.addEventListener("change", updateNavbar); // Lyssnar efter ändringar i skärmstorlek

function updateNavbar() {
    const trueMobile = mobileQuery.matches; // Stämmer om besökaren är i mobilläge
    if (trueMobile) { // Innehållet, main och nav, ska vara interaktiva från början i mobilläge
        main.removeAttribute("inert")
        navbar.removeAttribute("inert");
    } else { // Innehållet, main och nav, ska vara interaktiva från början i övriga lägen
        main.removeAttribute("inert");
        navbar.removeAttribute("inert");
    }
}

updateNavbar(); // funktionen körs när sidan laddas

function openSidebar() {
    navbar.classList.add("show"); // För att visa sidomenyn
    overlay.classList.add("show");
    openButton.setAttribute("aria-expanded", "true"); // Ändrar aria-expanded till true när sidomenyn är öppen
    overlay.style.display = "block"; // Visar overlay när sidomenyn är öppen, vilket leder till att bakgrundsinnehållet blir mörkt
    if (mobileQuery.matches) {
        main.setAttribute("inert", ""); // Lägger till inert för att blockera interaktionen med huvudinnehållet när sidomenyn är öppen
        navbar.removeAttribute("inert"); // Tar bort inert så att interaktionen fortfarande fungerar i sidomenyn
    }
    closeButton.focus(); // Fokus stängningsknappen 
}

function closeSidebar() {
    navbar.classList.remove("show"); // För att dölja sidomenyn
    overlay.classList.remove("show");
    openButton.setAttribute("aria-expanded", "false"); // Ändrar aria-expanded till false när sidomenyn är stängd
    overlay.style.display = "none"; // Dölj overlay när sidomenyn är stängd
    if (mobileQuery.matches) {
        main.removeAttribute("inert"); // Tar bort inert så att interaktionen fungerar i huvudinnehållet när sidomenyn är stängd
        navbar.setAttribute("inert", ""); // Lägger till inert för att blockera interaktionen med sidomenyn när den är stängd 
    } else { // Funktionen med att klicka på navigeringsmenyn ska fungera i desktopläge
        main.removeAttribute("inert");
        navbar.removeAttribute("inert");
    }
}

const navigateLinks = document.querySelectorAll(".nav-link"); // Alla länkar i sidomenyn
navigateLinks.forEach(link => { // Stänger sidomenyn när en länk i menyn klickas
    link.addEventListener("click", () => {
        if (mobileQuery.matches) {
            closeSidebar(); // Stänger sidomenyn i mobilläge när en länk klickas, denna fungerar ändå eftersom man klickar på en länk så navigeras man till den sidan.
        }
    });
});

function displayReturnTime() {
    const returnCheckbox = document.querySelectorAll("input[name='trip']");
    const returnRow = document.querySelector(".return-row");
    const returnText = document.querySelector(".return-time");
    const returnSection = document.querySelector(".return-section");

    returnCheckbox.forEach(radio => {
        radio.addEventListener("change", () => {
            if (radio.value === "Tur och retur" && radio.checked) {
                returnRow.classList.add("show");
                returnText.classList.add("show");
                returnSection.classList.add("show");
            } else {
                returnRow.classList.remove("show");
                returnText.classList.remove("show");
                returnSection.classList.remove("show");
            }
        });
    });
}
displayReturnTime();

function recurringTravel() {
    const recurringBtn = document.querySelector(".recurring-btn");
    if (!recurringBtn) return;

    recurringBtn.addEventListener("click", () => {
        // Hämta radiobutton som är vald
        const selected = document.querySelector("input[name='recurring']:checked");

        if (!selected) {
            alert("Välj om resan ska vara återkommande eller inte.");
            return;
        }

        if (selected.value === "Ja") {
            window.location.href = "boka-kommande.html";
        } else {
            window.location.href = "boka-tillval.html";
        }
    });

}
recurringTravel();

const weeklyTrip = document.getElementById("weekly-trip");
const weekDays = document.querySelector(".weekdays");

if (weeklyTrip || weekDays) {
    weeklyTrip.addEventListener("change", () => {
        if (weeklyTrip.checked) {
            weekDays.classList.add("show");
        } else {
            weekDays.classList.remove("show");
        }
    })
}

document.getElementById("reset-btn").addEventListener("click", () => {
    const msgArea = document.getElementById("message");
    msgArea.value = '';
    msgArea.focus();
});







/* const selected = document.querySelector("input[name='recurring']:checked");

        if (!selected) {
            alert("Vänligen välj ett alternativ för återkommande resa.");
            return;
        }

        if (selected.value === "Ja") {
            window.location.href = "boka-kommande.html";
        } else {
            window.location.href = "boka-tillval.html";
        }
    });
}*/



/*
const timeButtons = document.querySelectorAll(".quick-time");

timeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        openButton.classList.toggle("selected");
        timeButtons.value = returnTime.innerHTML;
        const targetInputId = button.dataset.target; 
        const input = document.getElementById(targetInputId);
        input.value = button.dataset.time; 
    });
});

/*
        const pickupTime = document.getElementById("pickup-time");
        const timeBtns = document.querySelectorAll(".quicktime");

        timeBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                pickupTime.value = btn.dataset.time;
            });
        }); */