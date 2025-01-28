import React from "react";
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

const DashboardAnalytics = async () => {
  const store = await getUserStore();
  const storeMetrics = await getStoreMetrics(store.id);
  const recentUsers = await getRecentUsers(store.id);
  const monthlyRevenue = await getMonthlyRevenue(store.id);

  return (
    <main className="flex flex-col gap-4 md:gap-4 mt-4 h-max">
      <div className="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <TotalRevenue totalRevenue={storeMetrics.receitaTotal} />
        <TotalSales totalVendas={storeMetrics.totalVendas} />
        <TotalFollowers storeFollowers={store._count.followers} />
        <TotalOrders totalOrders={store._count.pedidos} />
      </div>

      <div className="grid gap-4 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <MonthlyIncomeChart MonthlyRevenue={monthlyRevenue} />

        <RecentSalesCard
          recentUsers={recentUsers.map((user) => ({
            ...user,
          }))}
        />
      </div>
    </main>
  );
};

export default DashboardAnalytics;
