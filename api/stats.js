export default async function handler(req, res) {
    const username = req.query.username || "your_username";

    const query = {
        query: `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `,
        variables: { username },
    };

    const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
    });

    const data = await response.json();

    const stats = data.data.matchedUser.submitStats.acSubmissionNum;

    const easy = stats.find((s) => s.difficulty === "Easy").count;
    const medium = stats.find((s) => s.difficulty === "Medium").count;
    const hard = stats.find((s) => s.difficulty === "Hard").count;
    const total = stats.find((s) => s.difficulty === "All").count;

    const svg = `
  <svg width="350" height="120" xmlns="http://www.w3.org/2000/svg">
    <rect width="350" height="120" fill="#0f172a"/>
    <text x="20" y="30" fill="#38bdf8" font-size="18">LeetCode Stats</text>
    <text x="20" y="60" fill="white">Total: ${total}</text>
    <text x="20" y="80" fill="white">Easy: ${easy}</text>
    <text x="120" y="80" fill="white">Medium: ${medium}</text>
    <text x="250" y="80" fill="white">Hard: ${hard}</text>
  </svg>
  `;

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
}
