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
                        process.exit(1);
                    }else{
                        console.log("Perintah tidak dikenal");
                    }
                }
                
            }else{
                    console.log(`Selamat datang ${username}`);
                    const opsiGuru = ["Daftar Kelas","Pilih Kelas","Keluar"];
                    while(true){
                    for(let i in opsiGuru){
                        console.log(`${Number(i)+1}. ${opsiGuru[i]}`);
                    }
                    let opsi = await input.question("Masukkan opsi dalam angka : ");
                    if(opsi==1){
                        console.log("========================================");
                       await controllerGuru.default.listPelajaran(username,id);
                       console.log("========================================");
                    }else if(opsi==2){
                        console.log(await controllerPelajaran.default.fetchPelajaran());
                        let namaPelajaran = await input.question("Masukkan nama pelajaran yang ingin diampu : ");
                        let idPelajaran = await input.question("Masukkan id pelajaran yang ingin diampu : ");
                        await controllerGuru.default.pilihPelajaran(username,id,namaPelajaran,idPelajaran);
                    }else if(opsi==3){
                        console.log("Keluar dari program");
                        process.exit(1);
                    }else{
                        console.log("Perintah tidak dikenal");
                    }
                }
            }
            
        }else if(opsiMasuk.toLowerCase()=="murid"){
            const username = await input.question("Masukkan namamu : ");
            const id = await input.question("Masukkan id-mu : ");
            if(await controllerMurid.default.findMurid(username,id)==false){
                console.log("Akun anda belum terdaftar di database");
                while(true){
                    const opsiRegister = await input.question("Apakah kamu ingin membuat akun baru (ya/tidak) ? ");
                    if(opsiRegister.toLowerCase()=="ya"){
                        const usernameBaru = await input.question("Masukkan username yang ingin kamu gunakan : ");
                        const passwordBaru = await input.question("Masukkan password yang ingin kamu gunakan : ");
                        await controllerMurid.default.addMurid(usernameBaru,passwordBaru);
                        console.log("Akunmu sudah terdaftar");
                        break;
                    }else if(opsiRegister.toLowerCase()=="tidak"){
                        console.log("Keluar dari program");
                        process.exit(1);
                    }else{
                        console.log("Perintah tidak dikenal");
                    }
                }
            }else{
                console.log(`Selamat datang ${username}`);
                const opsiMurid = ["Lihat daftar kelas", "pilih kelas","keluar"];
                while(true){
                    for (let i in opsiMurid){
                        console.log(`${Number(i)+1} ${opsiMurid[i]}`);
                    }
                    const opsi = await input.question("Masukkan opsi yang kamu inginkan (dalam angka) : ");
                    if(opsi==1){
                        console.log("========================================");
                        await controllerMurid.default.listPelajaran(username,id);
                        console.log("========================================");
                    }else if(opsi==2){
                        let namaPelajaran = await input.question("Masukkan nama pelajaran yang ingin kamu ikuti : ");
                        let idPelajaran = await input.question("Masukkan id pelajaran yang ingin diikuti : ");
                        await controllerMurid.default.pilihPelajaran(username,id,namaPelajaran,idPelajaran);
                    }else if(opsi==3){
                        console.log("Keluar dari program");
                        process.exit(1);
                    }else{
                        console.log("Perintah tidak dikenal");
                    }
                }
            }
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

