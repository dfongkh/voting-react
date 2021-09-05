import { setPusherClient } from "react-pusher";
import Pusher from "pusher-js";

Pusher.logToConsole = true;

const pusherClient = new Pusher("c4697b661dace15f6f52", {
  cluster: "ap1",
});

setPusherClient(pusherClient);
