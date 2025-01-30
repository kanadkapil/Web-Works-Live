function calculateAge() {
    const d1 = parseInt(document.getElementById("date").value);
    const m1 = parseInt(document.getElementById("month").value);
    const y1 = parseInt(document.getElementById("year").value);

    const today = new Date();
    let d2 = today.getDate();
    let m2 = today.getMonth() + 1; // Months are 0-based
    let y2 = today.getFullYear();

    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (d1 > d2) {
        d2 += monthDays[m2 - 1];
        m2 -= 1;
    }

    if (m1 > m2) {
        m2 += 12;
        y2 -= 1;
    }

    const d = d2 - d1;
    const m = m2 - m1;
    const y = y2 - y1;

    if (y1 > y2 || (y1 === y2 && m1 > m2) || (y1 === y2 && m1 === m2 && d1 > d2)) {
        document.getElementById("age").textContent = "Invalid date. Please enter a valid date.";
    } else {
        document.getElementById("age").textContent = `Your Age: ${y} years, ${m} months, and ${d} days.`;
    }
}
