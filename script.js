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
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polygon points="2 17 12 22 22 17"/><polygon points="2 12 17 22 12"/></svg>
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

  const [simType, setSimType] = useState('area');
  const [simStep, setSimStep] = useState(0);
  const [simInputs, setSimInputs] = useState({ panjang: 10, lebar: 5, markah: 75, pinInput: '' });
  const [simLogs, setSimLogs] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

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
          "Mula.", "Masukkan nombor pertama (A).", "Masukkan nombor kedua (B).", "Masukkan nombor ketiga (C).",
          "Kira Jumlah = A + B + C.", "Kira Purata = Jumlah / 3.", "Paparkan nilai Purata.", "Tamat."
        ],
        "cpp": "// Program C++ Sequential: Kira Purata\n#include <iostream>\nusing namespace std;\n\nint main() {\n    float A, B, C;\n    float jumlah, purata;\n    cout << \"Masukkan nombor pertama: \";\n    cin >> A;\n    cout << \"Masukkan nombor kedua: \";\n    cin >> B;\n    cout << \"Masukkan nombor ketiga: \";\n    cin >> C;\n    jumlah = A + B + C;\n    purata = jumlah / 3.0;\n    cout << \"Jumlah: \" << jumlah << endl;\n    cout << \"Purata: \" << purata << endl;\n    return 0;\n}"
      },
      {
        "title": "Penukaran Suhu Celsius ke Fahrenheit",
        "masalah": "Menukar unit suhu Celsius kepada unit Fahrenheit.",
        "input": "Suhu dalam Celsius (C)",
        "proses": "Fahrenheit = (C × 9/5) + 32",
        "output": "Suhu dalam Fahrenheit (F)",
        "algoritma": [
          "Mula.", "Masukkan suhu dalam Celsius.", "Kira Fahrenheit = (Celsius * 9.0 / 5.0) + 32.", "Paparkan suhu dalam Fahrenheit.", "Tamat."
        ],
        "cpp": "// Program C++ Sequential: Penukaran Suhu\n#include <iostream>\nusing namespace std;\n\nint main() {\n    double celsius, fahrenheit;\n    cout << \"Celsius: \";\n    cin >> celsius;\n    fahrenheit = (celsius * 9.0 / 5.0) + 32.0;\n    cout << \"Fahrenheit: \" << fahrenheit << endl;\n    return 0;\n}"
      }
    ],
    "conditional": [
      {
        "title": "Semakan Nombor Genap atau Ganjil",
        "masalah": "Menentukan sama ada nombor bulat adalah genap atau ganjil.",
        "input": "Satu nombor bulat (N)",
        "proses": "Semak baki pembahagian nombor dengan 2 (N % 2)",
        "output": "Mesej menyatakan 'Nombor Genap' atau 'Nombor Ganjil'",
        "algoritma": [
          "Mula.", "Masukkan satu nombor bulat (N).", "Jika baki pembahagian (N % 2) adalah sifar (0):",
          "    Paparkan 'Nombor Genap'.", "Jika tidak:", "    Paparkan 'Nombor Ganjil'.", "Tamat."
        ],
        "cpp": "// Program C++ Conditional\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int nombor;\n    cout << \"Nombor: \"; cin >> nombor;\n    if (nombor % 2 == 0) {\n        cout << \"Genap\" << endl;\n    } else {\n        cout << \"Ganjil\" << endl;\n    }\n    return 0;\n}"
      }
    ],
    "iterational": [
      {
        "title": "Penjana Sifir Matematik Pintar",
        "masalah": "Memaparkan sifir gandaa 1 hingga 10 bagi nombor yang dipilih.",
        "input": "Nombor asas sifir",
        "proses": "Ulangi pendaraban dari i = 1 sehingga i = 10",
        "output": "Senarai lengkap sifir",
        "algoritma": [
          "Mula.", "Masukkan nombor sifir (Asas).", "Tetapkan pembilang (i) = 1.", "Selagi i <= 10, ulangi:",
          "    Kira Hasil = i * Asas.", "    Paparkan i x Asas = Hasil.", "    Tambah i sebanyak 1.", "Tamat."
        ],
        "cpp": "// Program C++ Iterational\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int asas;\n    cout << \"Sifir: \"; cin >> asas;\n    for (int i = 1; i <= 10; i++) {\n        cout << i << \" x \" << asas << \" = \" << (i * asas) << endl;\n    }\n    return 0;\n}"
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
        "Proses menukar kod pengaturcaraan kepada fail boleh laksana.",
        "Peralatan perkakasan komputer."
      ],
      "correct": 1,
      "explanation": "Algoritma ialah satu siri langkah yang tersusun secara logik dan teratur untuk menyelesaikan masalah sebelum kita menulis kod."
    },
    {
      "id": 2,
      "question": "Struktur asas manakah yang melaksanakan arahan dari atas ke bawah tanpa syarat atau ulangan?",
      "options": ["Conditional", "Iterational", "Sequential", "Multi-branching"],
      "correct": 2,
      "explanation": "Sequential melaksanakan arahan satu demi satu secara linear dari atas ke bawah."
    }
  ];

  useEffect(() => { shuffleGame(); }, []);

  const shuffleGame = () => {
    const shuffled = [...initialTehTarikSteps].sort(() => Math.random() - 0.5);
    setGameSteps(shuffled);
    setGameFeedback(null);
  };

  const moveStep = (index, direction) => {
    const newSteps = [...gameSteps];
    if (direction === 'up' && index > 0) {
      const temp = newSteps[index]; newSteps[index] = newSteps[index - 1]; newSteps[index - 1] = temp;
    } else if (direction === 'down' && index < newSteps.length - 1) {
      const temp = newSteps[index]; newSteps[index] = newSteps[index + 1]; newSteps[index + 1] = temp;
    }
    setGameSteps(newSteps);
  };

  const checkTehTarikGame = () => {
    let correctCount = 0;
    gameSteps.forEach((step, idx) => { if (step.correctOrder === idx + 1) correctCount++; });
    if (correctCount === 8) {
      setGameFeedback({ status: 'success', message: 'Syabas! Langkah algoritma anda tersusun sempurna! ☕✨' });
    } else {
      setGameFeedback({ status: 'partial', message: 'Hampir tepat! Sila semak kedudukan langkah ' + correctCount + '/8 betul.' });
    }
  };

  const runSimulation = () => {
    setIsSimulating(true); setSimStep(0); setSimLogs([]);
    let steps = [
      { msg: "Mula simulasi..." },
      { msg: "Input dibaca dengan betul." },
      { msg: "Proses pengiraan dilakukan." },
      { msg: "Simulasi selesai sepenuhnya!" }
    ];
    steps.forEach((s, idx) => {
      setTimeout(() => {
        setSimStep(idx + 1);
        setSimLogs(prev => [...prev, s.msg]);
        if (idx === steps.length - 1) setIsSimulating(false);
      }, 1000 * idx);
    });
  };

  const handleLocalAiGenerator = () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setTimeout(() => {
      setAiResult({
        aktiviti: aiPrompt,
        pengenalan: "Draf algoritma luar talian untuk " + aiPrompt,
        sequential: ["Persediaan awal.", "Tindakan utama.", "Kemasan."],
        conditional: { syarat: "Adakah lancar?", ya: "Selesai.", tidak: "Ulang semula." },
        iterational: { syaratUlang: "Belum puas hati", langkahUlang: "Baiki langkah." },
        cppTip: "Gunakan if-else untuk Conditional dan gelung while/for untuk Iterational."
      });
      setAiLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icons.Code />
          <h1 className="text-xl font-bold text-white">Hub Pembelajaran Algoritma C++</h1>
        </div>
      </header>

      <nav className="max-w-7xl mx-auto px-6 py-4 flex gap-2">
        <button onClick={() => setActiveTab('notes')} className={"px-4 py-2 rounded text-sm font-medium " + (activeTab === 'notes' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400')}>Nota</button>
        <button onClick={() => setActiveTab('game')} className={"px-4 py-2 rounded text-sm font-medium " + (activeTab === 'game' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400')}>Teh Tarik</button>
        <button onClick={() => setActiveTab('simulator')} className={"px-4 py-2 rounded text-sm font-medium " + (activeTab === 'simulator' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400')}>Simulator</button>
        <button onClick={() => setActiveTab('ai')} className={"px-4 py-2 rounded text-sm font-medium " + (activeTab === 'ai' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400')}>AI</button>
        <button onClick={() => setActiveTab('quiz')} className={"px-4 py-2 rounded text-sm font-medium " + (activeTab === 'quiz' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400')}>Kuiz</button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-16">
        {activeTab === 'notes' && (
          <div className="space-y-6 bg-slate-900 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-white">Asas Algoritma</h2>
            <p className="text-slate-300">Algoritma adalah pelan logik untuk menyelesaikan masalah pengaturcaraan.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950 p-4 rounded"><h4>Sequential</h4><p className="text-xs text-slate-400">Linear dari atas ke bawah.</p></div>
              <div className="bg-slate-950 p-4 rounded"><h4>Conditional</h4><p className="text-xs text-slate-400">Berasaskan pilihan syarat.</p></div>
              <div className="bg-slate-950 p-4 rounded"><h4>Iterational</h4><p className="text-xs text-slate-400">Pengulangan (Looping).</p></div>
            </div>
          </div>
        )}

        {activeTab === 'game' && (
          <div className="space-y-4 bg-slate-900 p-6 rounded-xl max-w-xl mx-auto">
            <h3 className="text-xl font-bold text-white">Cabaran Susunan</h3>
            {gameSteps.map((step, idx) => (
              <div key={step.id} className="bg-slate-950 p-3 rounded flex justify-between items-center">
                <span>{idx + 1}. {step.text}</span>
                <div className="flex gap-1">
                  <button onClick={() => moveStep(idx, 'up')} className="px-2 bg-slate-800 rounded">▲</button>
                  <button onClick={() => moveStep(idx, 'down')} className="px-2 bg-slate-800 rounded">▼</button>
                </div>
              </div>
            ))}
            {gameFeedback && <p className="text-xs text-amber-400">{gameFeedback.message}</p>}
            <button onClick={checkTehTarikGame} className="w-full py-2 bg-indigo-600 rounded text-white font-bold">Semak</button>
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="space-y-4 bg-slate-900 p-6 rounded-xl">
            <button onClick={runSimulation} disabled={isSimulating} className="px-4 py-2 bg-indigo-600 rounded text-white">Mula Simulasi</button>
            <div className="bg-slate-950 p-4 rounded font-mono text-xs h-32 overflow-y-auto">
              {simLogs.map((log, i) => <div key={i}>{log}</div>)}
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-4 bg-slate-900 p-6 rounded-xl">
            <div className="flex gap-2">
              <input type="text" value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} placeholder="Masukkan aktiviti..." className="flex-1 bg-slate-950 p-2 rounded text-white" />
              <button onClick={handleLocalAiGenerator} className="px-4 bg-indigo-600 rounded text-white">Jana</button>
            </div>
            {aiResult && <pre className="bg-slate-950 p-4 rounded text-xs text-slate-300">{JSON.stringify(aiResult, null, 2)}</pre>}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-4 bg-slate-900 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white">Uji Minda</h3>
            <p className="text-xs text-slate-400">Sila pilih tab nota untuk mengulang kaji atau klik "Hantar Jawapan" jika selesai.</p>
            <button onClick={() => setQuizSubmitted(true)} className="px-4 py-2 bg-indigo-600 rounded text-white">Hantar Jawapan</button>
            {quizSubmitted && <p className="text-emerald-400 text-sm">Kuiz dihantar! Sila semak jawapan anda.</p>}
          </div>
        )}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);