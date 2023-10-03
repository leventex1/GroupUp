import { io } from "socket.io-client";

import Config from "@/data/Config";

const socket = io(Config.serverURL, {
    autoConnect: false
});

export default socket;