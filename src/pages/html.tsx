import { useRef } from "react";
import { jsPDF } from "jspdf";

import { createRandomContent, createRandomImage, createRandomTitle } from "../mock/content";

export default function Html() {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = async () => {
    try {
      if (contentRef.current) {
        const doc = new jsPDF();

        await doc.html(contentRef.current, {
          x: 5,
          y: 5,
          autoPaging: "text",
          html2canvas: { scale: 0.2 },
        });

        doc.save();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>HTML</h1>
      <button style={{ marginTop: 16 }} onClick={handlePrint}>
        print
      </button>
      <div className="page">
        <div ref={contentRef}>
          <h1 style={{ margin: "8px 0" }}>{createRandomTitle()}</h1>
          <img src={createRandomImage()} alt="" />
          <p>{createRandomContent({ min: 20, max: 40 })}</p>
        </div>
      </div>
    </div>
  );
}
