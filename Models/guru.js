import mongoose, { Mongoose } from "mongoose";
import { Schema } from "mongoose";
mongoose.connect('mongodb://localhost:27017/BimbelKu');

const schemaGuru =  new Schema({
    nama:String,
    id: String,
    mataPelajaran:Array,
    gaji:Number
})

const Guru = mongoose.model('Guru',schemaGuru);

export default Guru;