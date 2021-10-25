import React from "react";
import Drawer from "@material-ui/core/Drawer";

import styles from "./BottomSheetContainer.module.scss";

import { formatDisplay } from "../../../utils/formatDate";
import formatAmount from "../../../utils/formatAmount";

import Detail from "./Detail";

interface Props {
  name: string;
  note: string;
  amount: number;
  profitedAmount?: number | null;
  date: string;
  dueDate?: string | null;
  open?: boolean;
  onClose(): void;
}

const BottomSheetContainer: React.FC<Props> = ({
  name,
  note,
  amount,
  profitedAmount = null,
  date,
  dueDate = null,
  open,
  onClose,
}) => {
  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <div className={styles.drawer}>
        <p className={styles.name}>{name}</p>
        <p className={styles.note}>{note}</p>
        <Detail name="Date" data={formatDisplay(date)} />
        {dueDate !== null && (
          <>
            <hr /> <Detail name="Due Date" data={formatDisplay(dueDate)} />
          </>
        )}
        <hr />
        <Detail name="Amount" data={`$${formatAmount(amount)}`} />

        {profitedAmount !== null && (
          <>
            <hr />
            <Detail
              name="Profited Amount"
              data={`$${formatAmount(profitedAmount)}`}
            />
          </>
        )}
      </div>
    </Drawer>
  );
};

export default BottomSheetContainer;
