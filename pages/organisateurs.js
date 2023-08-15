/**
 * This is a Next.js page component that fetches data from a Strapi API and passes it as props to a
 * child component called Org, which is rendered within a Layout component.
 * @returns The `Organisateurs` component is being returned, which includes a `Layout` component and an
 * `Org` component with the `organisateurs` prop passed to it. Additionally, a `getStaticProps`
 * function is being exported which fetches data from the Strapi API and returns it as props to the
 * `Organisateurs` component.
 */
import Layout from "@/components/Layout";
import Org from "@/components/Org";
import React from "react";
import { fetcher } from "@/lib/api";

const Organisateurs = ({ organisateurs }) => {

  return (
    <>
      <Layout>
        <Org organisateurs={organisateurs} />
      </Layout>
    </>
  );
};

export default Organisateurs;

export async function getStaticProps() {
  const dataResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/organisateurs`
  );

  return {
    props: {
      organisateurs: dataResponse.data,
    },
  };
}
