import Channels from "src/components/channel/Channel";
import Friends from "src/components/channel/Friends";
import ChannelHeader from "src/components/channel/channel-header";
import UserSetting from "src/components/channel/user-settings";
import { useUrlQuery } from "src/components/hooks/use-url-query";
import { Separator } from "src/components/ui/separator";

function LeftSide() {
    const query = useUrlQuery();
    const serverId = query.get("server");
    if (!serverId) return null;

    return (
        <section className="w-60 min-w-60 h-full bg-[#112033] flex flex-col">
            <ChannelHeader />
            <Channels />
            <Separator className="my-4 bg-black" />
            <Friends className=" overflow-y-scroll" />
            <Separator className="my-4 bg-black" />
            <UserSetting />
        </section>
    );
}

export default LeftSide;
