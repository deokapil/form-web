import { eq, gt, and, inArray } from "drizzle-orm";
import { db } from "./db"; // Assuming you have your database connection configured
import { candidates } from "./db/schema"; // Import your schema
import { generate } from "./lib/pdf";

async function getCandidatesAfterDate() {
  try {
    const results = await db.query.candidates.findMany({
      where: inArray(candidates.id, [395]),
    });

    return results;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    throw error;
  }
}

// If you need to include type definitions
type Candidate = typeof candidates.$inferSelect;

// Usage example
async function main() {
  const candidatesList = await getCandidatesAfterDate();
  for (const candidate of candidatesList) {
    const asUrl = await generate(candidate.id);
    console.log(`${candidate.id}, ${candidate.newReg}, ${asUrl}`);
    // console.log(`${candidate.id}, ${candidate.newReg} `);
  }
}

main();
