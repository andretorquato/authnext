import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext";
import { setupAPIClient } from "../services/api";
import { apiClient } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  

  useEffect(() => {
    apiClient.get("/me").then((response) => console.log(response.data));
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      <Can permissions={['metrics.list']}>
          <h1>Metricas</h1>
      </Can>
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
);
