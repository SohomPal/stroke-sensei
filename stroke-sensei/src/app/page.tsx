// filepath: c:\Code\Web Apps\stroke-sensei\src\app\page.tsx
import KanjiCanvas from "@/components/kanji-canvas"
import { Button } from "@/components/ui/button"
import { ChevronRight, Download, Pen, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pen className="h-6 w-6 text-red-600" />
          <span className="text-xl font-semibold">Kanji Master</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium hover:text-red-600 transition-colors">
            Home
          </a>
          <a href="#" className="text-sm font-medium hover:text-red-600 transition-colors">
            Dictionary
          </a>
          <a href="#" className="text-sm font-medium hover:text-red-600 transition-colors">
            Practice
          </a>
          <a href="#" className="text-sm font-medium hover:text-red-600 transition-colors">
            About
          </a>
        </nav>
        <Button variant="outline" className="hidden md:flex">
          Sign In
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </header>

      <main>
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Master Japanese Kanji with Intuitive Drawing
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                Practice writing kanji characters and get instant feedback. Our advanced recognition system helps you
                learn faster and more effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Start Drawing <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-xl shadow-sm">
              <KanjiCanvas />
            </div>
          </div>
        </section>

        <section className="bg-zinc-50 dark:bg-zinc-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
                <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-fit mb-4">
                  <Pen className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Intuitive Drawing</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Practice writing kanji with our smooth, responsive canvas that feels like writing on paper.
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
                <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-fit mb-4">
                  <Sparkles className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Recognition</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Our advanced AI instantly recognizes your kanji and provides helpful feedback to improve your writing.
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm">
                <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-fit mb-4">
                  <Download className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Export as PNG</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Save your kanji practice as PNG images to track your progress or share with friends and teachers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Pen className="h-5 w-5 text-red-600" />
              <span className="text-lg font-semibold">Kanji Master</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-red-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-red-600 transition-colors">
                Terms
              </a>
              <a href="#" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-red-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-500">
            © {new Date().getFullYear()} Kanji Master. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}