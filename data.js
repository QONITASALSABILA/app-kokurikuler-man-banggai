// Database struktur tema dan opsi pembelajaran
const learningDatabase = {
    "Aku Cinta Alam Ciptaan Allah": {
        pokok_bahasan: ["Asmaul Husna: Al-Rahman, Al-Wadud, Al-Karim", "Pelestarian Lingkungan sebagai Bentuk Syukur", "Ekosistem dan Keseimbangan Alam"],
        mapel_kolaboratif: ["PAI, IPAS, Bahasa Indonesia, Seni Budaya"],
        topik_kbc: ["Cinta Allah dan Rasul-Nya", "Cinta kepada Lingkungan (Ekosistem)"],
        profil_lulusan: ["Beriman dan Bertakwa", "Peduli Lingkungan", "Berpikir Kritis"],
        tujuan_pembelajaran: [
            "Memahami konsep kasih sayang Allah melalui ciptaan-Nya",
            "Menganalisis hubungan manusia dengan lingkungan dari perspektif spiritual",
            "Merancang solusi pelestarian lingkungan berbasis nilai-nilai keislaman",
            "Mengembangkan sikap tanggung jawab terhadap ciptaan Allah"
        ],
        aktivitas_pembelajaran: [
            "Studi lapangan: Observasi ekosistem lokal dan identifikasi masalah lingkungan",
            "Diskusi kelompok: Hubungan antara Asmaul Husna dengan pelestarian alam",
            "Project-based learning: Merancang dan melaksanakan program konservasi sekolah",
            "Refleksi spiritual: Journaling tentang pengalaman belajar dan perubahan sikap"
        ],
        integrasi_kbc: [
            "Cinta kepada Allah: Melalui pemahaman tentang keindahan dan keagungan ciptaan-Nya",
            "Cinta kepada Lingkungan: Mengambil aksi nyata untuk pelestarian alam",
            "Cinta kepada Masyarakat: Berbagi pengetahuan tentang pentingnya menjaga lingkungan"
        ],
        penilaian: [
            "Pengetahuan: Tes tulis tentang konsep pelestarian lingkungan",
            "Keterampilan: Kemampuan merancang dan melaksanakan proyek konservasi",
            "Sikap: Observasi keaktifan dan komitmen terhadap program lingkungan",
            "Produk: Laporan proyek dan dokumentasi program konservasi",
            "Refleksi: Jurnal refleksi tentang pembelajaran dan perubahan pribadi"
        ]
    },
    "Bhineka Tunggal Ika": {
        pokok_bahasan: ["Kearifan Lokal dan Budaya Daerah", "Toleransi dan Keberagaman dalam Islam", "Persatuan dalam Perbedaan"],
        mapel_kolaboratif: ["PAI, PKn, Bahasa Indonesia, Seni Budaya, IPS"],
        topik_kbc: ["Mencintai Keragaman Budaya", "Persatuan dan Kesatuan"],
        profil_lulusan: ["Berkebhinekaan Global", "Bernalar Kritis", "Bergotong Royong"],
        tujuan_pembelajaran: [
            "Menghargai keberagaman budaya dan agama dalam masyarakat Indonesia",
            "Memahami nilai-nilai kearifan lokal dari perspektif Islam",
            "Menganalisis tantangan dan peluang dalam kehidupan multikultural",
            "Membangun kolaborasi antar budaya untuk kebaikan bersama"
        ],
        aktivitas_pembelajaran: [
            "Pameran budaya: Peserta menampilkan kearifan lokal dari berbagai daerah",
            "Kolaborasi lintas budaya: Diskusi dan sharing tentang kesamaan nilai dalam tradisi berbeda",
            "Proyek komunitas: Merancang acara perayaan kebersamaan dengan menghormati keragaman",
            "Wawancara tokoh masyarakat: Belajar langsung tentang nilai-nilai lokal yang relevan"
        ],
        integrasi_kbc: [
            "Cinta kepada Masyarakat: Menghargai dan merayakan keberagaman",
            "Cinta kepada Diri Sendiri: Memahami identitas pribadi dalam konteks pluralisme",
            "Cinta kepada Allah: Melihat keindahan dalam keragaman sebagai tanda kekuasaan-Nya"
        ],
        penilaian: [
            "Pengetahuan: Tes tentang kearifan lokal dan toleransi dalam Islam",
            "Keterampilan: Kemampuan berkomunikasi lintas budaya",
            "Sikap: Sikap menghargai dan menghormati perbedaan",
            "Produk: Pameran budaya atau acara perayaan kebersamaan",
            "Refleksi: Pemahaman tentang pentingnya keragaman dalam persatuan"
        ]
    },
    "Bangunlah Jiwa dan Raganya": {
        pokok_bahasan: ["Kesehatan Jasmani dan Mental", "Pendidikan Jasmani dan Olahraga", "Kesejahteraan Integral Manusia"],
        mapel_kolaboratif: ["PAI, PJOK, IPA, BK"],
        topik_kbc: ["Cinta kepada Diri Sendiri: Kesehatan dan Kesejahteraan", "Kepedulian terhadap Kesehatan Masyarakat"],
        profil_lulusan: ["Sehat Jasmani dan Rohani", "Mandiri", "Tanggung Jawab"],
        tujuan_pembelajaran: [
            "Memahami pentingnya kesehatan jasmani dan mental dalam perspektif Islam",
            "Menganalisis faktor-faktor yang mempengaruhi kesejahteraan pribadi dan masyarakat",
            "Merancang gaya hidup sehat yang selaras dengan nilai-nilai spiritual",
            "Mengembangkan keterampilan dan kedisiplinan melalui olahraga dan aktivitas fisik"
        ],
        aktivitas_pembelajaran: [
            "Program wellness: Olahraga, meditasi, dan mindfulness sessions",
            "Workshop kesehatan: Nutrisi, kesehatan mental, dan hygiene dengan perspektif Islam",
            "Proyek gaya hidup sehat: Membuat program personal wellness dan monitoring",
            "Peer education: Siswa menjadi duta kesehatan untuk teman-temannya"
        ],
        integrasi_kbc: [
            "Cinta kepada Diri Sendiri: Menjaga kesehatan jasmani dan rohani",
            "Cinta kepada Allah: Melalui menjaga tubuh sebagai amanah",
            "Cinta kepada Masyarakat: Membagikan pengetahuan kesehatan kepada komunitas"
        ],
        penilaian: [
            "Pengetahuan: Pemahaman tentang kesehatan dari perspektif holistik",
            "Keterampilan: Kemampuan melakukan aktivitas fisik dengan baik",
            "Sikap: Komitmen terhadap gaya hidup sehat",
            "Produk: Program personal wellness atau kampanye kesehatan",
            "Refleksi: Jurnal tentang perubahan gaya hidup dan kesadaran kesehatan"
        ]
    },
    "Suara Demokrasi": {
        pokok_bahasan: ["Prinsip-prinsip Demokrasi dalam Islam", "Kepemimpinan dan Advokasi", "Partisipasi Aktif Warga Negara"],
        mapel_kolaboratif: ["PKn, PAI, Bahasa Indonesia, IPS"],
        topik_kbc: ["Kepemimpinan yang Amanah", "Tanggung Jawab Sosial dan Kewarganegaraan"],
        profil_lulusan: ["Bernalar Kritis", "Bergotong Royong", "Aktif Berpartisipasi"],
        tujuan_pembelajaran: [
            "Memahami prinsip-prinsip demokrasi dan kepemimpinan dari perspektif Islam",
            "Menganalisis isu-isu sosial dan kebijakan publik secara kritis",
            "Mengembangkan keterampilan advokasi dan persuasi untuk kebaikan bersama",
            "Berpartisipasi aktif dalam pengambilan keputusan di tingkat sekolah dan masyarakat"
        ],
        aktivitas_pembelajaran: [
            "Debat dan forum diskusi: Menganalisis isu-isu sosial dan kebijakan",
            "Proyek civic engagement: Pelayaran dengan pemangku kepentingan untuk solusi masalah",
            "Kepemimpinan: Organisasi siswa dengan prinsip-prinsip akuntabilitas dan transparansi",
            "Kampanye advokasi: Menyuarakan aspirasi komunitas sekolah"
        ],
        integrasi_kbc: [
            "Cinta kepada Allah: Melalui amanah kepemimpinan yang bertanggung jawab",
            "Cinta kepada Masyarakat: Advokasi untuk kepentingan publik",
            "Cinta kepada Negara: Partisipasi aktif dalam demokrasi"
        ],
        penilaian: [
            "Pengetahuan: Pemahaman tentang prinsip demokrasi dan kepemimpinan",
            "Keterampilan: Kemampuan berargumentasi dan bernegosiasi",
            "Sikap: Tanggungjawab dalam berpartisipasi dan memimpin",
            "Produk: Hasil kampanye advokasi atau kebijakan yang dihasilkan",
            "Refleksi: Pemahaman tentang peran diri dalam demokrasi"
        ]
    },
    "Gaya Hidup Berkelanjutan": {
        pokok_bahasan: ["Sustainable Development Goals (SDGs)", "Ekonomi Sirkular", "Konsumsi dan Produksi Berkelanjutan"],
        mapel_kolaboratif: ["IPAS, Ekonomi, Prakarya, PAI"],
        topik_kbc: ["Cinta kepada Lingkungan dan Generasi Mendatang", "Tanggung Jawab Ekonomi yang Berkelanjutan"],
        profil_lulusan: ["Peduli Lingkungan", "Berpikir Kritis", "Kreatif dan Inovatif"],
        tujuan_pembelajaran: [
            "Memahami konsep pembangunan berkelanjutan dan SDGs",
            "Menganalisis dampak gaya hidup konsumtif terhadap lingkungan dan masyarakat",
            "Merancang solusi inovatif untuk pembangunan berkelanjutan",
            "Mengimplementasikan praktik-praktik berkelanjutan dalam kehidupan sehari-hari"
        ],
        aktivitas_pembelajaran: [
            "Audit konsumsi: Analisis jejak karbon dan limbah di sekolah",
            "Inovasi berkelanjutan: Merancang produk atau layanan yang ramah lingkungan",
            "Proyek pengurangan limbah: 3R (Reduce, Reuse, Recycle) di sekolah",
            "Edukasi komunitas: Sosialisasi gaya hidup berkelanjutan kepada masyarakat"
        ],
        integrasi_kbc: [
            "Cinta kepada Lingkungan: Menjaga planet untuk generasi mendatang",
            "Cinta kepada Masyarakat: Memastikan keadilan ekonomi dan sosial",
            "Cinta kepada Allah: Melalui penyelamatan bumi sebagai ciptaan-Nya"
        ],
        penilaian: [
            "Pengetahuan: Pemahaman tentang SDGs dan ekonomi berkelanjutan",
            "Keterampilan: Kemampuan merancang solusi inovasi berkelanjutan",
            "Sikap: Komitmen terhadap gaya hidup berkelanjutan",
            "Produk: Proyek inovasi berkelanjutan atau kampanye edukasi",
            "Refleksi: Perubahan perspektif tentang konsumsi dan lingkungan"
        ]
    },
    "Teknologi untuk Kemanusiaan": {
        pokok_bahasan: ["Etika Penggunaan Teknologi", "Digital Literacy", "Teknologi dan Pemberdayaan Masyarakat"],
        mapel_kolaboratif: ["Informatika, Bahasa Indonesia, PAI, IPS"],
        topik_kbc: ["Cinta dalam Penggunaan Teknologi yang Bertanggung Jawab", "Manfaat Teknologi untuk Kehidupan yang Lebih Baik"],
        profil_lulusan: ["Literasi Digital", "Kreatif", "Tanggung Jawab Sosial"],
        tujuan_pembelajaran: [
            "Memahami etika penggunaan teknologi dalam perspektif Islam",
            "Menganalisis dampak positif dan negatif teknologi bagi individu dan masyarakat",
            "Merancang aplikasi atau solusi teknologi yang memberdayakan masyarakat",
            "Menggunakan teknologi secara bertanggung jawab dan etis"
        ],
        aktivitas_pembelajaran: [
            "Workshop digital literacy: Keamanan cyber, privasi, dan penggunaan media sosial yang sehat",
            "Proyek teknologi sosial: Merancang aplikasi atau website untuk mengatasi masalah sosial",
            "Edukasi digital: Program pelatihan literasi digital untuk komunitas",
            "Diskusi: Dampak teknologi terhadap kehidupan sosial dan spiritual"
        ],
        integrasi_kbc: [
            "Cinta kepada Allah: Menggunakan teknologi sesuai nilai-nilai spiritual",
            "Cinta kepada Diri Sendiri: Digital wellness dan keseimbangan online-offline",
            "Cinta kepada Masyarakat: Memanfaatkan teknologi untuk pemberdayaan sosial"
        ],
        penilaian: [
            "Pengetahuan: Pemahaman tentang etika dan dampak teknologi",
            "Keterampilan: Kemampuan menggunakan dan merancang solusi teknologi",
            "Sikap: Tanggung jawab dalam penggunaan teknologi",
            "Produk: Aplikasi/website atau program edukasi digital",
            "Refleksi: Kesadaran tentang penggunaan teknologi yang bertanggung jawab"
        ]
    },
    "Kewirausahaan Sosial": {
        pokok_bahasan: ["Model Bisnis Sosial", "Entrepreneurship dan Tanggung Jawab Sosial", "Ekonomi Kreatif dan Berkelanjutan"],
        mapel_kolaboratif: ["Prakarya, Ekonomi, PAI, Bahasa Indonesia"],
        topik_kbc: ["Kepemimpinan Bisnis yang Beretika", "Memberikan Manfaat kepada Masyarakat Luas"],
        profil_lulusan: ["Kreatif dan Inovatif", "Mandiri", "Tanggung Jawab Sosial"],
        tujuan_pembelajaran: [
            "Memahami konsep kewirausahaan sosial dan bisnis berkelanjutan",
            "Menganalisis peluang dan tantangan dalam mengembangkan usaha sosial",
            "Merancang dan melaksanakan proyek usaha sosial yang memberikan manfaat",
            "Mengembangkan keterampilan entrepreneurship dengan nilai-nilai keislaman"
        ],
        aktivitas_pembelajaran: [
            "Studi kasus: Analisis model bisnis sosial yang sukses",
            "Business planning: Merancang usaha sosial dengan dampak positif",
            "Inkubasi bisnis: Mentransformasi ide menjadi usaha nyata",
            "Networking dan mentoring: Belajar dari praktisi kewirausahaan sosial"
        ],
        integrasi_kbc: [
            "Cinta kepada Masyarakat: Menciptakan solusi bisnis yang memberdayakan",
            "Cinta kepada Allah: Berbisnis dengan prinsip-prinsip Islam (Halal, Tayyib)",
            "Cinta kepada Diri Sendiri: Pengembangan kepemimpinan dan kemandirian ekonomi"
        ],
        penilaian: [
            "Pengetahuan: Pemahaman tentang model bisnis sosial",
            "Keterampilan: Kemampuan merancang dan melaksanakan usaha sosial",
            "Sikap: Tanggung jawab sosial dan etika bisnis",
            "Produk: Usaha sosial yang berjalan atau business plan yang komprehensif",
            "Refleksi: Pembelajaran tentang dampak sosial dan pertumbuhan pribadi"
        ]
    }
};

// Strategi Deep Learning dengan deskripsi
const strategyDL = {
    "Problem-Based Learning (PBL)": "Pembelajaran dimulai dari masalah nyata, siswa mengidentifikasi, menganalisis, dan mencari solusi",
    "Project-Based Learning (PjBL)": "Siswa mengerjakan proyek autentik yang menghasilkan produk nyata dan bermakna",
    "Collaborative Learning": "Kerja sama kelompok dengan peran yang jelas untuk mencapai tujuan bersama",
    "Critical Thinking Activities": "Analisis mendalam, diskusi, debat, dan argumentasi untuk mengembangkan pemikiran kritis",
    "Kombinasi Strategi": "Menggabungkan lebih dari satu strategi untuk hasil pembelajaran yang optimal"
};

// Export untuk digunakan
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { learningDatabase, strategyDL };
}
