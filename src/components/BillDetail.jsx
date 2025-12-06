export const BillDetail = (props) => {
  const { ocrText } = props;
  return (
    <div
      data-aos="fade-up"
      htmlFor="imageUpload"
      className="mt-5 mx-5 lg:mx-0 bg-purple-950"
    >
      <h1 className="text-sm lg:text-2xl">{ocrText}</h1>
    </div>
  );
};
