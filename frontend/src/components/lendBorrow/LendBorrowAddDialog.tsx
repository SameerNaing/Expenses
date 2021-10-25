import React from "react";

import { formatInputValue } from "../../utils/formatDate";
import { usePageStates } from "../../context/PageStatesContext";

import AddEditDialogContainer from "../UI/AddEditCollectDataDialogComponents/AddEditDialogContainer";
import Layout from "../UI/AddEditCollectDataDialogComponents/Layout";
import DialogTitle from "../UI/AddEditCollectDataDialogComponents/DialogTitle";
import InputField from "../UI/AddEditCollectDataDialogComponents/InputField";
import InputFieldsGridLayout from "../UI/AddEditCollectDataDialogComponents/InputFieldsGridLayout";
import SelectDropdown from "../UI/AddEditCollectDataDialogComponents/SelectDropdown";
import Backdrop from "../UI/Backdrop/Backdrop";
import PrimarySecondaryBtnLayout from "../UI/PrimarySecondaryButton/PrimarySecondaryBtnLayout";
import PrimarySecondaryBtn from "../UI/PrimarySecondaryButton/PrimarySecondaryBtn";

interface Props {
  /** Adding data status */
  isLoading: boolean;
  /** function to execute when user click on 'Save' button */
  onSave(): void;
}

/** Add dialog for LendBorrow */
const LendBorrowAddEditDialog: React.FC<Props> = ({ isLoading, onSave }) => {
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
          title={updateDataIndex !== null ? "Edit Data" : "Add Data"}
        />
        <Layout>
          <InputFieldsGridLayout>
            {updateDataIndex === null && (
              <SelectDropdown
                isLendBorrow={true}
                name="category"
                value={inputValues.category}
                onChange={(e) =>
                  changeInputValues(e.target.name, e.target.value)
                }
              />
            )}
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
            {inputValues.dueDate !== null && (
              <InputField
                label="Due Date"
                min={inputValues.date}
                disable={inputValues.date === ""}
                name="dueDate"
                id="dueDate"
                type="date"
                value={
                  inputValues.dueDate === ""
                    ? inputValues.dueDate
                    : formatInputValue(inputValues.dueDate)
                }
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
                (inputValues.dueDate !== null && inputValues.dueDate === "") ||
                (updateDataIndex === null && inputValues.category === "")
              }
            />
          </PrimarySecondaryBtnLayout>
        </Layout>
      </AddEditDialogContainer>
    </>
  );
};

export default LendBorrowAddEditDialog;
