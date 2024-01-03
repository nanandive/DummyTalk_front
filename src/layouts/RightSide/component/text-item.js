const TextItem = ({props}) => {

    console.log("props", props)

    return props && (
        <div className="text-amber-400 border-amber-200 border-2  flex flex-col items-end w-full ">
                <div className="border-amber-200 text-amber-50 w-full">
                    {props.message}
                </div>
        </div>
    )
}

export default TextItem;