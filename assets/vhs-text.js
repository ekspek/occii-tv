fetch("text_input.txt")
    .then(response => {
        if (!response.ok) {
            throw new Error('File not found');
        }
        return response.text(); // Read the response as text
    })
    .then(content => {
        fileContent = content;
        const lines = fileContent.split(/\r?\n/);

        const section = document.getElementById('vhs-text-section');

        section.innerHTML = '';  // Clears all content inside the section

        lines.forEach(text => {
            if (text) {
                const p = document.createElement('p');
                p.textContent = text;
                section.appendChild(p);
            }
            section.appendChild(document.createElement('br'));
        });
    })
    .catch(error => {
        console.error('Error fetching file:', error);
    });


