export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "只接受 POST 方法" });
  }

  const data = req.body;
  const gasUrl = "https://script.google.com/macros/s/AKfycbzaBxtAMpNokSiwcRTucGjR6Z8M3D2C4_3hXxJ8SwzFQHxH9sJHj3wWVxJKc3P7t8RS/exec";

  const response = await fetch(gasUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: data }),
  });

  const text = await response.text();
  try {
    const result = JSON.parse(text);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ success: false, message: "GAS 回傳非 JSON" });
  }
}
