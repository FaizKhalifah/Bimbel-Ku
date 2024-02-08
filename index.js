import process from "process";
import readlinePromises from "readline/promises";
import { MongoClient } from 'mongodb';


const input = readlinePromises.createInterface({
    input:process.stdin,
    output:process.stdout
})

async function main(){

}



const client = new MongoClient('mongodb://localhost:27017/BimbelKu');

async function fetchMurid(){
    await client.connect();
    const db = client.db();
    const murid = db.collection('Murid');
    return murid;
}

async function fetchGuru(){
    await client.connect();
    const db = client.db();
    const guru = db.collection('Guru');
    return guru;
}

async function fetchPelajaran(){
    await client.connect();
    const db = client.db();
    const pelajaran = db.collection('Pelajaran');
    return pelajaran;
}