const section = document.getElementById('vhs-text-section');

section.innerHTML = '';  // Clears all content inside the section

const newParagraphs = [
    "TWO LINES",
    "TOGETHER",
    "",
    "ANOTHER BAND"
];

newParagraphs.forEach(text => {
    if (text) {
        const p = document.createElement('p');
        p.textContent = text;
        section.appendChild(p);
    }
    section.appendChild(document.createElement('br'));
});