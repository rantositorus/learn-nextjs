import Layout from "@/layout";
import { useRouter } from "next/router";

export default function UsersByName() {
  const router = useRouter();
  const { id } = router?.query;

  return (
    <Layout>
      <h1>Users by name {id} </h1>
    </Layout>
  );
}
