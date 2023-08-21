import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const addNewPage = ({
  pdf,
  afterAddNewPage,
  beforeAddNewPage,
}: {
  pdf: jsPDF;
  beforeAddNewPage?: () => void;
  afterAddNewPage?: () => void;
}) => {
  beforeAddNewPage && beforeAddNewPage();
  pdf.addPage();
  afterAddNewPage && afterAddNewPage();
};

export const writeFooter = ({ pdf, page }: { pdf: jsPDF; page: number }) => {
  const docWidth = pdf.internal.pageSize.getWidth();
  const docHeight = pdf.internal.pageSize.getHeight();

  pdf.setFontSize(11);
  pdf.text("Footer", 10, docHeight - 10);
  pdf.text("Page " + page, docWidth - 20, docHeight - 10);
};

export async function takeSnapshot({ docWidth, element }: { element: HTMLElement; docWidth: number }) {
  const canvas = await html2canvas(element, {
    allowTaint: true,
    useCORS: true,
  });
  const imgHeight = (canvas.height * docWidth) / canvas.width;

  return { data: canvas.toDataURL("image/jpeg", 1.0), height: imgHeight };
}

export async function addElementToPdf({
  x,
  y,
  pdf,
  width,
  element,
}: {
  pdf: jsPDF;
  x: number;
  y: number;
  width?: number;
  element: HTMLElement;
}) {
  const docWidth = pdf.internal.pageSize.getWidth();
  const { data, height } = await takeSnapshot({ element, docWidth });

  pdf.addImage(data, "JPEG", x, y, width || docWidth, height);
  return pdf;
}

export async function renderList({
  x,
  y,
  pdf,
  list,
  pageMarginY,
  afterAddNewPage,
  beforeAddNewPage,
}: {
  x?: number;
  y?: number;
  pdf: jsPDF;
  list: HTMLCollection;
  pageMarginY?: number;
  beforeAddNewPage?: () => void;
  afterAddNewPage?: () => void;
}) {
  const docWidth = pdf.internal.pageSize.getWidth();
  const docHeight = pdf.internal.pageSize.getHeight();

  const positionX = x || 10;
  let positionY = y || 10;
  let currentPage = 1;

  const renderContent = (child: HTMLElement) => {
    return new Promise((resolve) => {
      html2canvas(child, {
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        const imgHeight = (canvas.height * docWidth) / canvas.width;

        if (positionY + imgHeight > docHeight) {
          addNewPage({
            pdf,
            beforeAddNewPage() {
              if (beforeAddNewPage) {
                beforeAddNewPage();
              } else {
                writeFooter({
                  pdf,
                  page: currentPage,
                });
              }
            },
            afterAddNewPage() {
              if (afterAddNewPage) {
                afterAddNewPage();
              } else {
                positionY = (pageMarginY || 0) + 20;
                currentPage++;
              }
            },
          });
        }

        pdf.addImage(imgData, "JPEG", positionX, positionY, docWidth, imgHeight);
        positionY += imgHeight + 15;

        resolve([]);
      });
    });
  };

  const children = Array.from(list);

  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    await renderContent(child as HTMLElement);
  }
  writeFooter({
    pdf,
    page: currentPage,
  });
}
