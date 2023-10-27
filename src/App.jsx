import React, { useState } from "react";
import QRCode from "qrcode.react";

function App() {
  const [url, setUrl] = useState("");
  const [imageFile, setImageFile] = useState("");

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(URL.createObjectURL(file));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="QR kodu oluşturmak için URL girin"
        value={url}
        onChange={handleInputChange}
      />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <div className="qr-code-container">
        {url && (
          <QRCode
            value={url}
            size={128}
            imageSettings={{
              src: imageFile,
              x: 32, // QR kodunun X koordinatı
              y: 32, // QR kodunun Y koordinatı
              height: 64, // Logo yüksekliği
              width: 64, // Logo genişliği
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
