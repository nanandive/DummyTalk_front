import {useMemo, useRef, useState} from 'react';
import {useModal} from "src/components/hooks/use-modal";
import {Label} from "src/components/ui/label";
import axios from "axios";
import {decodeJwt} from "src/lib/tokenUtils";


const ImageSendModal = () => {
    const {data, isOpen, onClose, type} = useModal();
    const isModalOpen = isOpen && type === "imageSend";
    const accessToken = localStorage.getItem("accessToken");
    const userInfo = useMemo(() => decodeJwt(accessToken), [accessToken]);
    const fileInput = useRef();
    const [showImages, setShowImages] = useState([]);
    const user = useState({
            "id": userInfo.sub,
            "nickname": userInfo.nickname
        });
    const formData = new FormData();
    const handleAddImage = (e) => {
        console.log("버튼 눌림 !!!");
        e.preventDefault();

        if (fileInput.current && fileInput.current.files) {
            const files = fileInput.current.files;
            let showImgList = [...showImages];
            console.log("files:", files);

            // 10개 이상의 파일은 업로드 불가
            for (let i = 0; i < files.length; i++) {
                formData.append(files[i].name, files[i]);
                console.log("files[i]:", files[i]);
                showImgList.push(URL.createObjectURL(files[i]));
            }
            formData.append("user", user)

            if (showImgList.length > 10) {
                showImgList = showImgList.slice(0, 10);
            }
            setShowImages(showImgList);
        }

    }

    const onSubmit = async (e) => {
        try {
            // console.log("formData:", formData.get());
            const response
                = await axios.post("/img/save", formData, JSON.stringify(user));
            console.log("업로드 성공:", response.data);
        } catch (error) {
            console.error("업로드 실패:", error);
        }
    }


    return (
        <div
            className={`fixed top-0 left-0 w-full h-full ${isModalOpen ? 'block' : 'hidden'} bg-[rgba(0,0,0,0.4)] z-10`}>

            <div
                className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-20 py-10 border-1 border-gray-800 w-1/2">
                <span className="text-gray-700 float-right text-2xl font-extrabold cursor-pointer" onClick={onClose}>
                &times;
                </span>
                <h2 className="text-center my-5">파일 선택하기</h2>
                <label
                    htmlFor="image_files"
                    onChange={handleAddImage}
                    className="text-center my-5">
                    <input
                        type="file"
                        name="image_files"
                        ref={fileInput}
                        className="my-2"
                        multiple={true}
                    />
                </label>
                <Label className="">사진 크기 10MB 이하</Label>
                <div className="w-100 h-100 grid grid-cols-4 gap-4 ">
                    {showImages.map((image, id) => (
                        // <div key={id} className="flex flex-col items-center">
                        <img
                            // 이미지 2x5로 나열 크기 고정
                            key={id}
                            className="w-25"
                            src={image}
                            alt={`${image}-${id}`}/>
                    ))}
                </div>
                <button
                    type="submit"
                    onClick={onSubmit}
                    className="w-full h-auto p-1 my-2 bg-green-500 text-white border-none rounded-md cursor-pointer"
                >
                    전송
                </button>
            </div>
        </div>)
}

export default ImageSendModal;
