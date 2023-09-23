export const HeadingBlock = ({ data }) => {
  //console.log("hb" + data);
  return <h1 className="text-4xl text-center py-2">{data.heading}</h1>;
};
