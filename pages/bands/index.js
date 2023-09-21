import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";

export default function Bands(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const postsList = data.postConnection.edges;
  return (
    <>
      <h1>Bands</h1>
      <div>
        {postsList.map((post) => (
          <div key={post.node.id}>
            <Link href={`/bands/${post.node._sys.filename}`}>
              {post.node._sys.filename}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.postConnection();

  return {
    props: {
      data,
      query,
      variables,
      //myOtherProp: 'some-other-data',
    },
  };
};