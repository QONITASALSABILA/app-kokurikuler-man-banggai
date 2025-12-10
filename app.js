// State management
const appState = {
    formData: {},
    isGenerated: false,
    selectedTheme: ''
};

// Form elements
const form = {
    namaMadrasah: document.getElementById('namaMadrasah'),
    fase: document.getElementById('fase'),
    kelas: document.getElementById('kelas'),
    tahunAjaran: document.getElementById('tahunAjaran'),
    tema: document.getElementById('tema'),
    pokokBahasan: document.getElementById('pokokBahasan'),
    mapelKolaboratif: document.getElementById('mapelKolaboratif'),
    topikKBC: document.getElementById('topikKBC'),
    dimensiProfilLulusan: document.getElementById('dimensiProfilLulusan'),
    strategi: document.getElementById('strategi'),
    alokasi: document.getElementById('alokasi'),
    tujuan: document.getElementById('tujuan'),
    kegiatan: document.getElementById('kegiatan'),
    integrasiNilai: document.getElementById('integrasiNilai'),
    penilaian: document.getElementById('penilaian'),
    catatan: document.getElementById('catatan')
};

// Preview element
const previewContent = document.getElementById('previewContent');
const btnGenerate = document.getElementById('btnGenerate');
const btnDownload = document.getElementById('btnDownload');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set default academic year
    const currentYear = new Date().getFullYear();
    form.tahunAjaran.value = `${currentYear}/${currentYear + 1}`;
    
    // Add event listeners
    form.tema.addEventListener('change', handleThemeChange);
    btnGenerate.addEventListener('click', generatePreview);
    btnDownload.addEventListener('click', downloadDocument);
});

// Handle theme change - update all related dropdowns
function handleThemeChange() {
    const selectedTheme = form.tema.value;
    appState.selectedTheme = selectedTheme;
    
    if (!selectedTheme || !learningDatabase[selectedTheme]) {
        // Reset all dropdowns
        resetAllSelects();
        return;
    }
    
    const themeData = learningDatabase[selectedTheme];
    
    // Update Pokok Bahasan
    updateSelect(form.pokokBahasan, themeData.pokok_bahasan);
    
    // Update Mapel Kolaboratif
    updateSelect(form.mapelKolaboratif, themeData.mapel_kolaboratif);
    
    // Update Topik KBC
    updateSelect(form.topikKBC, themeData.topik_kbc);
    
    // Update Dimensi Profil Lulusan (multi-select)
    updateMultiSelect(form.dimensiProfilLulusan, themeData.profil_lulusan);
    
    // Update Tujuan Pembelajaran (multi-select)
    updateMultiSelect(form.tujuan, themeData.tujuan_pembelajaran);
    
    // Update Aktivitas Pembelajaran (multi-select)
    updateMultiSelect(form.kegiatan, themeData.aktivitas_pembelajaran);
    
    // Update Integrasi KBC (multi-select)
    updateMultiSelect(form.integrasiNilai, themeData.integrasi_kbc);
    
    // Update Penilaian (multi-select)
    updateMultiSelect(form.penilaian, themeData.penilaian);
}

// Update single-select dropdown
function updateSelect(selectElement, options) {
    selectElement.innerHTML = '<option value="">-- Pilih --</option>';
    selectElement.disabled = false;
    
    options.forEach(option => {
        const optionEl = document.createElement('option');
        optionEl.value = option;
        optionEl.textContent = option;
        selectElement.appendChild(optionEl);
    });
}

// Update multi-select dropdown
function updateMultiSelect(selectElement, options) {
    selectElement.innerHTML = '';
    selectElement.disabled = false;
    
    options.forEach(option => {
        const optionEl = document.createElement('option');
        optionEl.value = option;
        optionEl.textContent = option;
        selectElement.appendChild(optionEl);
    });
    
    // Auto-select all options
    for (let i = 0; i < selectElement.options.length; i++) {
        selectElement.options[i].selected = true;
    }
}

// Reset all selects
function resetAllSelects() {
    form.pokokBahasan.innerHTML = '<option value="">Pilih tema terlebih dahulu</option>';
    form.pokokBahasan.disabled = true;
    
    form.mapelKolaboratif.innerHTML = '<option value="">Pilih tema terlebih dahulu</option>';
    form.mapelKolaboratif.disabled = true;
    
    form.topikKBC.innerHTML = '<option value="">Pilih tema terlebih dahulu</option>';
    form.topikKBC.disabled = true;
    
    form.dimensiProfilLulusan.innerHTML = '<option value="">Pilih tema terlebih dahulu</option>';
    form.dimensiProfilLulusan.disabled = true;
    
    form.tujuan.innerHTML = '<option value="">Pilih tema terlebih dahulu</option>';
    form.tujuan.disabled = true;
    
    form.kegiatan.innerHTML = '<option value="">Pilih tema terlebih dahulu</option>';
    form.kegiatan.disabled = true;
    
    form.integrasiNilai.innerHTML = '<option value="">Pilih tema terlebih dahulu</option>';
    form.integrasiNilai.disabled = true;
    
    form.penilaian.innerHTML = '<option value="">Pilih tema terlebih dahulu</option>';
    form.penilaian.disabled = true;
}

// Get selected values from multi-select
function getSelectedValues(selectElement) {
    const selected = [];
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].selected) {
            selected.push(selectElement.options[i].value);
        }
    }
    return selected;
}

// Generate preview
function generatePreview() {
    // Collect form data
    appState.formData = {
        namaMadrasah: form.namaMadrasah.value || 'Nama Madrasah',
        fase: getFaseName(form.fase.value),
        kelas: form.kelas.value || 'Belum diisi',
        tahunAjaran: form.tahunAjaran.value,
        tema: form.tema.value || 'Belum dipilih',
        pokokBahasan: form.pokokBahasan.value || 'Belum dipilih',
        mapelKolaboratif: form.mapelKolaboratif.value || 'Belum dipilih',
        topikKBC: form.topikKBC.value || 'Belum dipilih',
        dimensiProfilLulusan: getSelectedValues(form.dimensiProfilLulusan).join('\n• ') || 'Belum dipilih',
        strategi: form.strategi.value || 'Belum dipilih',
        alokasi: form.alokasi.value || 'Belum ditentukan',
        tujuan: getSelectedValues(form.tujuan).join('\n• ') || 'Belum diisi',
        kegiatan: getSelectedValues(form.kegiatan).join('\n• ') || 'Belum diisi',
        integrasiNilai: getSelectedValues(form.integrasiNilai).join('\n• ') || 'Belum diisi',
        penilaian: getSelectedValues(form.penilaian).join('\n• ') || 'Belum diisi',
        catatan: form.catatan.value || ''
    };
    
    // Generate HTML preview
    const previewHTML = `
        <div style="padding: 15px; font-size: 13px;">
            <h2 style="text-align: center; color: #104E8B; margin-bottom: 20px; font-size: 16px; line-height: 1.4;">
                RENCANA PEMBELAJARAN KOKURIKULER<br>
                DENGAN PENDEKATAN DEEP LEARNING DAN KURIKULUM BERBASIS CINTA
            </h2>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px; font-size: 14px;">
                A. INFORMASI DASAR
            </h3>
            <div style="line-height: 1.8; margin-bottom: 15px;">
                <strong>Nama Madrasah:</strong> ${appState.formData.namaMadrasah}<br>
                <strong>Fase:</strong> ${appState.formData.fase}<br>
                <strong>Kelas:</strong> ${appState.formData.kelas}<br>
                <strong>Tahun Ajaran:</strong> ${appState.formData.tahunAjaran}
            </div>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px; font-size: 14px;">
                B. TEMA KOKURIKULER
            </h3>
            <p style="margin-bottom: 15px;"><strong>Tema:</strong> ${appState.formData.tema}</p>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px; font-size: 14px;">
                C. KOMPONEN PEMBELAJARAN
            </h3>
            <p style="margin-bottom: 8px;"><strong>Pokok Bahasan:</strong> ${appState.formData.pokokBahasan}</p>
            <p style="margin-bottom: 8px;"><strong>Mata Pelajaran Kolaboratif:</strong> ${appState.formData.mapelKolaboratif}</p>
            <p style="margin-bottom: 8px;"><strong>Topik KBC:</strong> ${appState.formData.topikKBC}</p>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px; font-size: 14px;">
                D. DIMENSI PROFIL LULUSAN (DPL)
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.8; margin-bottom: 15px;">• ${appState.formData.dimensiProfilLulusan}</p>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px; font-size: 14px;">
                E. KERANGKA DEEP LEARNING
            </h3>
            <p style="line-height: 1.8; margin-bottom: 15px;"><strong>Strategi Pembelajaran:</strong> ${appState.formData.strategi}<br>
            <strong>Alokasi Waktu:</strong> ${appState.formData.alokasi}</p>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px; font-size: 14px;">
                F. TUJUAN PEMBELAJARAN
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.8; margin-bottom: 15px;">• ${appState.formData.tujuan}</p>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px; font-size: 14px;">
                G. AKTIVITAS PEMBELAJARAN UTAMA
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.8; margin-bottom: 15px;">• ${appState.formData.kegiatan}</p>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px; font-size: 14px;">
                H. INTEGRASI NILAI-NILAI KURIKULUM BERBASIS CINTA
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.8; margin-bottom: 15px;">• ${appState.formData.integrasiNilai}</p>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px; font-size: 14px;">
                I. ASESMEN/PENILAIAN HOLISTIK
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.8; margin-bottom: 15px;">• ${appState.formData.penilaian}</p>
            
            ${appState.formData.catatan ? `
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px; font-size: 14px;">
                J. CATATAN/KETERANGAN TAMBAHAN
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.8;">${appState.formData.catatan}</p>
            ` : ''}
        </div>
    `;
    
    previewContent.innerHTML = previewHTML;
    appState.isGenerated = true;
    btnDownload.disabled = false;
}

// Get fase name
function getFaseName(fase) {
    const faseNames = {
        'A': 'Fase A (Kelas I dan II)',
        'B': 'Fase B (Kelas III dan IV)',
        'C': 'Fase C (Kelas V dan VI)',
        'D': 'Fase D (Kelas VII, VIII, dan IX)',
        'E': 'Fase E (Kelas X)',
        'F': 'Fase F (Kelas XI dan XII)'
    };
    return faseNames[fase] || fase;
}

// Open panduan
function openPanduan() {
    const panduan = `
    PANDUAN PEMBELAJARAN DEEP LEARNING DAN KURIKULUM BERBASIS CINTA (KBC)

    === DEEP LEARNING ===
    Deep Learning adalah pendekatan pembelajaran yang memfokuskan pada pemahaman mendalam siswa melalui:
    • Meaningful Learning (Pembelajaran Bermakna)
    • Active Learning (Pembelajaran Aktif)
    • Critical Thinking (Berpikir Kritis)
    • Problem-Based Learning (Pembelajaran Berbasis Masalah)
    • Collaborative Learning (Pembelajaran Kolaboratif)

    === KURIKULUM BERBASIS CINTA (KBC) ===
    KBC menempatkan cinta/kasih sayang sebagai nilai inti pendidikan dengan 5 dimensi:
    1. Cinta kepada Allah/Tuhan (Spiritual & Keimanan)
    2. Cinta kepada Diri Sendiri (Pengembangan Diri & Kesehatan Mental)
    3. Cinta kepada Keluarga (Hubungan Harmonis)
    4. Cinta kepada Masyarakat (Tanggung Jawab Sosial)
    5. Cinta kepada Lingkungan (Kesadaran Ekologis)

    === STRATEGI DEEP LEARNING ===
    • Problem-Based Learning (PBL): Pembelajaran dimulai dari masalah nyata
    • Project-Based Learning (PjBL): Siswa mengerjakan proyek yang menghasilkan produk
    • Collaborative Learning: Kerja sama kelompok dengan peran yang jelas
    • Critical Thinking: Analisis, diskusi, dan argumentasi

    === LANGKAH PERENCANAAN ===
    1. Pilih Tema yang relevan dengan kehidupan siswa
    2. Tema akan otomatis menampilkan komponen pembelajaran yang sesuai
    3. Pilih strategi Deep Learning yang sesuai
    4. Rancang aktivitas pembelajaran yang melibatkan siswa secara aktif
    5. Integrasikan nilai-nilai cinta dalam setiap kegiatan
    6. Tentukan penilaian yang holistik
    `;
    
    alert(panduan);
}

// Download as Word document
function downloadDocument() {
    if (!appState.isGenerated) {
        alert('Silakan generate preview terlebih dahulu!');
        return;
    }
    
    const year = new Date().getFullYear();
    const selectedTema = form.tema.value;
    const themeData = learningDatabase[selectedTema];
    const mapelArray = form.mapelKolaboratif.value ? form.mapelKolaboratif.value.split(',').map(m => m.trim()) : [];
    
    // Generate tujuan pembelajaran per mapel
    let tujuanPerMapel = '';
    if (themeData && mapelArray.length > 0) {
        const tujuanList = getSelectedValues(form.tujuan);
        mapelArray.forEach((mapel, idx) => {
            if (tujuanList[idx]) {
                tujuanPerMapel += `• ${tujuanList[idx]} (mata pelajaran ${mapel})\n`;
            }
        });
    }
    
    // Get selected values
    const dimensiDPL = getSelectedValues(form.dimensiProfilLulusan);
    const tujuanKBC = getSelectedValues(form.integrasiNilai);
    const tujuanPembelajaran = getSelectedValues(form.tujuan);
    const aktivitasList = getSelectedValues(form.kegiatan);
    const penilaianList = getSelectedValues(form.penilaian);
    
    // Create document content
    const documentContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>RPP ${selectedTema}</title>
    <style>
        @page { size: A4; margin: 2.5cm; }
        body { 
            font-family: 'Calibri', Arial, sans-serif; 
            font-size: 11pt; 
            line-height: 1.6; 
            color: #000;
        }
        .cover { 
            text-align: center; 
            padding: 40px 20px; 
            margin-bottom: 30px;
        }
        .cover h1 { 
            font-size: 16pt; 
            font-weight: bold; 
            margin: 15px 0; 
            line-height: 1.4;
        }
        .cover h2 { 
            font-size: 14pt; 
            font-weight: bold; 
            margin: 10px 0;
            text-transform: uppercase;
        }
        .cover p { 
            font-size: 12pt; 
            margin: 8px 0;
        }
        .section-title { 
            font-size: 11pt; 
            font-weight: bold; 
            margin-top: 18px; 
            margin-bottom: 10px;
            text-transform: uppercase;
        }
        .info-table { 
            margin-bottom: 15px;
            line-height: 1.8;
        }
        .info-table div {
            margin-bottom: 5px;
        }
        .content { 
            text-align: justify; 
            margin-bottom: 12px;
        }
        .bullet-list {
            margin-left: 20px;
            line-height: 1.8;
        }
        .sub-section {
            margin-left: 15px;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .sub-section strong {
            text-decoration: underline;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            margin-bottom: 15px;
        }
        table, th, td {
            border: 1px solid #000;
        }
        th, td {
            padding: 8px;
            text-align: left;
            font-size: 10pt;
        }
        th {
            background-color: #D3D3D3;
            font-weight: bold;
            text-align: center;
        }
        .page-break {
            page-break-after: always;
        }
    </style>
</head>
<body>
    <!-- COVER PAGE -->
    <div class="cover">
        <h1>RENCANA KEGIATAN KOKURIKULER MADRASAH</h1>
        <p style="margin-top: 20px;">Pembelajaran Kolaboratif Lintas Disiplin Ilmu</p>
        <h2 style="margin-top: 30px;">${selectedTema.toUpperCase()}</h2>
        <p style="margin-top: 30px;">Tahun Ajaran ${form.tahunAjaran.value}</p>
        <p style="margin-top: 40px; font-size: 13pt; font-weight: bold;">${form.namaMadrasah.value}</p>
        <p style="margin-top: 50px; font-size: 10pt;">@pengawas keren youtube channel</p>
        <p>${year}</p>
    </div>
    
    <div class="page-break"></div>
    
    <!-- MAIN CONTENT -->
    <h1 style="text-align: center; font-size: 13pt; font-weight: bold; margin-bottom: 20px;">RENCANA KEGIATAN KOKURIKULER MADRASAH</h1>
    
    <div class="section-title">A. IDENTITAS MADRASAH</div>
    <div class="info-table">
        <div><strong>Nama Madrasah</strong>   : ${form.namaMadrasah.value}</div>
        <div><strong>Fase</strong>            : ${form.fase.value}</div>
        <div><strong>Kelas</strong>           : ${form.kelas.value}</div>
        <div><strong>Tahun Ajaran</strong>    : ${form.tahunAjaran.value}</div>
        <div><strong>Total JP</strong>        : ${form.alokasi.value}</div>
    </div>
    
    <div class="section-title">B. TEMA PROJEK</div>
    <div class="content">
        <strong>Tema Projek:</strong> ${selectedTema}<br>
        <strong>Pokok Bahasan:</strong> ${form.pokokBahasan.value}<br>
        <strong>Mapel Kolaboratif:</strong> ${form.mapelKolaboratif.value}
    </div>
    
    <div class="section-title">C. TOPIK KBC</div>
    <div class="content">
        ${tujuanKBC.map(tk => `• ${tk}`).join('<br>\n        ')}
    </div>
    
    <div class="section-title">D. PROFIL LULUSAN</div>
    <div class="content">
        ${dimensiDPL.map(dpl => `• ${dpl}`).join('<br>\n        ')}
    </div>
    
    <div class="section-title">E. TUJUAN KBC</div>
    <div class="content">
        ${tujuanKBC.map(tj => `• ${tj.charAt(0).toUpperCase() + tj.slice(1)}.`).join('<br>\n        ')}
    </div>
    
    <div class="section-title">F. TUJUAN PEMBELAJARAN MENDALAM (PM)</div>
    <div class="content">
        ${tujuanPembelajaran.map((tp, idx) => {
            const mapel = mapelArray[idx] || mapelArray[0] || 'Pembelajaran';
            return `• ${tp} (mata pelajaran ${mapel})`;
        }).join('<br>\n        ')}
    </div>
    
    <div class="section-title">G. PRAKTEK PEDAGOGIK</div>
    <div class="content">
        <strong>Model Pembelajaran:</strong> ${form.strategi.value} melalui kegiatan ${aktivitasList[0] ? aktivitasList[0].toLowerCase() : 'pembelajaran kolaboratif'}.<br><br>
        
        <strong>Lingkungan Belajar:</strong> Ruang kelas, laboratorium, area praktik, perpustakaan, serta lingkungan sekitar madrasah yang mendukung eksplorasi dan pembelajaran kolaboratif.<br><br>
        
        <strong>Kemitraan Pembelajaran:</strong> Kolaborasi guru ${form.mapelKolaboratif.value} dalam merancang kegiatan pembelajaran yang terintegrasi dengan nilai-nilai Kurikulum Berbasis Cinta.<br><br>
        
        <strong>Pemanfaatan Digital:</strong> Penggunaan teknologi digital untuk riset, dokumentasi proses pembelajaran, presentasi hasil karya, serta platform kolaborasi online untuk mendukung pembelajaran mendalam.
    </div>
    
    <div class="page-break"></div>
    
    <div class="section-title">H. KEGIATAN PEMBELAJARAN</div>
    
    <div class="sub-section">
        <strong>1. Persiapan (${Math.ceil(parseInt(form.alokasi.value) * 0.15) || 2} JP)</strong><br>
        <strong>Pemahaman Konsep:</strong><br>
        Guru ${form.mapelKolaboratif.value.split(',')[0]} bersama guru kolaboratif lainnya berdiskusi dengan murid tentang tema "${selectedTema}", tujuan pembelajaran, dan keterkaitan dengan kehidupan nyata serta nilai-nilai Islam.
        <br><br>
        <strong>Penyiapan Alat & Bahan:</strong>
        <div class="bullet-list">
            ${mapelArray.map(mapel => `• ${mapel}: Modul pembelajaran, alat peraga, bahan praktik, dan referensi terkait`).join('<br>\n            ')}
        </div>
        <br>
        <strong>Pengaturan Jadwal:</strong>
        <div class="bullet-list">
            • Hari 1 – Pengenalan tema dan pembentukan kelompok<br>
            • Hari 2 – Eksplorasi konsep dan analisis masalah<br>
            • Hari 3–4 – Perancangan dan eksekusi projek<br>
            • Hari 5 – Pelaksanaan kegiatan utama<br>
            • Hari 6 – Presentasi dan refleksi
        </div>
    </div>
    
    <div class="sub-section">
        <strong>2. Pelaksanaan (${Math.ceil(parseInt(form.alokasi.value) * 0.60) || 6} JP)</strong><br><br>
        
        <strong>**1. Pengenalan Tema dan Penguatan Nilai (Hari 1)**</strong><br>
        • Guru memperkenalkan tema "${selectedTema}" dengan mengaitkan pada kehidupan sehari-hari dan nilai-nilai keislaman.<br>
        • Diskusi awal tentang ${form.pokokBahasan.value}.<br>
        • Pembentukan kelompok belajar dengan peran yang jelas.<br>
        • ${tujuanKBC[0] || 'Penguatan nilai-nilai KBC'} sebagai landasan kegiatan.<br><br>
        
        <strong>**2. Eksplorasi dan Riset (Hari 2)**</strong><br>
        • ${aktivitasList[0] || 'Kegiatan eksplorasi dan penelitian'} untuk memahami konsep dasar.<br>
        • Murid melakukan riset literatur, wawancara, atau observasi lapangan sesuai tema.<br>
        • ${mapelArray[0] || 'Guru'}: membimbing analisis data dan informasi yang dikumpulkan.<br>
        • Kelompok menyusun rencana projek atau kegiatan yang akan dilaksanakan.<br><br>
        
        <strong>**3. Perancangan dan Desain (Hari 3)**</strong><br>
        • ${aktivitasList[1] || 'Kegiatan perancangan dan desain'} berdasarkan hasil riset.<br>
        • ${mapelArray[1] || 'Guru kolaboratif'}: membimbing proses perancangan dengan pendekatan saintifik.<br>
        • Murid merancang blueprint, storyboard, atau rencana detail kegiatan.<br>
        • Diskusi kelompok tentang tantangan dan solusi potensial.<br><br>
        
        <strong>**4. Pelaksanaan Projek Utama (Hari 4–5)**</strong><br>
        • ${aktivitasList[2] || 'Kegiatan pelaksanaan projek utama'} dengan bimbingan guru.<br>
        • Murid bekerja kolaboratif dalam kelompok, menerapkan konsep yang dipelajari.<br>
        • ${aktivitasList[3] || 'Kegiatan monitoring dan evaluasi proses'}.<br>
        • Guru memantau sikap: ketulusan, kerjasama, kreativitas, dan tanggung jawab murid.<br>
        • Dokumentasi proses pembelajaran (foto, video, catatan lapangan).<br><br>
        
        <strong>**5. Refleksi dan Presentasi (Hari 6)**</strong><br>
        • Murid mempresentasikan hasil projek/karya di depan kelas.<br>
        • Diskusi peer feedback dan masukan konstruktif.<br>
        • Guru ${form.mapelKolaboratif.value.split(',')[0]}: mengaitkan hasil pembelajaran dengan konsep yang dipelajari.<br>
        • Refleksi makna pembelajaran dikaitkan dengan ${tujuanKBC[0] || 'nilai-nilai KBC'}.<br>
        • Kelompok menyusun pesan inspiratif dari pengalaman mereka.
    </div>
    
    <div class="sub-section">
        <strong>3. Pembuatan Karya (${Math.ceil(parseInt(form.alokasi.value) * 0.15) || 2} JP)</strong>
        <div class="bullet-list">
            ${mapelArray.map(mapel => `• Produk karya terkait ${mapel}: laporan, prototipe, karya seni, atau dokumentasi`).join('<br>\n            ')}<br>
            • Dokumentasi proses: foto, video, atau portofolio digital<br>
            • Refleksi pembelajaran: jurnal individu dan kelompok
        </div>
    </div>
    
    <div class="sub-section">
        <strong>4. Presentasi Karya (${Math.ceil(parseInt(form.alokasi.value) * 0.05) || 1} JP)</strong><br>
        Presentasi kelompok berupa pemaparan hasil projek, dilengkapi dengan showcase karya dan demonstrasi.
    </div>
    
    <div class="sub-section">
        <strong>5. Refleksi (${Math.ceil(parseInt(form.alokasi.value) * 0.05) || 1} JP)</strong><br>
        Refleksi bersama tentang makna pembelajaran, nilai-nilai yang didapat, proses kolaborasi, dan rencana penerapan ilmu dalam kehidupan.
    </div>
    
    <div class="page-break"></div>
    
    <div class="section-title">LAMPIRAN</div>
    
    <div class="sub-section">
        <strong>Lampiran 1. Lembar Observasi</strong><br>
        <strong>Instrumen Pengamatan Guru</strong>
        
        <table>
            <thead>
                <tr>
                    <th style="width: 5%;">No</th>
                    <th style="width: 25%;">Nama Siswa</th>
                    <th style="width: 10%;">SB</th>
                    <th style="width: 10%;">B</th>
                    <th style="width: 10%;">C</th>
                    <th style="width: 10%;">K</th>
                    <th style="width: 30%;">Catatan Guru</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>1</td><td>Siswa 1</td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td>2</td><td>Siswa 2</td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td>3</td><td>Siswa 3</td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td>4</td><td>Siswa 4</td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td>5</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td>6</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            </tbody>
        </table>
        <p style="font-size: 9pt; font-style: italic;">Berilah tanda (√) sesuai hasil pengamatan perilaku dan sikap anak dalam kegiatan.</p>
    </div>
    
    <div class="sub-section">
        <strong>Lampiran 2. Rubrik Penilaian Kinerja</strong>
        
        <table>
            <thead>
                <tr>
                    <th style="width: 15%;">Aspek</th>
                    <th style="width: 21.25%;">SB</th>
                    <th style="width: 21.25%;">B</th>
                    <th style="width: 21.25%;">C</th>
                    <th style="width: 21.25%;">K</th>
                </tr>
            </thead>
            <tbody>
                ${dimensiDPL.map(dpl => `
                <tr>
                    <td><strong>${dpl}</strong></td>
                    <td>Menunjukkan ${dpl.toLowerCase()} dengan sangat baik; melampaui ekspektasi; konsisten dan mandiri.</td>
                    <td>Menunjukkan ${dpl.toLowerCase()} dengan baik; memenuhi ekspektasi; kadang perlu arahan.</td>
                    <td>Menunjukkan ${dpl.toLowerCase()} cukup; masih perlu bimbingan dan arahan guru.</td>
                    <td>Belum menunjukkan ${dpl.toLowerCase()}; perlu perhatian khusus dan bimbingan intensif.</td>
                </tr>
                `).join('')}
                <tr>
                    <td><strong>${form.topikKBC.value}</strong></td>
                    <td>Memiliki pemahaman mendalam; menerapkan nilai dengan konsisten; menjadi teladan.</td>
                    <td>Memahami nilai dengan baik; menerapkan dalam sebagian besar kegiatan.</td>
                    <td>Pemahaman dasar; penerapan masih perlu penguatan.</td>
                    <td>Belum memahami; tidak menunjukkan penerapan nilai.</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    ${appState.formData.catatan ? `
    <div class="page-break"></div>
    <div class="section-title">CATATAN KHUSUS</div>
    <div class="content">${appState.formData.catatan}</div>
    ` : ''}
    
</body>
</html>
    `;
    
    // Create blob and download
    const blob = new Blob([documentContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanedTheme = selectedTema.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
    link.download = `RPP_${cleanedTheme}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('✅ Dokumen RPP berhasil diunduh!\n\nDokumen dapat dibuka dengan Microsoft Word.\nFormat dokumen sudah lengkap dengan:\n• Cover halaman\n• Identitas madrasah\n• Komponen pembelajaran\n• Kegiatan pembelajaran detail\n• Lampiran observasi dan rubrik penilaian');
}

// Authentication functions (placeholder)
function handleRegistrasi() {
    const username = document.getElementById('usernameReg').value;
    const password = document.getElementById('passwordReg').value;
    
    if (!username || !password) {
        alert('Silakan isi username dan password!');
        return;
    }
    
    alert('Fitur registrasi akan segera tersedia. Saat ini aplikasi dapat digunakan tanpa login.');
}

function handleLogin() {
    const username = document.getElementById('usernameLogin').value;
    const password = document.getElementById('passwordLogin').value;
    
    if (!username || !password) {
        alert('Silakan isi username dan password!');
        return;
    }
    
    alert('Fitur login akan segera tersedia. Saat ini aplikasi dapat digunakan tanpa login.');
}
