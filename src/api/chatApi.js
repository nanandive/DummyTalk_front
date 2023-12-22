import axios from "axios";

async function getChatList() {
    try {
        const response = await axios.get('/chat');
        return response.data;
    } catch (e) {
        console.error(e);
    }
}
