import React, { useState, useEffect } from "react";

import * as investmentStatus from "../../constants/investmentStatus";

import Backdrop from "../UI/Backdrop/Backdrop";
import CollectDialogContainer from "../UI/AddEditCollectDataDialogComponents/CollectDialogContainer";
import InputFieldsGridLayout from "../UI/AddEditCollectDataDialogComponents/InputFieldsGridLayout";
import InputField from "../UI/AddEditCollectDataDialogComponents/InputField";
import SelectDropdown from "../UI/AddEditCollectDataDialogComponents/SelectDropdown";
import PrimarySecondaryBtnLayout from "../UI/PrimarySecondaryButton/PrimarySecondaryBtnLayout";
import PrimarySecondaryBtn from "../UI/PrimarySecondaryButton/PrimarySecondaryBtn";

interface Props {
  /** on 'Cancle' button click */
  onCancle(): void;
  /** on 'Ok' button click */
  onDone(status: string, profitedAmount: number | null): void;
  /** status */
  isLoading: boolean;
}

/** Collect Investment Dialog */
const CollectInvestmentDialog: React.FC<Props> = ({
  onCancle,
  onDone,
  isLoading,
}) => {
  const [states, setStates] = useState({
    /** Profited or Lost */
    investmentStatus: "",
    /** Profited amount if user select 'Profited' from select option */
    profitedAmount: null,
    /** disable ok button */
    disableSave: true,
  });

  /** Function to execute when user click on 'Ok' button */
  const onOKHandler = () => {
    if (!isLoading) onDone(states.investmentStatus, states.profitedAmount);
  };

  /** Function to execute when user click on 'Cancel' button */
  const onCancelHandler = () => {
    if (!isLoading) onCancle();
  };

  /** Function to execute when user change status from select dropdown */
  const onChangeHandler = (name: string, value: any) => {
    if (name === "profitedAmount")
      value = isNaN(parseInt(value)) ? null : parseInt(value);

    setStates((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  /** useEffect to track investmentStatus and profitedAmount */
  useEffect(() => {
    /** if user select investment status to be profited */
    if (states.investmentStatus === investmentStatus.PROFITED) {
      /** if investment status is profited and profited amount is not set, disable 'ok' button else enable 'ok' button */
      !isNaN(states.profitedAmount || NaN)
        ? setStates((prev) => {
            return {
              ...prev,
              disableSave: false,
            };
          })
        : setStates((prev) => {
            return {
              ...prev,
              disableSave: true,
            };
          });
    } else if (states.investmentStatus === investmentStatus.LOST) {
      /** if investment status is lost */
      /** enable 'ok' button */
      setStates((prev) => {
        return {
          ...prev,
          disableSave: false,
        };
      });
    } else {
      /** if investment status is not set disable 'ok' button */
      setStates((prev) => {
        return {
          ...prev,
          disableSave: true,
        };
      });
    }
  }, [states.investmentStatus, states.profitedAmount]);

  return (
    <>
      <Backdrop />
      <CollectDialogContainer>
        <InputFieldsGridLayout>
          <SelectDropdown
            name="investmentStatus"
            isInvestmentStatus={true}
            value={states.investmentStatus}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
          />
          <InputField
            label="Profited Amount"
            name="profitedAmount"
            id="profiltedAmount"
            type="number"
            value={states.profitedAmount || ""}
            disable={states.investmentStatus !== investmentStatus.PROFITED}
            onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
          />
        </InputFieldsGridLayout>
        <PrimarySecondaryBtnLayout>
          <PrimarySecondaryBtn
            onClick={onCancelHandler}
            btnText="Cancel"
            primary={false}
          />
          <PrimarySecondaryBtn
            isLoading={false}
            onClick={onOKHandler}
            btnText="OK"
            disabled={states.disableSave}
          />
        </PrimarySecondaryBtnLayout>
      </CollectDialogContainer>
    </>
  );
};

export default CollectInvestmentDialog;
