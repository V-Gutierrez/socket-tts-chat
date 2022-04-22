
import { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { io } from "socket.io-client";

function App() {
  const {
    transcript,
    listening,
    resetTranscript,
    finalTranscript
  } = useSpeechRecognition();

  const socket = io();

  useEffect(() => {
    socket.emit('CHAT_MESSAGE', finalTranscript)
  }, [finalTranscript])


  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => SpeechRecognition.startListening()}>Start</button>
      <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <p>{finalTranscript}</p>
    </div>
  );
}

export default App;
