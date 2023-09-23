export const ImageBlock = ({ data }) => {
  //console.log("hb"+ data)
  return <>{data.imgSrc && <img src={data.imgSrc} className=" mx-auto" />}</>;
};
