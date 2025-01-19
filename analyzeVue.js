const fs = require('fs');
const path = require('path');
const { parse } = require('@vue/compiler-sfc');

// Funkcija za parsiranje jednog .vue fajla
function parseVueFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { descriptor } = parse(fileContent);

    console.log('--- Analiza fajla:', filePath, '---');

    // Template deo
    if (descriptor.template) {
        console.log('🔹 Template:');
        console.log(descriptor.template.content);
    }

    // Script deo
    if (descriptor.script) {
        console.log('\n🔸 Script:');
        console.log(descriptor.script.content);
    }

    // Styles deo
    if (descriptor.styles.length > 0) {
        console.log('\n🔻 Styles:');
        descriptor.styles.forEach((style, index) => {
            console.log(`Style ${index + 1}:`);
            console.log(style.content);
        });
    }
    console.log('\n-------------------------\n');
}

// Funkcija za pretraživanje svih .vue fajlova u direktorijumu
function parseAllVueFiles(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);

        if (fs.statSync(fullPath).isDirectory()) {
            parseAllVueFiles(fullPath); // Rekurzivno pretraži podfoldere
        } else if (fullPath.endsWith('.vue')) {
            parseVueFile(fullPath);
        }
    }
}

// Pokreni analizu za 'src' folder
parseAllVueFiles('./front-end/src');
