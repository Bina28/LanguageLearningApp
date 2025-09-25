import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Cropper, { type Area } from "react-easy-crop";
import Modal from "react-modal";


// Funksjon for å lage beskåret bilde fra canvas
type CroppedArea = { x: number; y: number; width: number; height: number };

const getCroppedImg = (imageSrc: string, crop: CroppedArea) => {
  const canvas = document.createElement("canvas");
  const img = new Image();
  img.src = imageSrc;
  return new Promise<string>((resolve) => {
    img.onload = () => {
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(
        img,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
      resolve(canvas.toDataURL("image/jpeg"));
    };
  });
};

export default function EditProfileImage() {
  const [image, setImage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<CroppedArea | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: { "image/*": [] },
    noClick: true,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setImage(url);
        setModalOpen(true);
      }
    },
  });

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: CroppedArea) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (image && croppedArea) {
      const croppedImg = await getCroppedImg(image, croppedArea);
      setFinalImage(croppedImg);
      setModalOpen(false);
      // Send croppedImg til backend her hvis du vil
    }
  };

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <img
          src={finalImage || "/default-profile.png"}
          alt="Profile"
          style={{ width: 150, height: 150, borderRadius: "50%" }}
        />
        <button type="button" onClick={open}>
          Edit
        </button>
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        ariaHideApp={false}
      >
        {image && (
          <div style={{ position: "relative", width: "100%", height: 400 }}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        )}
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setModalOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
}
