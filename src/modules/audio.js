/**
 * Audio handling and file management
 */

const AUDIO_EXT = ['mp3', 'wav', 'wave', 'aiff', 'aif', 'aifc', 'flac', 'ogg', 'oga', 'opus', 'm4a'];

export function setupAudioHandlers() {
  const au = document.getElementById('au');
  const filepick = document.getElementById('filepick');
  const multipick = document.getElementById('multipick');
  
  if (filepick) {
    filepick.addEventListener('change', (e) => handleAudioFiles(e.target.files, false));
  }
  
  if (multipick) {
    multipick.addEventListener('change', (e) => handleAudioFiles(e.target.files, true));
  }
}

function handleAudioFiles(files, multiple) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (isAudioFile(file)) {
      console.log('Audio file selected:', file.name);
      // Handle audio file
    }
  }
}

export function isAudioFile(f) {
  const ext = (f.name || '').split('.').pop().toLowerCase();
  return AUDIO_EXT.includes(ext) || (f.type && f.type.startsWith('audio/'));
}
