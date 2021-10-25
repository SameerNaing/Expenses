import React from "react";

import styles from "./LendBorrowDataTable.module.scss";

import * as lendBorrowConsts from "../../constants/lendBorrowConsts";
import { formatDisplay } from "../../utils/formatDate";
import { usePageStates } from "../../context/PageStatesContext";
import formatAmount from "../../utils/formatAmount";
import useMoreOptions from "../../hooks/moreOptionsHook";

import MoreOptionContainer from "../UI/MoreOption/MoreOptionContainer";
import TableMoreButton from "../UI/TableMoreButton/TableMoreButton";
import NameDateTableValue from "../UI/NameDateTableValue/NameDateTableValue";

interface Props {
  /** Table contains due data or not due data */
  isDue: boolean;
  /** margin bottom to apply */
  marginBottom?: string;
  /** data to display */
  data: LendBorrowModel[];
  /** function to execute when user click collect button from more option  */
  onCollect(lendBorrowID: string, category: string): void;
  /** function to execute when user click delete button from more option  */
  onDelete(lendBorrowID: string, isDue: boolean): void;
}

/** Table for displaying LendBorrow data */
const LendBorrowDataTable: React.FC<Props> = ({
  isDue,
  marginBottom = "",
  data,
  onCollect,
  onDelete,
}) => {
  /** Context api states */
  const { openBottomSheet } = usePageStates();

  /** more option popover state hook */
  const { ref, showMoreOption, setShowMoreOption } =
    useMoreOptions<HTMLDivElement>();

  /** function to execute when user click on 'Delete' from more option popover */
  const onDeleteHandler = (lendBorrowID: string) => {
    onDelete(lendBorrowID, isDue);
    setShowMoreOption(null);
  };

  /** function to execute when user click on 'Show Detail' from more option popover */
  const onShowDetail = (data: LendBorrowModel) => {
    openBottomSheet({
      name: data.category,
      note: data.note,
      date: data.date,
      dueDate: data.dueDate,
      amount: data.amount,
      profitedAmount: null,
      investmentStatus: null,
    });
  };

  return (
    <table style={{ marginBottom: marginBottom }} className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th>Category</th>
          <th className={styles.hideHeader}>Notes</th>
          <th>Status</th>
          <th className={styles.hideHeader}>Date</th>
          <th className={styles.hideHeader}>Due Date</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, index) => (
          <tr key={d.lendBorrowID} className={styles.dataRow}>
            <td className={styles.nameCell}>
              <NameDateTableValue
                name={d.category}
                date={formatDisplay(d.date)}
              />
            </td>
            <td className={styles.notesCell}>{d.note}</td>
            <td className={styles.statusCell}>
              <div>
                {d.status === lendBorrowConsts.CURRENT_STAT ? "" : d.status}
              </div>
            </td>
            <td className={styles.dateCell}>{formatDisplay(d.date)}</td>
            <td className={styles.dueDateCell}>{formatDisplay(d.dueDate)}</td>
            <td className={styles.amountCell}>${formatAmount(d.amount)}</td>
            <td className={styles.moreButtonCell}>
              <TableMoreButton
                onClick={setShowMoreOption.bind(null, d.lendBorrowID)}
              />
              {showMoreOption === d.lendBorrowID && (
                <div ref={ref}>
                  <MoreOptionContainer
                    collectBtnText={
                      d.category === lendBorrowConsts.LEND_CAT
                        ? "Collect Debt"
                        : "Give Debt"
                    }
                    includeCollect={d.status === lendBorrowConsts.CURRENT_STAT}
                    onCollect={() => onCollect(d.lendBorrowID, d.category)}
                    onShowDetial={onShowDetail.bind(null, d)}
                    removeEdit={true}
                    onDelete={onDeleteHandler.bind(
                      null,
                      d.lendBorrowID,
                      d.date,
                      d.dueDate,
                      d.status
                    )}
                  />
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LendBorrowDataTable;
