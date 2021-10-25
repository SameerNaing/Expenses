import React from "react";
import { Link } from "react-router-dom";

import styles from "./DesktopNavigationItem.module.scss";

interface Props {
  /** Svg Icon to Display */
  icon: React.ReactNode;
  /** Item hover value */
  value: number;

  /** Item name */
  name: string;
  /** Item route name  */
  itemRoute: string;
  /** Current route name */
  currentRoute: string;
  /** function to execute when mouse hover on the item */
  onMouseEnter(value: number): void;
  /** function to execute when mouse leave from the item */
  onMouseLeave(): void;
}

/** Give Desktop Navigation Item with Design */
const DesktopNavigationItem: React.FC<Props> = ({
  icon,
  value,
  name,
  itemRoute,
  currentRoute,
  onMouseEnter,
  onMouseLeave,
}) => {
  const isActive: boolean = itemRoute === currentRoute;

  return (
    <Link to={itemRoute} className={styles.link}>
      <div
        onMouseEnter={onMouseEnter.bind(null, value)}
        onMouseLeave={onMouseLeave.bind(null)}
        style={{ backgroundColor: isActive ? "#fcfcfe" : "" }}
        className={styles.itemButton}
      >
        {icon}
        <span
          style={{ color: isActive ? "#434af9" : "" }}
          className={styles.itemName}
        >
          {name}
        </span>
      </div>
    </Link>
  );
};

export default DesktopNavigationItem;
