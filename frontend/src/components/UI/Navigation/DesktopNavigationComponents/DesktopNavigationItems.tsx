import React, { useState } from "react";
import { useLocation } from "react-router";

import DesktopNavigationItem from "./DesktopNavigationItem";

import * as routes from "../../../../constants/routeNameConstants";
import OverviewSvgIcon from "../../NavigationSvgIcons/OverviewSvgIcon";
import TransactionsSvgIcon from "../../NavigationSvgIcons/TransactionsSvgIcon";
import LendBorrowSvgIcon from "../../NavigationSvgIcons/LendBorrowSvgIcon";
import InvestmentSvgIcon from "../../NavigationSvgIcons/InvestmentSvgIcon";

/**
 * Give all navigation items for desktop/laptop view
 */
const DesktopNavigationItems: React.FC = () => {
  const location = useLocation();
  /** White color constant for svg logo while unclicked or not hovering */
  const WHITE: string = "#fcfcfe";
  /** Blue color constant for svg logo while clicked or hovering */
  const BLUE: string = "#434af9";

  // Track value of hovered item
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  /**
   * Set hoverValue state to the value of hovered item
   * @param value - value of currenty hovered item
   */
  const onMouseEnterHandler = (value: number) => setHoverValue(value);

  /** Set hoverValue state to null as no item is hovered */
  const onMouseLeaveHandler = () => setHoverValue(null);

  /**
   * Return color for svg Icon according to hover and click
   * @param hoverValue - currently hovered item value
   * @param routeName - item route name
   * @param value - item value
   * @returns return BLUE if item is clicked or hovered else return WHITE
   */
  const getSvgColor = (
    hoverValue: number | null,
    routeName: string,
    value: number
  ): string =>
    hoverValue === value || routeName === location.pathname ? BLUE : WHITE;

  return (
    <>
      <DesktopNavigationItem
        itemRoute={routes.OVERVIEW_ROUTE}
        currentRoute={location.pathname}
        value={0}
        icon={
          <OverviewSvgIcon
            outline={location.pathname !== routes.OVERVIEW_ROUTE}
            height="23"
            width="30"
            color={getSvgColor(hoverValue, routes.OVERVIEW_ROUTE, 0)}
          />
        }
        name="Overview"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      />
      <DesktopNavigationItem
        itemRoute={routes.TRANSACTIONS_ROUTE}
        currentRoute={location.pathname}
        value={1}
        icon={
          <TransactionsSvgIcon
            outline={location.pathname !== routes.TRANSACTIONS_ROUTE}
            height="24"
            width="30"
            color={getSvgColor(hoverValue, routes.TRANSACTIONS_ROUTE, 1)}
          />
        }
        name="Transactions"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      />
      <DesktopNavigationItem
        itemRoute={routes.INVESTMENTS_ROUTE}
        currentRoute={location.pathname}
        value={2}
        icon={
          <InvestmentSvgIcon
            outline={location.pathname !== routes.INVESTMENTS_ROUTE}
            height="23"
            width="30"
            color={getSvgColor(hoverValue, routes.INVESTMENTS_ROUTE, 2)}
          />
        }
        name="Investments"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      />
      <DesktopNavigationItem
        itemRoute={routes.LENDBORROW_ROUTE}
        currentRoute={location.pathname}
        value={3}
        icon={
          <LendBorrowSvgIcon
            outline={location.pathname !== routes.LENDBORROW_ROUTE}
            height="23"
            width="30"
            color={getSvgColor(hoverValue, routes.LENDBORROW_ROUTE, 3)}
          />
        }
        name="Lend/Borrow"
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      />
    </>
  );
};

export default DesktopNavigationItems;
