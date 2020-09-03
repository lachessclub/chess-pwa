/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */

export const ioClient: any = jest.genMockFromModule("../ioClient");

let mockResponse: any;
let statusCode = 200;

ioClient.default.setMockResponse = (data: any, _statusCode: number = 200) => {
  mockResponse = data;
  statusCode = _statusCode;
};

ioClient.default.socket.get = (url: string, cb: any) => {
  if (mockResponse === undefined) {
    throw Error("Please call setMockResponse() method before using this API");
  }

  cb(mockResponse, {
    body: mockResponse,
    statusCode,
  });
};

ioClient.default.socket.on = (path: string, cb: (data: any) => void) => {
  if (mockResponse === undefined) {
    throw Error("Please call setMockResponse() method before using this API");
  }

  cb(mockResponse);
};

export default ioClient.default;
