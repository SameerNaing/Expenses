import React from "react";

import styles from "./TransactionsDataTable.module.scss";

import { usePageStates } from "../../context/PageStatesContext";
import formatAmount from "../../utils/formatAmount";
import { formatDisplay } from "../../utils/formatDate";
import useMoreOptions from "../../hooks/moreOptionsHook";

import CategoryNameIcon from "./CategoryNameIcon";
import TableMoreButton from "../UI/TableMoreButton/TableMoreButton";
import MoreOptionContainer from "../UI/MoreOption/MoreOptionContainer";

interface Props {
  /** Transactions Data */
  transactions: TransactionModel[];
  /** function to execute when user click 'Delete' from more option */
  onDelete(transactionID: string): void;
  marginBottom?: string | null;
}

/** Table for displaying Transactions data */
const TransactionsDataTable: React.FC<Props> = ({
  transactions,
  onDelete,
  marginBottom = null,
}) => {
  /** more option popover state hook */
  const { ref, showMoreOption, setShowMoreOption } =
    useMoreOptions<HTMLDivElement>();

  /** Context api states */
  const {
    setUpdateDataIndex,
    openBottomSheet,
    openDialog,
    setTransactionToInputValues,
  } = usePageStates();

  /** function to execute when user click on 'Delete' from more option popover */
  const onDeleteHandler = (transactionID: string) => {
    onDelete(transactionID);
    setShowMoreOption(null);
  };

  /** function to execute when user click on 'Edit' from more option popover */
  const onEdit = (transaction: TransactionModel, index: number) => {
    setUpdateDataIndex(index);
    setTransactionToInputValues(transaction);
    openDialog();
  };

  /** function to execute when user click on 'Show Detail' from more option popover */
  const onShowDetail = (transaction: TransactionModel) => {
    openBottomSheet({
      name: transaction.category,
      note: transaction.note,
      date: transaction.date,
      dueDate: null,
      amount: transaction.amount,
      profitedAmount: null,
      investmentStatus: null,
    });
  };

  return (
    <table
      style={{ marginBottom: marginBottom || "" }}
      className={styles.table}
    >
      <thead className={styles.thead}>
        <tr className={styles.headersRow}>
          <th>Category</th>
          <th>Comment</th>
          <th>Date</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t, index) => (
          <tr key={t.transactionID} className={styles.dataRow}>
            <td className={styles.categoryNameIconCell}>
              <CategoryNameIcon category={t.category} date={t.date} />
            </td>
            <td className={styles.notesCell}>{t.note}</td>
            <td className={styles.dateCell}>{formatDisplay(t.date)}</td>
            <td className={styles.amountCell}>${formatAmount(t.amount)}</td>
            <td className={styles.moreButtonCell}>
              <TableMoreButton
                onClick={setShowMoreOption.bind(null, t.transactionID)}
              />
              {showMoreOption === t.transactionID && (
                <div ref={ref}>
                  <MoreOptionContainer
                    onShowDetial={onShowDetail.bind(null, t)}
                    onEdit={onEdit.bind(null, t, index)}
                    onDelete={onDeleteHandler.bind(null, t.transactionID)}
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

export default TransactionsDataTable;
