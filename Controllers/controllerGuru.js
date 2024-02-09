import Guru from "../Models/guru.js"

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

