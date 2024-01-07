import {
    LiveKitRoom,
    AudioConference 
} from "@livekit/components-react";
import "@livekit/components-styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { decodeJwt } from "src/lib/tokenUtils";
import { useUrlQuery } from "../hooks/use-url-query";

const LiveKit = () => {
    const serverUrl = "wss://dummytalk-9099k81s.livekit.cloud";
    const [token, setToken] = useState(null);
    const query = useUrlQuery();
    const channelId = query.get("channel");
    const accessToken = localStorage.getItem("accessToken");
    const userInfo = decodeJwt(accessToken);

    useEffect(() => {
        (async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/livekit/getTokens?room=${channelId}&userId=${userInfo?.sub}`
            );

            console.log(response);

            setToken(response.data);
        })();
    }, [channelId, userInfo?.sub]);

    if (!token) {
        return <div>Loading...</div>;
    }

    return (
        <LiveKitRoom
            video={false}
            audio={true}
            token={token}
            serverUrl={serverUrl}
            connect={true}
            // Use the default LiveKit theme for nice styles.
            ondis
            data-lk-theme="default"
            style={{ height: "100vh" }}
        >
            <AudioConference  />
        </LiveKitRoom>
    );
};

export default LiveKit;
