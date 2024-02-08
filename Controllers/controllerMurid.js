import Murid from "../Models/murid.js"

async function addMurid(nama,id,mataPelajaran){
    const muridBaru = new Murid({
        nama:nama,
        id:id,
        mataPelajaran:mataPelajaran
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

await addMurid("Ravi","12312312",["Pemweb"]);
console.log(await fetchMurid())