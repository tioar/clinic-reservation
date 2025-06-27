export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "只接受 POST 方法" });
  }

  try {
    const data = req.body;

    // ✅ 這邊填上你部署好的 Google Apps Script Web App URL（要是 /exec 結尾的）
    const gasUrl = "https://script.google.com/macros/s/AKfycbxKZhPYvQG8MXiu7BhlbJJql6fYYSPe1jtK4cQdjSfvEHX42cUgAtVHcMuadrEcHo-E/exec";

    // ✅ 發送 POST 給 GAS
    const response = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: data }) // 傳進 GAS 的格式 key 為 contents
    });

    // ✅ 回應先當字串讀取，這樣能避免 JSON parse 錯誤
    const text = await response.text();
    console.log("GAS 回應內容:", text);

    // ✅ 嘗試解析 JSON，如果不是 JSON，會進 catch
    const result = JSON.parse(text);
    return res.status(200).json(result);

  } catch (err) {
    console.error("伺服器錯誤：", err);
    return res.status(500).json({ success: false, message: "伺服器錯誤" });
  }
}
