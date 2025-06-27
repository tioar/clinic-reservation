export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "只接受 POST 方法" });
  }

  try {
    const data = req.body;

    const gasUrl = "https://script.google.com/macros/s/AKfycbxKZhPYvQG8MXiu7BhlbJJql6fYYSPe1jtK4cQdjSfvEHX42cUgAtVHcMuadrEcHo-E/exec"; // 請替換

    const response = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: data }) // 要與 GAS 的接收格式一致
    });

    const text = await response.text();
    console.log("GAS 回應內容:", text);

    // 嘗試轉為 JSON
    try {
      const result = JSON.parse(text);
      return res.status(200).json(result);
    } catch (jsonErr) {
      console.error("GAS 回傳的不是 JSON：", jsonErr);
      return res.status(500).json({
        success: false,
        message: "GAS 回傳非 JSON，可能部署網址錯了",
        raw: text
      });
    }
  } catch (err) {
    console.error("伺服器錯誤：", err);
    return res.status(500).json({ success: false, message: "伺服器錯誤" });
  }
}
