const MY_PASSWORD = "ibrohim";

function checkPassword() {
    const input = document.getElementById("site-password").value;
    const overlay = document.getElementById("password-overlay");
    if (input === MY_PASSWORD) {
        overlay.style.opacity = "0";
        setTimeout(() => overlay.style.display = "none", 500);
    } else {
        alert("Xato parol!");
    }
}

var userName = prompt("ismingiz nima?");


console.log(`Salom mening ismim ${userName}`);
