import React from "react";

import { formatInputValue } from "../../utils/formatDate";
import { usePageStates } from "../../context/PageStatesContext";

import AddEditDialogContainer from "../UI/AddEditCollectDataDialogComponents/AddEditDialogContainer";
import Layout from "../UI/AddEditCollectDataDialogComponents/Layout";
import DialogTitle from "../UI/AddEditCollectDataDialogComponents/DialogTitle";
import InputField from "../UI/AddEditCollectDataDialogComponents/InputField";
import InputFieldsGridLayout from "../UI/AddEditCollectDataDialogComponents/InputFieldsGridLayout";
import Backdrop from "../UI/Backdrop/Backdrop";
import PrimarySecondaryBtnLayout from "../UI/PrimarySecondaryButton/PrimarySecondaryBtnLayout";
import PrimarySecondaryBtn from "../UI/PrimarySecondaryButton/PrimarySecondaryBtn";

interface Props {
  /** adding or editing investment data status */
  isLoading: boolean;
  /** function to execute when user click on 'save' button */
  onSave(): void;
}

/** Add or Edit Investment Dialog */
const InvestmentAddEditDialog: React.FC<Props> = ({ isLoading, onSave }) => {
  /** State from pageStates Context API */
  const { updateDataIndex, inputValues, changeInputValues, closeDialog } =
    usePageStates();

  /** Function to execute when user click 'Save' button */
  const onSaveHandler = () => {
    if (!isLoading) {
      onSave();
    }
  };

  /** Function to execute when user click 'Cancle' button */
  const onCancleHandler = () => {
    if (!isLoading) {
      closeDialog();
    }
  };

  return (
    <>
      <Backdrop />
      <AddEditDialogContainer>
        <DialogTitle
          title={
            updateDataIndex !== null ? "Edit Investment" : "Add Investment"
          }
        />
        <Layout>
          <InputFieldsGridLayout>
            <InputField
              label="Investment Name"
              name="investmentName"
              id="investmentName"
              type="text"
              value={inputValues.investmentName}
              onChange={(e) => changeInputValues(e.target.name, e.target.value)}
            />
            <InputField
              label="Investmented Amount"
              name="amount"
              id="amount"
              type="number"
              value={inputValues.amount || ""}
              onChange={(e) => changeInputValues(e.target.name, e.target.value)}
            />
            <InputField
              label="Date"
              name="date"
              id="date"
              type="date"
              value={
                inputValues.date === ""
                  ? inputValues.date
                  : formatInputValue(inputValues.date)
              }
              onChange={(e) => changeInputValues(e.target.name, e.target.value)}
            />
            {inputValues.profitedAmount !== null && (
              <InputField
                label="Profited Amount"
                name="profitedAmount"
                id="profitedAmount"
                type="number"
                value={inputValues.profitedAmount || ""}
                onChange={(e) =>
                  changeInputValues(e.target.name, e.target.value)
                }
              />
            )}
          </InputFieldsGridLayout>
          <InputField
            label="Note"
            name="note"
            id="note"
            type="text"
            isTextArea={true}
            value={inputValues.note}
            onChange={(e) => changeInputValues(e.target.name, e.target.value)}
          />
          <PrimarySecondaryBtnLayout>
            <PrimarySecondaryBtn
              onClick={onCancleHandler}
              btnText="Cancle"
              primary={false}
            />
            <PrimarySecondaryBtn
              isLoading={isLoading}
              onClick={onSaveHandler}
              btnText="Save"
              disabled={
                isNaN(inputValues.amount || NaN) ||
                inputValues.date === "" ||
                inputValues.investmentName === "" ||
                (inputValues.profitedAmount !== null &&
                  isNaN(inputValues.profitedAmount))
              }
            />
          </PrimarySecondaryBtnLayout>
        </Layout>
      </AddEditDialogContainer>
    </>
  );
};

export default InvestmentAddEditDialog;
