import jsoning from "jsoning";

const db = new jsoning("tags.json");

export async function getTags() {
  const tags = await db.get("tags");
  return tags ?? [];
}

export async function addTag(tag) {
  await db.push("tags", tag);
}
