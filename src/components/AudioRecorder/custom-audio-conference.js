import {
	AudioTrack,
	ControlBar,
	LayoutContextProvider,
	useTracks
} from "@livekit/components-react";
import { RemoteTrackPublication, Track } from "livekit-client";
import { useEffect } from "react";
import AudioRecorderTest from "./AudioRecorderTest";

const CustomAudioConference = ({ ...props }) => {
  const tracks = useTracks(
    [
      Track.Source.Microphone,
      Track.Source.ScreenShareAudio,
      Track.Source.Unknown,
    ],
    {
      updateOnlyOn: [],
      onlySubscribed: false,
    }
  ).filter((ref) => {
    console.log(ref.participant.isLocal);
    return (
      !ref.participant.isLocal && ref.publication.kind === Track.Kind.Audio
    );
  });

  useEffect(() => {
    for (const track of tracks) {
      if (track.publication instanceof RemoteTrackPublication)
        track.publication.setSubscribed(true);
    }
  }, [tracks]);

  // TODO: Layout 수정
  return (
    <LayoutContextProvider>
      <div className="lk-audio-conference" {...props}>
        <div className="lk-audio-conference-stage">
          {tracks?.map((trackRef) => (
            <>
              <AudioTrack trackRef={trackRef} />
              <AudioRecorderTest stream={trackRef.publication.track?.mediaStream} />
            </>
          ))}
        </div>
        <ControlBar
          controls={{
            microphone: true,
            screenShare: false,
            camera: false,
            chat: false,
            leave: false,
          }}
        />
      </div>
    </LayoutContextProvider>
  );
};

export default CustomAudioConference;
