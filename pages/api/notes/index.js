export default async function handler(req, res) {
  const { method } = req;
  const apiUrl = "https://service.pace-unv.cloud/api/notes";

  switch (method) {
    case "GET":
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch notes" });
      }
      break;
    case "POST":
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req.body),
        });
        const data = await response.json();
        res.status(201).json(data);
      } catch (error) {
        res.status(500).json({ error: "Failed to create note" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
