export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  const apiUrl = `https://service.pace-unv.cloud/api/notes/${id}`;

  switch (method) {
    case "DELETE":
      try {
        const response = await fetch(apiUrl, { method: "DELETE" });
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: "Failed to delete note" });
      }
      break;
    case "PATCH":
      try {
        const response = await fetch(apiUrl, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req.body),
        });
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ error: "Failed to update note" });
      }
      break;
    default:
      res.setHeader("Allow", ["DELETE", "PATCH"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
