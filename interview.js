//! 1. Buatkan fungsi untuk menyimpan data baru kedalam file json yg tersedia ()
//!    data baru selalu berada di index ke 0
//!    format setiap file sesuai dengan contoh yang ada
//!    tidak boleh menggunakan UNSHIFT

//! 2. Tambahkan validasi untuk untuk fungsi menyimpan data nilai baru yang sudah dibuat
//!    Jika Siswa tidak terdaftar munculkan pesan "Siswa tidak terdaftar"
//!    Jika Pelajaran tidak terdaftar munculkan pesan "Pelajaran tidak terdaftar"

//! 3. Tambahkan validasi untuk memasukkan data kedalam nilai dengan kondisi:
//!    Nama = String,
//!    Kelas = String hanya boleh 1 character dan huruf kapital,
//!    pelajaran = String max 3 character dan huruf kapital,
//!    nilai = float max nilai 10,
//!    munculkan pesan jika data tidak sesuai validasi

//! 4. Buatkan fungsi untuk menampilkan nilai rata rata kelas di setiap pelajaran
//!    tidak boleh menggunakan MATH

//! 5. Buat fungsi untuk menyimpan data peringkat kelas kedalam file peringkat.json
//!    data yg perlu di simpan adalah 3 siswa dengan nilai tertinggi di kelas pada pelajaran tertentu
//!    tindak boleh menggunakan MATH dan UNSHIFT/PUSH

const fs = require('fs');
const dataToAdd = {
        "nama": "Udin",
        "kelas": "D"
    }
    //1.  add data siswa ========================================

function addData(dataSiswa) {
    fs.readFile('siswa.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            console.log(obj)
            obj.unshift(dataSiswa); //add some data
            console.log(obj)
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile('siswa.json', json, 'utf8', (err) => {
                if (err) {
                    return err
                } else {
                    console.log('success add data')
                }
            }); // write it back 
        }
    });
}

addData(dataToAdd)

//2. function tambah nilai ke siswa ======================================

function tambahNilai(nilai, mataPelajaran, namaSiswa) {
    const siswa = fs.readFile('siswa.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            console.log(obj)
            for (let siswa of obj) {
                if (siswa.nama == namaSiswa) {
                    const pelajara = fs.readFile('pelajaran.json', 'utf-8', function readFileCallback(err, dataPelajaran) {
                        if (err) {
                            console.log(err)
                        } else {
                            pelajaranObj = JSON.parse(dataPelajaran)
                            for (let pelajaran of pelajaranObj) {
                                if (pelajaran == mataPelajaran) {
                                    if (mataPelajaran.length != 3) {
                                        return console.log('invalid input')
                                    }
                                    if (nilai > 10) {
                                        return console.log('invalid input')
                                    }

                                    const dataNilai = {
                                        nama: siswa.nama,
                                        kelas: siswa.kelas,
                                        pelajaran: mataPelajaran,
                                        nilai: nilai
                                    }
                                    fs.readFile('nilai.json', 'utf8', function readFileCallback(err, data) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            obj = JSON.parse(data);
                                            obj.unshift(dataNilai); //add some data
                                            json = JSON.stringify(obj);
                                            fs.writeFile('nilai.json', json, 'utf8', (err) => {
                                                if (err) {
                                                    return err
                                                } else {
                                                    return console.log('success add data')
                                                }
                                            });
                                        }
                                    });

                                }
                            }
                            return "pelajaran tidak terdaftar"
                        }
                    })
                }
            }
            return `siswanya gaada`
        }
    });

}

tambahNilai(7.5, 'IPS', "Budi")


//4. menampilkan nilai rata rata dari kelas

function nilaiRata(kelas) {
    fs.readFile('nilai.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            const nilaiKelas = obj.filter(e => e.kelas == kelas)
            let jumlah = 0
            for (let i = 0; i < nilaiKelas.length; i++) {
                jumlah += nilaiKelas[i].nilai
            }
            jumlah = jumlah / nilaiKelas.length
            console.log('rata rata adalah ', jumlah)
        }
    });
}
nilaiRata("B")