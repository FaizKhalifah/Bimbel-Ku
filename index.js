import process from "process";
import readlinePromises from "readline/promises";
import * as controllerGuru from "./Controllers/controllerGuru.js";
import * as controllerMurid from "./Controllers/controllerMurid.js";
import * as controllerPelajaran from "./Controllers/controllerPelajaran.js";

const input = readlinePromises.createInterface({
    input:process.stdin,
    output:process.stdout
})

async function main(){
    console.log("Selamat datang di sistem akademik bimbel-Ku");
    while(true){
        const opsiMasuk = await input.question("Kamu ingin masuk sebagai apa (guru/murid)? ");
        if(opsiMasuk.toLowerCase()=="guru"){
            const username = await input.question("Masukkan namamu : ");
            const id = await input.question("Masukkan id-mu : ");
            if(await controllerGuru.default.findGuru(username,id)==false){
                console.log("Akunmu belum terdaftar di database");
                while(true){
                    let opsiRegister = await input.question("Apakah kamu ingin membuat akun baru (ya/tidak) ? ");
                    if(opsiRegister.toLowerCase()=="ya"){
                        let usernameBaru = await input.question("Masukkan username barumu sebagai guru : ");
                        let idBaru = await input.question("Masukkan idbarumu : ");
                        await controllerGuru.default.addGuru(usernameBaru,idBaru);
                        console.log("Akunmu kini terdaftar");
                        break;
                    }else if(opsiRegister.toLowerCase()=="tidak"){
                        console.log("Keluar dari program");
                        input.close();
                        return;
                    }else{
                        console.log("Perintah tidak dikenal");
                    }
                }
                
            }else{
                while(true){
                    console.log(`Selamat datang ${username}`);
                    const opsiGuru = ["Daftar Kelas","Pilih Kelas","Keluar"];
                    for(let i in opsiGuru){
                        console.log(`${Number(i)+1}. ${opsiGuru[i]}`);
                    }
                    let opsi = await input.question("Masukkan opsi dalam angka : ");
                    if(Number(i)==1){
                        await controllerGuru.listPelajaran();
                    }
                }
            }
            
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

