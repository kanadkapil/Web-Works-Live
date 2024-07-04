// document.addEventListener('DOMContentLoaded', () => {
//     const keys = document.querySelectorAll('.key');
//     keys.forEach(key => {
//         key.addEventListener('click', () => playSound(key));
//     });
// });

// function playSound(key) {
//     const note = key.getAttribute('data-key');
//     const audio = new Audio(`./sounds/${note}.mp3`);
//     audio.play();
// }

document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.key');
  
    keys.forEach(key => {
      key.addEventListener('click', () => {
        const note = key.getAttribute('data-key');
        const octave = getOctave(note); // This function is explained below
        const audio = new Audio(`./sounds/${note}${octave}.mp3`);
        audio.play();
      });
    });
  });
  
  function getOctave(note) {
    // This function determines the octave based on the first letter of the note
    switch (note[0]) {
      case 'C':
      case 'D':
      case 'E':
      case 'F':
      case 'G':
      case 'A':
      case 'B':
        return 4; // Default octave is C4
      default:
        return null; // Handle invalid notes
    }
  }
  