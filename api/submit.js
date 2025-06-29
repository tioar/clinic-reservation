// ===========================
// Vercel /api/submit.js 後端
// ===========================

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
      body: JSON.stringify(data)
    });

    const text = await response.text();
    try {
      const result = JSON.parse(text);
      return res.status(200).json(result);
    } catch (jsonErr) {
      console.error("GAS 返回非 JSON：", text);
      return res.status(500).json({
        success: false,
        message: "GAS 回傳非 JSON，可能部署網址錯誤或語法錯誤",
        raw: text
      });
    }
  } catch (err) {
    console.error("伺服器錯誤：", err);
    return res.status(500).json({ success: false, message: "伺服器錯誤" });
  }
}
