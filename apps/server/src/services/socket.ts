import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis({
  host: '127.0.0.1', 
  port: 6379,
});

const sub = new Redis({
  host: '127.0.0.1', 
  port: 6379,
});






class SocketService {
  private _io: Server;

  constructor() {
    console.log("init Socket Service....");
    this._io = new Server({
      cors: {
        origin: "http://localhost:3000",  // Allow requests only from your frontend running on localhost:3000
        methods: ["GET", "POST"],  // Allow specific HTTP methods
        allowedHeaders: ["Content-Type"],  // Allow specific headers
        credentials: true  // Allow credentials (cookies, authorization headers, etc.)
      },
    });
    sub.subscribe('MESSAGES')
  }

  public initListners() {
    const io = this.io;
    console.log("Init socket Listeners");
    
    io.on("connect", (socket) => {
      console.log('New Client connected ', socket.id);

      socket.on('event:message', async ({ message }: { message: string }) => {
        console.log("new message Rec .", message);
        // publish this message to redis
        await pub.publish("MESSAGES", JSON.stringify({message}))
      });
    });
    sub.on("message",(channel,message)=>{
      if(channel==="MESSAGES"){
        io.emit("message",message)
        
      }
    })
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
