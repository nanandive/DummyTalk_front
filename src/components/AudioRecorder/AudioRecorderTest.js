import { useMicVAD, utils } from "@ricky0123/vad-react";
import axios from "axios";
import { Activity, Mic } from "lucide-react";
import * as ort from "onnxruntime-web";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQueueState } from "rooks";
import { decodeJwt } from "src/lib/tokenUtils";
import { Button } from "../ui/button";
import "./AudioRecorder.css";

ort.env.wasm.wasmPaths = {
    "ort-wasm-simd-threaded.wasm": "/ort-wasm-simd-threaded.wasm",
    "ort-wasm-simd.wasm": "/ort-wasm-simd.wasm",
    "ort-wasm.wasm": "/ort-wasm.wasm",
    "ort-wasm-threaded.wasm": "/ort-wasm-threaded.wasm",
};

const AudioRecorderTest = ({ stream }) => {
    const [list, { enqueue, dequeue }] = useQueueState([]);
    const [isFirstEnqueue, setIsFirstEnqueue] = useState(false)
    const translatedAudioRef = useRef();
    const accessToken = localStorage.getItem("accessToken");
    const userInfo = useMemo(() => decodeJwt(accessToken), [accessToken]);

    const endedHandler = (e) => {
        if (list.length > 0) {
            const wavBuffer = dequeue();
            sendAudioToServer(wavBuffer);
        }
    };
    
    const sendAudioToServer = (wavBuffer) => {
        const formData = new FormData();
        formData.append("file", new Blob([wavBuffer]), "audio.wav");
        const apiUrl = `${process.env.REACT_APP_FASTAPI_URL}/api/v1/audio/audio/${userInfo?.national_language}`;
        const axiosConfig = {
            url: apiUrl,
            method: "POST",
            responseType: "blob",
            data: formData,
        };
    
        axios(axiosConfig).then((response) => {
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob)
            translatedAudioRef.current.src = url;
        });
    };

    const vad = useMicVAD({
        workletURL: "/vad.worklet.bundle.min.js",
        modelURL: "/silero_vad.onnx",
        positiveSpeechThreshold: 0.5,
        negativeSpeechThreshold: 0.35,
        startOnLoad: false,
        stream: stream,
        onVADMisfire: () => {
            console.log("Vad misfire");
        },
        onSpeechStart: () => {
            console.log("Speech start");
        },
        onSpeechEnd: (audio) => {
            console.log("Speech end");
            const wavBuffer = utils.encodeWAV(audio);
            enqueue(wavBuffer);

            if (list.length === 0) {
                setIsFirstEnqueue(true)
            }
            // const base64 = utils.arrayBufferToBase64(wavBuffer);
            // const url = `data:audio/wav;base64,${base64}`;
            // setAudioList((old) => [url, ...old]);
        },
    });

    useEffect(() => {
        if (list.length > 0 && isFirstEnqueue) {
            const wavBuffer = dequeue();
            sendAudioToServer(wavBuffer);
            setIsFirstEnqueue(false)
        }
    }, [list]); // 큐(list)의 변경을 감지합니다.

    return (
        <>
            <audio
                autoPlay
                playsInline
                ref={translatedAudioRef}
                onEnded={endedHandler}
                hidden
            />
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
        </>
    );
};

export default AudioRecorderTest;
