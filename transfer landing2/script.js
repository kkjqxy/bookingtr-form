const form = document.getElementById('booking-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value.trim();
    const note = document.getElementById('note').value.trim();


    if (!name || !phone || !date) {
        alert('Please fill in all required fields.');
        return;
    }

    const booking = {name, phone, date, note};
    localStorage.setItem('bookingDate', JSON.stringify(booking));

    const chatId = '607061237';

const message = `
🔔 Новая заявка!
👤 Имя: ${name}
📞 Телефон: ${phone}
📅 Дата: ${date}
📝 Комментарий: ${note || '-'}
`;

fetch(`https://script.google.com/macros/s/AKfycbwNtZILNwkaFrjjgV6dOUq-7lEnqqcSpm6utPtvMxfv65eneaDYsQapyEuufbR-fgX-DQ/exec`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        chat_id: chatId,
        text: message
    })
})
.then(res => res.json())
.then(data => {
    console.log('Успешно отправлено в Telegram:', data);
})
.catch(err => {
    console.error('Ошибка при отправке в Telegram:', err);
});




    showConfirmation(booking);
    form.reset();
})



const savedBooking = localStorage.getItem('bookingDate');
if (savedBooking) {
    const booking = JSON.parse(savedBooking);
    showConfirmation(booking);
} 
function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
}
function showConfirmation(booking) {
    const confirmation = document.getElementById('confirmation');
    confirmation.innerHTML = ` 
    <h3>Thank you for your request!</h3>
    <p><strong>Name:</strong> ${booking.name}</p>
    <p><strong>Phone:</strong> ${booking.phone}</p>
    <p><strong>Date:</strong> ${formatDate(booking.date)}</p>
    <p><strong>Comment:</strong> ${booking.note || '-'}</p>
    `;

    confirmation.style.border = '2px solid #0077cc';
    confirmation.style.padding = '15px';
    confirmation.style.marginTop = '20px';
    confirmation.style.borderRadius = '8px';
    confirmation.style.backgroundColor = '#e6f3ff';
}

