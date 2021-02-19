import React, { useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import SignaturePad from "react-signature-pad"
import styles from "./signdocument.module.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const SignDocument: React.FC<{
  file: Uint8Array
  onEditRequested: () => void
  onSign: (signature: string) => void
}> = ({ file, onEditRequested, onSign }) => {
  const signaturePad = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <div className={styles.container}>
      <p>
        På basen av information du angav i det föregående steget har vi skapat
        ett gåvobrev. Var vänlig och säkerställ att informationen är korrekt
        ifylld och underteckna gåvobrevet nedan. Det undertecknade gåvobrevet
        kommer att skickas till den e-postadress som du har angivit.
      </p>
      <Document file={file.buffer}>
        <Page pageNumber={1} width={624} />
      </Document>
      <div className={styles.signatureHeader}>
        <span>Namnteckning</span>
        <button onClick={() => signaturePad.current?.clear()}>Återställ</button>
      </div>
      <SignaturePad ref={signaturePad} />
      <div className={styles.actions}>
        <button className={styles.edit} onClick={onEditRequested}>
          Ändra
        </button>
        <button
          className={styles.donate}
          onClick={() => {
            setIsSubmitting(true)
            onSign(signaturePad.current?.toDataURL("image/svg+xml"))
          }}
        >
          {isSubmitting ? "Skickar email" : "Donera"}
        </button>
      </div>
      <p>
        Det undertecknade gåvobrevet skickas till den angivna e-postadressen och
        en kopia skickas till Teknologföreningen.
      </p>
    </div>
  )
}

export default SignDocument
