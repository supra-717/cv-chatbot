
# CV Chatbot Fix Patch

This patch includes required files to make the Next.js App Router compatible with Vercel:

- `app/layout.jsx`: required layout wrapper for App Router
- `app/globals.css`: basic global styles
- `tailwind.config.js` and `postcss.config.js`: Tailwind support

## How to Apply

1. Copy these files into your GitHub repo.
2. Commit and push: `git add . && git commit -m "Fix layout and Tailwind config" && git push`
3. Redeploy via Vercel
