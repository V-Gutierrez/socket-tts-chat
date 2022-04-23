export function TTS(text: string) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.lang = 'pt-BR';
  synth.speak(utterance);
}