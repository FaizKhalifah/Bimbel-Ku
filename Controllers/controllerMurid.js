import Murid from "../Models/murid.js";
import Pelajaran from "../Models/pelajaran.js";

async function addMurid(nama,id){
    const status = await findMurid(nama,id);
    if(status==true){
        console.log("Nama sudah terdaftar di database");
        return;
    }
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
    const status = await findMurid(nama,id);
    if(status==false){
        console.log("Tidak ada nama murid tersebut di database");
        return;
    }
    await Murid.deleteOne({
        nama:nama,
        id:id
    });
    console.log("Murid berhasil dihapus");
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
        if(await checkPelajaran(namaMurid,idMurid,namaPelajaran,idPelajaran)==false){
           console.log("Pelajaran sudah pernah ditambah");
           return; 
        }
        await Murid.updateOne(murid,{$push:{mataPelajaran:pelajaran}});
        await Pelajaran.updateOne(pelajaran,{$push:{daftarMurid:namaMurid}});
        console.log("Kamu berhasil bergabung ke pelajaran");
        return;
    }

}

async function checkPelajaran(namaMurid,idMurid,namaPelajaran,idPelajaran){
    const murid = {
        nama:namaMurid,
        id:idMurid
    }
    const arrayPelajaran = await Murid.findOne(murid,{mataPelajaran:1});
    for(let i in arrayPelajaran.mataPelajaran){
        if(arrayPelajaran.mataPelajaran[i].nama==namaPelajaran && arrayPelajaran.mataPelajaran[i].id==idPelajaran){
            return false;
        }
    }
    return true;
   
}

async function findMurid(nama,id){
    const murid = {
        nama:nama,
        id:id
    }
    const status = await Murid.findOne(murid);
    if(status==null){
        return false;
    }else{
        return true;
    }
}

async function listPelajaran(nama,id){
    const murid = {
        nama:nama,
        id:id
    }
    const arrayPelajaran = await Murid.findOne(murid,{mataPelajaran:1});
    for(let i in arrayPelajaran.mataPelajaran){
        console.log(`${Number(i)+1} ${arrayPelajaran.mataPelajaran[i].nama}`)
    }
}


export default{
    addMurid,
    fetchMurid,
    deleteMurid,
    pilihPelajaran,
    checkPelajaran,
    findMurid,
    listPelajaran
}