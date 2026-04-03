const MY_PASSWORD = "12345678";

function checkPassword() {
    const input = document.getElementById("site-password").value;
    const overlay = document.getElementById("password-overlay");
    const errorMsg = document.getElementById("error-msg");

    if (input === MY_PASSWORD) {
        overlay.style.opacity = "0";
        setTimeout(() => {
            overlay.style.display = "none";
        }, 500);
    } else {
        errorMsg.style.display = "block";
    }
}

// Enter bosilganda ham kirish uchun
document.getElementById("site-password")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkPassword();
});


let cart = []; // Savatdagi mahsulotlar massivi
let total = 0;

function addToCart(name, price) {
    // 1. Mahsulotni savatga qo'shish
    cart.push({ name, price });
    total += price;

    // 2. Navbardagi savat tugmasini yangilash
    document.getElementById('cart-btn').innerText = `Savat (${cart.length}) - $${total.toFixed(2)}`;

    // 3. Savat oynasini yangilash va ochish
    updateCartModal();
    toggleCart(); // Oynani avtomatik ochish
}

function updateCartModal() {
    const list = document.getElementById('cart-items-list');
    const modalTotal = document.getElementById('modal-total');

    list.innerHTML = ''; // Ro'yxatni tozalash

    cart.forEach((item, index) => {
        list.innerHTML += `
            <div class="cart-item-row">
                <span>${item.name}</span>
                <strong>$${item.price.toFixed(2)}</strong>
            </div>
        `;
    });

    modalTotal.innerText = `$${total.toFixed(2)}`;
}

// Oynani ochish/yopish funksiyasi
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
}

function checkout() {
    alert("Buyurtmangiz qabul qilindi! Umumiy summa: $" + total.toFixed(2));
    cart = [];
    total = 0;
    document.getElementById('cart-btn').innerText = `Savat (0) - $0.00`;
    toggleCart();
}
// Navbardagi tugmalarni topish
const navBtns = document.querySelectorAll('.nav-buttons .btn-primary');

// Kirish tugmasi (birinchi tugma)
navBtns[0].addEventListener('click', () => {
    document.getElementById('login-modal').style.display = 'block';
});

// Ro'yxatdan o'tish tugmasi (ikkinchi tugma)
navBtns[1].addEventListener('click', () => {
    document.getElementById('register-modal').style.display = 'block';
});

// Oynalarni yopish funksiyasi
function closeAuthModal(id) {
    document.getElementById(id + '-modal').style.display = 'none';
}

// Oynalar orasida almashish
function switchModal(to) {
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('register-modal').style.display = 'none';
    document.getElementById(to + '-modal').style.display = 'block';
}

// Ekran tashqarisiga bosganda yopish
window.onclick = function (event) {
    if (event.target.className === 'auth-modal') {
        event.target.style.display = "none";
    }
}
const startBtn = document.getElementById('start-ai');
const aiStatus = document.getElementById('ai-status');

// 1. Ovozni aniqlash (Speech Recognition)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'uz-UZ'; // O'zbek tilini tanlash

    startBtn.onclick = () => {
        recognition.start();
        aiStatus.innerText = "Sizni eshityapman...";
        startBtn.classList.add('listening');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        startBtn.classList.remove('listening');
        aiStatus.innerText = "AI javob bermoqda...";

        // AI javobini shakllantirish
        processAIResponse(transcript);
    };
}

// 2. AI mantiqi va Javob berish (Speech Synthesis)
function processAIResponse(message) {
    let responseText = "";

    if (message.includes("salom")) {
        responseText = "Salom! Men Food Express yordamchisiman. Sizga qanday taom topib beray?";
    } else if (message.includes("burger")) {
        responseText = "Bizda juda mazali Double Cheese Burgerlar bor. Savatga qo'shishni xohlaysizmi?";
    } else if (message.includes("rahmat")) {
        responseText = "Arziydi, sizga yoqimli ishtaha tilayman!";
    } else {
        responseText = "Sizni tushunmadim, lekin bizning taomlarimiz sizga yoqishi aniq!";
    }

    speak(responseText);
}

// 3. Ovozli o'qish funksiyasi
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU'; // O'zbek tili brauzerlarda kam, rus yoki ingliz ovozi ishlatiladi
    utterance.rate = 1; // Tezligi

    window.speechSynthesis.speak(utterance);
    aiStatus.innerText = "AI bilan gaplashish";
}
function processAIResponse(message) {
    let responseText = "";

    // Kalit so'zlarga qarab muloyim javoblar
    if (message.includes("salom") || message.includes("assalomu alaykum")) {
        responseText = "Assalomu alaykum! Xush kelibsiz, sizga nima yordam kerak?";
    }
    else if (message.includes("hop menga burger kerak") || message.includes("pitsa")) {
        responseText = "Albatta, bizning restaurantda hamma narsa bor sizga nima kerak?";
    }
    else if (message.includes("rahmat") || message.includes("sog' bo'l")) {
        responseText = "rahmat sizni yana bir bora bizning restaurantga kelishingizni tilab qolaman!";
    }
    else if (message.includes("ismin") || message.includes("kimsan")) {
        responseText = "Men Food Express saytining samimiy yordamchisiman. Sizning ko'nglingizni ko'tarish va mazali taom tanlashda ko'maklashish mening vazifamdir.";
    }
    else {
        responseText = "kechirasiz sizni chunmadim sizga nima yordam kerak.";
    }

    speak(responseText);
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);

    // Ovozni yanada mayinroq va yoqimliroq qilish sozlamalari:
    utterance.lang = 'ru-RU'; // O'zbek tili uchun eng yaqin va mayin ohang rus ovozlarida
    utterance.pitch = 1.2;    // Ovozni biroz ingichka va muloyim (ayol kishi ovoziga yaqin) qiladi
    utterance.rate = 0.9;     // Shoshilmasdan, xotirjam gapirishi uchun tezlikni biroz pasaytiramiz
    utterance.volume = 1;     // Ovoz balandligi

    window.speechSynthesis.speak(utterance);
    aiStatus.innerText = "AI bilan gaplashish";
}
// "Qanday ishlaydi?" tugmasini topamiz va unga hodisa biriktiramiz
// HTML dagi tugmangizda class="how-btn" yoki shunga o'xshash nom bo'lishi kerak
const howBtn = document.querySelector('.hero-content .btn-secondary') || document.querySelector('button:contains("Qanday ishlaydi?")');

if (howBtn) {
    howBtn.onclick = function (e) {
        e.preventDefault();
        document.getElementById('how-it-works-modal').style.display = 'block';
    }
}

function closeHowModal() {
    document.getElementById('how-it-works-modal').style.display = 'none';
}
// "Hozir buyurish" tugmasini topish va funksiya berish
const orderBtn = document.querySelector('.hero-content .btn-primary');

if (orderBtn) {
    orderBtn.onclick = function (e) {
        e.preventDefault();
        document.getElementById('order-modal').style.display = 'block';
    }
}

// Oynani yopish
function closeOrderModal() {
    document.getElementById('order-modal').style.display = 'none';
}

// Buyurtmani qayta ishlash
function handleQuickOrder(event) {
    event.preventDefault();

    const name = document.getElementById('order-name').value;

    // AI ovozli javob bersa yanada zo'r bo'ladi
    const successText = `Rahmat, ${name}! Buyurtmangiz qabul qilindi. Tez orada kuryerimiz siz bilan bog'lanadi.`;

    // Agar oldingi darsdagi speak funksiyasi bo'lsa, ishlatsa bo'ladi:
    if (typeof speak === "function") {
        speak(successText);
    }

    alert(successText);
    closeOrderModal();
}