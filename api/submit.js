export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "只接受 POST 方法" });
  }

  const gasUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
  const data = req.body;

  try {
    const response = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const text = await response.text();
    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch (e) {
      console.error("GAS 回傳不是 JSON：", text);
      return res.status(500).json({ success: false, message: "GAS 回傳格式錯誤", detail: text });
    }
  } catch (err) {
    console.error("GAS 請求失敗：", err);
    return res.status(500).json({ success: false, message: "伺服器錯誤", error: err.message });
  }
}

