import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
          title="Iglesia Bautista fundamental"
          description="Consola administrativa"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-5">
        <div className="col-span-12 xl:col-span-8">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-4">
          <DemographicCard />
        </div>
      </div>
    </>
  );
}
