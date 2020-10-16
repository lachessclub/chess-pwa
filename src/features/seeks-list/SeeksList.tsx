import React, { FC } from "react";
import { Seek } from "../../interfaces/Seek";
import { SeeksListItem } from "./SeeksListItem";
import { ContentLoadingStatus } from "../../components/ContentLoadingStatus";

export interface SeeksListProps {
  acceptInProcess?: number | null;
  currentUserId?: number | null;
  seeks?: Seek[];
  onPlay?(seekId: number): void;
  isLoading?: boolean;
  error?: string | null;
}

export const SeeksList: FC<SeeksListProps> = ({
  acceptInProcess = null,
  currentUserId = null,
  seeks = [],
  onPlay,
  isLoading = false,
  error = null,
}) => {
  return (
    <div>
      <ContentLoadingStatus
        isLoading={isLoading}
        error={error}
        isEmpty={seeks.length === 0}
        emptyContentMessage="Nobody is waiting for opponent"
      />
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
    </div>
  );
};
