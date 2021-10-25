import React from "react";
import { useHistory, useLocation } from "react-router";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import styles from "./PhoneTabletNavigation.module.scss";

import OverviewSvgIcon from "../NavigationSvgIcons/OverviewSvgIcon";
import TransactionsSvgIcon from "../NavigationSvgIcons/TransactionsSvgIcon";
import InvestmentSvgIcon from "../NavigationSvgIcons/InvestmentSvgIcon";
import LendBorrowSvgIcon from "../NavigationSvgIcons/LendBorrowSvgIcon";
import * as routes from "../../../constants/routeNameConstants";
import NavigationLabel from "./MobileNavigationComponents/MobileNavigationLabel";

/**
 * Gives Bottom Navigation for mobile and tablet view
 */
function PhoneTabletNavigation() {
  const history = useHistory();
  const location = useLocation();

  /**
   * Set value of clicked navigation item
   * @param event
   * @param newValue - value of clicked item
   */
  const changHandler = (event: React.ChangeEvent<{}>, newRoute: string) => {
    history.push(newRoute);
  };

  /**
   * Returns color for Svg Icon
   * @param value - item value
   * @param currentValue - currently clicked item value
   * @returns returns hash color code of Blue and White
   */
  const getColor = (route: string): string =>
    route === location.pathname ? "#434af9" : "#6e6e7e";

  return (
    <BottomNavigation
      className={styles.phoneTabletNavigationContainer}
      value={location.pathname}
      showLabels
      onChange={changHandler}
    >
      <BottomNavigationAction
        label={<NavigationLabel labelName="Overview" />}
        className={styles.fontSize}
        value={routes.OVERVIEW_ROUTE}
        icon={
          <OverviewSvgIcon
            color={getColor(routes.OVERVIEW_ROUTE)}
            width="15"
            height="15"
            outline={location.pathname !== routes.OVERVIEW_ROUTE}
          />
        }
      />
      <BottomNavigationAction
        label={<NavigationLabel labelName="Transactions" />}
        className={styles.fontSize}
        value={routes.TRANSACTIONS_ROUTE}
        icon={
          <TransactionsSvgIcon
            color={getColor(routes.TRANSACTIONS_ROUTE)}
            width="15"
            height="15"
            outline={location.pathname !== routes.TRANSACTIONS_ROUTE}
          />
        }
      />
      <BottomNavigationAction
        label={<NavigationLabel labelName="Investments" />}
        className={styles.fontSize}
        value={routes.INVESTMENTS_ROUTE}
        icon={
          <InvestmentSvgIcon
            color={getColor(routes.INVESTMENTS_ROUTE)}
            width="15"
            height="15"
            outline={location.pathname !== routes.INVESTMENTS_ROUTE}
          />
        }
      />
      <BottomNavigationAction
        label={<NavigationLabel labelName="Lend/Borrow" />}
        className={styles.fontSize}
        value={routes.LENDBORROW_ROUTE}
        icon={
          <LendBorrowSvgIcon
            color={getColor(routes.LENDBORROW_ROUTE)}
            // width="15"
            height="15"
            outline={location.pathname !== routes.LENDBORROW_ROUTE}
          />
        }
      />
    </BottomNavigation>
  );
}

export default PhoneTabletNavigation;
