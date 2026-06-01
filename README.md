node 22.12.0

## Mock API (json-server)

```bash
npm run server
```

Uses json-server **0.17.4** with `routes.json` so `/api/*` paths rewrite to `db.json` resources. json-server **1.x** removed the `--routes` CLI flag; use the pinned devDependency, not a global `json-server@1`.

```bash
json-server --watch db.json --port 4000 --routes routes.json
```

netlify connects with your local json-server
https://traianalex.netlify.app

pkill -f "npm run dev" || pkill -f "vite" || echo "No development server processes found"
