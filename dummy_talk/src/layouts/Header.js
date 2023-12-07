import { Plus } from "lucide-react";
import { Button } from "src/components/ui/button";
import { UserAvatar } from "src/components/user-avatar";

function Header() {
    const imageUrl = "./test.png";
    const name = "Test User"

    return (
        <header className="text-md font-semibold px-3 flex items-center h-[60px] bg-[#E7DAB8]">
            <div className="w-[200px]">
                <img
                    className="h-full w-[150px] flex items-center"
                    src="./logo.svg"
                    alt=""
                ></img>
            </div>
            <Button
                className="bg-yellow-600"
                size="icon"
            >
                <Plus />
            </Button>
            <UserAvatar
                src={imageUrl}
                className="h-8 w-8 md:h-8 md:w-8 mr-2 ml-auto"
            />
            <p className="font-semibold text-md text-black">{name}</p>
        </header>
    );
}

export default Header;