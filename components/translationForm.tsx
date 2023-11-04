"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useContext, useState } from "react"
import { FileContext, FileData } from "@/lib/context"


export default function TranslationForm() {

  const [fileData, setFileData] = useContext(FileContext);

  function saveTranslation(i: number, value: string) {
    if (fileData.parsed === null) return;

    // Update translation for the specific index
    const updatedFileData = {
      ...fileData,
      parsed: fileData.parsed.map((obj, index) =>
        index === i ? { ...obj, translation: value } : obj
      )
    };
    setFileData(updatedFileData);
    localStorage.setItem("chopper_current_file", JSON.stringify(updatedFileData));
  }

  function handleCopy(i: number, origin: string) {
    // Copy the original text to the corresponding translation textarea
    saveTranslation(i, origin);
  }

  function downloadTextAsFile(filename: string, text: string) {
    // Create a blob with the text content
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });

    // Create a link element
    const link = document.createElement('a');

    // Set link's href to point to the Blob
    link.href = window.URL.createObjectURL(blob);

    // Configure the link to automatically download the blob when clicked
    link.download = filename;

    // Append link to the body (required for Firefox)
    document.body.appendChild(link);

    // Simulate a click on the link to trigger the download
    link.click();

    // Clean up by removing the link
    setTimeout(() => {
      window.URL.revokeObjectURL(link.href);
      link.parentNode?.removeChild(link);
    }, 0);
  }

  function checkLocal() {
    const storedJSON: string = localStorage.getItem("chopper_current_file");
    const parsedJson = JSON.parse(storedJSON);
    console.log(parsedJson)
  }

  function combineTranslations() {
    if (fileData.parsed) {
      // Combine all translations into one string, separated by a space or other delimiter
      return fileData.parsed.map(sentence => sentence.translation).join(' ');
    }
    return '';
  }

  function handleDownload() {
    console.log()
    const combinedText = combineTranslations();
    if (combinedText) {
      // Call the download function
      downloadTextAsFile(fileData.name, combinedText);
    }
  }
  // 
  return (
    <>
      <Button onClick={handleDownload}>Download</Button>
      {
        fileData.parsed.map((obj, i) => {
          return (
            <div className={`w-1/2 p-2 my-16 content-between`} key={i}>
              <p className="mb-3">{obj.original}</p>
              <Textarea
                placeholder="Enter your translation here"
                onChange={e => saveTranslation(i, e.target.value)}
                value={obj.translation || ''}
              />
              <Button className="mt-3" variant="outline" onClick={() => handleCopy(i, obj.original)}>Copy Source</Button>
            </div>
          )
        })}
    </>
  )
}
