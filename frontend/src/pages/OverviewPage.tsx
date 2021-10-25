import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import loadOverviewAction from "../store/overview/overview-actions";
import { Status } from "../constants/status";

import PageLayout from "../components/overview/PageLayout";
import TotalBalance from "../components/overview/overviewComponents/TotalBalance";
import PrevDateDataChart from "../components/overview/overviewComponents/PrevDateDataChart";
import TodayExpenseIncome from "../components/overview/overviewComponents/TodayExpenseIncome";
import BiggestExpenseCategories from "../components/overview/overviewComponents/BiggestExpenseCategories/BiggestExpenseCategories";
import PageError from "../components/UI/pageLoadingError/PageError";
import PageLoading from "../components/UI/pageLoadingError/PageLoading";

function OverviewPage() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.overview);
  const { pageStatus, overview } = state;

  const onReload = () => dispatch(loadOverviewAction());

  useEffect(() => {
    dispatch(loadOverviewAction());
  }, []);

  return (
    <>
      {pageStatus === Status.Error && <PageError onClick={onReload} />}
      {pageStatus === Status.Loading && <PageLoading />}
      {pageStatus === Status.Loaded && (
        <PageLayout
          totalBalance={<TotalBalance balance={overview!.totalBalance} />}
          prevDateDataChart={
            <PrevDateDataChart
              labels={overview!.barChart.labels}
              spentData={overview!.barChart.spent}
              incomeData={overview!.barChart.income}
            />
          }
          todayExpenseIncome={
            <TodayExpenseIncome
              spent={overview!.donutChart.spent}
              income={overview!.donutChart.income}
            />
          }
          biggestExpenseCategories={
            <BiggestExpenseCategories
              biggestExpense={overview!.biggestExpenseCategory}
            />
          }
        />
      )}
    </>
  );
}

export default OverviewPage;
