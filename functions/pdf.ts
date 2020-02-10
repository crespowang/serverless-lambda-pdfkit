import PDFDocument from "pdfkit";
import middy from "@middy/core";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";

const generatePdf = async (): Promise<Buffer> => {
  return new Promise((resolve: Function, reject: Function): any => {
    const doc = new PDFDocument();
    doc.text("How Are You");
    doc.end();
    const buffers: any = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
  });
};
const handler = async (event: any) => {
  const stream = await generatePdf();
  return {
    statusCode: 200,
    isBase64Encoded: true,
    headers: {
      "Content-type": "application/pdf"
    },
    body: stream.toString("base64")
  };
};

export const generate = middy(handler).use(doNotWaitForEmptyEventLoop());
