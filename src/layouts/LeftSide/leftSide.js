import { useUrlQuery } from "src/components/hooks/use-url-query";
import { Separator } from "src/components/ui/separator";
import Channels from "./Channl";
import Friends from "./Friends";
import Settings from "./Settings";

function LeftSide() {
    const query = useUrlQuery();
    const serverId = query.get("server");
    if (!serverId) return null;

    return (
        <>
            <Channels />
            <Separator className="my-4 bg-black" />
            <Friends className=" overflow-y-scroll" />
            <Separator className="my-4 bg-black" />
            <Settings className=" overflow-y-scroll" />
        </>
    );
}

export default LeftSide;
