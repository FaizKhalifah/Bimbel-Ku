import Murid from "../Models/murid.js";
import Pelajaran from "../Models/pelajaran.js";

async function addMurid(nama,id){
    const muridBaru = new Murid({
        nama:nama,
        id:id,
        mataPelajaran:[]
    })
    await muridBaru.save();
    return 
}

async function fetchMurid(){
    const listMurid = await Murid.find();
    return listMurid;
}

async function deleteMurid(nama,id){
    await Murid.deleteOne({
        nama:nama,
        id:id
    })
    return;  
}

async function pilihPelajaran(namaMurid,idMurid,namaPelajaran,idPelajaran){
    const pelajaran = {
        nama:namaPelajaran,
        id:idPelajaran
    }
    const murid = {
        nama:namaMurid,
        id:idMurid
    }

    const statusPelajaran = await Pelajaran.findOne(pelajaran);
    if(statusPelajaran==null){
        console.log("Mata pelajaran tidak ditemukan");
        return;
    }else{
        await Murid.updateOne(murid,{$push:{mataPelajaran:namaPelajaran}});
        await Pelajaran.updateOne(pelajaran,{$push:{daftarMurid:namaMurid}});
        console.log("Kamu berhasil bergabung ke pelajaran");
        return;
    }
}

await pilihPelajaran("Faiz","1213131","pemweb","pw123123");