import React from "react";

import { formatInputValue } from "../../utils/formatDate";
import { usePageStates } from "../../context/PageStatesContext";

import DialogContainer from "../UI/AddEditCollectDataDialogComponents/AddEditDialogContainer";
import DialogTitle from "../UI/AddEditCollectDataDialogComponents/DialogTitle";
import SelectDropdown from "../UI/AddEditCollectDataDialogComponents/SelectDropdown";
import InputField from "../UI/AddEditCollectDataDialogComponents/InputField";
import InputFieldsGridLayout from "../UI/AddEditCollectDataDialogComponents/InputFieldsGridLayout";
import Layout from "../UI/AddEditCollectDataDialogComponents/Layout";
import Backdrop from "../UI/Backdrop/Backdrop";
import PrimarySecondaryBtnLayout from "../UI/PrimarySecondaryButton/PrimarySecondaryBtnLayout";
import PrimarySecondaryBtn from "../UI/PrimarySecondaryButton/PrimarySecondaryBtn";

interface Props {
  /** adding or editing transaction data status */
  isLoading: boolean;
  /** function to execute when user click on 'save' button */
  onSave(): void;
}

const TransactionAddEditDialog: React.FC<Props> = ({ isLoading, onSave }) => {
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
      <DialogContainer>
        <DialogTitle
          title={
            updateDataIndex !== null ? "Edit Transaction" : "Add Transaction"
          }
        />
        <Layout>
          <InputFieldsGridLayout>
            <SelectDropdown
              name="category"
              isCategory={true}
              value={inputValues.category}
              onChange={(e) => changeInputValues(e.target.name, e.target.value)}
            />
            <InputField
              label="Amount"
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
                inputValues.category === ""
              }
            />
          </PrimarySecondaryBtnLayout>
        </Layout>
      </DialogContainer>
    </>
  );
};

export default TransactionAddEditDialog;
