const weddingDate = new Date('2026-07-10T17:00:00').getTime();
const numbers = document.querySelectorAll('.countdown-number');

function updateTimer() {
    const diff = weddingDate - Date.now();
    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = '<p style="font-size:2em;color:#D4C5A8;">Свадьба началась!</p>';
        return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const s = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
    numbers[0].textContent = d;
    numbers[1].textContent = h;
    numbers[2].textContent = m;
    numbers[3].textContent = s;
    requestAnimationFrame(updateTimer);
}

updateTimer();

const fadeElems = document.querySelectorAll('.fade-in');
function checkFade() {
    const triggerBottom = window.innerHeight * 0.9;
    fadeElems.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerBottom && !el.classList.contains('visible')) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('load', () => {
    setTimeout(checkFade, 100);
    checkFade();
});

window.addEventListener('scroll', () => {
    requestAnimationFrame(checkFade);
});

window.addEventListener('resize', checkFade);

const modal = document.getElementById('modal');
document.getElementById('openModal').onclick = () => modal.style.display = 'block';
document.querySelector('.close').onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

document.getElementById('rsvpForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const email = document.getElementById('email').value || 'не указан';
    const message = document.getElementById('message').value || 'без сообщения';
    const text = `*Новое подтверждение!*\n\n*Имя:* ${name}\n*Присутствие:* ${attendance}\n*Email:* ${email}\n*Сообщение:* ${message}`;
    const BOT_TOKEN = '8479080360:AAFIoT2sNkbfWKRChBqGlQ2MQW4emkuyRnA';
    const CHAT_ID = '452090422';
    try {
        const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' })
        });
        if (res.ok) {
            alert('Спасибо! Уведомление отправлено.');
            modal.style.display = 'none';
            e.target.reset();
        }
    } catch (err) {
        alert('Ошибка. Проверьте токен и интернет.');
    }
});

ymaps.ready(() => {
    const map = new ymaps.Map("map", {
        center: [56.4307, 40.4444],
        zoom: 16
    });
    map.geoObjects.add(new ymaps.Placemark([56.4307, 40.4444], {
        balloonContent: '<strong>Арт-отель "Николаевский Посад"</strong><br>г. Суздаль'
    }, { preset: 'islands#brownDotIcon' }));
});
