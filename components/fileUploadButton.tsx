import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useState, ChangeEvent, useContext, useEffect } from 'react';
import { FileContextType, FileContext, FileData } from "@/lib/context";
import detectSentences from "@/lib/sbd";


export default function FileUploadButton() {

  const [tempFile, setTempFile] = useState<FileData>({ name: null, text: null, parsed: [] });
  const [fileData, setFileData] = useContext<FileContextType>(FileContext);

  // Extract content of the file and save it to text state
  const handleFileChange = (e: ChangeEvent<HTMLInputElement> | null) => {
    if (e === null) return;
    const files = e.target.files;
    if (files) {

      // Create a new FileReader object
      const selectedFile = files[0];

      const reader = new FileReader();
      // Event listener for FileReader, triggers when the file read is complete
      reader.onload = (event) => {
        let text = event.target?.result as string
        let parsed = detectSentences(text)
        // Save file content to state
        setTempFile({ name: selectedFile.name, text: text, parsed: parsed });
        console.log("File completely read");
      };
      // Read the content of the file as text. This triggers reader.onload upon complete.
      reader.readAsText(selectedFile);
    }
  };

  useEffect(() => {
    if (tempFile.parsed && tempFile.parsed.length > 0) {
      console.log("fileData has been updated");
      console.log(tempFile.parsed);
    }
  }, [tempFile]);

  // Save content of the file to localStorage
  const handleSubmit = () => {
    setFileData(tempFile);
    let fileToSaveLocal: FileData = { name: tempFile.name, text: tempFile.text, parsed: tempFile.parsed };
    if (tempFile.text) {
      localStorage.setItem("chopper_current_file", JSON.stringify(fileToSaveLocal));
    }
  };

  const handleCheck = () => console.log(fileData);


  return (

    <>
      {/* bottun for uploading file*/}
      <p>.txt</p>
      <div className="flex w-full max-w-sm items-center space-x-2 p-5">
        <Input type="file" accept='.txt' placeholder="Up to 5MB" onChange={handleFileChange} />

        {tempFile.name === null ?
          <Button disabled>Submit</Button> :
          <Button onClick={handleSubmit}>Submit</Button>
        }
      </div>
    </>

  )

}