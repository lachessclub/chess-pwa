/* eslint-disable @typescript-eslint/no-explicit-any */

export const ioClient: any = jest.genMockFromModule("../ioClient");

let mockResponse: any;

ioClient.default.setMockResponse = (data: any) => {
  mockResponse = data;
};

ioClient.default.socket.get = (url: string, cb: any) => {
  if (mockResponse === undefined) {
    throw Error("Please call setMockResponse() method before using this API");
  }

  cb(mockResponse);
};

ioClient.default.socket.on = (path: string, cb: (data: any) => void) => {
  if (mockResponse === undefined) {
    throw Error("Please call setMockResponse() method before using this API");
  }

  cb(mockResponse);
};

export default ioClient.default;
