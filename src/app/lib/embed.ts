export async function embed(texts: string[]) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!;
  const token = process.env.CLOUDFLARE_API_TOKEN!;
  const model = "@cf/baai/bge-base-en-v1.5";

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: texts }),
  });

  const json = await res.json();
  const data = json?.result?.data;

  if (!Array.isArray(data)) throw new Error("Cloudflare embeddings failed");
  return data as number[][];
}