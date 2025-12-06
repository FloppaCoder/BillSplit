export const ImagePreview = (props) => {
  const { selectedImage, ocrText } = props;
  return (
    <div data-aos="fade-down">
      <h1 className="text-lg lg:text-2xl ">Cuenta Subida con Éxito!</h1>
      <img
        src={selectedImage}
        alt="Preview"
        className="mt-5 h-80 lg:h-90 mx-auto"
      />
      <h1 className="mt- 5 text-sm lg:text-2xl">{ocrText}</h1>
    </div>
  );
};
