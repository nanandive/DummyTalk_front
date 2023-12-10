import React, {useState} from 'react';
import {useModal} from "src/components/hooks/use-modal";


const ImageSendModal = () => {
    const {data, isOpen, onClose, type} = useModal();
    const isModalOpen = isOpen && type === "imageSend";
    const [newChannelName, setNewChannelName] = useState('');

    const handleInputChange = (e) => {
        setNewChannelName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        data(newChannelName);
        onClose();
    };

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full ${isModalOpen ? 'block' : 'hidden'} bg-[rgba(0,0,0,0.4)] z-10`}>
            <div className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-20 py-10 border-1 border-gray-800 w-1/2">
                <span className="text-gray-700 float-right text-2xl font-extrabold cursor-pointer" onClick={onClose}>
                &times;
                </span>
                <h2 className="text-center my-5">파일 선택하기</h2>
                <input type="file" className="my-2"/>
                <button
                    type="submit"
                    className="w-full h-auto p-1 my-2 bg-green-500 text-white border-none rounded-md cursor-pointer"
                >
                    전송
                </button>
            </div>
        </div>)
}

export default ImageSendModal;
