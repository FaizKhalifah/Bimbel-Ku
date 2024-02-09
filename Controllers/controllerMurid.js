import Murid from "../Models/murid.js"

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

