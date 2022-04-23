export function TTS(text: string) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.lang = 'en-US';
  synth.speak(utterance);
}