// Fungsi Format Harga (Dipakai juga oleh anggota tim lain di Langkah 6-8)
const rupiah = n => "Rp" + n.toLocaleString("id-ID");
const rb = n => (n / 1000) + "rb";

function linkWA(pesan) {
  return `https://wa.me/${WA}?text=${encodeURIComponent(pesan)}`;
}

// =========================================
// LANGKAH 7: TOMBOL WHATSAPP UMUM (SEMUA HALAMAN)
// =========================================
document.querySelectorAll(".nav-cta, .wa-sticky, .banner-tanya .btn, .sosmed-links a[href*='wa.me']").forEach(tombol => {
  tombol.href = linkWA("Halo Tens Coffee, saya mau tanya menu.");
  tombol.target = "_blank";
  tombol.rel = "noopener";
});

// =========================================
// LANGKAH 5: HALAMAN MENU & FILTER
// =========================================
if (document.querySelector("#daftarMenu")) {
  let kategoriAktif = "Semua";

  function kartu(m) {
    const kelasBadge = m.badge === "Best Seller" ? "badge badge-cokelat" : "badge badge-biru";

    // Susun teks harga secara dinamis sesuai ukuran yang tersedia (R, L, 1L)
    const daftarHarga = Object.entries(m.harga)
      .map(([uk, nom]) => `${uk} ${rb(nom)}`)
      .join(" &nbsp; ");

    return `
      <a class="card menu-card ${m.stok ? "" : "habis"}" href="produk.html?id=${m.id}">
        <div class="foto">
          ${m.foto 
            ? `<img src="${m.foto}" alt="${m.nama}" loading="lazy">` 
            : `<span>[Foto ${m.nama}]</span>`
          }
        </div>
        <div class="menu-body">
          ${m.badge ? `<span class="${kelasBadge}">${m.badge}</span>` : ""}
          <h3>${m.nama}</h3>
          <p class="menu-desc">${m.deskripsi || ""}</p>
          <div class="menu-footer">
            <p class="harga">${daftarHarga}</p>
            <small class="stok-label ${m.stok ? "tersedia" : "kosong"}">
              ${m.stok ? "Tersedia" : "Habis"}
            </small>
          </div>
        </div>
      </a>
    `;
  }

  function tampil(daftar) {
    document.querySelector("#daftarMenu").innerHTML = daftar.length
      ? daftar.map(kartu).join("")
      : `<p class="kosong-msg">Menu tidak ditemukan. Tanya kami lewat WhatsApp.</p>`;
  }

  function saring() {
    const kata = document.querySelector("#cari").value.toLowerCase();
    const hasil = MENU.filter(m => {
      const cocokKategori =
        kategoriAktif === "Semua" ||
        m.kategori === kategoriAktif ||
        (kategoriAktif === "Tenseliter" && m.harga["1L"]); // Otomatis tampilkan menu yang punya ukuran 1L
      return cocokKategori && m.nama.toLowerCase().includes(kata);
    });
    tampil(hasil);
  }

  // Event saat mengetik di kolom pencarian
  document.querySelector("#cari").addEventListener("input", saring);

  // Event saat menekan chip kategori
  document.querySelectorAll("#kategori .chip").forEach(c => {
    c.addEventListener("click", () => {
      kategoriAktif = c.dataset.kat;
      document.querySelectorAll("#kategori .chip").forEach(x => x.classList.remove("on"));
      c.classList.add("on");
      saring();
    });
  });

  // Tampilkan semua menu saat halaman pertama kali dibuka
  saring();
}

// =========================================
// LANGKAH 6 & 7: HALAMAN DETAIL PRODUK
// =========================================
if (document.querySelector("#detailProduk")) {
  const wadah = document.querySelector("#detailProduk");
  const id = new URLSearchParams(location.search).get("id");
  const item = MENU.find(m => m.id === id);

  if (!item) {
    wadah.innerHTML = `
      <div class="card" style="text-align: center; padding: 40px 20px;">
        <h2>Menu tidak ditemukan</h2>
        <p style="margin: 12px 0 20px;">Maaf, menu yang kamu cari tidak tersedia atau tautannya salah.</p>
        <a href="menu.html" class="btn btn-wa">Kembali ke Menu</a>
      </div>
    `;
  } else {
    let ukuran = Object.keys(item.harga)[0]; // Otomatis ambil ukuran pertama yang tersedia
    let jumlah = 1;
    const addonDipilih = new Set();

    function hitungTotal() {
      const hargaAddon = [...addonDipilih]
        .reduce((t, aid) => t + ADDON.find(a => a.id === aid).harga, 0);
      return (item.harga[ukuran] + hargaAddon) * jumlah;
    }

    const isKarambol = item.id === "karambol-original" || item.id === "karambol-choco";
    const htmlVarian = isKarambol ? `
      <div class="opsi-grup">
        <label class="opsi-label">Varian</label>
        <div class="chips" style="margin-bottom: 0;">
          <a href="produk.html?id=karambol-original" class="chip ${item.id === "karambol-original" ? "on" : ""}" style="text-decoration:none;">Original</a>
          <a href="produk.html?id=karambol-choco" class="chip ${item.id === "karambol-choco" ? "on" : ""}" style="text-decoration:none;">Choco</a>
        </div>
      </div>
    ` : "";

    const htmlAddon = item.kategori === "Dessert" ? `
      <div class="opsi-grup">
        <label class="opsi-label">Add-on (boleh pilih lebih dari satu)</label>
        <div class="chips" id="opsiAddon" style="margin-bottom: 0;">
          ${ADDON.map(a => `
            <button type="button" class="chip" data-addon="${a.id}">
              ${a.nama} +${rb(a.harga)}
            </button>
          `).join("")}
        </div>
      </div>
    ` : "";

    const kelasBadge = item.badge === "Best Seller" ? "badge badge-cokelat" : "badge badge-biru";

    wadah.innerHTML = `
      <nav class="breadcrumb">
        <a href="menu.html">Menu</a> / <span>${item.kategori}</span> / <strong>${item.nama}</strong>
      </nav>

      <div class="detail-grid">
        <div class="foto detail-foto">
          ${item.foto 
            ? `<img src="${item.foto}" alt="${item.nama}">` 
            : `<span>[Foto ${item.nama}]</span>`
          }
        </div>

        <div class="card detail-info">
          ${item.badge ? `<span class="${kelasBadge}">${item.badge}</span>` : ""}
          <h1 style="font-size: 32px; margin-bottom: 4px;">${item.nama}</h1>
          
          <!-- Daftar Harga Dinamis (R, L, 1L) -->
          <p class="harga-daftar">
            ${Object.entries(item.harga).map(([uk, nom]) => `${rupiah(nom)} (${uk})`).join(" &nbsp;•&nbsp; ")}
          </p>
          <p style="margin: 12px 0 20px;">${item.deskripsi || ""}</p>

          ${htmlVarian}

          <!-- Pilihan Ukuran Dinamis (R, L, 1L) -->
          <div class="opsi-grup">
            <label class="opsi-label">Ukuran</label>
            <div class="chips" id="opsiUkuran" style="margin-bottom: 0;">
              ${Object.keys(item.harga).map((uk, i) => `
                <button type="button" class="chip ${i === 0 ? "on" : ""}" data-uk="${uk}">
                  ${uk === "R" ? "Regular (R)" : uk === "L" ? "Large (L)" : "1 Liter (1L)"}
                </button>
              `).join("")}
            </div>
          </div>

          ${htmlAddon}

          <div class="opsi-grup">
            <label class="opsi-label">Jumlah</label>
            <div class="qty-box">
              <button type="button" id="btnMinus" class="qty-btn">−</button>
              <span id="teksJumlah" class="qty-val">1</span>
              <button type="button" id="btnPlus" class="qty-btn">+</button>
            </div>
          </div>

          <div class="total-bar">
            <div>
              <small>Total Estimasi</small>
              <p id="teksTotal" class="harga-besar" style="font-size: 28px; margin: 0;">${rupiah(hitungTotal())}</p>
            </div>
            ${item.stok 
              ? `<a id="btnPesan" class="btn btn-wa" target="_blank" rel="noopener" href="#">Pesan via WhatsApp</a>`
              : `<button type="button" class="btn" disabled style="background: #ccc; color: #666; cursor: not-allowed;">Habis</button>`
            }
          </div>

          <small style="display: block; margin-top: 12px; opacity: 0.85;">
            Pesanan terisi otomatis ke chat WhatsApp. Bisa juga beli langsung di kantin kampus.
          </small>
        </div>
      </div>
    `;

    function pesanProduk() {
      const addon = [...addonDipilih].map(aid => ADDON.find(a => a.id === aid).nama);
      return `Halo Tens Coffee, saya mau pesan:\n` +
        `${jumlah}x ${item.nama} (${ukuran})` +
        (addon.length ? ` + ${addon.join(", ")}` : "") +
        `\nEstimasi: ${rupiah(hitungTotal())}`;
    }

    function perbaruiTampilan() {
      document.querySelector("#teksJumlah").textContent = jumlah;
      document.querySelector("#teksTotal").textContent = rupiah(hitungTotal());

      const btnPesan = document.querySelector("#btnPesan");
      if (btnPesan) {
        btnPesan.href = linkWA(pesanProduk());
      }
    }

    document.querySelectorAll("#opsiUkuran .chip").forEach(btn => {
      btn.addEventListener("click", () => {
        ukuran = btn.dataset.uk;
        document.querySelectorAll("#opsiUkuran .chip").forEach(x => x.classList.remove("on"));
        btn.classList.add("on");
        perbaruiTampilan();
      });
    });

    document.querySelectorAll("#opsiAddon .chip").forEach(btn => {
      btn.addEventListener("click", () => {
        const aid = btn.dataset.addon;
        if (addonDipilih.has(aid)) {
          addonDipilih.delete(aid);
          btn.classList.remove("on");
        } else {
          addonDipilih.add(aid);
          btn.classList.add("on");
        }
        perbaruiTampilan();
      });
    });

    document.querySelector("#btnMinus").addEventListener("click", () => {
      if (jumlah > 1) {
        jumlah--;
        perbaruiTampilan();
      }
    });

    document.querySelector("#btnPlus").addEventListener("click", () => {
      jumlah++;
      perbaruiTampilan();
    });

    perbaruiTampilan();
  }
}

// =========================================
// LANGKAH 8: KALKULATOR ESTIMASI PESANAN
// =========================================
if (document.querySelector("#daftarBaris")) {
  const jt = n => n >= 1000000
    ? "Rp " + (n / 1000000).toFixed(1).replace(".", ",").replace(",0", "") + " jt"
    : rupiah(n);

  // Gunakan ID menu & add-on yang sesuai dengan js/data.js terbaru
  let baris = [
    { id: "karambol-original", ukuran: "R", jumlah: 100 },
    { id: "karambol-choco", ukuran: "R", jumlah: 50 },
    { id: "lychee-tea", ukuran: "R", jumlah: 50 }
  ];

  let addonJumlah = { "choco-sauce": 100 };

  function hitung() {
    const totalMenu = baris.reduce((t, b) => {
      const m = MENU.find(x => x.id === b.id);
      if (!m) return t;
      const hargaSatuan = m.harga[b.ukuran] || Object.values(m.harga)[0] || 0;
      return t + hargaSatuan * b.jumlah;
    }, 0);

    const totalAddon = ADDON.reduce((t, a) => {
      return t + a.harga * (addonJumlah[a.id] || 0);
    }, 0);

    const porsi = baris.reduce((t, b) => t + b.jumlah, 0);
    return { porsi, addon: totalAddon, total: totalMenu + totalAddon };
  }

  function perbaruiRingkasan() {
    const hasil = hitung();
    document.querySelector("#ringkasPorsi").textContent = `${hasil.porsi} porsi`;
    document.querySelector("#ringkasAddon").textContent = rupiah(hasil.addon);
    document.querySelector("#ringkasTotal").textContent = jt(hasil.total);
    document.querySelector("#ringkasDetail").textContent = hasil.total >= 1000000 ? `(${rupiah(hasil.total)})` : "";

    const ringkasanMenu = baris.map(b => {
      const m = MENU.find(x => x.id === b.id);
      return m ? `- ${m.nama} (${b.ukuran}) x${b.jumlah}` : "";
    }).filter(Boolean).join("\n");

    const daftarAddonAktif = ADDON
      .filter(a => (addonJumlah[a.id] || 0) > 0)
      .map(a => `- ${a.nama} x${addonJumlah[a.id]}`);

    const teksAddon = daftarAddonAktif.length ? `\nAdd-on:\n${daftarAddonAktif.join("\n")}` : "";

    const pesan = `Halo Tens Coffee, saya mau tanya estimasi pesanan:\n` +
      `${ringkasanMenu || "- Belum ada menu dipilih"}${teksAddon}\n` +
      `Total ${hasil.porsi} porsi, estimasi ${rupiah(hasil.total)}`;

    const btnKalkWA = document.querySelector("#btnKalkWA");
    if (btnKalkWA) {
      btnKalkWA.href = linkWA(pesan);
    }
  }

  function renderBaris() {
    const wadahBaris = document.querySelector("#daftarBaris");

    if (baris.length === 0) {
      wadahBaris.innerHTML = `<p class="info-kecil" style="padding: 12px 0;">Belum ada menu. Klik "+ Tambah menu" untuk mulai menghitung.</p>`;
      perbaruiRingkasan();
      return;
    }

    wadahBaris.innerHTML = baris.map((b, idx) => {
      const menuTerpilih = MENU.find(m => m.id === b.id) || MENU[0];
      const daftarUkuran = Object.keys(menuTerpilih.harga);
      if (!daftarUkuran.includes(b.ukuran)) {
        b.ukuran = daftarUkuran[0];
      }

      return `
        <div class="kalk-row" data-idx="${idx}">
          <select class="kalk-input kalk-menu">
            ${MENU.map(m => `<option value="${m.id}" ${m.id === b.id ? "selected" : ""}>${m.nama}</option>`).join("")}
          </select>

          <select class="kalk-input kalk-uk">
            ${daftarUkuran.map(uk => `<option value="${uk}" ${b.ukuran === uk ? "selected" : ""}>${uk}</option>`).join("")}
          </select>

          <input type="number" min="1" class="kalk-input kalk-qty" value="${b.jumlah}">

          <button type="button" class="btn-hapus" title="Hapus baris">✕</button>
        </div>
      `;
    }).join("");

    wadahBaris.querySelectorAll(".kalk-row").forEach(row => {
      const idx = Number(row.dataset.idx);

      row.querySelector(".kalk-menu").addEventListener("change", e => {
        baris[idx].id = e.target.value;
        baris[idx].ukuran = "R";
        renderBaris();
      });

      row.querySelector(".kalk-uk").addEventListener("change", e => {
        baris[idx].ukuran = e.target.value;
        perbaruiRingkasan();
      });

      const inputQty = row.querySelector(".kalk-qty");
      inputQty.addEventListener("input", e => {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) val = 1;
        baris[idx].jumlah = val;
        perbaruiRingkasan();
      });

      inputQty.addEventListener("change", e => {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 1) {
          val = 1;
          e.target.value = 1;
        }
        baris[idx].jumlah = val;
        perbaruiRingkasan();
      });

      row.querySelector(".btn-hapus").addEventListener("click", () => {
        baris.splice(idx, 1);
        renderBaris();
      });
    });

    perbaruiRingkasan();
  }

  function renderAddon() {
    const wadahAddon = document.querySelector("#daftarAddon");
    wadahAddon.innerHTML = ADDON.map(a => `
      <div class="addon-row">
        <span>${a.nama} <small>(+${rb(a.harga)})</small></span>
        <input type="number" min="0" class="kalk-input kalk-qty" data-aid="${a.id}" value="${addonJumlah[a.id] || 0}">
      </div>
    `).join("");

    wadahAddon.querySelectorAll("input").forEach(inp => {
      const aid = inp.dataset.aid;
      inp.addEventListener("input", e => {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 0) val = 0;
        addonJumlah[aid] = val;
        perbaruiRingkasan();
      });

      inp.addEventListener("change", e => {
        let val = parseInt(e.target.value, 10);
        if (isNaN(val) || val < 0) {
          val = 0;
          e.target.value = 0;
        }
        addonJumlah[aid] = val;
        perbaruiRingkasan();
      });
    });
  }

  document.querySelector("#btnTambahBaris").addEventListener("click", () => {
    baris.push({ id: MENU[0].id, ukuran: "R", jumlah: 10 });
    renderBaris();
  });

  renderAddon();
  renderBaris();
}

// =========================================
// LANGKAH 9: MODE RINGAN & DETEKSI KONEKSI
// =========================================
function setRingan(aktif) {
  document.body.classList.toggle("ringan", aktif);
  try {
    localStorage.setItem("tens-ringan", aktif ? "1" : "0");
  } catch (e) {}

  // Perbarui teks tombol di footer
  const btnFooter = document.querySelector("#btnModeRingan");
  if (btnFooter) {
    btnFooter.textContent = aktif ? "Mode Ringan: Aktif (Matikan)" : "Mode Ringan: Nonaktif";
  }

  // Sembunyikan bar peringatan jika Mode Ringan sudah diaktifkan
  const barLambat = document.querySelector("#barLambat");
  if (barLambat && aktif) {
    barLambat.hidden = true;
  }
}

// 1. Cek apakah pengguna sebelumnya sudah mengaktifkan Mode Ringan
let tersimpan = null;
try {
  tersimpan = localStorage.getItem("tens-ringan");
} catch (e) {}

if (tersimpan === "1") {
  setRingan(true);
}

// 2. Deteksi otomatis koneksi lambat (jika browser mendukung navigator.connection)
const k = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const lambat = k && (k.saveData || ["slow-2g", "2g", "3g"].includes(k.effectiveType));

const barLambat = document.querySelector("#barLambat");
if (lambat && tersimpan !== "1" && barLambat) {
  barLambat.hidden = false;
}

// 3. Tombol manual di bar atas & footer
const btnAktifkanRingan = document.querySelector("#btnAktifkanRingan");
if (btnAktifkanRingan) {
  btnAktifkanRingan.addEventListener("click", () => setRingan(true));
}

const btnModeRingan = document.querySelector("#btnModeRingan");
if (btnModeRingan) {
  btnModeRingan.addEventListener("click", () => {
    const sedangAktif = document.body.classList.contains("ringan");
    setRingan(!sedangAktif);
  });
}

// =========================================
// TOMBOL PESAN VIA WHATSAPP UNTUK PAKET SIAP PESAN
// =========================================
document.querySelectorAll(".btn-paket").forEach(tombol => {
  const namaPaket = tombol.dataset.paket;
  const detailPaket = tombol.dataset.detail;
  const hargaPaket = tombol.dataset.harga;

  const pesan = `Halo Tens Coffee, saya tertarik memesan:\n` +
    `*${namaPaket}*\n` +
    `Isi: ${detailPaket}\n` +
    `Estimasi harga: ${hargaPaket}\n\n` +
    `Mohon info ketersediaan dan langkah pemesanannya ya.`;

  tombol.href = linkWA(pesan);
});