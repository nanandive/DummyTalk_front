import {useRef, useState} from 'react';
import {useModal} from "src/components/hooks/use-modal";
import {Label} from "src/components/ui/label";
import axios from "axios";


const ImageSendModal = () => {
    const {data, isOpen, onClose, type} = useModal();
    const isModalOpen = isOpen && type === "imageSend";

    const fileInput = useRef();



    const onSubmit = async (e) => {
        console.log("버튼 눌림 !!!");
        // e.preventDefault();
        // e.persist();

        const files = e.target.image_files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i].name, files[i]);
        }

        try {
            const response = await axios.post(
                '/chat/image',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log("업로드 성공:", response.data);
            onClose(); // 성공 시 모달 닫기
        } catch (error) {
            console.error("업로드 실패:", error);
        }
    };
    return (
        <div
            className={`fixed top-0 left-0 w-full h-full ${isModalOpen ? 'block' : 'hidden'} bg-[rgba(0,0,0,0.4)] z-10`}>

            <div className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-20 py-10 border-1 border-gray-800 w-1/2">
                <span className="text-gray-700 float-right text-2xl font-extrabold cursor-pointer" onClick={onClose}>
                &times;
                </span>
                <h2 className="text-center my-5">파일 선택하기</h2>
                <input
                    type="file"
                    name="image_files"
                    ref={fileInput}
                    className="my-2"
                    multiple={true}
                />
                <Label className="">사진 크기 10MB 이하</Label>
                <div className="">이미지가 들어오면 미리보기</div>
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
