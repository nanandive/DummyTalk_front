import {useEffect} from "react";

const TextSearchComponent = ({text}) => {

    useEffect(() => {
        console.log("text: ", text);
    }, [text]);

    if( text?.size <= 0 ) return null;

    return text?.size > 0 && (
        <div className="border-amber-200 border-2 flex flex-col items-end w-full h-full">
            { text.map((chat) => (
                <div className="text-amber-400 border-amber-200 border-2  flex flex-col items-end w-full ">
                    <div className="border-amber-200 text-amber-50 w-full">
                        {chat.message}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TextSearchComponent;