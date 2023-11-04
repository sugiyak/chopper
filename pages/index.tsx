import { useState } from 'react';
import { FileContext, FileData } from "@/lib/context"
import ResumePrevious from '@/components/resumePrevious';


export default function Home() {
  const [fileData, setFileData] = useState<FileData>({ name: null, text: null, parsed: [] }); // State to hold the file name

  return (
    <main
      className={`container flex min-h-screen flex-col items-center`}
    >
      <header className="p-10 m-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Chopper</header>

      <FileContext.Provider value={[fileData, setFileData]}>
        <ResumePrevious />
      </FileContext.Provider>

    </main>
  )
};