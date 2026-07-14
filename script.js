const { useState, useEffect } = React;

// SVG Icons Mock to remove Lucide dependency offline
const Icons = {
  BookOpen: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z"/></svg>
  ),
  Play: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
  ),
  HelpCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  ),
  CheckCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  ),
  AlertCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  ),
  Code: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  ),
  RefreshCw: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
  ),
  Award: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
  ),
  Layers: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polygon points="2 17 12 22 22 17"/><polygon points="2 12 12 17 22 12"/></svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
  ),
  Coffee: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  Terminal: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
  ),
  Cpu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></svg>
  ),
  Bookmark: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
  ),
  Info: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  )
};

function App() {
  const [activeTab, setActiveTab] = useState('notes');
  const [theme, setTheme] = useState('dark');
  const [selectedExtraCategory, setSelectedExtraCategory] = useState('sequential');
  const [selectedExtraIdx, setSelectedExtraIdx] = useState(0);

  // Interactive Game State: Teh Tarik Sorting
  const initialTehTarikSteps = [
    { id: '1', text: 'Sediakan cawan.', correctOrder: 1 },
    { id: '2', text: 'Masukkan uncang teh.', correctOrder: 2 },
    { id: '3', text: 'Tuangkan air panas.', correctOrder: 3 },
    { id: '4', text: 'Biarkan teh seketika.', correctOrder: 4 },
    { id: '5', text: 'Masukkan susu.', correctOrder: 5 },
    { id: '6', text: 'Tambahkan gula.', correctOrder: 6 },
    { id: '7', text: 'Kacau.', correctOrder: 7 },
    { id: '8', text: 'Hidangkan.', correctOrder: 8 },
  ];
  
  const [gameSteps, setGameSteps] = useState([]);
  const [gameFeedback, setGameFeedback] = useState(null);

  // Simulation State
  const [simType, setSimType] = useState('area');
  const [simStep, setSimStep] = useState(0);
  const [simInputs, setSimInputs] = useState({ panjang: 10, lebar: 5, markah: 75, pinInput: '' });
  const [simLogs, setSimLogs] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  // AI Generator State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  const extraExamples = {
    "sequential": [
      {
        "title": "Kira Purata Nilai Tiga Nombor",
        "masalah": "Pelajar mahu mengira purata nilai bagi tiga nombor berbeza yang dimasukkan oleh pengguna.",
        "input": "Tiga nombor nyata (cth: A, B, C)",
        "proses": "Purata = (A + B + C) / 3",
        "output": "Paparan nilai purata nombor tersebut",
        "algoritma": [
          "Mula.",
          "Masukkan nombor pertama (A).",
          "Masukkan nombor kedua (B).",
          "Masukkan nombor ketiga (C).",
          "Kira Jumlah = A + B + C.",
          "Kira Purata = Jumlah / 3.",
          "Paparkan nilai Purata.",
          "Tamat."
        ],
        "cpp": "// Program C++ Sequential: Kira Purata\n#include <iostream>\nusing namespace std;\n\nint main() {\n    float A, B, C;\n    float jumlah, purata;\n\n    // 1. Ambil input secara turutan\n    cout << \"Masukkan nombor pertama: \";\n    cin >> A;\n    cout << \"Masukkan nombor kedua: \";\n    cin >> B;\n    cout << \"Masukkan nombor ketiga: \";\n    cin >> C;\n\n    // 2. Proses pengiraan sequential\n    jumlah = A + B + C;\n    purata = jumlah / 3.0;\n\n    // 3. Papar output\n    cout << \"Jumlah keseluruhan: \" << jumlah << endl;\n    cout << \"Purata nilai ialah: \" << purata << endl;\n\n    return 0;\n}"
      },
      {
        "title": "Penukaran Suhu Celsius ke Fahrenheit",
        "masalah": "Menukar unit suhu Celsius kepada unit Fahrenheit dengan formula standard.",
        "input": "Suhu dalam unit Celsius (C)",
        "proses": "Fahrenheit = (C × 9/5) + 32",
        "output": "Suhu dalam unit Fahrenheit (F)",
        "algoritma": [
          "Mula.",
          "Masukkan suhu dalam Celsius.",
          "Kira Fahrenheit = (Celsius * 9.0 / 5.0) + 32.",
          "Paparkan suhu dalam Fahrenheit.",
          "Tamat."
        ],
        "cpp": "// Program C++ Sequential: Penukaran Suhu\n#include <iostream>\nusing namespace std;\n\nint main() {\n    double celsius, fahrenheit;\n\n    // Input suhu\n    cout << \"Masukkan suhu dalam Celsius (°C): \";\n    cin >> celsius;\n\n    // Formula dijalankan linear\n    fahrenheit = (celsius * 9.0 / 5.0) + 32.0;\n\n    // Paparan output fahrenheit\n    cout << \"Suhu bersamaan dengan: \" << fahrenheit << \" °F\" << endl;\n\n    return 0;\n}"
      }
    ],
    "conditional": [
      {
        "title": "Semakan Nombor Genap atau Ganjil",
        "masalah": "Sistem menerima satu nombor bulat dan menentukan sama ada nombor tersebut genap atau ganjil.",
        "input": "Satu nombor bulat (N)",
        "proses": "Semak baki pembahagian nombor dengan 2 (N % 2)",
        "output": "Mesej menyatakan 'Nombor Genap' atau 'Nombor Ganjil'",
        "algoritma": [
          "Mula.",
          "Masukkan satu nombor bulat (N).",
          "Jika baki pembahagian (N % 2) adalah sifar (0):",
          "    Paparkan 'Nombor Genap'.",
          "Jika tidak:",
          "    Paparkan 'Nombor Ganjil'.",
          "Tamat."
        ],
        "cpp": "// Program C++ Conditional: Genap atau Ganjil\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int nombor;\n    cout << \"Masukkan sebarang nombor bulat: \";\n    cin >> nombor;\n\n    // Struktur kawalan keputusan (if...else)\n    if (nombor % 2 == 0) {\n        cout << nombor << \" ialah Nombor GENAP.\" << endl;\n    } else {\n        cout << nombor << \" ialah Nombor GANJIL.\" << endl;\n    }\n\n    return 0;\n}"
      },
      {
        "title": "Sistem Kelayakan Diskaun Belanja",
        "masalah": "Kira jumlah bayaran bersih selepas diskaun 10% jika perbelanjaan asal pelanggan melebihi RM100.",
        "input": "Jumlah harga perbelanjaan asal",
        "proses": "Semak syarat perbelanjaan > 100 untuk kelayakan potongan harga",
        "output": "Jumlah diskaun dan harga bayaran bersih baharu",
        "algoritma": [
          "Mula.",
          "Masukkan jumlah belanja asal.",
          "Jika belanja asal > 100:",
          "    Kira Diskaun = belanja asal * 0.10.",
          "    Bayaran Bersih = belanja asal - Diskaun.",
          "Jika tidak:",
          "    Diskaun = 0.",
          "    Bayaran Bersih = belanja asal.",
          "Paparkan Diskaun dan Bayaran Bersih.",
          "Tamat."
        ],
        "cpp": "// Program C++ Conditional: Sistem Diskaun Kedai\n#include <iostream>\nusing namespace std;\n\nint main() {\n    double belanja, diskaun = 0.0, bayaran_bersih;\n    cout << \"Masukkan jumlah perbelanjaan asal: RM\";\n    cin >> belanja;\n\n    // Semakan syarat kelayakan diskaun\n    if (belanja > 100.0) {\n        diskaun = belanja * 0.10; // Diskaun 10%\n        bayaran_bersih = belanja - diskaun;\n        cout << \"Tahniah! Anda layak diskaun RM\" << diskaun << endl;\n    } else {\n        bayaran_bersih = belanja;\n        cout << \"Maaf, tiada diskaun diberikan (belanja bawah RM100).\" << endl;\n    }\n\n    cout << \"Jumlah bayaran bersih anda: RM\" << bayaran_bersih << endl;\n    return 0;\n}"
      }
    ],
    "iterational": [
      {
        "title": "Penjana Sifir Matematik Pintar",
        "masalah": "Memaparkan sifir gandaan bagi nombor yang dimasukkan oleh pengguna daripada gandaan 1 sehingga 10 secara automatik.",
        "input": "Nombor asas sifir (cth: 5)",
        "proses": "Ulangi pengiraan pendaraban (i * asas) bermula dari i = 1 sehingga i = 10",
        "output": "Senarai lengkap sifir 1 hingga 10",
        "algoritma": [
          "Mula.",
          "Masukkan nombor sifir (Asas).",
          "Tetapkan nilai pembilang (i) = 1.",
          "Selagi i <= 10, ulangi langkah berikut:",
          "    Kira Hasil = i * Asas.",
          "    Paparkan 'i x Asas = Hasil'.",
          "    Tambah nilai i sebanyak 1 (i = i + 1).",
          "Tamat."
        ],
        "cpp": "// Program C++ Iterational: Penjana Sifir Pintar\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int asas;\n    cout << \"Masukkan nombor sifir yang anda inginkan: \";\n    cin >> asas;\n\n    cout << \"--- Sifir \" << asas << \" ---\" << endl;\n    // Menggunakan gelung 'for' untuk pengulangan berstruktur\n    for (int i = 1; i <= 10; i++) {\n        cout << i << \" x \" << asas << \" = \" << (i * asas) << endl;\n    }\n\n    return 0;\n}"
      },
      {
        "title": "Sistem Had Cuba Laluan Telefon",
        "masalah": "Telefon meminta PIN keselamatan. Jika PIN salah, pengguna dibenarkan mencuba semula sehingga maksimum 3 kali sahaja sebelum disekat.",
        "input": "PIN keselamatan dimasukkan pengguna",
        "proses": "Mengulangi permintaan input selagi PIN salah dan bilangan cubaan kurang daripada 3",
        "output": "Akses dibenarkan atau telefon disekat",
        "algoritma": [
          "Mula.",
          "Tetapkan PIN_Betul = '9988'.",
          "Tetapkan cubaan = 0.",
          "Mula Gelung (Selagi cubaan < 3):",
          "    Masukkan PIN_Input.",
          "    Tambah 1 kepada nilai cubaan.",
          "    Jika PIN_Input == PIN_Betul:",
          "        Paparkan 'Akses Dibenarkan'.",
          "        Keluar daripada gelung (Berjaya).",
          "    Jika salah dan cubaan < 3:",
          "        Paparkan 'Cuba lagi'.",
          "Jika cubaan == 3 dan akses masih gagal:",
          "    Paparkan 'Telefon Disekat'.",
          "Tamat."
        ],
        "cpp": "// Program C++ Iterational: Sistem PIN Had Cubaan\n#include <iostream>\nusing namespace std;\n\nint main() {\n    const string PIN_BETUL = \"9988\";\n    string pin_input;\n    int cubaan = 0;\n    bool berjaya = false;\n\n    // Gelung 'while' mengulangi proses sehingga had cubaan dipenuhi\n    while (cubaan < 3) {\n        cout << \"Masukkan PIN telefon anda (\" << (3 - cubaan) << \" cubaan berbaki): \";\n        cin >> pin_input;\n        cubaan++;\n\n        if (pin_input == PIN_BETUL) {\n            cout << \"PIN betul! Akses dibenarkan.\" << endl;\n            berjaya = true;\n            break; // Keluar gelung secara paksa\n        }\n        cout << \"PIN salah!\" << endl;\n    }\n\n    if (!berjaya) {\n        cout << \"Amaran! Telefon anda telah disekat selepas 3 kali gagal.\" << endl;\n    }\n\n    return 0;\n}"
      }
    ]
  };
  
  const quizQuestions = [
    {
      "id": 1,
      "question": "Apakah takrifan yang paling tepat bagi 'Algorithm'?",
      "options": [
        "Satu program komputer yang ditulis dalam bahasa C++.",
        "Satu siri langkah-langkah tersusun secara logik untuk menyelesaikan sesuatu masalah.",
        "Proses menukar kod pengaturcaraan kepada fail boleh laksana (executable).",
        "Peralatan perkakasan komputer yang digunakan untuk mengira laju."
      ],
      "correct": 1,
      "explanation": "Algoritma ialah satu siri langkah yang tersusun secara logik dan teratur (seperti resepi) untuk menyelesaikan masalah sebelum kita menulis kod pengaturcaraan."
    },
    {
      "id": 2,
      "question": "Struktur asas (construct) manakah yang melaksanakan arahan dari atas ke bawah tanpa sebarang syarat atau ulangan?",
      "options": [
        "Conditional (Selection)",
        "Iterational (Loop)",
        "Sequential (Sequence)",
        "Multi-branching"
      ],
      "correct": 2,
      "explanation": "Sequential melaksanakan arahan satu demi satu secara teratur dari atas ke bawah tanpa melompat atau berpatah balik."
    },
    {
      "id": 3,
      "question": "Dalam sistem ATM, tindakan memeriksa 'Adakah PIN betul?' tergolong dalam struktur...",
      options: [
        "Sequential",
        "Conditional (Selection)",
        "Iterational (Loop)",
        "Semua di atas"
      ],
      "correct": 1,
      "explanation": "Keputusan berdasarkan syarat (PIN betul/salah) ialah contoh Conditional (Selection) yang biasanya diwakili oleh struktur if...else."
    },
    {
      "id": 4,
      "question": "Apakah kata kunci C++ yang kerap digunakan untuk struktur 'Iterational'?",
      "options": [
        "if, else, switch",
        "cin, cout",
        "for, while, do...while",
        "int, float, char"
      ],
      "correct": 2,
      "explanation": "for, while, dan do...while ialah struktur kawalan gelung (loops) yang digunakan untuk melakukan lelaran (iteration) dalam C++."
    },
    {
      "id": 5,
      "question": "Jika anda ingin menulis atur cara untuk mengira jumlah markah bagi 40 orang pelajar secara automatik, struktur manakah yang paling sesuai digabungkan?",
      "options": [
        "Hanya Sequential sahaja",
        "Hanya Conditional sahaja",
        "Sequential dan Iterational (untuk mengulangi proses pengiraan bagi setiap pelajar)",
        "Tiada struktur yang sesuai"
      ],
      "correct": 2,
      "explanation": "Untuk memproses 40 pelajar, kita memerlukan Iterational (gelung sebanyak 40 kali) digabungkan dengan pengiraan Sequential dalam setiap pusingan gelung."
    }
  ];

  useEffect(() => {
    shuffleGame();
  }, []);

  const shuffleGame = () => {
    const shuffled = [...initialTehTarikSteps].sort(() => Math.random() - 0.5);
    setGameSteps(shuffled);
    setGameFeedback(null);
  };

  const moveStep = (index, direction) => {
    const newSteps = [...gameSteps];
    if (direction === 'up' && index > 0) {
      const temp = newSteps[index];
      newSteps[index] = newSteps[index - 1];
      newSteps[index - 1] = temp;
    } else if (direction === 'down' && index < newSteps.length - 1) {
      const temp = newSteps[index];
      newSteps[index] = newSteps[index + 1];
      newSteps[index + 1] = temp;
    }
    setGameSteps(newSteps);
  };

  const checkTehTarikGame = () => {
    let correctCount = 0;
    gameSteps.forEach((step, idx) => {
      if (step.correctOrder === idx + 1) correctCount++;
    });
    
    if (correctCount === 8) {
      setGameFeedback({
        status: 'success',
        message: 'Syabas! Langkah algoritma anda tersusun dengan sempurna. Teh Tarik maya anda sedia dihidangkan! ☕✨'
      });
    } else {
      setGameFeedback({
        status: 'partial',
        message: 'Hampir tepat! Anda mendapat ' + correctCount + '/8 langkah di kedudukan yang betul. Cuba susun semula mengikut logik urutan penyediaan teh.'
      });
    }
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(0);
    setSimLogs([]);
    let delay = 1000;
    
    if (simType === 'area') {
      const steps = [
        { msg: "Mula simulasi pengiraan luas..." },
        { msg: "Input Panjang dibaca: " + simInputs.panjang },
        { msg: "Input Lebar dibaca: " + simInputs.lebar },
        { msg: "Melakukan pengiraan: Luas = " + simInputs.panjang + " x " + simInputs.lebar },
        { msg: "Paparan Output: Luas Segi Empat ialah " + (simInputs.panjang * simInputs.lebar) },
        { msg: "Tamat pengiraan. Selesai secara Sequential!" }
      ];
      steps.forEach((s, idx) => {
        setTimeout(() => {
          setSimStep(idx + 1);
          setSimLogs(prev => [...prev, s.msg]);
          if (idx === steps.length - 1) setIsSimulating(false);
        }, delay * idx);
      });
    } else if (simType === 'grade') {
      const checkPass = simInputs.markah >= 50;
      const steps = [
        { msg: "Memulakan semakan keputusan markah..." },
        { msg: "Input Markah dibaca: " + simInputs.markah },
        { msg: "Membuat keputusan: Adakah " + simInputs.markah + " >= 50?" },
        { msg: checkPass ? "Ya! Markah memenuhi syarat (Lulus)." : "Tidak! Markah di bawah syarat (Gagal)." },
        { msg: "Paparan Output: Pelajar diisytiharkan [" + (checkPass ? 'LULUS' : 'GAGAL') + "]" },
        { msg: "Tamat pemprosesan keputusan. Cabangan Conditional tamat!" }
      ];
      steps.forEach((s, idx) => {
        setTimeout(() => {
          setSimStep(idx + 1);
          setSimLogs(prev => [...prev, s.msg]);
          if (idx === steps.length - 1) setIsSimulating(false);
        }, delay * idx);
      });
    } else if (simType === 'atm') {
      const isPinCorrect = simInputs.pinInput === "1234";
      const steps = [
        { msg: "Sistem ATM diaktifkan." },
        { msg: "Masukkan PIN pengguna." },
        { msg: "Memeriksa PIN yang dimasukkan: [" + (simInputs.pinInput || 'Tiada PIN') + "]" },
        { msg: isPinCorrect ? "Keputusan: PIN betul! Membuka akses akaun..." : "Keputusan: PIN salah! Memaparkan amaran..." },
        { msg: isPinCorrect ? "Paparan: Menu Utama ATM dipaparkan." : "Paparan: 'Mesej Ralat: Had cubaan akan berkurang.'" },
        { msg: "Tamat transaksi." }
      ];
      steps.forEach((s, idx) => {
        setTimeout(() => {
          setSimStep(idx + 1);
          setSimLogs(prev => [...prev, s.msg]);
          if (idx === steps.length - 1) setIsSimulating(false);
        }, delay * idx);
      });
    }
  };

  const handleLocalAiGenerator = () => {
    if (!aiPrompt.trim()) {
      setAiError('Sila masukkan satu senario atau aktiviti harian.');
      return;
    }
    setAiLoading(true);
    setAiError('');
    setAiResult(null);
    
    setTimeout(() => {
      setAiResult({
        aktiviti: aiPrompt,
        pengenalan: "Berikut adalah rancangan algoritma komprehensif bagi '" + aiPrompt + "' yang sedia digunakan untuk offline study.",
        sequential: [
          "Sediakan peralatan dan bahan asas untuk " + aiPrompt + ".",
          "Mulakan proses persediaan berurutan tanpa melangkau langkah.",
          "Laksanakan fasa utama tugasan dan periksa output visual."
        ],
        conditional: {
          syarat: "Adakah proses " + aiPrompt + " ini lengkap sepenuhnya tanpa sebarang isu?",
          ya: "Kemas peralatan, bersihkan kawasan dan tamatkan proses.",
          tidak: "Kenal pasti masalah, lakukan penyelesaian alternatif dan ulang pemeriksaan."
        },
        iterational: {
          syaratUlang: "Selagi kualiti atau kualiti '" + aiPrompt + "' belum memuaskan hati",
          langkahUlang: "Ulangi proses penggilapan, kemas kini, atau baik pulih langkah demi langkah."
        },
        cppTip: "Untuk struktur keputusan (Conditional), gunakan 'if-else'. Bagi pengulangan (Iterational), gunakan gelung 'while' atau 'for' dalam C++!"
      });
      setAiLoading(false);
    }, 1200);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.body.classList.add('dark');
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
      document.body.classList.add('bg-slate-950', 'text-slate-100');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('bg-slate-50', 'text-slate-900');
      document.body.classList.remove('bg-slate-950', 'text-slate-100');
    }
  };

  const handleQuizSubmit = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2.5 rounded-xl">
              <Icons.Code />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Hub Pembelajaran Algoritma C++
              </h1>
              <p className="text-xs text-slate-400">Modul 1.4: Reka Bentuk Algoritma Pintar & Interaktif</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="px-4 py-2 text-xs md:text-sm rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition font-medium"
            >
              {theme === 'dark' ? '☀️ Mode Terang' : '🌙 Mode Gelap'}
            </button>
          </div>
        </div>
      </header>

      {/* NAV TABS */}
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap gap-2 bg-slate-900/40 p-1.5 rounded-xl border border-slate-800/60">
          <button
            onClick={() => setActiveTab('notes')}
            className={"flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition " + (activeTab === 'notes' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200')}
          >
            <Icons.BookOpen />
            Nota Interaktif
          </button>
          <button
            onClick={() => { setActiveTab('game'); shuffleGame(); }}
            className={"flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition " + (activeTab === 'game' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200')}
          >
            <Icons.Coffee />
            Cabaran Teh Tarik
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={"flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition " + (activeTab === 'simulator' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200')}
          >
            <Icons.Play />
            Simulator Algoritma
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={"flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition " + (activeTab === 'ai' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200')}
          >
            <Icons.Sparkles />
            Penjana Algoritma AI
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={"flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition " + (activeTab === 'quiz' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200')}
          >
            <Icons.HelpCircle />
            Uji Minda (Kuiz)
          </button>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        
        {/* NOTA TAB */}
        {activeTab === 'notes' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/40 via-slate-900 to-purple-900/30 p-8 border border-indigo-500/20">
              <div className="max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
                  Asas Pengaturcaraan
                </span>
                <h2 className="text-3xl font-extrabold mt-3 text-white">Memahami Konsep Asas Algoritma</h2>
                <p className="mt-2 text-slate-300 text-base leading-relaxed">
                  Sebelum mula menaip kod C++, adalah kritikal untuk memahami bahawa komputer hanyalah mesin pintar yang patuh pada arahan. Algoritma bertindak sebagai <strong>pelan perancangan bertulis</strong> (resepi) manakala kod pengaturcaraan C++ adalah <strong>pelaksanaan</strong> fizikal bagi pelan tersebut.
                </p>
              </div>
            </div>

            {/* 3 Constructs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* SEQ */}
              <div className="bg-slate-900/60 rounded-xl p-6 border border-slate-800">
                <h4 className="text-xl font-bold text-white mb-2">Sequential (Sequence)</h4>
                <p className="text-sm text-slate-300 mb-4">Arahan dilaksanakan selangkah demi selangkah secara linear dari atas ke bawah tanpa sebarang loncatan atau pengulangan.</p>
                <pre className="bg-slate-950 p-3 rounded text-xs text-emerald-400 font-mono">
Harga = 15;\nKuantiti = 3;\nJumlah = Harga * Kuantiti;\ncout &lt;&lt; Jumlah;
                </pre>
              </div>
              {/* COND */}
              <div className="bg-slate-900/60 rounded-xl p-6 border border-slate-800">
                <h4 className="text-xl font-bold text-white mb-2">Conditional (Selection)</h4>
                <p className="text-sm text-slate-300 mb-4">Program membuat semakan syarat logik sebelum memilih jalan mana yang harus diambil berdasarkan struktur keputusan.</p>
                <pre className="bg-slate-950 p-3 rounded text-xs text-amber-400 font-mono">
if (markah &gt;= 50) &#123;\n  cout &lt;&lt; "Lulus";\n&#125; else &#123;\n  cout &lt;&lt; "Gagal";\n&#125;
                </pre>
              </div>
              {/* ITER */}
              <div className="bg-slate-900/60 rounded-xl p-6 border border-slate-800">
                <h4 className="text-xl font-bold text-white mb-2">Iterational (Looping)</h4>
                <p className="text-sm text-slate-300 mb-4">Melakukan pengulangan satu atau beberapa baris tindakan secara berulang kali selagi syarat dipenuhi.</p>
                <pre className="bg-slate-950 p-3 rounded text-xs text-purple-400 font-mono">
for (int i = 1; i &lt;= 5; i++) &#123;\n  cout &lt;&lt; i &lt;&lt; " ";\n&#125;
                </pre>
              </div>
            </div>

            {/* Galeri Pengayaan */}
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <Icons.Sparkles />
                  <h4 className="text-xl font-bold text-white">✨ Galeri Contoh Pengayaan (Program Tambahan)</h4>
                </div>
                <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {['sequential', 'conditional', 'iterational'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedExtraCategory(cat); setSelectedExtraIdx(0); }}
                      className={"px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition " + (selectedExtraCategory === cat ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200')}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 space-y-2">
                  {extraExamples[selectedExtraCategory].map((ex, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedExtraIdx(idx)}
                      className={"w-full text-left p-3 rounded-xl border text-xs font-medium transition flex items-center justify-between " + (selectedExtraIdx === idx ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300' : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200')}
                    >
                      <span>{ex.title}</span>
                      <Icons.ChevronRight />
                    </button>
                  ))}
                </div>

                <div className="md:col-span-3 bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 space-y-6">
                  <div>
                    <h5 className="text-lg font-bold text-white">{extraExamples[selectedExtraCategory][selectedExtraIdx].title}</h5>
                    <p className="text-xs text-indigo-300 mt-1">Masalah: {extraExamples[selectedExtraCategory][selectedExtraIdx].masalah}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-xs font-bold uppercase text-indigo-400 flex items-center gap-1">
                          <Icons.Cpu /> Input-Proses-Output
                        </span>
                        <div className="text-xs space-y-1 text-slate-300">
                          <div><strong>Input:</strong> {extraExamples[selectedExtraCategory][selectedExtraIdx].input}</div>
                          <div><strong>Proses:</strong> {extraExamples[selectedExtraCategory][selectedExtraIdx].proses}</div>
                          <div><strong>Output:</strong> {extraExamples[selectedExtraCategory][selectedExtraIdx].output}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase text-indigo-400 flex items-center gap-1">
                          <Icons.Terminal /> Langkah Algoritma
                        </span>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-1">
                          {extraExamples[selectedExtraCategory][selectedExtraIdx].algoritma.map((step, sIdx) => (
                            <div key={sIdx} className="text-xs text-slate-300 font-mono"><span className="text-indigo-400 font-bold">{sIdx+1}.</span> {step}</div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold uppercase text-indigo-400 flex items-center gap-1 mb-2">
                        <Icons.Code /> Kod Atur Cara C++
                      </span>
                      <pre className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto max-h-[290px] overflow-y-auto">
                        {extraExamples[selectedExtraCategory][selectedExtraIdx].cpp}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TEH TARIK TAB */}
        {activeTab === 'game' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white flex justify-center gap-2 items-center">
                <Icons.Coffee /> Cabaran Susunan Algoritma: Pembancuh Teh Tarik
              </h3>
              <p className="text-slate-400 text-sm mt-1">Susun langkah mengikut logik urutan yang betul.</p>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              {gameSteps.map((step, idx) => {
                let badgeColor = 'bg-slate-800 text-slate-400';
                if (gameFeedback) {
                  badgeColor = step.correctOrder === idx + 1 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
                }
                return (
                  <div key={step.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className={"w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold " + badgeColor}>
                        {idx + 1}
                      </div>
                      <span className="text-sm font-medium text-slate-200">{step.text}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => moveStep(idx, 'up')} disabled={idx === 0} className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30">▲</button>
                      <button onClick={() => moveStep(idx, 'down')} disabled={idx === gameSteps.length - 1} className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30">▼</button>
                    </div>
                  </div>
                );
              })}

              {gameFeedback && (
                <div className={"p-4 rounded-xl flex gap-3 mt-4 " + (gameFeedback.status === 'success' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-300')}>
                  {gameFeedback.status === 'success' ? <Icons.CheckCircle /> : <Icons.AlertCircle />}
                  <p className="text-xs font-medium leading-relaxed">{gameFeedback.message}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button onClick={checkTehTarikGame} className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg">Sahkan Susunan</button>
                <button onClick={shuffleGame} className="px-4 py-3 bg-slate-800 text-slate-300 rounded-xl">Reset</button>
              </div>
            </div>
          </div>
        )}

        {/* SIMULATOR TAB */}
        {activeTab === 'simulator' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-white flex justify-center gap-2 items-center">
                <Icons.Play /> Simulator Algoritma Langkah Demi Langkah
              </h3>
              <p className="text-slate-400 text-sm mt-1">Uji input secara interaktif dan perhatikan aliran pemprosesan komputer.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left panel */}
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="font-bold text-white text-sm flex gap-2"><Icons.Layers /> Pilih Senario</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[['area', 'Luas Sg. Empat'], ['grade', 'Semakan Gred'], ['atm', 'Log Masuk ATM']].map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => { setSimType(id); setSimStep(0); setSimLogs([]); }}
                      disabled={isSimulating}
                      className={"p-2.5 rounded-xl border text-center transition " + (simType === id ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-950/60 border-slate-800 text-slate-400')}
                    >
                      <span className="block text-xs font-semibold">{label}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <h4 className="font-bold text-white text-sm">Konfigurasi Input</h4>
                  {simType === 'area' && (
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400 block">Panjang (m):</label>
                      <input type="number" value={simInputs.panjang} disabled={isSimulating} onChange={e => setSimInputs(prev => ({ ...prev, panjang: parseInt(e.target.value) || 0 }))} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm text-slate-200" />
                      <label className="text-xs text-slate-400 block mt-2">Lebar (m):</label>
                      <input type="number" value={simInputs.lebar} disabled={isSimulating} onChange={e => setSimInputs(prev => ({ ...prev, lebar: parseInt(e.target.value) || 0 }))} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm text-slate-200" />
                    </div>
                  )}
                  {simType === 'grade' && (
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400 block">Markah Pelajar (0-100):</label>
                      <input type="number" value={simInputs.markah} disabled={isSimulating} onChange={e => setSimInputs(prev => ({ ...prev, markah: parseInt(e.target.value) || 0 }))} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm text-slate-200" />
                    </div>
                  )}
                  {simType === 'atm' && (
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400 block">Masukkan PIN ATM Cubaan:</label>
                      <input type="text" maxLength="4" placeholder="Contoh: 1234 atau 0000" value={simInputs.pinInput} disabled={isSimulating} onChange={e => setSimInputs(prev => ({ ...prev, pinInput: e.target.value }))} className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-sm text-slate-200" />
                    </div>
                  )}

                  <button onClick={runSimulation} disabled={isSimulating} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2">
                    {isSimulating ? 'Sedang Berjalan...' : 'Jalankan Simulasi'}
                  </button>
                </div>
              </div>

              {/* Right panel */}
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 lg:col-span-2 flex flex-col justify-between">
                <div className="space-y-2 font-mono text-xs">
                  <h4 className="font-bold text-white text-sm mb-4 flex gap-2"><Icons.Code /> Kod Pembacaan Algoritma</h4>
                  {simType === 'area' && (
                    <>
                      <div className={"p-2 rounded " + (simStep === 1 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>1. Mula.</div>
                      <div className={"p-2 rounded " + (simStep === 2 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>2. Masukkan Panjang ({simStep >= 2 ? simInputs.panjang : '?'})</div>
                      <div className={"p-2 rounded " + (simStep === 3 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>3. Masukkan Lebar ({simStep >= 3 ? simInputs.lebar : '?'})</div>
                      <div className={"p-2 rounded " + (simStep === 4 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>4. Kira Luas = Panjang x Lebar</div>
                      <div className={"p-2 rounded " + (simStep === 5 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>5. Paparkan Luas ({simStep >= 5 ? simInputs.panjang * simInputs.lebar : '?'})</div>
                      <div className={"p-2 rounded " + (simStep === 6 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>6. Tamat.</div>
                    </>
                  )}
                  {simType === 'grade' && (
                    <>
                      <div className={"p-2 rounded " + (simStep === 1 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>1. Mula Semakan Markah.</div>
                      <div className={"p-2 rounded " + (simStep === 2 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>2. Input Markah Pelajar = {simInputs.markah}</div>
                      <div className={"p-2 rounded " + (simStep === 3 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>3. Adakah Markah &gt;= 50?</div>
                      <div className={"p-2 rounded pl-6 " + (simStep === 4 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>└─&gt; {simStep >= 4 ? (simInputs.markah >= 50 ? 'Ya! Lulus' : 'Tidak! Gagal') : 'Menilai syarat...'}</div>
                      <div className={"p-2 rounded " + (simStep === 6 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>5. Tamat Semakan.</div>
                    </>
                  )}
                  {simType === 'atm' && (
                    <>
                      <div className={"p-2 rounded " + (simStep === 1 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>1. Masukkan Kad ATM.</div>
                      <div className={"p-2 rounded " + (simStep === 2 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>2. Masukkan PIN Cubaan.</div>
                      <div className={"p-2 rounded " + (simStep === 3 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>3. Adakah PIN betul? ("1234")</div>
                      <div className={"p-2 rounded pl-6 " + (simStep === 4 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>└─&gt; {simStep >= 4 ? (simInputs.pinInput === '1234' ? 'Benar!' : 'Salah!') : 'Menilai...'}</div>
                      <div className={"p-2 rounded " + (simStep === 6 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400')}>5. Tamat Sesi Keselamatan.</div>
                    </>
                  )}
                </div>

                <div className="mt-6">
                  <h5 className="text-xs font-semibold text-slate-400 mb-1 uppercase">Konsol Log:</h5>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 h-28 font-mono text-xs overflow-y-auto space-y-1">
                    {simLogs.length === 0 ? <span className="text-slate-600 italic">// Mulakan simulasi di sebelah kiri</span> : simLogs.map((l, i) => <div key={i}><span className="text-emerald-500">[SYS]</span> {l}</div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GENERATOR TAB */}
        {activeTab === 'ai' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white flex justify-center gap-2 items-center">
                <Icons.Sparkles /> Penjana Algoritma AI (Offline Sandbox)
              </h3>
              <p className="text-slate-400 text-sm mt-1">Masukkan aktiviti harian anda untuk merangka algoritma tersusun automatik.</p>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex gap-2">
                <input type="text" placeholder="Contoh: menggosok gigi, memandikan kucing, memasak mi..." value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200" />
                <button onClick={handleLocalAiGenerator} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold">Jana</button>
              </div>
            </div>

            {aiResult && (
              <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 space-y-4 animate-fadeIn">
                <h4 className="text-xl font-bold text-white">Algoritma: {aiResult.aktiviti}</h4>
                <p className="text-xs text-slate-400">{aiResult.pengenalan}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <h5 className="font-bold text-sm text-white mb-2">Sequential</h5>
                    <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                      {aiResult.sequential.map((s, idx) => <li key={idx}>{s}</li>)}
                    </ul>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <h5 className="font-bold text-sm text-white mb-2">Conditional</h5>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div><strong>Syarat:</strong> {aiResult.conditional.syarat}</div>
                      <div className="text-emerald-400"><strong>Ya:</strong> {aiResult.conditional.ya}</div>
                      <div className="text-rose-400"><strong>Tidak:</strong> {aiResult.conditional.tidak}</div>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <h5 className="font-bold text-sm text-white mb-2">Iterational</h5>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div><strong>Syarat:</strong> {aiResult.iterational.syaratUlang}</div>
                      <div><strong>Ulang:</strong> {aiResult.iterational.langkahUlang}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* QUIZ TAB */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white flex justify-center gap-2 items-center">
                <Icons.Award /> Ujian Pintar Konsep Algoritma
              </h3>
              <p className="text-slate-400 text-sm mt-1">Uji pemahaman keseluruhan anda.</p>
            </div>

            <div className="space-y-4">
              {quizQuestions.map((q, qIndex) => (
                <div key={q.id} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="font-semibold text-white text-sm">{qIndex+1}. {q.question}</h4>
                  <div className="grid grid-cols-1 gap-2 pl-4">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = quizAnswers[q.id] === oIdx;
                      const isCorrect = q.correct === oIdx;
                      let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300';
                      if (quizSubmitted) {
                        if (isCorrect) btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                        else if (isSelected) btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                        else btnStyle = 'bg-slate-950/40 opacity-40';
                      } else if (isSelected) {
                        btnStyle = 'bg-indigo-600/20 border-indigo-500 text-white';
                      }
                      return (
                        <button
                          key={oIdx}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                          className={"p-3 rounded-xl border text-left text-xs transition flex justify-between items-center " + btnStyle}
                        >
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <div className="p-3 bg-slate-950/40 rounded border border-slate-800 text-xs text-slate-400 leading-relaxed mt-2">
                      <strong>Penjelasan:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}

              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 text-center">
                {!quizSubmitted ? (
                  <button onClick={handleQuizSubmit} disabled={Object.keys(quizAnswers).length < quizQuestions.length} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg disabled:opacity-40">Hantar Jawapan</button>
                ) : (
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-white">Keputusan: {quizScore} / {quizQuestions.length} Markah</h4>
                    <button onClick={resetQuiz} className="px-6 py-2 bg-slate-800 text-slate-300 rounded-lg">Uji Semula</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 text-center py-8 text-xs text-slate-500 px-6">
        <p className="font-semibold text-slate-300">Hak Milik 2026@Pn Farihan Elyana binti Zahari - POLITEKNIK TUANKU SYED SIRAJUDDIN</p>
      </footer>

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);