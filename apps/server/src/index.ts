import http from "http";
import SocketService from "./services/socket";

async function init() {
    // Initialize the SocketService instance
    const socketService = new SocketService();

    // Create the HTTP server
    const httpServer = http.createServer();
    const PORT = process.env.PORT || 8000;

    // Attach the SocketService to the HTTP server
    socketService.io.attach(httpServer);
    
    // Start listening on the specified port
    httpServer.listen(PORT, () => {
        console.log(`HTTP SERVER IS LISTENING ON PORT ${PORT}`);
    });
    socketService.initListners();
    
}

// Call the init function to start the server
init();
