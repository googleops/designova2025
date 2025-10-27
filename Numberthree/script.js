let params = new URLSearchParams(window.location.search);
let inval = params.get("q");
let kota = params.get("kota");
let tipe = params.get("tipe");
let kurikulum = params.get("kurikulum");
// console.log(inval, kota, tipe, kurikulum);
const inputs = document.querySelector(".inputs");
const kotaa = document.getElementById("kota");
const kateg = document.getElementById("Kategori");
const kuri = document.getElementById("kurikulum");
if (inval != null || kota != null || tipe != null || kurikulum != null) {
    inputs.value = inval;
    kotaa.value = kota;
    kateg.value = tipe;
    kuri.value = kurikulum;
}
let coba;
// window.scrollTo(0,2227.199951171875);

// const kotaav = kotaa.value
// const kategv = 
// const kuriv  = 
let jdon;
// console.log(jdon);

panggil();
// searchh();
// inputs.addEventListener("keydown", function (event) {
//     // console.log(event);
//     if (event.key === "Enter") {
//         searchh(); // jalankan fungsi yang sama dengan tombol
//     }
// });



let databaru;
let limitnow = 5;
function panggil() {
    fetch("datasekolah.json")
        .then(res => {
            return res.json();
        })
        .then(data => {
            databaru = data;
            if (inval != null || kota != null || tipe != null || kurikulum != null) {
                search(data);
            } else {
                datatake(data);
            }
        })
}

function cek(obj, keyword, kota, tipe, kurikulum) {
    coba = false;
    const lowerKeyword = keyword.toLowerCase();
    const lowerkota = kota.toLowerCase();
    const lowertipe = tipe.toLowerCase();
    const lowerkurikulum = kurikulum.toLowerCase();
    const jsonString = JSON.stringify(obj).toLowerCase();

    if (jsonString.includes(lowerKeyword) && jsonString.includes(lowerkota) && jsonString.includes(lowertipe) && jsonString.includes(lowerkurikulum)) {
        coba = true;
        return coba;
    } else {
        return coba;
    }
}

function search(data) {
    const keyword = inval;
    const hasilDiv = document.getElementById("hasil");

    const hasil = data.filter(item => {
        return cek(item, keyword, inval, kota, tipe, kurikulum)
    });
    // console.log(hasil);

    datatake(hasil);
}

function datatake(data) {
    const cardwrap = document.querySelector(".cardwrap");
    data.forEach(a => {
        const div = document.createElement("div");
        div.className = "cardsekolah"
        div.innerHTML += `<h1>${a["nama"]}</h1>
            <svg width="300px" height="300px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <!-- Tameng (outline) -->
                    <path fill="none" stroke="#0B1E39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        d="M25,6.7c-3.4,0-6.6-1.4-9-3.7
           c-2.4,2.3-5.6,3.7-9,3.7
           C5.6,6.7,4.3,6.4,3,6
           c0,14,5.5,19.6,13,23
           c7.5-3.4,13-9,13-23
           C27.7,6.4,26.4,6.7,25,6.7z" />

                    <!-- Bintang tengah -->
                    <path fill="#4A90E2" transform="translate(4, 4)" d="M12 13.5l-2.939 1.545.561-3.272-2.377-2.318 
           3.286-.478L12 6l1.47 2.977 
           3.285.478-2.377 2.318.56 3.272L12 13.5z" />

                    <!-- Bintang kiri (lebih ke luar perisai) -->
                    <path fill="#4A90E2" transform="translate(0, 20) scale(0.6)" d="M12 13.5l-2.939 1.545.561-3.272-2.377-2.318 
           3.286-.478L12 6l1.47 2.977 
           3.285.478-2.377 2.318.56 3.272L12 13.5z" />

                    <!-- Bintang kanan (lebih ke luar perisai) -->
                    <path fill="#4A90E2" transform="translate(22, -2) scale(0.6)" d="M12 13.5l-2.939 1.545.561-3.272-2.377-2.318 
           3.286-.478L12 6l1.47 2.977 
           3.285.478-2.377 2.318.56 3.272L12 13.5z" />
                </svg>
            <div class="descwrap">
                <div class="desc lokk">
                    <span>
                        <svg fill="#4A90E2" width="30px" height="30px" viewBox="0 0 30 30"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M12,2 C16.9705627,2 21,5.98572446 21,10.9023647 C21,14.1558559 18.2776716,17.5957933 12.9482526,21.3431516 L12,22 L11.4277959,21.6050955 C5.85042064,17.7558913 3,14.2315185 3,10.9023647 C3,5.98572446 7.02943725,2 12,2 Z M12,3.97830328 C8.13400675,3.97830328 5,7.07831119 5,10.9023647 C5,13.3048538 7.29671943,16.236445 12,19.5818284 C16.7032806,16.236445 19,13.3048538 19,10.9023647 C19,7.07831119 15.8659932,3.97830328 12,3.97830328 Z M12,6 C14.209139,6 16,7.790861 16,10 C16,12.209139 14.209139,14 12,14 C9.790861,14 8,12.209139 8,10 C8,7.790861 9.790861,6 12,6 Z M12,8 C10.8954305,8 10,8.8954305 10,10 C10,11.1045695 10.8954305,12 12,12 C13.1045695,12 14,11.1045695 14,10 C14,8.8954305 13.1045695,8 12,8 Z" />
                        </svg>
                    </span>
                    <p>${a["lokasi"]}</p>
                </div>

                <div class="desc">
                    <span>
                        <!-- License: PD. Made by icons8: https://icons8.com/c/flat-color-icons -->
                        <svg width="25px" height="25px" viewBox="0 0 48 48" version="1"
                            xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48">
                            <circle fill="#4A90E2" cx="24" cy="24" r="21" />
                            <g fill="#ffffff">
                                <rect x="21" y="14" width="6" height="20" />
                                <rect x="14" y="21" width="20" height="6" />
                            </g>
                        </svg>
                    </span>
                    <p>poin lainnya ${a["kategori"]["fokus"]} </p>
                </div>
                <div class="desc">
                    <span>
                        <!-- License: PD. Made by icons8: https://icons8.com/c/flat-color-icons -->
                        <svg width="25px" height="25px" viewBox="0 0 48 48" version="1"
                            xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48">
                            <circle fill="#4A90E2" cx="24" cy="24" r="21" />
                            <g fill="#ffffff">
                                <rect x="21" y="14" width="6" height="20" />
                                <rect x="14" y="21" width="20" height="6" />
                            </g>
                        </svg>
                    </span>
                    <p>sekolah ini adalah sekolah ${a["kategori"]["tipe"]}</p>
                </div>
            </div>
            <button name="description" aria-label="moredescription" onclick="detailed(${a["id"]})">Stalk lebih detail</button>`;
        cardwrap.appendChild(div);
    })
}
let popx = document.querySelector(".popx");
let popup = document.querySelector(".popup");
let popin = document.querySelector(".popin");
let wrapop = document.querySelector(".wraperpop");
let judulbesar = document.querySelector(".judulbesar");

window.addEventListener("load", () => {
    const pos = localStorage.getItem("scroll-Pos");
    if (pos) window.scrollTo(0, pos);
});


function detailed(indx) {
    popin.scrollTop = 0;
    let a = databaru.find(item => item.id == indx);
    console.log(a);

    popup.style.transform = "translateY(0)";
    popx.classList.toggle("change");
    let abeasis = a["beasiswa"]
    let beasiswaa = ``;
    let tung = 1;
    abeasis.forEach(beasis => {
        let syarat = "";
        beasis["syarat"].forEach(pers => {
            syarat += `<li><p>${pers}</p></li>`
        })
        beasiswaa += `<h2>${tung}. ${beasis["nama_beasiswa"]}<br>(Potongan ${beasis["potongan"]})</h2>
        <br><br>
        <p>Syarat :</p>
        <ul>            
            ${syarat} 
        </ul>
        <br>`;
        tung += 1;
    })
    judulbesar.innerHTML = `<h1>${a["nama"].toUpperCase()}</h1>`;
    wrapop.innerHTML = `<div class="cardin">
                    <div class="cardsekolah">
                        <h1>${a["nama"]}</h1>
                                                    <svg width="300px" height="300px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <!-- Tameng (outline) -->
                                <path fill="none" stroke="#0B1E39" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" d="M25,6.7c-3.4,0-6.6-1.4-9-3.7
           c-2.4,2.3-5.6,3.7-9,3.7
           C5.6,6.7,4.3,6.4,3,6
           c0,14,5.5,19.6,13,23
           c7.5-3.4,13-9,13-23
           C27.7,6.4,26.4,6.7,25,6.7z" />

                                <!-- Bintang tengah -->
                                <path fill="#4A90E2" transform="translate(4, 4)" d="M12 13.5l-2.939 1.545.561-3.272-2.377-2.318 
           3.286-.478L12 6l1.47 2.977 
           3.285.478-2.377 2.318.56 3.272L12 13.5z" />

                                <!-- Bintang kiri (lebih ke luar perisai) -->
                                <path fill="#4A90E2" transform="translate(0, 20) scale(0.6)" d="M12 13.5l-2.939 1.545.561-3.272-2.377-2.318 
           3.286-.478L12 6l1.47 2.977 
           3.285.478-2.377 2.318.56 3.272L12 13.5z" />

                                <!-- Bintang kanan (lebih ke luar perisai) -->
                                <path fill="#4A90E2" transform="translate(22, -2) scale(0.6)" d="M12 13.5l-2.939 1.545.561-3.272-2.377-2.318 
           3.286-.478L12 6l1.47 2.977 
           3.285.478-2.377 2.318.56 3.272L12 13.5z" />
                            </svg>
                        <div class="descwrap">
                            <div class="desc">
                                <span>
                                    <svg fill="#4A90E2" width="30px" height="30px" viewBox="0 0 30 30"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M12,2 C16.9705627,2 21,5.98572446 21,10.9023647 C21,14.1558559 18.2776716,17.5957933 12.9482526,21.3431516 L12,22 L11.4277959,21.6050955 C5.85042064,17.7558913 3,14.2315185 3,10.9023647 C3,5.98572446 7.02943725,2 12,2 Z M12,3.97830328 C8.13400675,3.97830328 5,7.07831119 5,10.9023647 C5,13.3048538 7.29671943,16.236445 12,19.5818284 C16.7032806,16.236445 19,13.3048538 19,10.9023647 C19,7.07831119 15.8659932,3.97830328 12,3.97830328 Z M12,6 C14.209139,6 16,7.790861 16,10 C16,12.209139 14.209139,14 12,14 C9.790861,14 8,12.209139 8,10 C8,7.790861 9.790861,6 12,6 Z M12,8 C10.8954305,8 10,8.8954305 10,10 C10,11.1045695 10.8954305,12 12,12 C13.1045695,12 14,11.1045695 14,10 C14,8.8954305 13.1045695,8 12,8 Z" />
                                    </svg>
                                </span>
                                <p>${a["lokasi"]}</p>
                            </div>

                            <div class="desc">
                                <span>
                                    <!-- License: PD. Made by icons8: https://icons8.com/c/flat-color-icons -->
                                    <svg width="25px" height="25px" viewBox="0 0 48 48" version="1"
                                        xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48">
                                        <circle fill="#4A90E2" cx="24" cy="24" r="21" />
                                        <g fill="#ffffff">
                                            <rect x="21" y="14" width="6" height="20" />
                                            <rect x="14" y="21" width="20" height="6" />
                                        </g>
                                    </svg>
                                </span>
                                <p>poin lainnya ${a["kategori"]["fokus"]} </p>
                            </div>
                            <div class="desc">
                                <span>
                                    <!-- License: PD. Made by icons8: https://icons8.com/c/flat-color-icons -->
                                    <svg width="25px" height="25px" viewBox="0 0 48 48" version="1"
                                        xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48">
                                        <circle fill="#4A90E2" cx="24" cy="24" r="21" />
                                        <g fill="#ffffff">
                                            <rect x="21" y="14" width="6" height="20" />
                                            <rect x="14" y="21" width="20" height="6" />
                                        </g>
                                    </svg>
                                </span>
                                <p>sekolah ini adalah sekolah ${a["kategori"]["tipe"]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="descin">
                <br<br>
                    <div class="pwrap">
                        <p class="subjudul">📖 Deskripsi sekolah</p>
                        <br>
                        <p class="paragraf">${a["deskripsi"]} <br><br> ${a["deskripsi2"]}</p>
                        <br><br>
                        <p class="subjudul">📍 Lokasi</p>
                        <br>
                        <p class="">
                            <b>Lokasi:</b> ${a["lokasi"]} <br> 
                            <b>Kontak:</b> ${a["kontak"]["telepon"]} <br> 
                            <b>Email:</b> <u>${a["kontak"]["email"]}<svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" data-rtl-flip="" class="block h-[0.75em] w-[0.75em] stroke-current stroke-[0.75]"><path d="M14.3349 13.3301V6.60645L5.47065 15.4707C5.21095 15.7304 4.78895 15.7304 4.52925 15.4707C4.26955 15.211 4.26955 14.789 4.52925 14.5293L13.3935 5.66504H6.66011C6.29284 5.66504 5.99507 5.36727 5.99507 5C5.99507 4.63273 6.29284 4.33496 6.66011 4.33496H14.9999L15.1337 4.34863C15.4369 4.41057 15.665 4.67857 15.665 5V13.3301C15.6649 13.6973 15.3672 13.9951 14.9999 13.9951C14.6327 13.9951 14.335 13.6973 14.3349 13.3301Z"></path></svg></u>
                        </p>

                        <br><br>
                        <p class="subjudul">🏷️ Kategori Sekolah</p>
                        <br>
                        <p class="">
                            <b>Tipe:</b> ${a["kategori"]["tipe"]} <br> 
                            <b>Jenjang:</b> ${a["kategori"]["jenjang"]}<br>
                            <b>Agama:</b> ${a["kategori"]["agama"]}<br>
                            <b>Kurikulum:</b> ${a["kategori"]["kurikulum"]}<br>
                        </p>
                        
                        <br><br>
                        <p class="subjudul">🎯 Fokus Utama</p>
                        <br>
                        <p class="">
                            ${a["kategori"]["fokus"]} <br>
                        </p>

                        <br><br>
                        <p class="subjudul">🌟 Terkenal Dalam Bidang</p>
                        <br>
                        <p class="">
                            ${a["terkenal_di"]} <br> 
                        </p>

                        <br><br>
                        <p class="subjudul">🎨 Ekstrakurikuler</p>
                        <br>
                        <p class="">
                            ${a["ekstrakurikuler"]} <br>
                        </p>

                        <br><br>
                        <p class="subjudul">🎓 Program Beasiswa</p>
                        <br>
                        ${beasiswaa}

                        <br><br>
                        <p class="subjudul">🌐 Website & Media Sosial</p>
                        <br>
                        <p class="">
                            <b>Webbsite:</b> ${a["link_web_sekolah"]} <br> 
                            <b>Instagram:</b> ${a["media_sosial"]["instagram"]}<br>
                            <b>Facebook:</b> ${a["media_sosial"]["facebook"]}<br>
                            <b>YouTube:</b> ${a["media_sosial"]["youtube"]}<br>
                        </p>
                        <br><br>
                    </div>
                </div>`;
}
let coldon = false;
popx.addEventListener("click", () => {
    if (coldon) return;
    coldon = true;
    popx.classList.toggle("change");
    setTimeout(() => {
        popup.style.transform = "translateY(100vh)";
    }, 500)
    setTimeout(() => {
        coldon = false
    }, 600)
});

const container = document.querySelector(".container");
const nav = document.querySelector(".nav");
container.addEventListener("click", function () {
    container.classList.toggle("change");
    // console.log(document.querySelector("nav"));
    // nav.classList.toggle("kl");
    document.querySelector("nav").classList.toggle("kl");
});
document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && !container.contains(e.target)) {
        container.classList.remove("change");
        document.querySelector("nav").classList.remove("kl");
    }
})

window.addEventListener("scroll", function () {
    // console.log(window.scrollY);
    if (window.scrollY > 100) {
        nav.classList.add("bgnav");
    } else {
        nav.classList.remove("bgnav");
    }
    // localStorage.setItem("scroll-Pos", window.scrollY);
    // console.log(window.scrollY);

})