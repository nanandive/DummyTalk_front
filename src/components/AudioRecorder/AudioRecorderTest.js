import { useMicVAD, utils } from "@ricky0123/vad-react";
import axios from "axios";
import { Activity, Mic } from "lucide-react";
import * as ort from "onnxruntime-web";
import { useState } from "react";
import { Button } from "../ui/button";
import "./AudioRecorder.css";
import { useSocket } from "../providers/sock-provider";
import { decodeJwt } from "src/lib/tokenUtils";
import { useUrlQuery } from "../hooks/use-url-query";

ort.env.wasm.wasmPaths = {
    "ort-wasm-simd-threaded.wasm": "/ort-wasm-simd-threaded.wasm",
    "ort-wasm-simd.wasm": "/ort-wasm-simd.wasm",
    "ort-wasm.wasm": "/ort-wasm.wasm",
    "ort-wasm-threaded.wasm": "/ort-wasm-threaded.wasm",
};

const AudioRecorderTest = () => {
    const [audioList, setAudioList] = useState([]);
    const { socket } = useSocket();
    const accessToken = localStorage.getItem("accessToken");
    const userInfo = decodeJwt(accessToken)
    const query = useUrlQuery()
    const channelId = query.get("channel")

    const vad = useMicVAD({
        workletURL: "/vad.worklet.bundle.min.js",
        modelURL: "/silero_vad.onnx",
        onVADMisfire: () => {
            console.log("Vad misfire");
        },
        onSpeechStart: () => {
            console.log("Speech start");
        },
        onSpeechEnd: (audio) => {
            console.log("Speech end");
            const wavBuffer = utils.encodeWAV(audio);

            console.log(wavBuffer);
            const formData = new FormData();
            formData.append("file", new Blob([wavBuffer]), "audio.wav");
            axios.post("http://localhost:9999/audio/upload", formData)
            .then((result) => {
                console.log(result, channelId);
                socket.send(
                    `/app/${channelId}/audio`,
                    JSON.stringify({
                        ...result?.data.chat,
                        sender: userInfo?.sub,
                        nickname: userInfo?.nickname,
                    })
                );
            });
            // const base64 = utils.arrayBufferToBase64(wavBuffer);
            // const url = `data:audio/wav;base64,${base64}`;
            // setAudioList((old) => [url, ...old]);
        },
        positiveSpeechThreshold: 0.55,
        negativeSpeechThreshold: 0.4,
        startOnLoad: false,
    });

    return (
        <ul>
            {audioList.map((audio) => {
                return (
                    <li>
                        <audio
                            controls
                            src={audio}
                        />
                    </li>
                );
            })}
            <Button
                variant="ghost"
                className={`w-[70px] h-[70px] bg-transparent border-2 border-[#8e44ad] rounded-full hover:scale-105 transition-transform ${
                    vad?.loading || !!vad?.errored ? "hidden" : "block"
                }`}
                onClick={() => vad.toggle()}
            >
                {!vad?.listening && (
                    <Mic className="text-[#8e44ad] w-full h-full font-bold" />
                )}
                {vad?.listening && (
                    <Activity className="text-[#8e44ad] w-full h-full font-bold" />
                )}
            </Button>
        </ul>
    );
};

export default AudioRecorderTest;
