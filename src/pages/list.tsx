import { useRef } from "react";
import { jsPDF } from "jspdf";

import { createRandomContent, createRandomImage, createRandomTitle } from "../mock/content";
import { faker } from "@faker-js/faker";
import { renderList } from "../logic/pdf";

export default function List() {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = async () => {
    try {
      if (contentRef.current) {
        const doc = new jsPDF();

        await renderList({
          x: 1,
          y: 5,
          pdf: doc,
          list: contentRef.current.children,
          pageMarginY: 5,
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
          {[...new Array(faker.number.int({ min: 5, max: 20 }))].map((_, idx) => (
            <div key={idx} className="post">
              <h1 style={{ margin: "8px 0" }}>{createRandomTitle()}</h1>
              <img src={createRandomImage()} alt="" />
              <p>{createRandomContent({ min: 3, max: 12 })}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
