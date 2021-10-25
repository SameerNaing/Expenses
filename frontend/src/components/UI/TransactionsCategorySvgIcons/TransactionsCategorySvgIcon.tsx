import React from "react";

import FoodSvgIcon from "./SvgIcons/FoodSvgIcon";
import TransportationSvgIcon from "./SvgIcons/TransportationSvgIcon";
import BillSvgIcon from "./SvgIcons/BillSvgIcon";
import EducationSvgIcon from "./SvgIcons/EducationSvgIcon";
import FitnessSvgIcon from "./SvgIcons/FitnessSvgIcon";
import HousewareSvgIcon from "./SvgIcons/HousewareSvgIcon";
import MaintenanceSvgIcon from "./SvgIcons/MaintenanceSvgIcon";
import MakeupSvgIcon from "./SvgIcons/MakeupSvgIcon";
import PersonalItemsSvgIcon from "./SvgIcons/PersonalItemsSvgIcon";
import PetSvgIcon from "./SvgIcons/PetSvgIcon";
import GiftSvgIcon from "./SvgIcons/GiftSvgIcon";
import DonationSvgIcon from "./SvgIcons/DonationSvgIcon";
import SalarySvgIcon from "./SvgIcons/SalarySvgIcon";
import OtherIncomeSvgIcon from "./SvgIcons/OtherIncomeSvgIcon";

import {
  FOOD_BEVERAGE,
  TRANSPOTATION,
  BILL,
  EDUCATION,
  FITNESS,
  HOUSEWARE,
  MAINTENANCE,
  COSMETICS,
  PERSONALITEM,
  PET,
  GIFT,
  DONATION,
  SALARY,
  OTHER_INCOME,
} from "../../../constants/categories";

interface Props {
  category: string;
}

const TransactionsCategorySvgIcon: React.FC<Props> = ({ category }) => {
  return (
    <>
      {category === FOOD_BEVERAGE && <FoodSvgIcon />}
      {category === TRANSPOTATION && <TransportationSvgIcon />}
      {category === BILL && <BillSvgIcon />}
      {category === EDUCATION && <EducationSvgIcon />}
      {category === FITNESS && <FitnessSvgIcon />}
      {category === HOUSEWARE && <HousewareSvgIcon />}
      {category === MAINTENANCE && <MaintenanceSvgIcon />}
      {category === COSMETICS && <MakeupSvgIcon />}
      {category === PERSONALITEM && <PersonalItemsSvgIcon />}
      {category === PET && <PetSvgIcon />}
      {category === GIFT && <GiftSvgIcon />}
      {category === DONATION && <DonationSvgIcon />}
      {category === SALARY && <SalarySvgIcon />}
      {category === OTHER_INCOME && <OtherIncomeSvgIcon />}
    </>
  );
};

export default TransactionsCategorySvgIcon;
