import { useContext } from 'react';
import FileSubmission from "@/components/fileSubmittion"
import TranslationForm from "@/components/translationForm";
import { FileContext, FileContextType } from "@/lib/context"


export default function NewFile() {
    const [fileData, setFileData] = useContext<FileContextType>(FileContext);

    return (
        <>
            {fileData.parsed && fileData.parsed.length > 0 ?
                <>
                    <p className='p-10 mb-10 text-center'>
                        Time to edit your translation<br />
                        You translation will be saved in your browser local storage. You can also download them.
                    </p>
                    <TranslationForm />
                </>
                :
                <>
                    <p className='p-10 mb-10 text-center'>
                        Upload a text file or type in to start localizatoin.<br />
                        Chopper will parse your text using SBD(Sentence Boundary Detection).
                    </p>
                    <FileSubmission />
                </>
            }
        </>
    )
};