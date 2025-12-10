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
    
    // Create document content
    const documentContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Rencana Pembelajaran Kokurikuler - ${appState.formData.namaMadrasah}</title>
            <style>
                @page {
                    size: A4;
                    margin: 2.5cm;
                }
                body {
                    font-family: 'Times New Roman', Times, serif;
                    font-size: 11pt;
                    line-height: 1.5;
                }
                h1, h2 {
                    text-align: center;
                    color: #000;
                }
                h1 {
                    font-size: 14pt;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                h2 {
                    font-size: 13pt;
                    font-weight: bold;
                    margin-top: 15px;
                    margin-bottom: 10px;
                    text-decoration: underline;
                }
                p {
                    text-align: justify;
                    margin-bottom: 8px;
                    white-space: pre-wrap;
                }
                .info {
                    margin-bottom: 8px;
                }
                .info strong {
                    display: inline-block;
                    width: 180px;
                }
            </style>
        </head>
        <body>
            <h1>RENCANA PEMBELAJARAN KOKURIKULER</h1>
            <h1>DENGAN PENDEKATAN DEEP LEARNING DAN KURIKULUM BERBASIS CINTA</h1>
            
            <h2>A. INFORMASI DASAR</h2>
            <div class="info"><strong>Nama Madrasah</strong>: ${appState.formData.namaMadrasah}</div>
            <div class="info"><strong>Fase</strong>: ${appState.formData.fase}</div>
            <div class="info"><strong>Kelas</strong>: ${appState.formData.kelas}</div>
            <div class="info"><strong>Tahun Ajaran</strong>: ${appState.formData.tahunAjaran}</div>
            
            <h2>B. TEMA KOKURIKULER</h2>
            <p>${appState.formData.tema}</p>
            
            <h2>C. KOMPONEN PEMBELAJARAN</h2>
            <p><strong>Pokok Bahasan:</strong> ${appState.formData.pokokBahasan}</p>
            <p><strong>Mata Pelajaran Kolaboratif:</strong> ${appState.formData.mapelKolaboratif}</p>
            <p><strong>Topik KBC:</strong> ${appState.formData.topikKBC}</p>
            
            <h2>D. DIMENSI PROFIL LULUSAN (DPL)</h2>
            <p>${appState.formData.dimensiProfilLulusan.replace(/\n• /g, '\n• ')}</p>
            
            <h2>E. KERANGKA DEEP LEARNING</h2>
            <p><strong>Strategi Pembelajaran:</strong> ${appState.formData.strategi}</p>
            <p><strong>Alokasi Waktu:</strong> ${appState.formData.alokasi}</p>
            
            <h2>F. TUJUAN PEMBELAJARAN</h2>
            <p>${appState.formData.tujuan.replace(/\n• /g, '\n• ')}</p>
            
            <h2>G. AKTIVITAS PEMBELAJARAN UTAMA</h2>
            <p>${appState.formData.kegiatan.replace(/\n• /g, '\n• ')}</p>
            
            <h2>H. INTEGRASI NILAI-NILAI KURIKULUM BERBASIS CINTA</h2>
            <p>${appState.formData.integrasiNilai.replace(/\n• /g, '\n• ')}</p>
            
            <h2>I. ASESMEN/PENILAIAN HOLISTIK</h2>
            <p>${appState.formData.penilaian.replace(/\n• /g, '\n• ')}</p>
            
            ${appState.formData.catatan ? `
            <h2>J. CATATAN/KETERANGAN TAMBAHAN</h2>
            <p>${appState.formData.catatan}</p>
            ` : ''}
        </body>
        </html>
    `;
    
    // Create blob and download
    const blob = new Blob([documentContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Rencana_Kokurikuler_${appState.formData.namaMadrasah.replace(/\s+/g, '_')}_${appState.formData.tahunAjaran.replace('/', '-')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('✅ Dokumen berhasil diunduh! Anda dapat membukanya dengan Microsoft Word atau aplikasi serupa.');
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
