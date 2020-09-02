import socketIOClient from "socket.io-client";
import sailsIOClient from "sails.io.js";

const ioClient = sailsIOClient(socketIOClient);

ioClient.sails.url = "http://localhost:1337";

export default ioClient;
