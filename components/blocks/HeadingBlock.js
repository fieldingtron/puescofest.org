import Heading from "../Heading";

export const HeadingBlock = ({ data }) => {
  //console.log("hb" + data);
  return <Heading text={data.heading} />;
};
