import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { useState, useContext, ChangeEvent } from 'react';
import { FileContext } from "@/lib/context";
import detectSentences from "@/lib/sbd";

export default function DirectInput() {
    const [inputToggle, setInputToggle] = useState<Boolean>(false);
    const [text, setText] = useState<string | null>(null);
    const [fileData, setFileData] = useContext(FileContext);

    const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
        console.log(text)
    }

    // Save content of the file to localStorage
    const handleSubmit = () => {
        let fileToSaveLocal = { name: "typed_text", text: text };
        if (text) {
            let parsed = detectSentences(text);
            localStorage.setItem("chopper_current_file", JSON.stringify(fileToSaveLocal));
            setFileData({ name: "typed_text", text: text, parsed: parsed });
        }
    };

    // Toggle to open up textarea on click
    const toggleTextarea = () => setInputToggle(!inputToggle!);

    return (
        <>
            <div className={`${inputToggle ? 'hidden' : 'block'
                } overflow-hidden`}>
                <Button variant="outline" onClick={toggleTextarea}>Type</Button>
            </div>
            <div
                className={`w-1/2 p-2 mb-5 transition-opacity duration-700 ease-in content-between ${inputToggle ? 'visible opacity-100' : 'invisible opacity-0'
                    } overflow-hidden`}
            >
                <Textarea
                    onChange={handleTextarea}
                    placeholder="Type your text here..."
                />
                <div className="flex flex-row-reverse mt-3">
                    <Button className='ml-3' variant="outline" onClick={toggleTextarea}>Close</Button>
                    <Button onClick={handleSubmit} type="submit">Submit</Button>
                </div>
            </div>
        </>
    )
}