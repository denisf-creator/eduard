/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Play, 
  Shield, 
  Zap, 
  Cpu, 
  ChevronDown, 
  X, 
  CheckCircle2, 
  Users, 
  Monitor,
  Code2,
  Terminal
} from 'lucide-react';

// --- Components ---

const CookiePopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-50"
        >
          <div className="glass p-6 rounded-xl shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="text-2xl">🍪</div>
              <div>
                <h3 className="font-bold text-lg mb-1">We use cookies</h3>
                <p className="text-sm text-text-dim mb-4">
                  We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={handleAccept}
                    className="flex-1 btn-primary py-2 rounded-lg text-sm"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => setShow(false)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg transition-colors text-sm font-medium border border-white/10"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Header = ({ onDownload }: { onDownload: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-bg-deep/90 backdrop-blur-md py-3 border-b border-border-accent' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.img 
            src="/logo.png" 
            alt="XENO Logo" 
            className="w-10 h-10 object-contain"
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            whileHover={{ rotate: 10, scale: 1.1 }}
            onError={(e) => {
              // Fallback if logo.png is not found
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="text-2xl font-black tracking-[2px] text-accent-primary">XENO</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'Features', 'Showcase', 'FAQ'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className={`text-xs font-medium uppercase tracking-[1px] transition-colors ${item === 'Home' ? 'text-accent-primary' : 'text-text-dim hover:text-text-main'}`}
            >
              {item}
            </a>
          ))}
        </nav>

        <button 
          onClick={onDownload}
          className="btn-primary px-6 py-2.5 rounded-md text-sm shadow-lg shadow-accent-primary/20 flex items-center gap-2"
        >
          <Download size={16} />
          Download
        </button>
      </div>
    </header>
  );
};

const Hero = ({ onDownload }: { onDownload: () => void }) => {
  return (
    <section id="home" className="relative pt-40 pb-20 overflow-hidden">
      <div className="container mx-auto px-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-[64px] font-black leading-none mb-6 tracking-tight">
            XENO <span className="text-accent-primary block text-[48px] mt-2">Execution Platform</span>
          </h1>
          
          <p className="text-lg text-text-dim mb-10 max-w-[440px] leading-relaxed">
            The most advanced free cutting-edge Roblox executor. 
            Instant execution, unlimited possibilities, and maximum security.
          </p>
          
          <div className="flex flex-wrap gap-5 mb-10">
            <div className="stat-item bg-bg-card border border-border-accent p-4 px-6 rounded-xl min-w-[140px]">
              <div className="text-xl font-bold text-accent-secondary">2,000,000+</div>
              <div className="text-[10px] text-text-dim uppercase font-bold tracking-widest">Downloads</div>
            </div>
            <div className="stat-item bg-bg-card border border-border-accent p-4 px-6 rounded-xl min-w-[140px]">
              <div className="text-xl font-bold text-accent-secondary">100,000+</div>
              <div className="text-[10px] text-text-dim uppercase font-bold tracking-widest">Active Users</div>
            </div>
          </div>

          <div className="notification glass border-l-[3px] border-accent-primary p-3 px-5 rounded-sm flex items-center gap-3 text-sm text-accent-secondary mb-10">
            <Shield size={16} />
            <span>Updated for Version 2.650 — Fully bypasses Hyperion Anti-Cheat</span>
          </div>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onDownload}
              className="btn-primary px-8 py-4 rounded-lg font-bold text-lg shadow-xl shadow-accent-primary/30 flex items-center gap-3"
            >
              <Download size={24} />
              Download
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="executor-mockup bg-[#1e1e2e] border border-[#313244] rounded-xl overflow-hidden shadow-[0_40px_60px_rgba(0,0,0,0.5)]">
            <div className="window-bar bg-[#181825] px-4 py-3 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f38ba8]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#f9e2af]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1]" />
              <div className="ml-5 text-[11px] text-text-dim bg-[#1e1e2e] px-3 py-1 rounded-t-md">main.lua</div>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-[#cdd6f4]">
              <pre>
                <code>
                  <span className="text-[#6c7086] italic">-- Xeno Script Executor v2.4</span>{'\n'}
                  <span className="text-[#cba6f7]">local</span> Players = <span className="text-[#89b4fa]">game:GetService</span>(<span className="text-[#a6e3a1]">"Players"</span>){'\n'}
                  <span className="text-[#cba6f7]">local</span> LP = Players.LocalPlayer{'\n'}{'\n'}
                  <span className="text-[#6c7086] italic">-- Initialize Bypass</span>{'\n'}
                  <span className="text-[#89b4fa]">print</span>(<span className="text-[#a6e3a1]">"Injecting XENO..."</span>){'\n'}
                  <span className="text-[#89b4fa]">xeno_bypass_check</span>(<span className="text-[#a6e3a1]">"full"</span>){'\n'}{'\n'}
                  <span className="text-[#cba6f7]">if</span> LP <span className="text-[#cba6f7]">then</span>{'\n'}
                  {'  '}<span className="text-[#89b4fa]">loadstring</span>(<span className="text-[#89b4fa]">game:HttpGet</span>(<span className="text-[#a6e3a1]">"https://xeno.dev/api"</span>))(){'\n'}
                  <span className="text-[#cba6f7]">end</span>{'\n'}
                  <span className="text-[#6c7086] italic">-- Ready to execute</span>
                </code>
              </pre>
            </div>
            <div className="h-10 bg-[#181825] flex items-center px-4 border-t border-[#313244]">
              <div className="w-2.5 h-2.5 bg-[#a6e3a1] rounded-full mr-2"></div>
              <span className="text-[10px] text-[#a6e3a1] uppercase font-bold">Injected & Ready</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: "Advanced Execution",
      desc: "Execute complex scripts with ease. Our advanced engine supports all modern Roblox functions and APIs.",
      icon: <Terminal className="text-accent-primary" size={32} />
    },
    {
      title: "Real-time Performance",
      desc: "Lightning-fast execution with minimal latency. Experience smooth performance even with heavy scripts.",
      icon: <Zap className="text-accent-primary" size={32} />
    },
    {
      title: "Enhanced Security",
      desc: "Built with security in mind. Advanced anti-detection and bypass mechanisms keep you protected.",
      icon: <Shield className="text-accent-primary" size={32} />
    },
    {
      title: "User-friendly UI",
      desc: "Intuitive design that's easy to use. Quick panel access and streamlined workflow for maximum efficiency.",
      icon: <Monitor className="text-accent-primary" size={32} />
    }
  ];

  return (
    <section id="features" className="py-24 bg-bg-card/30">
      <div className="container mx-auto px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-black mb-4 uppercase tracking-tight">Key Features</h2>
          <p className="text-text-dim">Everything you need for advanced script execution in one powerful package.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 card-sophisticated hover:border-accent-primary/50 transition-all group"
            >
              <div className="w-16 h-16 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-text-dim text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Showcase = () => {
  return (
    <section id="showcase" className="py-24">
      <div className="container mx-auto px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-black mb-4 uppercase tracking-tight">See It In Action</h2>
          <p className="text-text-dim">Watch XENO Executor in action and discover its powerful capabilities.</p>
        </div>
        
        <div className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden border border-border-accent shadow-2xl relative group">
          <iframe 
            src="https://www.youtube.com/embed/rjFwY79yiFw" 
            title="XENO Executor Showcase" 
            className="w-full h-full"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      q: "Is XENO Executor really free?",
      a: "Yes! XENO Executor is completely free with no hidden costs, subscriptions, or key systems. Download and use all features without any limitations."
    },
    {
      q: "Is it safe to use?",
      a: "XENO Executor is built with advanced security features and anti-detection mechanisms. However, always use executors responsibly and at your own risk."
    },
    {
      q: "What operating systems are supported?",
      a: "XENO Executor currently supports Windows 10 and Windows 11 (64-bit). We're working on expanding support to other platforms in the future."
    },
    {
      q: "Do I need a key to use XENO?",
      a: "No! XENO Executor is keyless. Simply download, install, and start using immediately without any key verification process."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-bg-card/30">
      <div className="container mx-auto px-10 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 uppercase tracking-tight">FAQ</h2>
          <p className="text-text-dim">Everything you need to know about XENO Executor.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className="card-sophisticated overflow-hidden"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-lg">{faq.q}</span>
                <ChevronDown className={`text-accent-primary transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-text-dim leading-relaxed border-t border-border-accent">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DownloadModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('xeno');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-deep/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg card-sophisticated rounded-2xl shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-text-dim hover:text-text-main transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="p-10">
              <div className="w-16 h-16 bg-accent-primary/20 rounded-xl flex items-center justify-center mb-8">
                <Download className="text-accent-primary" size={32} />
              </div>
              
              <h2 className="text-3xl font-black mb-2 uppercase tracking-tight">Download XENO</h2>
              <p className="text-text-dim mb-8">Click the button below to download the latest version.</p>
              
              <div className="space-y-6">
                <a 
                  href="/Xeno.zip"
                  download
                  className="w-full p-6 rounded-xl bg-accent-primary/10 border border-accent-primary/30 hover:bg-accent-primary/20 transition-all text-left flex items-center gap-6 group"
                >
                  <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Download className="text-accent-primary" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-xl">Download</div>
                    <div className="text-sm text-text-dim">Version 2.650 — Xeno.zip</div>
                  </div>
                </a>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2 relative overflow-hidden group/pw">
                  <div className="flex items-center justify-between text-xs font-bold text-text-dim uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-accent-secondary" />
                      Archive Password
                    </div>
                    <AnimatePresence mode="wait">
                      {copied && (
                        <motion.span 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="text-accent-primary font-black lowercase tracking-normal"
                        >
                          Copied!
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="flex items-center justify-between text-left hover:bg-white/5 p-2 -m-2 rounded-lg transition-colors group"
                  >
                    <code className="font-mono text-2xl text-accent-secondary tracking-widest font-black">xeno</code>
                    <div className="text-[10px] text-text-dim uppercase font-bold bg-white/5 px-2 py-1 rounded select-none group-hover:bg-accent-secondary/10 group-hover:text-accent-secondary transition-colors">
                      Click to copy
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="mt-8 flex items-center gap-2 text-xs text-text-dim font-bold uppercase tracking-widest">
                <CheckCircle2 size={14} className="text-green-500" />
                Verified & Secure Download
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <CookiePopup />
      <Header onDownload={() => setIsModalOpen(true)} />
      
      <main>
        <Hero onDownload={() => setIsModalOpen(true)} />
        <Features />
        <Showcase />
        <FAQ />
      </main>

      <footer className="py-10 border-t border-border-accent bg-bg-deep text-center">
        <div className="container mx-auto px-10">
          <p className="text-xs text-text-dim uppercase tracking-[1px]">
            &copy; {new Date().getFullYear()} XENO Script Execution. For educational purposes only.
          </p>
        </div>
      </footer>

      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
