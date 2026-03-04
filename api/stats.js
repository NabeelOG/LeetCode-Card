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

    const totalProblems = easy + medium + hard;

    // bar widths (max width = 200)
    const maxBar = 200;
    const easyWidth = (easy / totalProblems) * maxBar;
    const mediumWidth = (medium / totalProblems) * maxBar;
    const hardWidth = (hard / totalProblems) * maxBar;

    const svg = `
        <svg width="350px" viewBox="0 0 500 180" xmlns="http://www.w3.org/2000/svg">

        <rect width="100%" height="180" fill="#0f172a" rx="10"/>

        <text x="20" y="35" fill="#38bdf8" font-size="20" font-weight="bold">
            LeetCode Stats
        </text>

        <!-- EASY -->
        <text x="20" y="70" fill="white" font-size="14">Easy</text>
        <rect x="80" y="58" width="${maxBar}" height="14" fill="#1e293b" rx="7"/>
        <rect x="80" y="58" width="${easyWidth}" height="14" fill="#22c55e" rx="7"/>
        <text x="${90 + maxBar}" y="70" fill="white" font-size="14">${easy}</text>

        <!-- MEDIUM -->
        <text x="20" y="105" fill="white" font-size="14">Medium</text>
        <rect x="80" y="93" width="${maxBar}" height="14" fill="#1e293b" rx="7"/>
        <rect x="80" y="93" width="${mediumWidth}" height="14" fill="#eab308" rx="7"/>
        <text x="${90 + maxBar}" y="105" fill="white" font-size="14">${medium}</text>

        <!-- HARD -->
        <text x="20" y="140" fill="white" font-size="14">Hard</text>
        <rect x="80" y="128" width="${maxBar}" height="14" fill="#1e293b" rx="7"/>
        <rect x="80" y="128" width="${hardWidth}" height="14" fill="#ef4444" rx="7"/>
        <text x="${90 + maxBar}" y="140" fill="white" font-size="14">${hard}</text>

        </svg>
    `;

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
}
