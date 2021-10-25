import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./Backdrop.module.scss";

const Backdrop: React.FC = () => {
  return <div className={styles.backdrop}></div>;
};

export default Backdrop;
