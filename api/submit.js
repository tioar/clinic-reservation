export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbxKZhPYvQG8MXiu7BhlbJJql6fYYSPe1jtK4cQdjSfvEHX42cUgAtVHcMuadrEcHo-E/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const result = await response.json();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ success: false, message: "伺服器錯誤", error: err.message });
    }
  } else {
    res.status(405).json({ success: false, message: "只允許 POST 方法" });
  }
}
