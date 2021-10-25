import React from "react";
import { createMediaMatcher } from "react-media-match";

import styles from "./MoreOptionContainer.module.scss";

import OptionButton from "./OptionButton";

interface Props {
  includeCollect?: boolean;
  onCollect?(): void;
  collectBtnText?: string;
  onShowDetial(): void;
  removeEdit?: boolean;
  onEdit?(): void;
  onDelete(): void;
}

const MoreOptionContainer: React.FC<Props> = ({
  includeCollect = false,
  onCollect = () => {},
  onShowDetial,
  collectBtnText = "Collect",
  removeEdit = false,
  onEdit = () => {},
  onDelete,
}) => {
  const matcher = createMediaMatcher({
    mobileTablet: "(max-width: 1280px)",
    desktop: "(min-width: 1280px)",
  });
  return (
    <div className={styles.moreOptionContainer}>
      <matcher.Provider>
        <matcher.Matcher
          mobileTablet={
            <OptionButton onClick={onShowDetial} btnText="Show Details" />
          }
          desktop={<></>}
        />
      </matcher.Provider>

      {includeCollect && (
        <OptionButton onClick={onCollect} btnText={collectBtnText} />
      )}
      {!removeEdit && <OptionButton onClick={onEdit} btnText="Edit" />}
      <OptionButton onClick={onDelete} btnText="Delete" isDelete={true} />
    </div>
  );
};

export default MoreOptionContainer;
