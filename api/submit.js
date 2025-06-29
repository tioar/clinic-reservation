export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "只接受 POST 方法" });
  }

  const gasUrl = "https://script.google.com/macros/s/AKfycbzaBxtAMpNokSiwcRTucGjR6Z8M3D2C4_3hXxJ8SwzFQHxH9sJHj3wWVxJKc3P7t8RS/exec";

  try {
    const response = await fetch(gasUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();

    try {
      const json = JSON.parse(text); // 嘗試解析回傳 JSON
      return res.status(200).json(json);
    } catch (jsonErr) {
      console.error("GAS 回傳非 JSON：", text);
      return res.status(500).json({
        success: false,
        message: "GAS 回傳非 JSON",
        raw: text
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: "Vercel 後端錯誤：" + err.message });
  }
}
