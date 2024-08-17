// Emoji encoding/decoding mappings
const emojiMapping = {
    'a': '😀',
    'b': '😁',
    'c': '😂',
    'd': '🤣',
    'e': '😊',
    'f': '😎',
    'g': '😍',
    'h': '🥰',
    'i': '😘',
    'j': '😗',
    'k': '😙',
    'l': '😚',
    'm': '🤗',
    'n': '🤩',
    'o': '😛',
    'p': '😜',
    'q': '😝',
    'r': '😈',
    's': '😶',
    't': '🤔',
    'u': '🤐',
    'v': '🤢',
    'w': '🤤',
    'x': '🤧',
    'y': '😇',
    'z': '🤠',
    ' ': '⛅', // Space mapped to a cloud emoji for visibility
    '.': '🏁'
};

// Create reverse mapping from emojis to characters
const reverseEmojiMapping = Object.fromEntries(
    Object.entries(emojiMapping).map(([char, emoji]) => [emoji, char])
);

document.getElementById('encodeButton').addEventListener('click', () => {
    const text = document.getElementById('textInput').value.toLowerCase();
    const encodedText = text.split('').map(char => emojiMapping[char] || char).join('');
    document.getElementById('encodedText').textContent = encodedText;
});

document.getElementById('decodeButton').addEventListener('click', () => {
    const emojis = document.getElementById('emojiInput').value;
    let decodedText = '';
    
    // Split input into individual characters
    for (let char of emojis) {
        // Decode each emoji or keep it unchanged if not in reverse mapping
        decodedText += reverseEmojiMapping[char] || char;
    }
    
    document.getElementById('decodedText').textContent = decodedText;
});
