import mongoose, { Mongoose } from "mongoose";
import { Schema } from "mongoose";
mongoose.connect('mongodb://localhost:27017/BimbelKu');

const schemaPelajaran = new Schema({
    nama:String,
    id:String,
    daftarMurid:Array,
    guruPengajar:String
})

const Pelajaran = mongoose.model('Pelajaran',schemaPelajaran);

export default Pelajaran;