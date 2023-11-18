import { db } from "@/db";
import { candidates, education } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as fs from "fs";
import * as pdf from "pdfjs";
import { UTApi } from "uploadthing/server";

interface FileEsque extends Blob {
  name: string;
}

const getImage = async (imageUrl: string) => {
  const filePath = imageUrl.substr(0, imageUrl.lastIndexOf(".")) + ".jpg";
  let fimg = await fetch(filePath);
  let fimgb = Buffer.from(await fimg.arrayBuffer());
  return fimgb;
};

export async function generate(candId: number) {
  const candidate = await db.query.candidates.findFirst({
    where: eq(candidates.id, candId),
  });
  if (!candidate) {
    return;
  }
  const txt_ty = {
    fontSize: 9,
    padding: 2,
  };
  const heading_ty = {
    fontSize: 10,
    padding: 2,
    colspan: 4,
    // textAlign: "center",

    backgroundColor: 0x666666,
    color: 0xffffff,
  };

  const doc = new pdf.Document({
    font: require("pdfjs/font/Helvetica"),
    padding: 30,
  });

  // doc.pipe(fs.createWriteStream("output.pdf"));

  // render something onto the document
  // uttar-pradesh-government-logo.png

  const img1 = new pdf.Image(fs.readFileSync("public/images/header.jpg"));
  doc.image(img1, {
    height: 85,
    align: "center",
  });

  const table = doc.table({
    widths: [null, null, null, null],
    borderWidth: 0.2,
  });
  const row1 = table.row();

  row1.cell("Registration No", { ...txt_ty });
  row1.cell(candidate.registrationNo, {
    ...txt_ty,
    colspan: 2,
  });
  row1.cell("Cell 3", { ...txt_ty, backgroundColor: 0xeeeeee });

  const table1 = doc.table({
    widths: [80, null, 80, null],
    borderWidth: 0.2,
  });

  const row2 = table1.row();
  row2.cell("Personal Details", { ...heading_ty });

  const row2a = table1.row();
  row2a.cell("candidate Name", { ...txt_ty });
  row2a.cell(candidate.name.toUpperCase(), { ...txt_ty });
  row2a.cell("Date Of Birth", { ...txt_ty });
  row2a.cell(candidate.dateOfBirth, { ...txt_ty });

  const row2b = table1.row();
  row2b.cell("Mother Name", { ...txt_ty });
  row2b.cell(candidate.motherName, { ...txt_ty });
  row2b.cell("Gender", { ...txt_ty });
  row2b.cell(candidate.gender.toUpperCase(), { ...txt_ty });

  const row2c = table1.row();
  row2c.cell("Father Name", { ...txt_ty });
  row2c.cell(candidate.fatherName.toUpperCase(), { ...txt_ty });
  row2c.cell("Category", { ...txt_ty });
  row2c.cell(candidate.category.toUpperCase(), { ...txt_ty });

  const row2d = table1.row();
  row2d.cell("Sub Category", { ...txt_ty });
  row2d.cell(`${candidate.sub_category?.toUpperCase()}`, { ...txt_ty });
  row2d.cell("Nationality", { ...txt_ty });
  row2d.cell(candidate.nationality.toUpperCase(), { ...txt_ty });

  const table3 = doc.table({
    widths: [80, null, 40, 80, 80, 40, 40, 40],
    borderWidth: 0.2,
  });

  const row3 = table3.row();
  row3.cell("Educational Details", { ...heading_ty, colspan: 8 });

  const row3a = table3.row();
  row3a.cell("Qualification", { ...txt_ty });
  row3a.cell("Board/University Name", { ...txt_ty });
  row3a.cell("Year", { ...txt_ty });
  row3a.cell("Marksheet No", { ...txt_ty });
  row3a.cell("RollNo", { ...txt_ty });
  row3a.cell("Total Marks", { ...txt_ty });
  row3a.cell("Obtained Marks", { ...txt_ty });
  row3a.cell("Marks Per(%)", { ...txt_ty });

  const educationList = [];
  if (candidate.highSchool) {
    const hs = await db.query.education.findFirst({
      where: eq(education.id, candidate.highSchool),
    });
    educationList.push(hs);
  }
  if (candidate.intermediate) {
    const inter = await db.query.education.findFirst({
      where: eq(education.id, candidate.intermediate),
    });
    educationList.push(inter);
  }
  if (candidate.graduation) {
    const gr = await db.query.education.findFirst({
      where: eq(education.id, candidate.graduation),
    });
    educationList.push(gr);
  }

  for (let i = 0; i < educationList.length; i++) {
    let row3i = table3.row();
    row3i.cell(educationList[i]?.qualification?.toUpperCase(), {
      ...txt_ty,
    });
    row3i.cell(educationList[i]?.board?.toUpperCase(), { ...txt_ty });
    row3i.cell(`${educationList[i]?.year}`, { ...txt_ty });
    row3i.cell(educationList[i]?.marksheetNumber?.toUpperCase(), { ...txt_ty });
    row3i.cell(educationList[i]?.rollNo?.toUpperCase(), { ...txt_ty });
    row3i.cell(`${educationList[i]?.total}`, { ...txt_ty });
    row3i.cell(`${educationList[i]?.obtained}`, { ...txt_ty });
    row3i.cell(`${educationList[i]?.percentage}`, { ...txt_ty });
  }
  const table4 = doc.table({
    widths: [100, null, 100, null],
    borderWidth: 0.2,
  });

  const row4 = table4.row();
  row4.cell("Communication/Correspondance Address ", {
    ...heading_ty,
    colspan: 4,
  });

  const row4a = table4.row();
  row4a.cell("Address", { ...txt_ty });
  row4a.cell(candidate.address?.toUpperCase(), {
    ...txt_ty,
    colspan: 3,
  });

  const row4b = table4.row();
  row4b.cell("District", { ...txt_ty });
  row4b.cell(candidate.district?.toUpperCase(), { ...txt_ty });
  row4b.cell("State", { ...txt_ty });
  row4b.cell(candidate.state?.toUpperCase(), { ...txt_ty });

  const row4c = table4.row();
  row4c.cell("Pin Code", { ...txt_ty });
  row4c.cell(candidate.pin?.toUpperCase(), { ...txt_ty });
  row4c.cell("Email id", { ...txt_ty });
  row4c.cell(`${candidate.email}`, { ...txt_ty });

  const table5 = doc.table({
    widths: [100, null, 100, null],
    borderWidth: 0.2,
  });
  const row5 = table5.row();
  row5.cell("Registration Fee Details", {
    ...heading_ty,
    colspan: 4,
  });
  const row5a = table5.row();
  row5a.cell("Payment Mode", { ...txt_ty });
  row5a.cell(candidate.registrationMode?.toUpperCase(), { ...txt_ty });
  row5a.cell("Transaction Id", { ...txt_ty });
  row5a.cell(candidate.transaction_id?.toUpperCase(), { ...txt_ty });

  const row5b = table5.row();
  row5b.cell("Amount", { ...txt_ty });
  row5b.cell(`${candidate.amount}`, { ...txt_ty });
  row5b.cell("Date of Transaction", { ...txt_ty });
  row5b.cell(candidate.txnDate ? candidate.txnDate : "", { ...txt_ty });

  const table6 = doc.table({
    widths: [null, null],
    borderWidth: 0.2,
  });

  const row6 = table6.row();
  row6.cell("Document Uploaded", { ...heading_ty, colspan: 2 });
  const row6a = table6.row();
  row6a.cell("Photograph", { ...txt_ty });
  row6a.cell("Signature", { ...txt_ty });

  const photoName = candidate.photo || "";
  const profileImage = await getImage(photoName);
  const img_profile = new pdf.Image(profileImage);

  const sigName = candidate.signature || "";
  const sigImage = await getImage(sigName);
  const img_sig = new pdf.Image(sigImage);
  const row6b = table6.row();
  row6b.cell({ ...txt_ty }).image(img_profile, { align: "center", height: 90 });
  row6b.cell({ ...txt_ty }).image(img_sig, { align: "center", height: 90 });

  const row7 = table6.row();
  row7.cell("Decleration", {
    ...heading_ty,
    colspan: 2,
    backgroundColor: 0x333333,
  });

  const img2 = new pdf.Image(fs.readFileSync("public/images/micro.jpg"));
  doc.image(img2, {
    height: 95,
    align: "center",
  });

  const table7 = doc.table({
    widths: [null, null],
    borderWidth: 0.2,
  });
  const row7a = table7.row();
  row7a.cell(`Submission Date: ${candidate.submissionDate}`, { ...txt_ty });
  row7a.cell(`Print Date: ${candidate.printDate}`, { ...txt_ty });

  const row7b = table7.row();
  row7b.cell(`${candidate.ac_num}`, { ...txt_ty, colspan: 2 });

  const buf = await doc.asBuffer();
  const blob = new Blob([buf], { type: "application/pdf" });

  const utapi = new UTApi();
  const response = await utapi.uploadFiles(new File([blob], "filename.pdf"));

  if (response.data) {
    const updatedUserFile: { updatedId: number; fileUrl: string | null }[] =
      await db
        .update(candidates)
        .set({ fileUrl: response.data.url })
        .where(eq(candidates.id, candId))
        .returning({ updatedId: candidates.id, fileUrl: candidates.fileUrl });
    return response.data.url;
  }
  // await doc.end();
}
