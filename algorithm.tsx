import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Play, 
  HelpCircle, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  Code, 
  RefreshCw, 
  Award, 
  Layers, 
  ChevronRight, 
  Smile, 
  Coffee,
  Info,
  Clock,
  Smartphone,
  Check,
  Terminal,
  Cpu,
  Bookmark,
  Download
} from 'lucide-react';

// Initialize Firebase Config (Safe Mocking fallback if not in environment)
const appId = typeof __app_id !== 'undefined' ? __app_id : 'algoritma-learning-hub';

export default function App() {
  const [activeTab, setActiveTab] = useState('notes');
  const [theme, setTheme] = useState('dark');
  const [showDownloadAlert, setShowDownloadAlert] = useState(false);

  // Additional Examples State
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
  
  // Shuffled steps for the game
  const [gameSteps, setGameSteps] = useState([]);
  const [gameFeedback, setGameFeedback] = useState(null);
  const [gameScore, setGameScore] = useState(0);

  // Simulation State
  const [simType, setSimType] = useState('area'); // 'area' | 'atm' | 'grade'
  const [simStep, setSimStep] = useState(0);
  const [simInputs, setSimInputs] = useState({ panjang: 10, lebar: 5, markah: 75, pinInput: '' });
  const [simLogs, setSimLogs] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  // AI Generator State (Gemini API Integration)
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  // Extra program examples data for the new interactive explorer
  const extraExamples = {
    sequential: [
      {
        title: "Kira Purata Nilai Tiga Nombor",
        masalah: "Pelajar mahu mengira purata nilai bagi tiga nombor berbeza yang dimasukkan oleh pengguna.",
        input: "Tiga nombor nyata (cth: A, B, C)",
        proses: "Purata = (A + B + C) / 3",
        output: "Paparan nilai purata nombor tersebut",
        algoritma: [
          "Mula.",
          "Masukkan nombor pertama (A).",
          "Masukkan nombor kedua (B).",
          "Masukkan nombor ketiga (C).",
          "Kira Jumlah = A + B + C.",
          "Kira Purata = Jumlah / 3.",
          "Paparkan nilai Purata.",
          "Tamat."
        ],
        cpp: `// Program C++ Sequential: Kira Purata\n#include <iostream>\nusing namespace std;\n\nint main() {\n    float A, B, C;\n    float jumlah, purata;\n\n    // 1. Ambil input secara turutan\n    cout << "Masukkan nombor pertama: ";\n    cin >> A;\n    cout << "Masukkan nombor kedua: ";\n    cin >> B;\n    cout << "Masukkan nombor ketiga: ";\n    cin >> C;\n\n    // 2. Proses pengiraan sequential\n    jumlah = A + B + C;\n    purata = jumlah / 3.0;\n\n    // 3. Papar output\n    cout << "Jumlah keseluruhan: " << jumlah << endl;\n    cout << "Purata nilai ialah: " << purata << endl;\n\n    return 0;\n}`
      },
      {
        title: "Penukaran Suhu Celsius ke Fahrenheit",
        masalah: "Menukar unit suhu Celsius kepada unit Fahrenheit dengan formula standard.",
        input: "Suhu dalam unit Celsius (C)",
        proses: "Fahrenheit = (C × 9/5) + 32",
        output: "Suhu dalam unit Fahrenheit (F)",
        algoritma: [
          "Mula.",
          "Masukkan suhu dalam Celsius.",
          "Kira Fahrenheit = (Celsius * 9.0 / 5.0) + 32.",
          "Paparkan suhu dalam Fahrenheit.",
          "Tamat."
        ],
        cpp: `// Program C++ Sequential: Penukaran Suhu\n#include <iostream>\nusing namespace std;\n\nint main() {\n    double celsius, fahrenheit;\n\n    // Input suhu\n    cout << "Masukkan suhu dalam Celsius (°C): ";\n    cin >> celsius;\n\n    // Formula dijalankan linear\n    fahrenheit = (celsius * 9.0 / 5.0) + 32.0;\n\n    // Paparan output fahrenheit\n    cout << "Suhu bersamaan dengan: " << fahrenheit << " °F" << endl;\n\n    return 0;\n}`
      }
    ],
    conditional: [
      {
        title: "Semakan Nombor Genap atau Ganjil",
        masalah: "Sistem menerima satu nombor bulat dan menentukan sama ada nombor tersebut genap atau ganjil.",
        input: "Satu nombor bulat (N)",
        proses: "Semak baki pembahagian nombor dengan 2 (N % 2)",
        output: "Mesej menyatakan 'Nombor Genap' atau 'Nombor Ganjil'",
        algoritma: [
          "Mula.",
          "Masukkan satu nombor bulat (N).",
          "Jika baki pembahagian (N % 2) adalah sifar (0):",
          "    Paparkan 'Nombor Genap'.",
          "Jika tidak:",
          "    Paparkan 'Nombor Ganjil'.",
          "Tamat."
        ],
        cpp: `// Program C++ Conditional: Genap atau Ganjil\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int nombor;\n    cout << "Masukkan sebarang nombor bulat: ";\n    cin >> nombor;\n\n    // Struktur kawalan keputusan (if...else)\n    if (nombor % 2 == 0) {\n        cout << nombor << " ialah Nombor GENAP." << endl;\n    } else {\n        cout << nombor << " ialah Nombor GANJIL." << endl;\n    }\n\n    return 0;\n}`
      },
      {
        title: "Sistem Kelayakan Diskaun Belanja",
        masalah: "Kira jumlah bayaran bersih selepas diskaun 10% jika perbelanjaan asal pelanggan melebihi RM100.",
        input: "Jumlah harga perbelanjaan asal",
        proses: "Semak syarat perbelanjaan > 100 untuk kelayakan potongan harga",
        output: "Jumlah diskaun dan harga bayaran bersih baharu",
        algoritma: [
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
        cpp: `// Program C++ Conditional: Sistem Diskaun Kedai\n#include <iostream>\nusing namespace std;\n\nint main() {\n    double belanja, diskaun = 0.0, bayaran_bersih;\n    cout << "Masukkan jumlah perbelanjaan asal: RM";\n    cin >> belanja;\n\n    // Semakan syarat kelayakan diskaun\n    if (belanja > 100.0) {\n        diskaun = belanja * 0.10; // Diskaun 10%\n        bayaran_bersih = belanja - diskaun;\n        cout << "Tahniah! Anda layak diskaun RM" << diskaun << endl;\n    } else {\n        bayaran_bersih = belanja;\n        cout << "Maaf, tiada diskaun diberikan (belanja bawah RM100)." << endl;\n    }\n\n    cout << "Jumlah bayaran bersih anda: RM" << bayaran_bersih << endl;\n    return 0;\n}`
      }
    ],
    iterational: [
      {
        title: "Penjana Sifir Matematik Pintar",
        masalah: "Memaparkan sifir gandaan bagi nombor yang dimasukkan oleh pengguna daripada gandaan 1 sehingga 10 secara automatik.",
        input: "Nombor asas sifir (cth: 5)",
        proses: "Ulangi pengiraan pendaraban (i * asas) bermula dari i = 1 sehingga i = 10",
        output: "Senarai lengkap sifir 1 hingga 10",
        algoritma: [
          "Mula.",
          "Masukkan nombor sifir (Asas).",
          "Tetapkan nilai pembilang (i) = 1.",
          "Selagi i <= 10, ulangi langkah berikut:",
          "    Kira Hasil = i * Asas.",
          "    Paparkan 'i x Asas = Hasil'.",
          "    Tambah nilai i sebanyak 1 (i = i + 1).",
          "Tamat."
        ],
        cpp: `// Program C++ Iterational: Penjana Sifir Pintar\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int asas;\n    cout << "Masukkan nombor sifir yang anda inginkan: ";\n    cin >> asas;\n\n    cout << "--- Sifir " << asas << " ---" << endl;\n    // Menggunakan gelung 'for' untuk pengulangan berstruktur\n    for (int i = 1; i <= 10; i++) {\n        cout << i << " x " << asas << " = " << (i * asas) << endl;\n    }\n\n    return 0;\n}`
      },
      {
        title: "Sistem Had Cuba Laluan Telefon",
        masalah: "Telefon meminta PIN keselamatan. Jika PIN salah, pengguna dibenarkan mencuba semula sehingga maksimum 3 kali sahaja sebelum disekat.",
        input: "PIN keselamatan dimasukkan pengguna",
        proses: "Mengulangi permintaan input selagi PIN salah dan bilangan cubaan kurang daripada 3",
        output: "Akses dibenarkan atau telefon disekat",
        algoritma: [
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
        cpp: `// Program C++ Iterational: Sistem PIN Had Cubaan\n#include <iostream>\nusing namespace std;\n\nint main() {\n    const string PIN_BETUL = "9988";\n    string pin_input;\n    int cubaan = 0;\n    bool berjaya = false;\n\n    // Gelung 'while' mengulangi proses sehingga had cubaan dipenuhi\n    while (cubaan < 3) {\n        cout << "Masukkan PIN telefon anda (" << (3 - cubaan) << " cubaan berbaki): ";\n        cin >> pin_input;\n        cubaan++;\n\n        if (pin_input == PIN_BETUL) {\n            cout << "PIN betul! Akses dibenarkan." << endl;\n            berjaya = true;\n            break; // Keluar gelung secara paksa\n        }\n        cout << "PIN salah!" << endl;\n    }\n\n    if (!berjaya) {\n        cout << "Amaran! Telefon anda telah disekat selepas 3 kali gagal." << endl;\n    }\n\n    return 0;\n}`
      }
    ]
  };

  const quizQuestions = [
    {
      id: 1,
      question: "Apakah takrifan yang paling tepat bagi 'Algorithm'?",
      options: [
        "Satu program komputer yang ditulis dalam bahasa C++.",
        "Satu siri langkah-langkah tersusun secara logik untuk menyelesaikan sesuatu masalah.",
        "Proses menukar kod pengaturcaraan kepada fail boleh laksana (executable).",
        "Peralatan perkakasan komputer yang digunakan untuk mengira laju."
      ],
      correct: 1,
      explanation: "Algoritma ialah satu siri langkah yang tersusun secara logik dan teratur (seperti resepi) untuk menyelesaikan masalah sebelum kita menulis kod pengaturcaraan."
    },
    {
      id: 2,
      question: "Struktur asas (construct) manakah yang melaksanakan arahan dari atas ke bawah tanpa sebarang syarat atau ulangan?",
      options: [
        "Conditional (Selection)",
        "Iterational (Loop)",
        "Sequential (Sequence)",
        "Multi-branching"
      ],
      correct: 2,
      explanation: "Sequential melaksanakan arahan satu demi satu secara teratur dari atas ke bawah tanpa melompat atau berpatah balik."
    },
    {
      id: 3,
      question: "Dalam sistem ATM, tindakan memeriksa 'Adakah PIN betul?' tergolong dalam struktur...",
      options: [
        "Sequential",
        "Conditional (Selection)",
        "Iterational (Loop)",
        "Semua di atas"
      ],
      correct: 1,
      explanation: "Keputusan berdasarkan syarat (PIN betul/salah) ialah contoh Conditional (Selection) yang biasanya diwakili oleh struktur if...else."
    },
    {
      id: 4,
      question: "Apakah kata kunci C++ yang kerap digunakan untuk struktur 'Iterational'?",
      options: [
        "if, else, switch",
        "cin, cout",
        "for, while, do...while",
        "int, float, char"
      ],
      correct: 2,
      explanation: "for, while, dan do...while ialah struktur kawalan gelung (loops) yang digunakan untuk melakukan lelaran (iteration) dalam C++."
    },
    {
      id: 5,
      question: "Jika anda ingin menulis atur cara untuk mengira jumlah markah bagi 40 orang pelajar secara automatik, struktur manakah yang paling sesuai digabungkan?",
      options: [
        "Hanya Sequential sahaja",
        "Hanya Conditional sahaja",
        "Sequential dan Iterational (untuk mengulangi proses pengiraan bagi setiap pelajar)",
        "Tiada struktur yang sesuai"
      ],
      correct: 2,
      explanation: "Untuk memproses 40 pelajar, kita memerlukan Iterational (gelung sebanyak 40 kali) digabungkan dengan pengiraan Sequential dalam setiap pusingan gelung."
    }
  ];

  // Shuffler for the game on mount
  useEffect(() => {
    shuffleGame();
  }, []);

  const shuffleGame = () => {
    const shuffled = [...initialTehTarikSteps].sort(() => Math.random() - 0.5);
    setGameSteps(shuffled);
    setGameFeedback(null);
  };

  // Move step in game
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
    const evaluated = gameSteps.map((step, idx) => {
      const isCorrect = step.correctOrder === idx + 1;
      if (isCorrect) correctCount++;
      return { ...step, isCorrect };
    });
    
    setGameScore(correctCount);
    if (correctCount === 8) {
      setGameFeedback({
        status: 'success',
        message: 'Syabas! Langkah algoritma anda tersusun dengan sempurna. Teh Tarik maya anda sedia dihidangkan! ☕✨'
      });
    } else {
      setGameFeedback({
        status: 'partial',
        message: `Hampir tepat! Anda mendapat ${correctCount}/8 langkah di kedudukan yang betul. Cuba susun semula mengikut logik urutan penyediaan teh.`
      });
    }
  };

  // Simulation runner helper
  const runSimulation = () => {
    setIsSimulating(true);
    setSimStep(0);
    setSimLogs([]);
    
    let delay = 1000;
    
    if (simType === 'area') {
      const steps = [
        { msg: "Mula simulasi pengiraan luas..." },
        { msg: `Input Panjang dibaca: ${simInputs.panjang}` },
        { msg: `Input Lebar dibaca: ${simInputs.lebar}` },
        { msg: `Melakukan pengiraan: Luas = ${simInputs.panjang} × ${simInputs.lebar}` },
        { msg: `Paparan Output: Luas Segi Empat ialah ${simInputs.panjang * simInputs.lebar}` },
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
        { msg: `Input Markah dibaca: ${simInputs.markah}` },
        { msg: `Membuat keputusan: Adakah ${simInputs.markah} ≥ 50?` },
        { msg: checkPass ? "Ya! Markah memenuhi syarat (Lulus)." : "Tidak! Markah di bawah syarat (Gagal)." },
        { msg: `Paparan Output: Pelajar diisytiharkan [${checkPass ? 'LULUS' : 'GAGAL'}]` },
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
      const correctPin = "1234";
      const isPinCorrect = simInputs.pinInput === correctPin;
      const steps = [
        { msg: "Sistem ATM diaktifkan." },
        { msg: "Masukkan PIN pengguna." },
        { msg: `Memeriksa PIN yang dimasukkan: [${simInputs.pinInput || 'Tiada PIN'}]` },
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

  // AI-Powered Algorithm Generator (Gemini 2.5 API integration)
  const generateAiAlgorithm = async (customPrompt) => {
    const promptToUse = customPrompt || aiPrompt;
    if (!promptToUse.trim()) {
      setAiError('Sila masukkan satu senario atau aktiviti harian.');
      return;
    }

    setAiLoading(true);
    setAiError('');
    setAiResult(null);

    const apiKey = ""; // Runtime-provided
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const systemPrompt = `You are an expert C++ programming tutor. Help the user create an algorithm for an everyday real-world activity they mention (in Malay language). 
You MUST respond strictly with a JSON object. No markdown wraps other than raw JSON.
The JSON object must have exactly this structure:
{
  "aktiviti": "Aktiviti yang diminta",
  "pengenalan": "Satu ayat pengenalan santai tentang aktiviti ini.",
  "sequential": [
    "Langkah 1...",
    "Langkah 2...",
    "Langkah 3..."
  ],
  "conditional": {
    "syarat": "Apakah situasi membuat keputusan (e.g., Jika hujan...)",
    "ya": "Tindakan jika benar (Ya)",
    "tidak": "Tindakan jika salah (Tidak)"
  },
  "iterational": {
    "syaratUlang": "Bilakah tindakan perlu diulang",
    "langkahUlang": "Apakah langkah yang diulang-ulang"
  },
  "cppTip": "Tips ringkas bagaimana konsep ini boleh ditukar kepada sintaks C++ (e.g. if-else atau for loop)."
}`;

    const payload = {
      contents: [{ parts: [{ text: `Aktiviti: ${promptToUse}` }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    // Exponential Backoff Retrier
    const fetchWithRetry = async (retries = 5, delay = 1000) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`HTTP status ${response.status}`);
        return await response.json();
      } catch (err) {
        if (retries > 0) {
          await new Promise(res => setTimeout(res, delay));
          return fetchWithRetry(retries - 1, delay * 2);
        }
        throw err;
      }
    };

    try {
      const data = await fetchWithRetry();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = JSON.parse(textResponse);
      setAiResult(parsed);
    } catch (err) {
      console.error(err);
      setAiError('Maaf, sistem tidak dapat berhubung dengan AI sekarang. Menggunakan templat algoritma luar talian...');
      
      // Highly functional fallback data in case of failure or API key absence
      setTimeout(() => {
        setAiResult({
          aktiviti: promptToUse,
          pengenalan: `Berikut adalah contoh draf algoritma untuk "${promptToUse}" yang dijana secara automatik secara luar talian.`,
          sequential: [
            "Sediakan peralatan dan bahan utama.",
            "Lakukan persediaan awal langkah demi langkah.",
            "Mulakan tindakan utama untuk menyelesaikan tugasan."
          ],
          conditional: {
            syarat: `Adakah proses "${promptToUse}" ini berjalan dengan lancar tanpa sebarang isu/kekurangan bahan?`,
            ya: "Teruskan langkah sehingga selesai sepenuhnya.",
            tidak: "Lakukan pelan alternatif atau tambah bahan yang kurang sebelum meneruskan."
          },
          iterational: {
            syaratUlang: "Selagi tugasan utama belum mencapai standard kualiti yang dimahukan",
            langkahUlang: "Periksa kembali hasil kerja, lakukan penambahbaikan, dan uji semula."
          },
          cppTip: "Gunakan 'if...else' untuk bahagian Conditional di atas, dan struktur 'while' atau 'for' untuk bahagian Iterational dalam kod C++ anda!"
        });
        setAiLoading(false);
      }, 1000);
    } finally {
      if (!aiError) setAiLoading(false);
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

  // FUNCTION TO GENERATE STANDALONE HTML FILE
  const handleDownloadHTML = () => {
    setShowDownloadAlert(true);
    
    // Standalone self-contained HTML Template
    const standaloneHTML = `<!DOCTYPE html>
<html lang="ms">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hub Pembelajaran Algoritma C++</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"><\/script>
  <!-- React 18 & ReactDOM 18 CDNs -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin><\/script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin><\/script>
  <!-- Babel Standalone for browser JSX compiler -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
  <style>
    /* Custom animation classes */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.4s ease-out forwards;
    }
    body {
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    }
  </style>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            slate: {
              950: '#030712'
            }
          }
        }
      }
    }
  <\/script>
</head>
<body class="bg-slate-950 text-slate-100 transition-colors duration-300 dark">

  <div id="root"></div>

  <!-- React Code in Babel type to run directly in browser -->
  <script type="text/babel">
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
      const [gameScore, setGameScore] = useState(0);

      // Simulation State
      const [simType, setSimType] = useState('area');
      const [simStep, setSimStep] = useState(0);
      const [simInputs, setSimInputs] = useState({ panjang: 10, lebar: 5, markah: 75, pinInput: '' });
      const [simLogs, setSimLogs] = useState([]);
      const [isSimulating, setIsSimulating] = useState(false);

      // AI Generator State (Local Simulated Version for Offline Compatibility)
      const [aiPrompt, setAiPrompt] = useState('');
      const [aiResult, setAiResult] = useState(null);
      const [aiLoading, setAiLoading] = useState(false);

      // Quiz State
      const [quizAnswers, setQuizAnswers] = useState({});
      const [quizSubmitted, setQuizSubmitted] = useState(false);
      const [quizScore, setQuizScore] = useState(null);

      const extraExamples = ${JSON.stringify(extraExamples)};
      const quizQuestions = ${JSON.stringify(quizQuestions)};

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
        
        setGameScore(correctCount);
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
        if (!aiPrompt.trim()) return;
        setAiLoading(true);
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
                    Hub Pembelajaran Algoritma C++ (Offline)
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
                Penjana Algoritma
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
                    <Icons.Sparkles /> Penjana Algoritma Offline
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
  <\/script>
</body>
</html>`;

    // Trigger download
    const blob = new Blob([standaloneHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Hub_Pembelajaran_Algoritma_Offline.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-300`}>
      
      {/* HEADER SECTION */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
              <Code className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Hub Pembelajaran Algoritma C++
              </h1>
              <p className="text-xs text-slate-400">Modul 1.4: Reka Bentuk Algoritma Pintar & Interaktif</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* IN-APP DOWNLOAD BUTTON */}
            <button
              onClick={handleDownloadHTML}
              className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition font-semibold shadow-lg shadow-emerald-600/20"
              title="Muat Turun Aplikasi dalam Format HTML"
            >
              <Download className="h-4 w-4" />
              📥 Muat Turun HTML Offline
            </button>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="px-4 py-2 text-xs md:text-sm rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition font-medium"
              title="Tukar Tema Visual"
            >
              {theme === 'dark' ? '☀️ Mode Terang' : '🌙 Mode Gelap'}
            </button>
          </div>
        </div>
      </header>

      {/* DOWNLOAD INSTRUCTIONS BANNER */}
      {showDownloadAlert && (
        <div className="max-w-7xl mx-auto px-6 pt-4 animate-fadeIn">
          <div className="bg-emerald-500/10 border border-emerald-500/35 p-4 rounded-xl flex items-start gap-3 text-emerald-400">
            <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h5 className="font-bold text-sm">Proses Muat Turun Selesai!</h5>
                <button onClick={() => setShowDownloadAlert(false)} className="text-emerald-400 hover:text-emerald-300 font-semibold text-xs">Tutup ×</button>
              </div>
              <p className="text-xs mt-1 leading-relaxed text-emerald-300/90">
                Fail <strong>'Hub_Pembelajaran_Algoritma_Offline.html'</strong> telah disimpan pada peranti anda. 
                Anda kini boleh membuka fail ini secara langsung pada bila-bila masa tanpa internet (melalui dwi-klik fail di komputer atau telefon anda) untuk terus belajar secara penuh!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* NAVIGATION TABS */}
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap gap-2 bg-slate-900/40 p-1.5 rounded-xl border border-slate-800/60">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'notes'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Nota Interaktif
          </button>

          <button
            onClick={() => { setActiveTab('game'); shuffleGame(); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'game'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Coffee className="h-4 w-4" />
            Cabaran Teh Tarik
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'simulator'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Play className="h-4 w-4" />
            Simulator Algoritma
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'ai'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Penjana Algoritma AI
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            Uji Minda (Kuiz)
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 pb-16">
        
        {/* TAB 1: NOTA INTERAKTIF */}
        {activeTab === 'notes' && (
          <div className="space-y-8 animate-fadeIn">
            {/* INTRO HERO CARD */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/40 via-slate-900 to-purple-900/30 p-8 border border-indigo-500/20 shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10"></div>
              <div className="max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full">
                  Asas Pengaturcaraan
                </span>
                <h2 className="text-3xl font-extrabold mt-3 text-white leading-tight">
                  Memahami Konsep Asas Algoritma
                </h2>
                <p className="mt-2 text-slate-300 text-base leading-relaxed">
                  Sebelum mula menaip kod C++, adalah kritikal untuk memahami bahawa komputer hanyalah mesin pintar yang patuh pada arahan. Algoritma bertindak sebagai <strong>pelan perancangan bertulis</strong> (resepi) manakala kod pengaturcaraan C++ adalah <strong>pelaksanaan</strong> fizikal bagi pelan tersebut.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  <div className="bg-slate-900/90 border border-slate-700/50 rounded-xl p-3 flex items-center gap-3">
                    <div className="text-indigo-400 text-xl font-bold font-mono">Plan</div>
                    <div className="text-slate-400">Algoritma = Perancangan berstruktur</div>
                  </div>
                  <div className="bg-slate-900/90 border border-slate-700/50 rounded-xl p-3 flex items-center gap-3">
                    <div className="text-purple-400 text-xl font-bold font-mono">Code</div>
                    <div className="text-slate-400">Program = Pelaksanaan menggunakan C++</div>
                  </div>
                </div>
              </div>
            </div>

            {/* THREE CONSTRUCTS EXPLORER */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-indigo-400" />
                <h3 className="text-2xl font-bold text-white">Tiga Struktur Asas (Constructs)</h3>
              </div>
              <p className="text-slate-400 -mt-4 text-sm">Hampir kesemua perisian kompleks di dunia dibina menggunakan kombinasi gabungan tiga struktur ini sahaja.</p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* SEQUENTIAL */}
                <div className="bg-slate-900/60 rounded-xl p-6 border border-slate-800/80 hover:border-emerald-500/40 transition duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-medium">Struktur 1</span>
                      <span className="text-xs text-slate-500">Turutan Satu-Hala</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Sequential (Sequence)</h4>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      Arahan dilaksanakan selangkah demi selangkah secara linear <strong>dari atas ke bawah</strong> tanpa sebarang loncatan, syarat, atau pengulangan. Setiap arahan hanya berjalan sekali sahaja.
                    </p>
                    <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 mb-4 font-mono text-xs text-slate-300">
                      <span className="text-emerald-400">// Contoh Pengiraan Jumlah</span><br />
                      Harga = 15;<br />
                      Kuantiti = 3;<br />
                      Jumlah = Harga * Kuantiti;<br />
                      cout &lt;&lt; Jumlah;
                    </div>
                  </div>
                  <div className="border-t border-slate-800/80 pt-4">
                    <span className="text-xs text-indigo-400 font-medium">Contoh Realiti:</span>
                    <p className="text-xs text-slate-400 italic">Membuat secawan kopi bancuh, memasak mee segera instant.</p>
                  </div>
                </div>

                {/* CONDITIONAL */}
                <div className="bg-slate-900/60 rounded-xl p-6 border border-slate-800/80 hover:border-amber-500/40 transition duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full font-medium">Struktur 2</span>
                      <span className="text-xs text-slate-500">Membuat Pilihan</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Conditional (Selection)</h4>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      Program membuat semakan syarat logik sebelum memilih jalan mana yang harus diambil. Jika syarat dipenuhi (Ya), satu set tindakan diambil; jika gagal (Tidak), tindakan berbeza dilaksanakan.
                    </p>
                    <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 mb-4 font-mono text-xs text-slate-300">
                      <span className="text-amber-400">// Contoh Semakan Keputusan</span><br />
                      <span className="text-purple-400">if</span> (markah &gt;= 50) &#123;<br />
                      &nbsp;&nbsp;cout &lt;&lt; <span className="text-emerald-300">"Lulus"</span>;<br />
                      &#125; <span className="text-purple-400">else</span> &#123;<br />
                      &nbsp;&nbsp;cout &lt;&lt; <span className="text-rose-300">"Gagal"</span>;<br />
                      &#125;
                    </div>
                  </div>
                  <div className="border-t border-slate-800/80 pt-4">
                    <span className="text-xs text-indigo-400 font-medium">Contoh Realiti:</span>
                    <p className="text-xs text-slate-400 italic">Membawa payung (jika hari hujan), mengesahkan PIN kad ATM pelanggan.</p>
                  </div>
                </div>

                {/* ITERATIONAL */}
                <div className="bg-slate-900/60 rounded-xl p-6 border border-slate-800/80 hover:border-purple-500/40 transition duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs bg-purple-500/10 text-purple-400 px-2.5 py-1 rounded-full font-medium">Struktur 3</span>
                      <span className="text-xs text-slate-500">Pengulangan Pintar</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Iterational (Looping)</h4>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      Melakukan pengulangan satu atau beberapa baris tindakan secara <strong>berulang kali selagi sesuatu syarat dipenuhi</strong>. Amat efisien untuk melakukan tugas berskala besar dengan pantas.
                    </p>
                    <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 mb-4 font-mono text-xs text-slate-300">
                      <span className="text-purple-400">// Papar nombor 1 hingga 5</span><br />
                      <span className="text-purple-400">for</span> (<span className="text-sky-300">int</span> i = 1; i &lt;= 5; i++) &#123;<br />
                      &nbsp;&nbsp;cout &lt;&lt; i &lt;&lt; <span className="text-slate-400">" "</span>;<br />
                      &#125;
                    </div>
                  </div>
                  <div className="border-t border-slate-800/80 pt-4">
                    <span className="text-xs text-indigo-400 font-medium">Contoh Realiti:</span>
                    <p className="text-xs text-slate-400 italic">Memanggil senarai nama pelajar dalam kelas, mencuba PIN keselamatan sebanyak 3 kali.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* DYNAMIC ADDITIONAL EXAMPLES SECTION - GALERI CONTOH PENGAYAAN */}
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-500/15 p-2 rounded-lg">
                    <Sparkles className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">✨ Galeri Contoh Pengayaan (Program Tambahan)</h4>
                    <p className="text-xs text-slate-400">Terokai variasi program berbeza bagi mengukuhkan lagi pemahaman anda.</p>
                  </div>
                </div>

                {/* Categories Switcher */}
                <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {(['sequential', 'conditional', 'iterational']).map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedExtraCategory(cat); setSelectedExtraIdx(0); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                        selectedExtraCategory === cat 
                          ? 'bg-indigo-600 text-white shadow' 
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {cat === 'sequential' ? 'Sequential' : cat === 'conditional' ? 'Conditional' : 'Iterational'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub tabs of specific examples within active category */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Side selections list */}
                <div className="md:col-span-1 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest block px-1">Sila Pilih Contoh:</span>
                  {extraExamples[selectedExtraCategory].map((ex, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedExtraIdx(idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition flex items-center justify-between ${
                        selectedExtraIdx === idx
                          ? 'bg-indigo-500/10 border-indigo-500 text-indigo-300'
                          : 'bg-slate-950/40 border-slate-800 hover:bg-slate-900/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{ex.title}</span>
                      <ChevronRight className="h-3 w-3 flex-shrink-0" />
                    </button>
                  ))}
                </div>

                {/* Details display card */}
                <div className="md:col-span-3 bg-slate-950/60 rounded-2xl p-6 border border-slate-800/80 space-y-6">
                  {/* Top bar info */}
                  <div className="flex justify-between items-start gap-4 flex-wrap border-b border-slate-800 pb-3">
                    <div>
                      <h5 className="text-lg font-bold text-white">{extraExamples[selectedExtraCategory][selectedExtraIdx].title}</h5>
                      <p className="text-xs text-indigo-300 mt-1 flex items-center gap-1.5">
                        <Bookmark className="h-3.5 w-3.5" />
                        Masalah: {extraExamples[selectedExtraCategory][selectedExtraIdx].masalah}
                      </p>
                    </div>
                  </div>

                  {/* IPO & Algoritma row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {/* IPO Panel */}
                      <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/60 space-y-2">
                        <span className="text-xs font-bold uppercase text-indigo-400 flex items-center gap-1.5">
                          <Cpu className="h-3.5 w-3.5" />
                          Spesifikasi IPO (Input-Proses-Output)
                        </span>
                        <div className="space-y-1.5 text-xs">
                          <div><strong className="text-slate-400">Input:</strong> <span className="text-slate-200">{extraExamples[selectedExtraCategory][selectedExtraIdx].input}</span></div>
                          <div><strong className="text-slate-400">Proses:</strong> <span className="text-slate-200">{extraExamples[selectedExtraCategory][selectedExtraIdx].proses}</span></div>
                          <div><strong className="text-slate-400">Output:</strong> <span className="text-slate-200">{extraExamples[selectedExtraCategory][selectedExtraIdx].output}</span></div>
                        </div>
                      </div>

                      {/* Algoritma (Step-by-step) */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase text-indigo-400 flex items-center gap-1.5">
                          <Terminal className="h-3.5 w-3.5" />
                          Rancangan Algoritma
                        </span>
                        <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 space-y-2">
                          {extraExamples[selectedExtraCategory][selectedExtraIdx].algoritma.map((step, idx) => (
                            <div key={idx} className="flex gap-2.5 text-xs text-slate-300">
                              <span className="text-indigo-400 font-mono font-bold">{idx + 1}.</span>
                              <span className="leading-relaxed">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* C++ Code block */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase text-indigo-400 flex items-center gap-1.5">
                        <Code className="h-3.5 w-3.5" />
                        Kod Atur Cara C++ Lengkap
                      </span>
                      <pre className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed max-h-[310px] overflow-y-auto">
                        {extraExamples[selectedExtraCategory][selectedExtraIdx].cpp}
                      </pre>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* FLOW OF PROGRAMMING WORKFLOW */}
            <div className="bg-slate-900/30 rounded-2xl p-6 border border-slate-800">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Info className="h-4 w-4 text-indigo-400" />
                Aliran Penyelesaian Masalah ke Kod C++
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                {[
                  { step: "1", title: "Kenal Pasti Masalah", desc: "Fahami keperluan pengguna" },
                  { step: "2", title: "Input & Output", desc: "Tentukan data masuk & keluar" },
                  { step: "3", title: "Bina Algoritma", desc: "Rancang resepi langkah logik" },
                  { step: "4", title: "Lukis Carta Alir", desc: "Visualisasi menggunakan Flowchart" },
                  { step: "5", title: "Tulis Kod C++", desc: "Terjemah algoritma ke program" },
                  { step: "6", title: "Jalankan Atur Cara", desc: "Uji output program" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 relative">
                    <div className="absolute -top-3 -left-3 bg-indigo-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                      {item.step}
                    </div>
                    <h5 className="font-semibold text-xs text-indigo-300 mt-2 mb-1">{item.title}</h5>
                    <p className="text-[10px] text-slate-400">{item.desc}</p>
                    {idx < 5 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 bg-slate-800 p-1 rounded-full border border-slate-700">
                        <ChevronRight className="h-3 w-3 text-slate-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MINI GAME "TEH TARIK" */}
        {activeTab === 'game' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <Coffee className="h-6 w-6 text-orange-400 mx-auto" />
              <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                Cabaran Susunan Algoritma: Pembancuh Teh Tarik
              </h3>
              <p className="text-slate-400 text-sm">
                Satu ciri utama algoritma yang baik ialah mempunyai <strong>langkah-langkah yang tersusun betul secara logik</strong>. Jom susun langkah-langkah di bawah untuk menghasilkan secawan Teh Tarik maya yang sedap!
              </p>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span>Susun Semula Menggunakan Butang Laras (Atas/Bawah)</span>
                <span className="font-semibold text-indigo-400">Kedudukan Betul = Sempurna!</span>
              </div>

              <div className="space-y-2">
                {gameSteps.map((step, idx) => {
                  let badgeColor = 'bg-slate-800 text-slate-400';
                  if (gameFeedback) {
                    badgeColor = step.correctOrder === idx + 1 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
                  }

                  return (
                    <div 
                      key={step.id} 
                      className={`flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition duration-150`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${badgeColor}`}>
                          {idx + 1}
                        </div>
                        <span className="text-sm font-medium text-slate-200">{step.text}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveStep(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-800 transition"
                          title="Naikkan Langkah"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => moveStep(idx, 'down')}
                          disabled={idx === gameSteps.length - 1}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-800 transition"
                          title="Turunkan Langkah"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {gameFeedback && (
                <div className={`p-4 rounded-xl flex items-start gap-3 mt-4 ${
                  gameFeedback.status === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300' : 'bg-amber-500/10 border border-amber-500/20 text-amber-300'
                }`}>
                  {gameFeedback.status === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h5 className="font-bold text-sm">Maklum Balas Penyusunan:</h5>
                    <p className="text-xs mt-1 leading-relaxed">{gameFeedback.message}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={checkTehTarikGame}
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold shadow-lg transition"
                >
                  Sahkan Susunan Algoritma
                </button>
                <button
                  onClick={shuffleGame}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition flex items-center gap-2"
                  title="Rawakkan Semula"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SIMULATOR ALGORITMA */}
        {activeTab === 'simulator' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                <Play className="h-6 w-6 text-indigo-400" />
                Simulator Algoritma Langkah Demi Langkah
              </h3>
              <p className="text-slate-400 text-sm">
                Lihat bagaimana komputer melarikan satu siri algoritma secara visual. Anda boleh menukar pemboleh ubah input dan melihat kesannya terhadap aliran logik!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* CONFIGURATION & INPUT PANEL */}
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-6">
                <div>
                  <h4 className="font-bold text-white mb-3 text-sm flex items-center gap-2">
                    <Layers className="h-4 w-4 text-indigo-400" />
                    Pilih Senario Algoritma
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'area', label: 'Luas Sg. Empat', desc: 'Sequential' },
                      { id: 'grade', label: 'Kiraan Lulus', desc: 'Conditional' },
                      { id: 'atm', label: 'Log Masuk ATM', desc: 'Selection' }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => { setSimType(type.id); setSimStep(0); setSimLogs([]); }}
                        disabled={isSimulating}
                        className={`p-3 rounded-xl border text-center transition ${
                          simType === type.id
                            ? 'bg-indigo-600/20 border-indigo-500 text-white shadow'
                            : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="block text-xs font-semibold">{type.label}</span>
                        <span className="text-[9px] text-slate-400 mt-1 block">{type.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 border-t border-slate-800/80 pt-4">
                  <h4 className="font-bold text-white text-sm">Konfigurasi Input Simulasi</h4>
                  
                  {simType === 'area' && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Nilai Panjang (m):</label>
                        <input
                          type="number"
                          value={simInputs.panjang}
                          disabled={isSimulating}
                          onChange={(e) => setSimInputs(prev => ({ ...prev, panjang: parseInt(e.target.value) || 0 }))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Nilai Lebar (m):</label>
                        <input
                          type="number"
                          value={simInputs.lebar}
                          disabled={isSimulating}
                          onChange={(e) => setSimInputs(prev => ({ ...prev, lebar: parseInt(e.target.value) || 0 }))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  )}

                  {simType === 'grade' && (
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Nilai Markah Pelajar (0 - 100):</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={simInputs.markah}
                        disabled={isSimulating}
                        onChange={(e) => setSimInputs(prev => ({ ...prev, markah: parseInt(e.target.value) || 0 }))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                      <div className="mt-2 text-[11px] text-slate-400 italic">
                        Nota: Syarat lulus yang ditetapkan ialah sekurang-kurangnya 50 markah.
                      </div>
                    </div>
                  )}

                  {simType === 'atm' && (
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Masukkan PIN ATM Cubaan:</label>
                      <input
                        type="text"
                        maxLength="4"
                        placeholder="Contoh: 1234 atau 9999"
                        value={simInputs.pinInput}
                        disabled={isSimulating}
                        onChange={(e) => setSimInputs(prev => ({ ...prev, pinInput: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200 tracking-wider focus:outline-none focus:border-indigo-500"
                      />
                      <div className="mt-2 text-[11px] text-indigo-400 font-semibold">
                        Info Sistem: PIN yang sah dalam pangkalan data ialah "1234".
                      </div>
                    </div>
                  )}

                  <button
                    onClick={runSimulation}
                    disabled={isSimulating}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition"
                  >
                    {isSimulating ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Sedang Berjalan...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Jalankan Simulasi
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* ALGORITHM RUNNER DISPLAY */}
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 lg:col-span-2 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-white mb-4 text-sm flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Code className="h-4 w-4 text-indigo-400" />
                    Penjejak Langkah Algoritma Semasa
                  </h4>

                  <div className="space-y-2 font-mono text-xs md:text-sm">
                    {simType === 'area' && (
                      <>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 1 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'}`}>
                          1. Mula.
                        </div>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 2 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'}`}>
                          2. Masukkan Panjang ({simStep >= 2 ? simInputs.panjang : '?'})
                        </div>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 3 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'}`}>
                          3. Masukkan Lebar ({simStep >= 3 ? simInputs.lebar : '?'})
                        </div>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 4 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'}`}>
                          4. Kira Luas = Panjang × Lebar ({simStep >= 4 ? `${simInputs.panjang} × ${simInputs.lebar} = ${simInputs.panjang * simInputs.lebar}` : '?'})
                        </div>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 5 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'}`}>
                          5. Paparkan Luas. ({simStep >= 5 ? `Hasil: ${simInputs.panjang * simInputs.lebar}` : '?'})
                        </div>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 6 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'}`}>
                          6. Tamat.
                        </div>
                      </>
                    )}

                    {simType === 'grade' && (
                      <>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 1 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'}`}>
                          1. Mula Semakan Markah.
                        </div>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 2 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'}`}>
                          2. Input Markah Pelajar = {simInputs.markah}
                        </div>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 3 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'}`}>
                          3. Adakah Markah ({simInputs.markah}) ≥ 50?
                        </div>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 4 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'} pl-6`}>
                          └─&gt; {simStep >= 4 ? (simInputs.markah >= 50 ? 'Ya! Terus ke langkah 5A' : 'Tidak! Terus ke langkah 5B') : 'Menilai syarat...'}
                        </div>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 5 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'} pl-12`}>
                          {simInputs.markah >= 50 ? "5A. Paparkan 'Lulus'" : "5B. Paparkan 'Gagal'"}
                        </div>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 6 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'}`}>
                          6. Tamat Semakan.
                        </div>
                      </>
                    )}

                    {simType === 'atm' && (
                      <>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 1 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'}`}>
                          1. Masukkan Kad ATM.
                        </div>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 2 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'}`}>
                          2. Masukkan PIN Cubaan. (Nilai: "{simInputs.pinInput}")
                        </div>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 3 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'}`}>
                          3. Syarat: Adakah PIN betul? (Sistem menyemak padanan...)
                        </div>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 4 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'} pl-6`}>
                          └─&gt; {simStep >= 4 ? (simInputs.pinInput === '1234' ? 'BENAR (Akses Menu Utama)' : 'SALAH (Paparkan Amaran Ralat)') : 'Menyemak kelayakan...'}
                        </div>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 5 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'} pl-12`}>
                          {simInputs.pinInput === '1234' ? "Paparkan Menu Transaksi Kewangan." : "Paparkan mesej 'PIN Tidak Sah'."}
                        </div>
                        <div className={`p-2.5 rounded transition duration-200 ${simStep === 6 ? 'bg-indigo-500/20 text-white border-l-4 border-indigo-500 font-bold' : 'text-slate-400'}`}>
                          6. Tamat Sesi Keselamatan ATM.
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* SIMULATOR OUTPUT CONSOLE */}
                <div className="mt-6">
                  <h5 className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Log Output Sistem (Konsol):</h5>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 h-36 font-mono text-xs overflow-y-auto space-y-1">
                    {simLogs.length === 0 ? (
                      <span className="text-slate-600 italic">// Klik 'Jalankan Simulasi' untuk melihat log di sini.</span>
                    ) : (
                      simLogs.map((log, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="text-emerald-500">[SYSTEM]</span>
                          <span className="text-slate-300">{log}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 4: PENJANA ALGORITMA AI */}
        {activeTab === 'ai' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6 text-indigo-400" />
                Penjana Algoritma AI Pintar (Gemini)
              </h3>
              <p className="text-slate-400 text-sm">
                Masukkan sebarang aktiviti harian, masalah, atau proses fizikal yang anda mahukan. AI kami akan menterjemahkannya kepada struktur Algoritma C++ yang mudah difahami!
              </p>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Contoh: memasak nasi lemak, memesan Grab, menukar lampu rosak..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => generateAiAlgorithm(null)}
                  disabled={aiLoading}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition"
                >
                  {aiLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Sedang Menjana...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Jana Algoritma
                    </>
                  )}
                </button>
              </div>

              {/* Quick suggestions */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs text-slate-400">Cadangan Cepat:</span>
                {[
                  "Membuat mi maggi rebus",
                  "Mengeluarkan wang di ATM",
                  "Membeli tiket bioskop online",
                  "Pendaftaran peperiksaan kolej"
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setAiPrompt(suggestion); generateAiAlgorithm(suggestion); }}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700 transition"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {aiError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {aiError}
                </div>
              )}
            </div>

            {/* AI RESULT CARDS */}
            {aiResult && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="border-b border-slate-800 pb-3">
                    <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Hasil Analisis AI</span>
                    <h4 className="text-xl font-bold text-white mt-1">Algoritma: {aiResult.aktiviti}</h4>
                    <p className="text-sm text-slate-400 mt-1">{aiResult.pengenalan}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Sequential AI Card */}
                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold">1</span>
                        <h5 className="font-bold text-sm text-white">Sequential Steps</h5>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                        {aiResult.sequential.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Conditional AI Card */}
                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">2</span>
                        <h5 className="font-bold text-sm text-white">Conditional Choice</h5>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-slate-950 rounded border border-slate-800">
                          <span className="font-semibold text-amber-400">Syarat:</span>
                          <p className="text-slate-300 mt-0.5">{aiResult.conditional.syarat}</p>
                        </div>
                        <div className="p-2 bg-emerald-500/10 rounded border border-emerald-500/10">
                          <span className="font-semibold text-emerald-400">Jika Ya:</span>
                          <p className="text-slate-300 mt-0.5">{aiResult.conditional.ya}</p>
                        </div>
                        <div className="p-2 bg-rose-500/10 rounded border border-rose-500/10">
                          <span className="font-semibold text-rose-400">Jika Tidak:</span>
                          <p className="text-slate-300 mt-0.5">{aiResult.conditional.tidak}</p>
                        </div>
                      </div>
                    </div>

                    {/* Iterational AI Card */}
                    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                        <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs flex items-center justify-center font-bold">3</span>
                        <h5 className="font-bold text-sm text-white">Iterational Loop</h5>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-slate-950 rounded border border-slate-800">
                          <span className="font-semibold text-purple-400">Syarat Gelung:</span>
                          <p className="text-slate-300 mt-0.5">{aiResult.iterational.syaratUlang}</p>
                        </div>
                        <div className="p-2 bg-purple-500/10 rounded border border-purple-500/10">
                          <span className="font-semibold text-purple-400">Tindakan Diulang:</span>
                          <p className="text-slate-300 mt-0.5">{aiResult.iterational.langkahUlang}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-600/10 p-4 rounded-xl border border-indigo-500/20 mt-4 flex items-start gap-3">
                    <Code className="h-5 w-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold text-xs text-white uppercase tracking-wider">Tip C++ Pengaturcaraan</h5>
                      <p className="text-xs text-slate-300 mt-1">{aiResult.cppTip}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: UJI MINDA (QUIZ) */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                <Award className="h-6 w-6 text-yellow-400" />
                Ujian Pintar Konsep Algoritma
              </h3>
              <p className="text-slate-400 text-sm">
                Uji kefahaman anda tentang modul 1.4 Algoritma C++ ini. Jawab semua soalan di bawah dan dapatkan gred pencapaian anda.
              </p>
            </div>

            <div className="space-y-4">
              {quizQuestions.map((q, qIndex) => {
                return (
                  <div key={q.id} className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                        {qIndex + 1}
                      </span>
                      <h4 className="font-semibold text-base text-white">{q.question}</h4>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 pl-9">
                      {q.options.map((option, oIdx) => {
                        const isSelected = quizAnswers[q.id] === oIdx;
                        const isCorrectOption = q.correct === oIdx;
                        let optionStyle = 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300';
                        
                        if (quizSubmitted) {
                          if (isCorrectOption) {
                            optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
                          } else if (isSelected && !isCorrectOption) {
                            optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                          } else {
                            optionStyle = 'bg-slate-950 opacity-50 border-slate-800 text-slate-400';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-indigo-600/20 border-indigo-500 text-white';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={quizSubmitted}
                            onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                            className={`w-full text-left p-3.5 rounded-xl border text-sm transition flex justify-between items-center ${optionStyle}`}
                          >
                            <span>{option}</span>
                            {quizSubmitted && isCorrectOption && <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="pl-9 pt-2 text-xs text-slate-400 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
                        <span className="font-bold text-indigo-400">Penjelasan:</span> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* SUBMIT SECTION */}
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 text-center space-y-4">
                {!quizSubmitted ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-semibold shadow-lg disabled:opacity-40 transition"
                  >
                    Hantar Jawapan Kuiz
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="inline-flex items-center justify-center p-4 bg-indigo-500/10 rounded-full border border-indigo-500/25 mb-2">
                      <Award className="h-10 w-10 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white">Keputusan Anda: {quizScore} / {quizQuestions.length} Markah</h4>
                      <p className="text-sm text-slate-400 mt-1">
                        {quizScore === quizQuestions.length 
                          ? 'Gred Sempurna! Anda adalah master dalam asas reka bentuk algoritma!' 
                          : quizScore >= 3 
                            ? 'Syabas! Anda lulus dan mempunyai pemahaman yang sangat kukuh!' 
                            : 'Bagus untuk cubaan pertama! Anda dinasihatkan membaca nota dan mencuba simulator semula.'}
                      </p>
                    </div>
                    <button
                      onClick={resetQuiz}
                      className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition"
                    >
                      Cuba Kuiz Semula
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900/80 bg-slate-950 text-center py-8 text-xs text-slate-500 px-6">
        <p className="font-semibold text-slate-300">Hak Milik 2026@Pn Farihan Elyana binti Zahari - POLITEKNIK TUANKU SYED SIRAJUDDIN</p>
        <p className="mt-1 text-slate-500">Dikuasakan oleh Kecerdasan Buatan Google Gemini untuk sokongan bimbingan dinamik.</p>
      </footer>

    </div>
  );
}