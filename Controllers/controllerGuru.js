import Guru from "../Models/guru.js";
import Pelajaran from "../Models/pelajaran.js";

async function addGuru(nama,id){
    const status = await findGuru(nama,id);
    if(status==true){
        console.log("Guru sudah terdaftar di database");
        return;
    }
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
    const status = await findGuru(nama,id);
    if(status==false){
        console.log("Nama guru tidak terdaftar");
        return;
    }
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
        if(await checkPelajaran(namaGuru,idGuru,namaPelajaran,idPelajaran)==false){
            return;
        }
        await Guru.updateOne(guru,{$push:{mataPelajaran:pelajaran}});
        await Pelajaran.updateOne(pelajaran,{$set:{guruPengajar:namaGuru}});
        console.log("Mata pelajaran berhasil ditambah");
        return;
    }
}

async function checkPelajaran(namaGuru,idGuru,namaPelajaran,idPelajaran){
        const guru = {
            nama:namaGuru,
            id:idGuru
        }

        const pelajaran = {
            nama:namaPelajaran,
            id:idPelajaran
        }
        const arrayPelajaran = await Guru.findOne(guru,{mataPelajaran:1});
        for(let i in arrayPelajaran.mataPelajaran){
            if(arrayPelajaran.mataPelajaran[i].nama==namaPelajaran && arrayPelajaran.mataPelajaran[i].id==idPelajaran){
                console.log("Mata pelajaran ini sudah Anda pilih");
                return false;
            }
        }

        const statusPengajaran = await Pelajaran.findOne(pelajaran,{guruPengajar:1});
        if(statusPengajaran!=null){
            console.log("Mata pelajaran sudah diampu guru lain");
            return false;
        }

        return true;
}

async function findGuru(nama,id){
    const guru = {
        nama:nama,
        id:id
    }
    const status = await Guru.findOne(guru);
    if(status==null){
        return false;
    }else{
        return true;
    }
}

async function listPelajaran(nama,id){
    const guru = {
        nama:nama,
        id:id
    }
    const arrayPelajaran = await Guru.findOne(guru,{mataPelajaran:1});
    const mataPelajaran = arrayPelajaran.mataPelajaran;
    if(mataPelajaran.length==0){
        console.log("Anda belum mengampu pelajaran apapun");
    }else{
        for(let i in mataPelajaran){
            if(mataPelajaran[i].nama==null){
                continue;
            }
            console.log(`${Number(i)+1} ${mataPelajaran[i].nama}`)
        }
    }
   
}



export default{
    addGuru,
    fetchGuru,
    deleteGuru,
    pilihPelajaran,
    checkPelajaran,
    findGuru,
    listPelajaran
}




