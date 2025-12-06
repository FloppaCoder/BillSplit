import { useEffect, useState } from "react";
//AOS
import AOS from "aos";
import "aos/dist/aos.css";
//Components
import { ImagePreview } from "./components/ImagePreview";
import { BillDetail } from "./components/BillDetail";
//Styles
import "./App.css";
//Tesseract
import Tesseract from "tesseract.js";
import { createWorker } from "tesseract.js";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [loadingOCR, setLoadingOCR] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [selectedImage]);

  function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const imageURL = URL.createObjectURL(file);
    setSelectedImage(imageURL);
    runOCR(imageURL);
  }

  async function runOCR(imageURL) {
    setOcrText("");
    setLoadingOCR(true);

    try {
      const { data } = await Tesseract.recognize(imageURL, "eng");

      setOcrText(data.text);
      console.log(data.text);
    } catch (error) {
      console.error(error);
      setOcrText("Error procesando OCR.");
    }

    setLoadingOCR(false);
  }

  function UploadInstructions() {
    return (
      <>
        <h1 className="text-lg lg:text-2xl ">
          Sube la imagen de tu cuenta aqui!
        </h1>
        <h1 className="text-xs font-medium mt-5">
          Intenta mostrar unicamente produtos, precios, cantidades, subtotales y
          totales
        </h1>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen items-center">
        {/* Header */}
        <div
          data-aos="fade-down"
          className="flex flex-col bg-purple-950 rounded-full mt-2 px-15 py-2 pb-3 w-82 items-center justify-center"
        >
          <h1 data-aos="fade-left" data-aos-delay="200" className="text-3xl">
            BillSpliter
          </h1>
          <h1 data-aos="fade-right" data-aos-delay="400" className="text-xs">
            by FloppaCoder
          </h1>
        </div>

        <div className="flex flex-col flex-1 justify-center items-center w-full">
          <label
            htmlFor="imageUpload"
            className="mx-5 lg:mx-0 bg-purple-950 hover:bg-purple-900 border-2 border-purple-700 border-dashed cursor-pointer"
          >
            <div className="text-center content-center py-5 px-5 lg:px-20">
              {!selectedImage ? (
                UploadInstructions()
              ) : loadingOCR ? (
                <h1 className="text-lg lg:text-2xl">Procesando Reconocimiento Óptico de Caracteres...</h1>
              ) : (
                <ImagePreview selectedImage={selectedImage} ocrText={ocrText} />
              )}
            </div>
            <input
              className="hidden"
              id="imageUpload"
              type="file"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
