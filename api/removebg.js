import { removeBackground } from "rembg-node";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const chunks = []
    for await (const chunk of req) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)

    if (!buffer || buffer.length < 20) {
      return res.status(400).json({ error: "No image provided" })
    }

    const output = await removeBackground(buffer)

    res.setHeader("Content-Type", "image/png")
    res.send(output)
  } catch (err) {
    res.status(500).json({ error: "Processing failed" })
  }
}
