export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "只接受 POST 方法" });
  }

  try {
    const data = req.body;

    const gasUrl = "https://script.google.com/macros/s/AKfycbxKZhPYvQG8MXiu7BhlbJJql6fYYSPe1jtK4cQdjSfvEHX42cUgAtVHcMuadrEcHo-E/exec";

    const response = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: data }) // ✅ 注意這層 key
    });

    const result = await response.json();
    return res.status(200).json(result);
  } catch (err) {
    console.error("伺服器錯誤", err);
    return res.status(500).json({ success: false, message: "伺服器錯誤" });
  }
}
