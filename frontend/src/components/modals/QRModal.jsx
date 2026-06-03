import {
  FaDownload,
  FaTimes,
} from "react-icons/fa";

function QRModal({
  isOpen,
  onClose,
  qrCode,
}) {
  if (!isOpen) return null;

  const downloadQR = () => {
    const link =
      document.createElement(
        "a"
      );

    link.href = qrCode;

    link.download =
      "linkopilot-qr.png";

    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-3xl border border-cyan-500/20 bg-zinc-950 overflow-hidden">

        {/* HEADER */}

        <div className="flex items-center justify-between p-6 border-b border-zinc-800">

          <div>

            <h2 className="text-2xl font-bold text-white">
              QR Code
            </h2>

            <p className="text-zinc-400 text-sm mt-1">
              Scan or download your QR.
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition"
          >
            <FaTimes />
          </button>

        </div>

        {/* QR */}

        <div className="p-8 flex justify-center">

          <div className="bg-white p-4 rounded-2xl shadow-xl">

            <img
              src={qrCode}
              alt="QR Code"
              className="w-64 h-64 object-contain"
            />

          </div>

        </div>

        {/* ACTIONS */}

        <div className="p-6 border-t border-zinc-800 flex gap-3">

          <button
            onClick={downloadQR}
            className="
              flex-1
              py-3
              rounded-xl
              bg-gradient-to-r
              from-cyan-400
              to-yellow-400
              text-black
              font-bold
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <FaDownload />

            Download
          </button>

          <button
            onClick={onClose}
            className="
              flex-1
              py-3
              rounded-xl
              border
              border-zinc-700
              text-white
              hover:bg-zinc-900
            "
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default QRModal;