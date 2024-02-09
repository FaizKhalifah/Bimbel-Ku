import Pelajaran from "../Models/pelajaran.js"

async function addPelajaran(nama,id){
    const pelajaranBaru = new Pelajaran({
        nama:nama,
        id:id,
        daftarMurid:[],
        guruPengajar:null,
        jadwal:[]
    })
    await pelajaranBaru.save();
    return;
}

async function fetchPelajaran(){
    const listPelajaran = await Pelajaran.find();
    return listPelajaran;
}