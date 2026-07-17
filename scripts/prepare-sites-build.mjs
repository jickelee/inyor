import { mkdir, readdir, rename, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const dist = new URL('../dist/', import.meta.url);
const client = new URL('./client/', dist);
const server = new URL('./server/', dist);

await mkdir(client, { recursive: true });

for (const entry of await readdir(dist)) {
  if (entry === 'client' || entry === 'server' || entry === '.openai') continue;
  await rename(new URL(entry, dist), new URL(entry, client));
}

await mkdir(server, { recursive: true });
await writeFile(
  fileURLToPath(new URL('./index.js', server)),
  `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const url = new URL(request.url);
    url.pathname = "/";
    return env.ASSETS.fetch(new Request(url, request));
  },
};
`,
);
