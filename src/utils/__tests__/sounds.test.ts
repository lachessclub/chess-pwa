import { playEndGameSound, playMoveSound, playStartGameSound } from "../sounds";

describe("sounds", () => {
  it("playStartGameSound() should call Audio.play() method", () => {
    const playStub = jest
      .spyOn(window.HTMLAudioElement.prototype, "play")
      .mockImplementation(() => Promise.resolve());

    playStartGameSound();

    expect(playStub).toBeCalledTimes(1);

    playStub.mockRestore();
  });

  // sometimes if I reload page in browser I get this error:
  // "play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD "
  // This is why playStartGameSound should ignore play() exceptions
  it("playStartGameSound() should ignore Audio.play() exception", () => {
    const playStub = jest
      .spyOn(window.HTMLAudioElement.prototype, "play")
      .mockImplementation(() => Promise.reject(Error("error text")));

    // @todo. For someone reason if playStartGameSound() throws exception this test does not work as expected
    // The test does not catch error. And we get Unhandled promise rejection
    expect(() => {
      playStartGameSound();
    }).not.toThrow();

    playStub.mockRestore();
  });

  it("playEndGameSound() should call Audio.play() method", () => {
    const playStub = jest
      .spyOn(window.HTMLAudioElement.prototype, "play")
      .mockImplementation(() => Promise.resolve());

    playEndGameSound();

    expect(playStub).toBeCalledTimes(1);

    playStub.mockRestore();
  });

  it("playMoveSound() should call Audio.play() method", () => {
    const playStub = jest
      .spyOn(window.HTMLAudioElement.prototype, "play")
      .mockImplementation(() => Promise.resolve());

    playMoveSound();

    expect(playStub).toBeCalledTimes(1);

    playStub.mockRestore();
  });
});
