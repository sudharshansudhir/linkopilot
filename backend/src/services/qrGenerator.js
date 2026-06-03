import QRCode from "qrcode";

const generateQRCode = async (url) => {
  try {
    const qrCode = await QRCode.toDataURL(url);

    return qrCode;
  } catch (error) {
    console.log("QR Generation Error:", error);

    return "";
  }
};

export default generateQRCode;