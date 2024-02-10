import process from "process";
import readlinePromises from "readline/promises";
import * as controllerGuru from "./Controllers/controllerGuru";
import * as controllerMurid from "./Controllers/controllerMurid";
import * as controllerPelajaran from "./Controllers/controllerPelajaran";

const input = readlinePromises.createInterface({
    input:process.stdin,
    output:process.stdout
})

async function main(){
    console.log("Selamat datang di sistem akademik bimbel-Ku");
    while(true){
        const opsiMasuk = await input.question("Kamu ingin masuk sebagai apa (guru/murid)?");
        if(opsiMasuk.toLowerCase()=="guru"){
            const opsiGuru = ["Daftar Kelas","Pilih Kelas","Keluar"];
        }else if(opsiMasuk.toLowerCase()=="murid"){
    
        }else if(opsiMasuk.toLowerCase()=="keluar"){
            console.log("Anda telah keluar dari program");
            input.close();
            return;
        }
        else{
            console.log("Perintah tidak dikenal");
        }
    }

}

main();

