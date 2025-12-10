// State management
const appState = {
    formData: {},
    isGenerated: false
};

// Form elements
const form = {
    namaMadrasah: document.getElementById('namaMadrasah'),
    fase: document.getElementById('fase'),
    kelas: document.getElementById('kelas'),
    tahunAjaran: document.getElementById('tahunAjaran'),
    tema: document.getElementById('tema'),
    temaKustom: document.getElementById('temaKustom'),
    strategi: document.getElementById('strategi'),
    alokasi: document.getElementById('alokasi'),
    tujuan: document.getElementById('tujuan'),
    kegiatan: document.getElementById('kegiatan'),
    integrasiNilai: document.getElementById('integrasiNilai'),
    penilaian: document.getElementById('penilaian')
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
    btnGenerate.addEventListener('click', generatePreview);
    btnDownload.addEventListener('click', downloadDocument);
    
    // Auto-update preview when fields change (optional)
    Object.values(form).forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                if (appState.isGenerated) {
                    generatePreview();
                }
            });
            input.addEventListener('change', () => {
                if (appState.isGenerated) {
                    generatePreview();
                }
            });
        }
    });
});

// Get selected KBC dimensions
function getSelectedDimensi() {
    const checkboxes = document.querySelectorAll('.dimensi-checkbox:checked');
    return Array.from(checkboxes).map(cb => cb.value).join(', ') || 'Belum dipilih';
}

// Generate preview
function generatePreview() {
    const tema = form.tema.value === 'Lainnya' ? form.temaKustom.value : form.tema.value;
    
    // Collect form data
    appState.formData = {
        namaMadrasah: form.namaMadrasah.value || 'Nama Madrasah',
        fase: getFaseName(form.fase.value),
        kelas: form.kelas.value || 'Belum diisi',
        tahunAjaran: form.tahunAjaran.value,
        tema: tema || 'Belum dipilih',
        dimensiKBC: getSelectedDimensi(),
        strategi: form.strategi.value || 'Belum dipilih',
        alokasi: form.alokasi.value || 'Belum ditentukan',
        tujuan: form.tujuan.value || 'Belum diisi',
        kegiatan: form.kegiatan.value || 'Belum diisi',
        integrasiNilai: form.integrasiNilai.value || 'Belum diisi',
        penilaian: form.penilaian.value || 'Belum diisi'
    };
    
    // Generate HTML preview
    const previewHTML = `
        <div style="padding: 10px;">
            <h2 style="text-align: center; color: #104E8B; margin-bottom: 20px; font-size: 18px;">
                RENCANA PEMBELAJARAN KOKURIKULER<br>
                DENGAN PENDEKATAN DEEP LEARNING DAN KURIKULUM BERBASIS CINTA
            </h2>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px;">
                A. INFORMASI DASAR
            </h3>
            <div style="line-height: 2;">
                <strong>Nama Madrasah:</strong> ${appState.formData.namaMadrasah}<br>
                <strong>Fase:</strong> ${appState.formData.fase}<br>
                <strong>Kelas:</strong> ${appState.formData.kelas}<br>
                <strong>Tahun Ajaran:</strong> ${appState.formData.tahunAjaran}
            </div>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px;">
                B. TEMA KOKURIKULER
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.8;"><strong>Tema:</strong> ${appState.formData.tema}</p>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px;">
                C. DIMENSI CINTA (KBC) YANG DIKEMBANGKAN
            </h3>
            <p style="line-height: 1.8;"><strong>Dimensi:</strong> ${appState.formData.dimensiKBC}</p>
            <p style="font-size: 12px; font-style: italic; color: #666; margin-top: 10px;">
                💡 <em>Cinta kepada Allah | Cinta kepada Diri Sendiri | Cinta kepada Keluarga | Cinta kepada Masyarakat | Cinta kepada Lingkungan</em>
            </p>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px;">
                D. KERANGKA DEEP LEARNING
            </h3>
            <p style="line-height: 1.8;"><strong>Strategi Pembelajaran:</strong> ${appState.formData.strategi}</p>
            <p style="line-height: 1.8;"><strong>Alokasi Waktu:</strong> ${appState.formData.alokasi}</p>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px;">
                E. TUJUAN PEMBELAJARAN
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.8;">${appState.formData.tujuan}</p>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px;">
                F. AKTIVITAS PEMBELAJARAN UTAMA
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.8;">${appState.formData.kegiatan}</p>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px;">
                G. INTEGRASI NILAI-NILAI KURIKULUM BERBASIS CINTA
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.8;">${appState.formData.integrasiNilai}</p>
            
            <h3 style="color: #104E8B; margin-top: 15px; margin-bottom: 10px; border-bottom: 2px solid #104E8B; padding-bottom: 5px;">
                H. ASESMEN/PENILAIAN HOLISTIK
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.8;">${appState.formData.penilaian}</p>
            <p style="font-size: 12px; font-style: italic; color: #666; margin-top: 10px;">
                📊 <em>Penilaian mencakup: Pengetahuan, Keterampilan, Sikap/Akhlak, Produk, dan Refleksi</em>
            </p>
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
            <title>Perencanaan Kokurikuler Deep Learning dan KBC - ${appState.formData.namaMadrasah}</title>
            <style>
                @page {
                    size: A4;
                    margin: 2.5cm;
                }
                body {
                    font-family: 'Times New Roman', Times, serif;
                    font-size: 12pt;
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
                    font-size: 14pt;
                    font-weight: bold;
                    margin-top: 5px;
                    margin-bottom: 20px;
                }
                h3 {
                    font-size: 12pt;
                    font-weight: bold;
                    margin-top: 15px;
                    margin-bottom: 8px;
                }
                p {
                    text-align: justify;
                    margin-bottom: 10px;
                }
                .info {
                    margin-bottom: 10px;
                }
                .info strong {
                    display: inline-block;
                    width: 150px;
                }
            </style>
        </head>
        <body>
            <h1>RENCANA PEMBELAJARAN KOKURIKULER</h1>
            <h1>DENGAN PENDEKATAN DEEP LEARNING DAN KURIKULUM BERBASIS CINTA</h1>
            
            <h2>A. INFORMASI DASAR</h2>
            <div class="info">
                <strong>Nama Madrasah</strong>: ${appState.formData.namaMadrasah}
            </div>
            <div class="info">
                <strong>Fase</strong>: ${appState.formData.fase}
            </div>
            <div class="info">
                <strong>Kelas</strong>: ${appState.formData.kelas}
            </div>
            <div class="info">
                <strong>Tahun Ajaran</strong>: ${appState.formData.tahunAjaran}
            </div>
            
            <h2>B. TEMA KOKURIKULER</h2>
            <p><strong>Tema:</strong> ${appState.formData.tema}</p>
            
            <h2>C. DIMENSI CINTA (KBC) YANG DIKEMBANGKAN</h2>
            <p><strong>Dimensi:</strong> ${appState.formData.dimensiKBC}</p>
            
            <h2>D. KERANGKA DEEP LEARNING</h2>
            <p><strong>Strategi Pembelajaran:</strong> ${appState.formData.strategi}</p>
            <p><strong>Alokasi Waktu:</strong> ${appState.formData.alokasi}</p>
            
            <h2>E. TUJUAN PEMBELAJARAN</h2>
            <p>${appState.formData.tujuan.replace(/\n/g, '<br>')}</p>
            
            <h2>F. AKTIVITAS PEMBELAJARAN UTAMA</h2>
            <p>${appState.formData.kegiatan.replace(/\n/g, '<br>')}</p>
            
            <h2>G. INTEGRASI NILAI-NILAI KURIKULUM BERBASIS CINTA</h2>
            <p>${appState.formData.integrasiNilai.replace(/\n/g, '<br>')}</p>
            
            <h2>H. ASESMEN/PENILAIAN HOLISTIK</h2>
            <p>${appState.formData.penilaian.replace(/\n/g, '<br>')}</p>
        </body>
        </html>
    `;
    
    // Create blob and download
    const blob = new Blob([documentContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Rencana_Kokurikuler_DL_KBC_${appState.formData.namaMadrasah.replace(/\s+/g, '_')}_${appState.formData.tahunAjaran.replace('/', '-')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('✅ Dokumen berhasil diunduh! Anda dapat membukanya dengan Microsoft Word atau aplikasi serupa.');
}

// Open panduan in new window or modal
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
    2. Identifikasi dimensi KBC yang akan dikembangkan
    3. Pilih strategi Deep Learning yang sesuai
    4. Rancang aktivitas pembelajaran yang melibatkan siswa secara aktif
    5. Integrasikan nilai-nilai cinta dalam setiap kegiatan
    6. Tentukan penilaian yang holistik (pengetahuan, keterampilan, sikap, produk, refleksi)

    Untuk panduan lengkap, buka file PANDUAN_DL_KBC.md di folder aplikasi.
    `;
    
    alert(panduan);
}
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
