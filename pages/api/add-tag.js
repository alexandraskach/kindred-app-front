import { addTag } from "../../logic/tagsDatabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(404).json({ error: "Invalid Method" });
    return;
  }
  await addTag(req.body.tag);
  res.status(204).end();
}
