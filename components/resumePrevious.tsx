import { useState, useContext, useEffect } from 'react';
import { FileContext, FileContextType } from "@/lib/context"
import { Button } from '@/components/ui/button'
import detectSentences from '@/lib/sbd';
import NewFile from './newFile';


export default function ResumePrevious() {
    const [previousFile, setPreviousFile] = useState(null);
    const [fileData, setFileData] = useContext<FileContextType>(FileContext);

    useEffect(() => {
        if (localStorage.getItem("chopper_current_file")) {
            const storedJSON = localStorage.getItem("chopper_current_file");
            if (storedJSON) { // Check if storedJSON is not null
                const parsedJson = JSON.parse(storedJSON);
                setPreviousFile(parsedJson);
                console.log("Previous file detected");
                console.log(parsedJson);
            }
        }
    }, [])

    function handleResume() {
        if (!previousFile) { alert("Previous file does not have any content."); setPreviousFile(null); return };
        setFileData(previousFile);
        setPreviousFile(null);
    }

    function handleRemove() {
        if (!previousFile) return;
        setPreviousFile(null)
        localStorage.removeItem("chopper_current_file");
    }


    return (
        <FileContext.Provider value={[fileData, setFileData]}>
            {previousFile ?
                <>
                    <h1 className='p-10 mb-10 text-center'>
                        Previous file detected!<br />
                        Would you like to resume where you left off?
                    </h1>
                    <div><Button className='mr-5' onClick={handleResume}>Yes</Button><Button onClick={handleRemove}>No</Button></div>                </>
                :
                <>
                    <NewFile />
                </>
            }

        </FileContext.Provider>
    )
};