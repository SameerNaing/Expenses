import { setPageStatus } from "./overview-slice";

import api from "../../utils/api";
import UserModel from "../../models/userModel";
import { Status } from "../../constants/status";

/** Action to load overview page data */
const loadOverviewAction = () => async (dispatch: Function) => {
  dispatch(setPageStatus({ status: Status.Loading, overview: null }));
  const userID: string = UserModel.get()!.userID;
  try {
    const totalBalanceResponse = await api.totalBalance({ userID });
    const prevDatesSpentIncomeResponse = await api.prevDatesSpentIncome({
      userID,
    });
    const todaySpentIncomeResponse = await api.todaySpentIncome({ userID });
    const biggestExpenseCatResponse = await api.biggestExpenseCategory({
      userID,
    });

    const prevDatesSpentIncomeData: {
      day: string;
      spent: number;
      income: number;
    }[] = prevDatesSpentIncomeResponse.data;
    const biggestExpenseCatData = biggestExpenseCatResponse.data;

    const overviewPageDataModel: OverviewPageDataModel = {
      totalBalance: totalBalanceResponse.data.totalBalance,
      barChart: {
        labels: prevDatesSpentIncomeData.map((d) => d.day),
        spent: prevDatesSpentIncomeData.map((d) => d.spent),
        income: prevDatesSpentIncomeData.map((d) => d.income),
      },
      donutChart: {
        spent: todaySpentIncomeResponse.data.totalSpent,
        income: todaySpentIncomeResponse.data.totalIncome,
      },
      biggestExpenseCategory: biggestExpenseCatData.slice(0, 7),
    };

    dispatch(
      setPageStatus({ status: Status.Loaded, overview: overviewPageDataModel })
    );
  } catch (e) {
    dispatch(setPageStatus({ status: Status.Error, overview: null }));
  }
};

export default loadOverviewAction;
