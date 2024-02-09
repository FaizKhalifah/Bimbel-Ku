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

