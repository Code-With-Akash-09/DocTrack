import clientPromise from "./client";

export async function getDb() {
    const client = await clientPromise;
    return client.db("doctrack");
}

export async function userscoll() {
    const db = await getDb();
    return db.collection("users");
}
