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
    'A': '🅰️',
    'B': '🅱️',
    'C': '🌜',
    'D': '🌛',
    'E': '🎗️',
    'F': '🎏',
    'G': '🌀',
    'H': '♓',
    'I': '🎐',
    'J': '🎷',
    'K': '🎋',
    'L': '🛴',
    'M': '♏',
    'N': '🎶',
    'O': '⚽',
    'P': '🅿️',
    'Q': '🍳',
    'R': '🎲',
    'S': '⚡',
    'T': '🌴',
    'U': '☂️',
    'V': '✌️',
    'W': '〰️',
    'X': '❌',
    'Y': '🍸',
    'Z': '⚡',
    ' ': '⛅', // Space mapped to a cloud emoji for visibility
    '.': '🏁'
};

// Create reverse mapping from emojis to characters
const reverseEmojiMapping = Object.fromEntries(
    Object.entries(emojiMapping).map(([char, emoji]) => [emoji, char])
);

document.getElementById('encodeButton').addEventListener('click', () => {
    const text = document.getElementById('textInput').value;
    const encodedText = text.split('').map(char => emojiMapping[char] || char).join('');
    document.getElementById('encodedText').textContent = encodedText;
});

document.getElementById('decodeButton').addEventListener('click', () => {
    const emojis = document.getElementById('emojiInput').value;
    let decodedText = '';
    let currentEmoji = '';

    // Iterate through each character in the input
    for (let char of emojis) {
        currentEmoji += char;  // Add character to current emoji

        // Check if currentEmoji matches any emoji in reverse mapping
        if (reverseEmojiMapping[currentEmoji]) {
            decodedText += reverseEmojiMapping[currentEmoji];
            currentEmoji = '';  // Reset currentEmoji after decoding
        } else if (char.match(/[^\uD800-\uDBFF][^\uDC00-\uDFFF]/)) {
            // Handle non-emoji characters immediately
            decodedText += char;
            currentEmoji = '';  // Reset currentEmoji
        }
    }
    
    document.getElementById('decodedText').textContent = decodedText;
});
