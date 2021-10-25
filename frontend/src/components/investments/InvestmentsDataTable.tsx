import React from "react";

import styles from "./InvestmentsDataTable.module.scss";

import formatAmount from "../../utils/formatAmount";
import { formatDisplay } from "../../utils/formatDate";
import * as status from "../../constants/investmentStatus";
import { usePageStates } from "../../context/PageStatesContext";
import useMoreOptions from "../../hooks/moreOptionsHook";

import MoreOptionContainer from "../UI/MoreOption/MoreOptionContainer";
import TableMoreButton from "../UI/TableMoreButton/TableMoreButton";
import NameDateTableValue from "../UI/NameDateTableValue/NameDateTableValue";

interface Props {
  /** investments Data */
  investments: InvestmentModel[];
  /** function to execute when user click 'Collect' from more option */
  onCollect(investmentID: string): void;
  /** function to execute when user click 'Delete' from more option */
  onDelete(investmentID: string): void;
  marginBottom?: string;
}

/** Table for displaying Investments data */
const InvestmentsDataTable: React.FC<Props> = ({
  investments,
  onCollect,
  onDelete,
  marginBottom = "",
}) => {
  /** more option popover state hook */
  const { ref, showMoreOption, setShowMoreOption } =
    useMoreOptions<HTMLDivElement>();

  /** Context api states */
  const {
    setUpdateDataIndex,
    openBottomSheet,
    openDialog,
    setInvestmentToInputValues,
  } = usePageStates();

  /** function to execute when user click on 'Delete' from more option popover */
  const onDeleteHandler = (investmentID: string) => {
    onDelete(investmentID);
    setShowMoreOption(null);
  };

  /** function to execute when user click on 'Edit' from more option popover */
  const onEdit = (investment: InvestmentModel, index: number) => {
    setUpdateDataIndex(index);
    setInvestmentToInputValues(investment);
    openDialog();
  };

  /** function to execute when user click on 'Show Detail' from more option popover */
  const onShowDetail = (investment: InvestmentModel) => {
    openBottomSheet({
      name: investment.investmentName,
      note: investment.note,
      date: investment.date,
      dueDate: null,
      amount: investment.amount,
      profitedAmount:
        investment.status === status.PROFITED
          ? investment.profitedAmount
          : null,
      investmentStatus: investment.status,
    });
  };

  return (
    <table style={{ marginBottom: marginBottom }} className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th>Investment Name</th>
          <th className={styles.hideHeader}>Notes</th>
          <th>Status</th>
          <th className={styles.hideHeader}>Date</th>
          <th className={styles.hideHeader}>Profited Amount</th>
          <th>Invested Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {investments.map((i, index) => (
          <tr key={i.investmentID} className={styles.dataRow}>
            <td className={styles.nameCell}>
              <NameDateTableValue
                name={i.investmentName}
                date={formatDisplay(i.date)}
              />
            </td>
            <td className={styles.notesCell}>{i.note}</td>
            <td className={styles.statusCell}>
              {i.status === status.CURRENTLY_INVESTED ? "" : i.status}
            </td>
            <td className={styles.dateCell}>{formatDisplay(i.date)}</td>
            <td className={styles.profitedAmountCell}>
              {i.profitedAmount === 0
                ? ""
                : `$${formatAmount(i.profitedAmount)}`}
            </td>
            <td className={styles.investedAmountCell}>{`$${formatAmount(
              i.amount
            )}`}</td>
            <td className={styles.moreButtonCell}>
              <TableMoreButton
                onClick={setShowMoreOption.bind(null, i.investmentID)}
              />
              {showMoreOption === i.investmentID && (
                <div ref={ref}>
                  <MoreOptionContainer
                    includeCollect={i.status === status.CURRENTLY_INVESTED}
                    onCollect={() => onCollect(i.investmentID)}
                    onShowDetial={onShowDetail.bind(null, i)}
                    onEdit={onEdit.bind(null, i, index)}
                    onDelete={onDeleteHandler.bind(null, i.investmentID)}
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

export default InvestmentsDataTable;
