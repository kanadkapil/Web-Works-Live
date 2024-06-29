function updateDigitalClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('digitalClock').innerText = timeString;
}

function updateAnalogClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hoursDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;
    const minutesDegrees = (minutes / 60) * 360;
    const secondsDegrees = (seconds / 60) * 360;

    document.getElementById('hourHand').style.transform = `rotate(${hoursDegrees}deg)`;
    document.getElementById('minuteHand').style.transform = `rotate(${minutesDegrees}deg)`;
    document.getElementById('secondHand').style.transform = `rotate(${secondsDegrees}deg)`;
}

function updateClocks() {
    updateDigitalClock();
    updateAnalogClock();
}

setInterval(updateClocks, 1000);
updateClocks();
