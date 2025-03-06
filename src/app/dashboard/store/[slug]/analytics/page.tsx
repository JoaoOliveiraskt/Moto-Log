import React, { Suspense } from "react";
import MonthlyIncomeChart from "./components/monthly-income-chart";
import { getUserStore } from "@/app/actions/store/get-user-store";
import getStoreMetrics from "@/app/actions/store/get-store-metrics";
import getRecentUsers from "@/app/actions/store/get-recent-user";
import getMonthlyRevenue from "@/app/actions/store/get-monthly-revenue";
import TotalRevenue from "./components/total-revenue-card";
import TotalFollowers from "./components/total-followers-card";
import TotalSales from "./components/total-sales-card";
import TotalOrders from "./components/total-orders-card";
import RecentSalesCard from "./components/recent-sales-card";
import {
  ChartSkeleton,
  MetricsSkeleton,
  RecentSalesSkeleton,
  StoreStatsSkeleton,
} from "./components/analytics-skeleton";

const DashboardAnalytics = async () => {
  const store = await getUserStore();
  const storeMetrics = await getStoreMetrics(store.id);
  const recentUsers = await getRecentUsers(store.id);
  const monthlyRevenue = await getMonthlyRevenue(store.id);

  return (
    <main className="flex flex-col gap-4 md:gap-4 mt-4 px-4 lg:px-0">
      <div className="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <Suspense fallback={<MetricsSkeleton />}>
          <TotalRevenue totalRevenue={storeMetrics.receitaTotal} />
          <TotalSales totalVendas={storeMetrics.totalVendas} />
        </Suspense>

        <Suspense fallback={<StoreStatsSkeleton />}>
          <TotalFollowers storeFollowers={store._count.followers} />
          <TotalOrders totalOrders={store._count.pedidos} />
        </Suspense>
      </div>

      <div className="grid gap-4 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <Suspense fallback={<ChartSkeleton />}>
          <MonthlyIncomeChart MonthlyRevenue={monthlyRevenue} />
        </Suspense>

        <Suspense fallback={<RecentSalesSkeleton />}>
          <RecentSalesCard
            recentUsers={recentUsers.map((user) => ({
              ...user,
            }))}
          />
        </Suspense>
      </div>
    </main>
  );
};

export default DashboardAnalytics;
