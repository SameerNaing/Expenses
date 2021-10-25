import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import { BiLogOut } from "react-icons/bi";

import styles from "./DesktopNavigationLogoutButton.module.scss";

import { setLogoutDialog } from "../../../../store/logout/logout-slice";

/** Gives Logout Button */
function DesktopNavigationLogoutButton() {
  /** Dispatch to open logout dialog */
  const dispatch = useDispatch();
  // Track hover state
  const [hover, setHover] = useState<boolean>(false);

  /** hook to control animtion of "Logout" text inside span tag */
  const animControl = useAnimation();

  /** set hover state  */
  const hoverHandler = () => setHover((prev) => !prev);

  const onClickHandler = () => dispatch(setLogoutDialog(true));

  /** animate span tag when hover state change */
  useEffect(() => {
    if (hover) {
      animControl.start({
        opacity: 1,
        display: "inline",
      });
    } else {
      animControl.start({
        opacity: 0,
        display: "none",
      });
    }
  }, [hover, animControl]);

  return (
    <motion.button
      onClick={onClickHandler}
      onHoverStart={hoverHandler}
      onHoverEnd={hoverHandler}
      whileHover={{ backgroundColor: "#fcfcfe" }}
      className={styles.logoutButton}
    >
      <BiLogOut size="25px" color={hover ? "#ff3333" : "#fcfcfe"} />
      <motion.span animate={animControl}>Logout</motion.span>
    </motion.button>
  );
}

export default DesktopNavigationLogoutButton;
