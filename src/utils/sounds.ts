export const playStartGameSound = (): void => {
  const audio = new Audio(
    "https://lichess1.org/assets/_Iu1lae/sound/standard/GenericNotify.ogg"
  );

  // sometimes if I reload page in browser I get this error:
  // "play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD "
  // This is why we use catch(() => {})
  audio.play().catch(() => {});
};

export const playEndGameSound = (): void => {
  const audio = new Audio(
    "https://lichess1.org/assets/_Iu1lae/sound/standard/GenericNotify.ogg"
  );
  audio.play();
};

export const playMoveSound = (): void => {
  const audio = new Audio(
    "https://lichess1.org/assets/sound/standard/Move.ogg"
  );
  audio.play();
};
