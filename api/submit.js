export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "只接受 POST 方法" });
  }

  try {
    const data = req.body;

    // 改成你自己的 GAS 部署網址（可從 Apps Script 取得）
    const gasUrl = "https://script.google.com/macros/s/AKfycbxKZhPYvQG8MXiu7BhlbJJql6fYYSPe1jtK4cQdjSfvEHX42cUgAtVHcMuadrEcHo-E/exec";

    const response = await fetch(gasUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: data })
    });

    const result = await response.json();
    return res.status(200).json(result);

  } catch (error) {
    console.error("GAS 轉送錯誤：", error);
    return res.status(500).json({ message: "伺服器錯誤，請稍後再試" });
  }
}
