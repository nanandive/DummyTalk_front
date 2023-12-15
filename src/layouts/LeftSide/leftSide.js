
import Channels from "./Channl";
import Friends from "./Friends";
import Settings from "./Settings";
import {useUrlQuery} from "src/components/hooks/use-url-query"

function LeftSide() {
    const query = useUrlQuery();
    const serverId =  query.get('server')
    if (!serverId) return null;

    return(
    <>
        <Channels />
        <hr></hr>
        <Friends />
        <hr></hr>
        <Settings />
    
    </>
    );
};

export default LeftSide;