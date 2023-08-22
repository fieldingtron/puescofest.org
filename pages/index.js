import { TinaMarkdown } from "tinacms/dist/rich-text";
import { HomepageLayout, Layout } from "../components/HomepageLayout";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page.body;
  const facebook = data.page.facebook;
  const bands = data.page.bands;
  //console.log(data.page);

  return (
    <HomepageLayout pagez={data.page}>
      <h2 data-tina-field={tinaField(data.page, "facebook")}>{facebook}</h2>
      <div data-tina-field={tinaField(data.page, "body")}>
        <TinaMarkdown content={content} />
      </div>
    </HomepageLayout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.page({
    relativePath: "home.mdx",
  });

  return {
    props: {
      data,
      query,
      variables,
      //myOtherProp: 'some-other-data',
    },
  };
};
