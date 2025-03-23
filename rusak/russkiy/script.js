document.addEventListener('DOMContentLoaded', function() {
    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to current button and content
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Show/hide Caesar shift input based on selected method
    const encryptionMethod = document.getElementById('encryption-method');
    const decryptionMethod = document.getElementById('decryption-method');
    const caesarShiftContainer = document.getElementById('caesar-shift-container');
    const caesarDecryptShiftContainer = document.getElementById('caesar-decrypt-shift-container');

    function toggleCaesarShift() {
        if (encryptionMethod.value === 'caesar') {
            caesarShiftContainer.style.display = 'block';
        } else {
            caesarShiftContainer.style.display = 'none';
        }
    }

    function toggleDecryptCaesarShift() {
        if (decryptionMethod.value === 'caesar') {
            caesarDecryptShiftContainer.style.display = 'block';
        } else {
            caesarDecryptShiftContainer.style.display = 'none';
        }
    }

    encryptionMethod.addEventListener('change', toggleCaesarShift);
    decryptionMethod.addEventListener('change', toggleDecryptCaesarShift);

    // Initialize visibility
    toggleCaesarShift();
    toggleDecryptCaesarShift();

    // Russian alphabet constants
    const RUSSIAN_ALPHABET = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    const RUSSIAN_VOWELS = 'аеёиоуыэюя';
    const RUSSIAN_CONSONANTS = 'бвгджзйклмнпрстфхцчшщ';

    // Encryption button click handler
    document.getElementById('encrypt-btn').addEventListener('click', function() {
        const inputText = document.getElementById('input-text').value;
        const method = encryptionMethod.value;
        let result = '';

        switch (method) {
            case 'caesar':
                const shift = parseInt(document.getElementById('caesar-shift').value);
                result = caesarCipher(inputText, shift);
                break;
            case 'reverse':
                result = reverseText(inputText);
                break;
            case 'vowel-replace':
                result = vowelReplace(inputText);
                break;
            case 'consonant-replace':
                result = consonantReplace(inputText);
                break;
        }

        document.getElementById('result-text').value = result;
    });

    // Decryption button click handler
    document.getElementById('decrypt-btn').addEventListener('click', function() {
        const inputText = document.getElementById('input-decrypt-text').value;
        const method = decryptionMethod.value;
        let result = '';

        switch (method) {
            case 'caesar':
                const shift = parseInt(document.getElementById('caesar-decrypt-shift').value);
                result = caesarCipher(inputText, -shift); // Negative shift for decryption
                break;
            case 'reverse':
                result = reverseText(inputText); // Same operation for encrypt/decrypt
                break;
            case 'vowel-replace':
                result = vowelDecrypt(inputText);
                break;
            case 'consonant-replace':
                result = consonantDecrypt(inputText);
                break;
        }

        document.getElementById('result-decrypt-text').value = result;
    });

    // Copy buttons functionality
    document.getElementById('copy-btn').addEventListener('click', function() {
        copyToClipboard(document.getElementById('result-text'));
    });

    document.getElementById('copy-decrypt-btn').addEventListener('click', function() {
        copyToClipboard(document.getElementById('result-decrypt-text'));
    });

    function copyToClipboard(textareaElement) {
        textareaElement.select();
        document.execCommand('copy');
        
        // Visual feedback for copying
        const originalColor = textareaElement.style.backgroundColor;
        textareaElement.style.backgroundColor = '#d4edda';
        setTimeout(() => {
            textareaElement.style.backgroundColor = originalColor;
        }, 500);
    }

    // Encryption functions
    function caesarCipher(text, shift) {
        return text.split('').map(char => {
            // Handle uppercase separately
            const isUpperCase = char === char.toUpperCase();
            const lowerChar = char.toLowerCase();
            
            // Find index in Russian alphabet
            const index = RUSSIAN_ALPHABET.indexOf(lowerChar);
            
            // If character is not in Russian alphabet, keep it unchanged
            if (index === -1) return char;
            
            // Calculate new position with wrapping
            const alphabetLength = RUSSIAN_ALPHABET.length;
            const newIndex = ((index + shift) % alphabetLength + alphabetLength) % alphabetLength;
            
            // Return new character with original case
            const newChar = RUSSIAN_ALPHABET[newIndex];
            return isUpperCase ? newChar.toUpperCase() : newChar;
        }).join('');
    }

    function reverseText(text) {
        return text.split('').reverse().join('');
    }

    function vowelReplace(text) {
        return text.split('').map(char => {
            // Handle uppercase separately
            const isUpperCase = char === char.toUpperCase();
            const lowerChar = char.toLowerCase();
            
            // If it's a vowel, replace it
            if (RUSSIAN_VOWELS.includes(lowerChar)) {
                const index = RUSSIAN_VOWELS.indexOf(lowerChar);
                // Shift vowel by 3 positions (with wrap-around)
                const newIndex = (index + 3) % RUSSIAN_VOWELS.length;
                const newChar = RUSSIAN_VOWELS[newIndex];
                return isUpperCase ? newChar.toUpperCase() : newChar;
            }
            
            return char;
        }).join('');
    }

    function consonantReplace(text) {
        return text.split('').map(char => {
            // Handle uppercase separately
            const isUpperCase = char === char.toUpperCase();
            const lowerChar = char.toLowerCase();
            
            // If it's a consonant, replace it
            if (RUSSIAN_CONSONANTS.includes(lowerChar)) {
                const index = RUSSIAN_CONSONANTS.indexOf(lowerChar);
                // Shift consonant by 5 positions (with wrap-around)
                const newIndex = (index + 5) % RUSSIAN_CONSONANTS.length;
                const newChar = RUSSIAN_CONSONANTS[newIndex];
                return isUpperCase ? newChar.toUpperCase() : newChar;
            }
            
            return char;
        }).join('');
    }

    // Decryption functions (inverse operations)
    function vowelDecrypt(text) {
        return text.split('').map(char => {
            // Handle uppercase separately
            const isUpperCase = char === char.toUpperCase();
            const lowerChar = char.toLowerCase();
            
            // If it's a vowel, replace it
            if (RUSSIAN_VOWELS.includes(lowerChar)) {
                const index = RUSSIAN_VOWELS.indexOf(lowerChar);
                // Shift vowel by -3 positions (with wrap-around)
                const newIndex = (index - 3 + RUSSIAN_VOWELS.length) % RUSSIAN_VOWELS.length;
                const newChar = RUSSIAN_VOWELS[newIndex];
                return isUpperCase ? newChar.toUpperCase() : newChar;
            }
            
            return char;
        }).join('');
    }

    function consonantDecrypt(text) {
        return text.split('').map(char => {
            // Handle uppercase separately
            const isUpperCase = char === char.toUpperCase();
            const lowerChar = char.toLowerCase();
            
            // If it's a consonant, replace it
            if (RUSSIAN_CONSONANTS.includes(lowerChar)) {
                const index = RUSSIAN_CONSONANTS.indexOf(lowerChar);
                // Shift consonant by -5 positions (with wrap-around)
                const newIndex = (index - 5 + RUSSIAN_CONSONANTS.length) % RUSSIAN_CONSONANTS.length;
                const newChar = RUSSIAN_CONSONANTS[newIndex];
                return isUpperCase ? newChar.toUpperCase() : newChar;
            }
            
            return char;
        }).join('');
    }
});
