import Guru from "../Models/guru.js"
import Pelajaran from "../Models/pelajaran.js";

async function addGuru(nama,id){
    const guruBaru = new Guru({
        nama:nama,
        id:id,
        mataPelajaran:[],
        gaji:0
    })
    await guruBaru.save();
    return;
}

async function fetchGuru(){
    const listGuru = await Guru.find();
    return listGuru;
}

async function deleteGuru(nama,id){
    await Guru.deleteOne({
        nama:nama,
        id:id
    });
    return;
}

async function pilihPelajaran(namaGuru,idGuru,namaPelajaran,idPelajaran){
    const pelajaran = {
        nama:namaPelajaran,
        id:idPelajaran
    }
    const guru = {
        nama:namaGuru,
        id:idGuru
    }
    const statusPelajaran = await Pelajaran.findOne(pelajaran);
    if(statusPelajaran==null){
        console.log("Pelajaran tidak ada pada database");
        return;
    }else{
        await Guru.updateOne(guru,{$push:{mataPelajaran:pelajaran}});
        await Pelajaran.updateOne(pelajaran,{$set:{guruPengajar:namaGuru}});
        console.log("Mata pelajaran berhasil ditambah");
        return;
    }
}

await pilihPelajaran("Bujan","2111424","pemweb","pw123123");

