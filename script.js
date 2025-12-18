"use strict";

const navbar = document.getElementById("navbar");

const openButton = document.getElementById("open-sidebarbutton");

const closeButton = document.getElementById("close-sidebarbutton");

const overlay = document.getElementById("overlay");

const mobileQuery = window.matchMedia("(max-width: 900px)"); // Matchar om skärmen är mindre än 876px, alltså mobilläge

mobileQuery.addEventListener("change", (e) => updateNavbar(e)); // Lyssnar efter ändringar i skärmstorlek

function updateNavbar(e) {
    const trueMobile = e.matches; // Stämmer om besökaren är i mobilläge
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

const navigateLinks = document.querySelectorAll('nav a'); // Alla länkar i sidomenyn
navigateLinks.forEach(link => { // Stänger sidomenyn när en länk i menyn klickas
    link.addEventListener("click", () => {
        if (mobileQuery.matches) {
            closeSidebar(); // Stänger sidomenyn i mobilläge när en länk klickas, denna fungerar ändå eftersom man klickar på en länk så navigeras man till den sidan.
        }
    });
});