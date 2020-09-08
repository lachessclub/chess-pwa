import { Client } from "sails.io.js";

const ioClient = jest.genMockFromModule<Record<"default", Client>>(
  "../ioClient"
);

export default ioClient.default;
