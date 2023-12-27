import { Switch } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import AudioRecorderTest from "../AudioRecorder/AudioRecorderTest";
import { useSocket } from "../hooks/use-socket";
import { useUrlQuery } from "../hooks/use-url-query";
import { Label } from "../ui/label";

const ChatVoiceInputTest = ({ userInfo }) => {
  const partnerAudio = useRef();
  const otherUser = useRef();
  const [otherUserStream, setOtherUserStream] = useState(null);
  const userStream = useRef();
  const peerRef = useRef();
  const [enabled, setEnabled] = useState(false);
  const { socket, isConnected } = useSocket();

  const query = useUrlQuery();
  const channelId = query.get("channel");
  const [peerConnect, setPeerConnect] = useState(null);

  const sendMessage = (payload) => {
    socket.send(`/app/${channelId}/audio`, JSON.stringify(payload));
  };

  const callUser = (sessionId) => {
    peerRef.current = createPeer(sessionId);
    userStream.current
      .getTracks()
      .forEach((track) => peerRef.current.addTrack(track, userStream.current));
  };

  const createPeer = (sessionId) => {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun4.l.google.com",
        },
        {
          urls: "turns:freeturn.net:5349",
          credential: "free",
          username: "free",
        },
      ],
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(sessionId);

    setPeerConnect(peer);
    return peer;
  };

  const handleNegotiationNeededEvent = (sessionId) => {
    peerRef.current
      .createOffer()
      .then((offer) => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          type: "offer",
          dest: sessionId,
          source: socket.id,
          channelId,
          data: {
            sdp: peerRef.current.localDescription,
          },
        };
        sendMessage(payload);
      })
      .catch((e) => console.log(e));
  };

  const handleReceiveCall = (incoming) => {
    peerRef.current = createPeer(incoming.dest);
    const desc = new RTCSessionDescription(incoming.data.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current
          .getTracks()
          .forEach((track) =>
            peerRef.current.addTrack(track, userStream.current)
          );
      })
      .then(() => {
        return peerRef.current.createAnswer();
      })
      .then((answer) => {
        return peerRef.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          type: "answer",
          dest: incoming.source,
          source: socket.id,
          channelId,
          data: {
            sdp: peerRef.current.localDescription,
          },
        };
        sendMessage(payload);
      });
  };

  const handleAnswer = (message) => {
    const desc = new RTCSessionDescription(message.data.sdp);
    peerRef.current.setRemoteDescription(desc).catch((e) => console.log(e));
  };

  const handleICECandidateEvent = (e) => {
    if (e.candidate) {
      const payload = {
        type: "ice-candidate",
        dest: otherUser.current,
        source: socket.id,
        channelId,
        data: {
          candidate: e.candidate,
        },
      };
      sendMessage(payload);
    }
  };

  const handleNewIceCandidate = (incoming) => {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.current.addIceCandidate(candidate).catch((e) => console.log(e));
  };

  const handleTrackEvent = (e) => {
    console.log(e.streams[0]);
    partnerAudio.current.srcObject = e.streams[0];
    setOtherUserStream(e.streams[0]);
  };

  useEffect(() => {
    // 미디어 스트림 처리 함수
    const handleMediaStream = (stream) => {
      userStream.current = stream;
      socket.send(
        `/app/${channelId}/audio`,
        JSON.stringify({
          type: "join-room",
          source: socket.id,
          channelId,
        })
      );
    };

    // 에러 처리 함수
    const handleError = (err) => {
      console.error("미디어 스트림을 가져오는 데 실패했습니다:", err);
    };

    // 미디어 스트림 요청 함수
    const requestMediaStream = () => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(handleMediaStream)
        .catch(handleError);
    };

    if (!isConnected) return;

    requestMediaStream();

    // 장치 변경 감지
    navigator.mediaDevices.ondevicechange = () => {
      console.log("오디오 장치가 변경되었습니다.");
      requestMediaStream(); // 장치 변경 시 미디어 스트림을 다시 요청
    };

    const subscription = socket.subscribe(
      `/topic/audio/${channelId}`,
      function (msg) {
        var message = JSON.parse(msg.body);

        if (!message.dest || socket.id === message.dest) return;

        if (message.type === "other-user") {
          callUser(message.dest);
          otherUser.current = message.dest;
        } else if (message.type === "user-joined") {
          otherUser.current = message.dest;

          const welcomePayload = {
            type: "welcome",
            dest: otherUser.current,
            source: socket.id,
            channelId,
            data: {
              message: "채팅에 참여하신 것을 환영합니다!",
            },
          };

          sendMessage(welcomePayload);
        } else if (message.type === "offer") {
          handleReceiveCall(message);
        } else if (message.type === "answer") {
          handleAnswer(message);
        } else if (message.type === "ice-candidate") {
          handleNewIceCandidate(message.data.candidate);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
      if (peerConnect) {
        peerConnect.close();
        setPeerConnect(null);
      }
      navigator.mediaDevices.ondevicechange = null; // 장치 변경 감지 해제
    };
  }, [channelId, socket]);

  return (
    <div className="flex flex-col h-1/4 relative overflow-hidden px-5 py-2 rounded-lg">
      {/* 채팅 번역 스위치 */}
      <div className="flex flex-row-reverse pb-2">
        <Label
          htmlFor="airplane-mode"
          className="font-bold text-2 self-center "
        >
          음성번역
        </Label>
        <Switch
          id={"airplane-mode"}
          checked={enabled}
          onClick={() => {
            console.log(!enabled);
            setEnabled((prev) => !prev);
          }}
          className={`${
            enabled ? "bg-yellow-400 mr-1" : "bg-gray-400 mr-1"
          } relative inline-flex h-[25px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${
              enabled ? "translate-x-6" : "translate-x-0"
            } pointer-events-none inline-block h-[21px] w-[21px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        {otherUserStream && <AudioRecorderTest stream={otherUserStream} />}
      </div>
      {/* 메시지 입력란 */}
      {/* <Textarea
                className="w-full h-full resize-none top-3 outline outline-zinc-300"
                maxLength="150"
                onKeyDown={enter_event}
                ref={sendMessageRef}
                placeholder="메시지를 입력하세요."
            /> */}
      <div className="absolute right-[5%] bottom-[10%] ">
        {/* 사진 전송 버튼 */}
        {/* <Button
                    className="absolute right-[95%] bottom-[-20%] "
                    onClick={() => onOpen("imageSend", { channelId })}
                >
                    <ImagePlus />
                </Button> */}
        {/* 메시지 전송 버튼 */}
        {/* <Button
                    className="h-8 bg-sky-600 text-white"
                    onClick={sendChatMessage}
                >
                    Send
                </Button> */}
      </div>
      <audio autoPlay playsInline ref={partnerAudio} hidden />
    </div>
  );
};
export default ChatVoiceInputTest;
