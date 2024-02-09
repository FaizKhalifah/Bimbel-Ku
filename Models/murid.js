import mongoose, { Mongoose } from "mongoose";
import { Schema } from "mongoose";
mongoose.connect('mongodb://localhost:27017/BimbelKu');


const schemaMurid = new Schema({
    nama:String,
    id: String,
    mataPelajaran: Array
})

const Murid = mongoose.model('Murid',schemaMurid);

export default Murid;