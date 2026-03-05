import { QdrantClient } from "@qdrant/js-client-rest";

export async function GET() {
    const client = new QdrantClient({
        url: process.env.QDRANT_URL!,
        apiKey: process.env.QDRANT_API_KEY!
    })

    try {
        const result = await client.getCollections();
        return Response.json({ collections: result.collections });
    }
    catch (err: any) {
        return new Response(
            JSON.stringify({ error: err?.message ?? "Could not get collections" }),
            { status: 500 }
        );
    }
}