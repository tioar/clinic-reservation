export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "只接受 POST 方法" });
  }

  const gasUrl = "https://script.google.com/macros/s/AKfycbxKZhPYvQG8MXiu7BhlbJJql6fYYSPe1jtK4cQdjSfvEHX42cUgAtVHcMuadrEcHo-E/exec"; // ✅ 你的 GAS 網址

  try {
    const response = await fetch(gasUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    console.log("🔁 GAS 回應原文:", text);

    // 嘗試解析 JSON
    try {
      const result = JSON.parse(text);
      return res.status(200).json(result);
    } catch (jsonErr) {
      console.error("❌ GAS 回傳非 JSON：", jsonErr);
      return res.status(502).json({
        success: false,
        message: "GAS 回傳非 JSON，可能部署網址錯誤或內容格式錯誤",
        raw: text
      });
    }

  } catch (error) {
    console.error("❌ 伺服器錯誤：", error);
    return res.status(500).json({
      success: false,
      message: "伺服器錯誤，無法連接 GAS",
      error: error.message
    });
  }
}
