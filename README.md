# LeetCode Stats Card

A simple **dynamic LeetCode stats card** that can be embedded in your GitHub README.
It fetches your LeetCode stats and renders them as an SVG card with progress bars for **Easy, Medium, and Hard** problems.

The card updates automatically whenever your stats change.

---

## Features

- Dynamic LeetCode stats
- Easy / Medium / Hard progress bars
- SVG card (lightweight and fast)
- Works directly inside GitHub README
- Deployable on **Vercel serverless functions**

---

## API Usage

You must pass your **LeetCode username** as a query parameter.

```
https://your-vercel-domain/api/stats?username=YOUR_LEETCODE_USERNAME
```

Example:

```
https://your-vercel-domain/api/stats?username=nabeel
```

---

## Embed in GitHub README

### Method 1 — Markdown Image

Add this to your `README.md`.

```md
![LeetCode Stats](https://your-vercel-domain/api/stats?username=YOUR_LEETCODE_USERNAME)
```

Example:

```md
![LeetCode Stats](https://your-vercel-domain/api/stats?username=nabeel)
```

---

### Method 2 — HTML Image Tag

You can also use HTML if you want more control.

```html
<img
    src="https://your-vercel-domain/api/stats?username=YOUR_LEETCODE_USERNAME"
/>
```

Example:

```html
<img src="https://your-vercel-domain/api/stats?username=nabeel" />
```

---

## Example Output

```
LeetCode Stats

Easy     ███████████
Medium   ██████████████
Hard     ███
```

---

## Local Development

Run the project locally using Vercel CLI.

```
npx vercel dev
```

Then open:

```
http://localhost:3000/api/stats?username=YOUR_LEETCODE_USERNAME
```

---

## Deployment

The project is designed to run on **Vercel Serverless Functions**.

Steps:

1. Push the repository to GitHub
2. Import the project in Vercel
3. Deploy

After deployment your API will be available at:

```
https://your-project.vercel.app/api/stats
```

---

## Tech Stack

- Node.js
- Vercel Serverless Functions
- LeetCode GraphQL API
- SVG Rendering

---

## ⭐ Support the Project

If you find this project useful, consider giving it a **star** on GitHub.
It helps others discover the project and motivates further improvements.

You can star the repository here:

⭐ **https://github.com/NabeelOG/LeetCode-Card**

Thank you for your support!
