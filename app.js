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
    dimensi: document.getElementById('dimensi'),
    modelPembelajaran: document.getElementById('modelPembelajaran'),
    kegiatan: document.getElementById('kegiatan'),
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
        input.addEventListener('input', () => {
            if (appState.isGenerated) {
                generatePreview();
            }
        });
    });
});

// Generate preview
function generatePreview() {
    // Collect form data
    appState.formData = {
        namaMadrasah: form.namaMadrasah.value || 'Nama Madrasah',
        fase: form.fase.value,
        kelas: form.kelas.value,
        tahunAjaran: form.tahunAjaran.value,
        dimensi: form.dimensi.value || 'Belum diisi',
        modelPembelajaran: form.modelPembelajaran.value || 'Belum diisi',
        kegiatan: form.kegiatan.value || 'Belum diisi',
        penilaian: form.penilaian.value || 'Belum diisi'
    };
    
    // Generate HTML preview
    const previewHTML = `
        <div style="padding: 10px;">
            <h2 style="text-align: center; color: #104E8B; margin-bottom: 20px;">
                PERENCANAAN KEGIATAN KOKURIKULER<br>
                INTEGRASI DEEP LEARNING DAN KURIKULUM BERBASIS CINTA
            </h2>
            
            <div style="margin-bottom: 15px;">
                <strong>Nama Madrasah:</strong> ${appState.formData.namaMadrasah}
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong>Fase:</strong> ${getFaseName(appState.formData.fase)}
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong>Kelas:</strong> ${appState.formData.kelas}
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong>Tahun Ajaran:</strong> ${appState.formData.tahunAjaran}
            </div>
            
            <h3 style="color: #104E8B; margin-top: 20px; margin-bottom: 10px;">
                Tema Kokurikuler
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.8;">${appState.formData.dimensi}</p>
            
            <h3 style="color: #104E8B; margin-top: 20px; margin-bottom: 10px;">
                Pendekatan Deep Learning dan Kurikulum Berbasis Cinta
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.8;">${appState.formData.modelPembelajaran}</p>
            
            <h3 style="color: #104E8B; margin-top: 20px; margin-bottom: 10px;">
                Kegiatan yang Akan Dilakukan
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.8;">${appState.formData.kegiatan}</p>
            
            <h3 style="color: #104E8B; margin-top: 20px; margin-bottom: 10px;">
                Asesmen/Penilaian
            </h3>
            <p style="white-space: pre-wrap; line-height: 1.8;">${appState.formData.penilaian}</p>
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
            <h1>PERENCANAAN KEGIATAN KOKURIKULER</h1>
            <h2>INTEGRASI DEEP LEARNING DAN KURIKULUM BERBASIS CINTA</h2>
            
            <div class="info">
                <strong>Nama Madrasah</strong>: ${appState.formData.namaMadrasah}
            </div>
            
            <div class="info">
                <strong>Fase</strong>: ${getFaseName(appState.formData.fase)}
            </div>
            
            <div class="info">
                <strong>Kelas</strong>: ${appState.formData.kelas}
            </div>
            
            <div class="info">
                <strong>Tahun Ajaran</strong>: ${appState.formData.tahunAjaran}
            </div>
            
            <h3>Tema Kokurikuler</h3>
            <p>${appState.formData.dimensi.replace(/\n/g, '<br>')}</p>
            
            <h3>Pendekatan Deep Learning dan Kurikulum Berbasis Cinta</h3>
            <p>${appState.formData.modelPembelajaran.replace(/\n/g, '<br>')}</p>
            
            <h3>Kegiatan yang Akan Dilakukan</h3>
            <p>${appState.formData.kegiatan.replace(/\n/g, '<br>')}</p>
            
            <h3>Asesmen/Penilaian</h3>
            <p>${appState.formData.penilaian.replace(/\n/g, '<br>')}</p>
        </body>
        </html>
    `;
    
    // Create blob and download
    const blob = new Blob([documentContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Perencanaan_Kokurikuler_DeepLearning_KBC_${appState.formData.namaMadrasah.replace(/\s+/g, '_')}_${appState.formData.tahunAjaran.replace('/', '-')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('Dokumen berhasil diunduh! Anda dapat membukanya dengan Microsoft Word.');
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
