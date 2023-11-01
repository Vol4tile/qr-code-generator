import React, { useEffect, useRef, useState } from "react";

import QRCodeStyling from "qr-code-styling";
import ColorPicker from "./components/ColorPicker";
import {BiImage} from "react-icons/bi"
const qrCode = new QRCodeStyling({
  width: 250,
  height: 250,

  image: "/qr.svg",
  dotsOptions: {
    color: "fff",
    type: "rounded",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20,
  },
});

export default function App() {
  const [selectedCorner, setSelectedCorner] = useState("square");
  const [dots, setDots] = useState("square");
  const [image, setImage] = useState(null); // Başlangıç rengi
  const [color, setColor] = useState("#000"); // Başlangıç rengi
  const [isDragging, setIsDragging] = useState(false);
  const [url, setUrl] = useState("https://ilkan.vercel.app");
  const [fileExt, setFileExt] = useState("png");
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, [url]);
  useEffect(() => {
    qrCode.update({
      dotsOptions: {
        color: color,
        type: "rounded",
      },
    });
  }, [color]);
  const onUrlChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onCornerChange = (event) => {
    setSelectedCorner(event.target.value);

    qrCode.update({
      cornersSquareOptions: {
        type: event.target.value,
      },
    });
  };
  const onDotsChange = (event) => {
    setDots(event.target.value);

    qrCode.update({
      dotsOptions: {
        type: event.target.value,
      },
    });
  };
  const onDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (event) => {
    event.preventDefault();
    const selectedImage = event.dataTransfer.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;

      qrCode.update({
        image: base64Image,
      });
    };
    reader.readAsDataURL(selectedImage);
    setIsDragging(false);
  };
  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt,
    });
  };
  const onImageSelect = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result; // Base64 formatında görüntü burada

      // qrCode.update gibi bir işlem yapabilirsiniz.
      qrCode.update({
        image: base64Image,
      });
    };
    reader.readAsDataURL(selectedImage);
    // Görüntüyü okuma işlemi başlatılır.
  };
  return (
    <div className="App">
      <h1>Qrcode Generator</h1>
      <div ref={ref} />
      <div className="container">
        Url or Text 
        <input className="url" value={url} onChange={onUrlChange} />
        <div>
          Dots Type:
          <label>
            <input
              type="radio"
              value="square"
              checked={dots === "square"}
              onChange={onDotsChange}
            />
            square
          </label>
          <label>
            <input
              type="radio"
              value="dots"
              checked={dots === "dots"}
              onChange={onDotsChange}
            />
            dots
          </label>
          <label>
            <input
              type="radio"
              value="rounded"
              checked={dots === "rounded"}
              onChange={onDotsChange}
            />
            rounded
          </label>
          <label>
            <input
              type="radio"
              value="extra-rounded"
              checked={dots === "extra-rounded"}
              onChange={onDotsChange}
            />
            extra rounded
          </label>
          <label>
            <input
              type="radio"
              value="classy"
              checked={dots === "classy"}
              onChange={onDotsChange}
            />
            classy
          </label>
          <label>
            <input
              type="radio"
              value="classy-rounded"
              checked={dots === "classy-rounded"}
              onChange={onDotsChange}
            />
            classy rounded
          </label>
        </div>
        <div>
        Corners Type:  <label>
            <input
              type="radio"
              value="square"
              checked={selectedCorner === "square"}
              onChange={onCornerChange}
            />
            square
          </label>
          <label>
            <input
              type="radio"
              value="dot"
              checked={selectedCorner === "dot"}
              onChange={onCornerChange}
            />
            dot
          </label>

          <label>
            <input
              type="radio"
              value="extra-rounded"
              checked={selectedCorner === "extra-rounded"}
              onChange={onCornerChange}
            />
            extra-rounded
          </label>
        </div>
        <div
       
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      
      >
        {image ? <label htmlFor="imageFile" id="draggingSucces">{image.name} uploaded</label>  :<label htmlFor="imageFile" id="dragging"><BiImage/> Drop or Upload Image Here</label>}
        <input type="file" name="imageFile" id="imageFile" accept="image/*" onChange={onImageSelect} style={{display:"none"}} onDragOver={onDragOver} onDrop={onDrop} />
      </div>
      
        
        <ColorPicker color={color} setColor={setColor} />
        <div>
         Download Extension : <label>
            <input
              type="radio"
              value="png"
              checked={fileExt === "png"}
              onChange={onExtensionChange}
            />
            PNG
          </label>
          <label>
            <input
              type="radio"
              value="jpg"
              checked={fileExt === "jpg"}
              onChange={onExtensionChange}
            />
            JPG
          </label>
          <label>
            <input
              type="radio"
              value="webp"
              checked={fileExt === "webp"}
              onChange={onExtensionChange}
            />
            WEBP
          </label>
        </div>
        <button className="downBtn" onClick={onDownloadClick}>Download</button>
      </div>
    </div>
  );
}
