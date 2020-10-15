import React, { FC } from "react";
import { Seek } from "../../interfaces/Seek";
import { SeeksListItem } from "./SeeksListItem";

export interface SeeksListProps {
  acceptInProcess?: number | null;
  currentUserId?: number | null;
  seeks?: Seek[];
  onPlay?(seekId: number): void;
}

export const SeeksList: FC<SeeksListProps> = ({
  acceptInProcess = null,
  currentUserId = null,
  seeks = [],
  onPlay,
}) => {
  return (
    <div>
      {seeks.map((item) => (
        <SeeksListItem
          acceptInProcess={acceptInProcess}
          currentUserId={currentUserId}
          seek={item}
          onPlay={onPlay}
          key={item.id}
        />
      ))}
    </div>
  );
};
