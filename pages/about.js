/**
 * This is a JavaScript function that returns an about page component with a header and layout
 * component.
 * @returns The About component is being returned, which includes a Layout component and a heading
 * element with the text "This is an about page".
 */
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <h1 className=" font-mono text-3xl font-extrabold">
        This is an about page
      </h1>
    </Layout>
  );
};

export default About;
