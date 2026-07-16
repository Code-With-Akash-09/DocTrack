import clientPromise from "./client";

export async function getDb() {
    const client = await clientPromise;
    return client.db("doctrack");
}

export async function userscoll() {
    const db = await getDb();
    return db.collection("users");
}

export async function doctorscoll() {
    const db = await getDb();
    return db.collection("doctors");
}

export async function visitcoll() {
    const db = await getDb();
    return db.collection("visits");
}
