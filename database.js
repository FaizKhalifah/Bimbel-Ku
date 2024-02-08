import mongoose, { Mongoose } from "mongoose";
import { Schema } from "mongoose";
mongoose.connect('mongodb://localhost:27017/BimbelKu');

const db = mongoose.connection;
db.once('open',()=>{
    console.log("Connect ke database");
})

const schemaMurid = new Schema({
    nama: String,
    id: String,
    mataPelajaran: Array
})

const schemaGuru =  new Schema({
    nama:String,
    id: String,
    mataPelajaran:Array,
    gaji:Number
})

const schemaPelajaran = new Schema({
    nama:String,
    id:String,
    DaftarMurid:Array,
    guruPengajar:String,
    jadwal:Date
})

mongoose.model('Murid',schemaMurid);
mongoose.model('Guru',schemaGuru);
mongoose.model('Pelajaran',schemaPelajaran);