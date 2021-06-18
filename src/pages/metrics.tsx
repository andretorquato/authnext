import { GetServerSideProps } from "next";
import { setupAPIClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  return (
    <>
      <h1>Metricas</h1>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    try {
      const response = await apiClient.get("/me");
    } catch (err) {}

    return {
      props: {},
    };
  }
, {
  permissions: ['metrics.list2'],
  roles: ['administrator']
});
