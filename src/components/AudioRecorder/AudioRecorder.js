import axios from "axios";
import { Activity, Mic } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import "./AudioRecorder.css";

const AudioRecorder = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const [disabled, setDisabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    setDisabled(true);

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        if (e.playbackTime > 180) {
          stopRecording();
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 소켓
  const sendAudioMessage = (formData) => {
    axios.post("YOUR_SERVER_AUDIO_ENDPOINT", formData)
      .then(response => {
        console.log("Audio upload successful:", response);
        setAudioUrl(response.data.audioUrl); // 예시로 추가한 부분
      })
      .catch(error => {
        console.error("Error uploading audio:", error);
      });
  };

  console.log(audioUrl);
  const stopRecording = () => {
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();

    analyser.disconnect();
    source.disconnect();

    if (audioUrl) {
      URL.createObjectURL(audioUrl);
    }

    const sound = new File([audioUrl], "soundBlob", {
      lastModified: new Date().getTime(),
      type: "audio",
    });

    setDisabled(false);
    console.log(sound);
  };

  const play = () => {
    const audio = new Audio(URL.createObjectURL(audioUrl));
    audio.loop = false;
    audio.volume = 1;
    audio.play();
  };

  const download = () => {
    const blob = new Blob([audioUrl], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "recordedAudio.wav";
    a.click();
    window.URL.revokeObjectURL(url);
  };

      // <button className={`record_btn ${isRecording ? 'recording' : ''}`} onClick={onRec ? startRecording : stopRecording}>
      //   {onRec ? "" : ""} {/* 버튼 텍스트 수정 */}
      // </button>
  return (
    <>
      <Button variant="ghost" className='w-[70px] h-[70px] bg-transparent border-2 border-[#8e44ad] rounded-full hover:scale-105 transition-transform' onClick={onRec ? startRecording : stopRecording}>
        {onRec && <Mic className="text-[#8e44ad] w-full h-full font-bold " />}
        {!onRec && <Activity className="text-[#8e44ad] w-full h-full font-bold" />}
      </Button>
      <button onClick={play} className={`${disabled ? "hidden" : "block"}`}>
        Play
      </button>
      <button onClick={download} className={`${disabled ? "hidden" : "block"}`}>
        Download
      </button>
    </>
  );
};

export default AudioRecorder;