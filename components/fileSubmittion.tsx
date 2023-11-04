import DirectInput from "@/components/directInput"
import FileUploadButton from "@/components/fileUploadButton"


export default function FileSubmission() {
  return (
    <>
      {/* bottun for uploading file*/}
      <FileUploadButton />

      <p className="p-5 mb-5">Or...</p>

      {/* Textarea to type in text directly*/}
      <DirectInput />
    </>
  )
}