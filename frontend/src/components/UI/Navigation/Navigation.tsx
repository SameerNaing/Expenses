import React from "react";
import { useLocation } from "react-router";
import { createMediaMatcher } from "react-media-match";

import * as routes from "../../../constants/routeNameConstants";
import PhoneTabletNavigation from "./PhoneTabletNavigation";
import DesktopNavigation from "./DesktopNavigation";

/**
 * Gives Side Navigation Menu for Desktop and Laptop Devices and Bottom Navigation Menu for Mobile and Tablet Devices
 */
const Navigation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  /**
   * Routes where Navigation menu is shown
   */
  const showPath: string[] = [
    routes.OVERVIEW_ROUTE,
    routes.TRANSACTIONS_ROUTE,
    routes.INVESTMENTS_ROUTE,
    routes.LENDBORROW_ROUTE,
  ];

  /**
   * Width matchers for Desktop and mobile/Tablet devices
   */
  const matcher = createMediaMatcher({
    mobileTablet: "(max-width: 1280px)",
    desktop: "(min-width: 1280px)",
  });

  return (
    <>
      {showPath.includes(location.pathname) ? (
        <matcher.Provider>
          <matcher.Matcher
            mobileTablet={
              <>
                {children}
                <PhoneTabletNavigation />
              </>
            }
            desktop={<DesktopNavigation>{children}</DesktopNavigation>}
          />
        </matcher.Provider>
      ) : (
        <> {children}</>
      )}
    </>
  );
};

export default Navigation;
