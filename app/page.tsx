import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <header className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl font-bold text-gc-blue">myGC assistant</h1>
      </header>
      
      <main className="w-full max-w-4xl space-y-6">
        <p className="text-lg">
          This project demonstrates different ways to implement AI chat interfaces that conform to Canada.ca design standards.
        </p>
        
        <div className="bg-gc-gray p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gc-blue">Available Implementations</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/chat-demo" 
                className="text-gc-link hover:underline font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Chat Interface Demo Page
              </Link>
              <p className="mt-1 ml-7 text-gc-nav">View three different chat interface implementations: side panel, inline, and lightbox.</p>
            </li>
          </ul>
        </div>
        
        <div className="bg-[#F5F8FA] border-l-4 border-gc-blue p-4 mt-6">
          <h3 className="font-semibold text-gc-blue">About this project</h3>
          <p className="mt-2">
            This project implements AI chat interfaces following Canada.ca design standards, with accessibility and bilingual support in mind.
          </p>
        </div>
      </main>
      
      <footer className="w-full max-w-4xl mt-12 pt-4 border-t border-gc-gray text-center text-sm text-gc-nav">
        <p>Developed as a demonstration of Canada.ca compliant AI chat interfaces.</p>
      </footer>
    </div>
  );
}
