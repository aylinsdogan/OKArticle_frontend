import { FC, memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './Summarize.module.css';
import resets from '../../../_reset.module.css';
import { Header2 } from '../../shared/Header/Header2';
import uploadIcon from '../../../../assets/upload.png'; // Replace with the actual path to your upload icon
import deleteIcon from '../../../../assets/remove.png';

interface Props {
    className?: string;
}


interface Props {
    className?: string;
}

export const Summarize: FC<Props> = memo(function Summarize(props) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // New state for storing the PDF blob URL
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // State to store uploaded files
  const [isDragOver, setIsDragOver] = useState(false);     
  const updatePdfFile = (file: File | null) => {
      setPdfFile(file);
      setPdfUrl(file ? URL.createObjectURL(file) : null);
      if (file) setUploadedFiles([...uploadedFiles, file]);
  };   
  const removeFile = (fileName: string) => {
      setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName));
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragOver) setIsDragOver(true); 
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file && file.type === "application/pdf") {
        updatePdfFile(file);
      } else {
        alert("Please upload a supported file type.");
        updatePdfFile(null);
      }
    }
  };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file && file.type === "application/pdf") {
            updatePdfFile(file);
        } else {
            alert("Please upload a PDF file.");
            updatePdfFile(null);
        }
    };

    return (
        <div className={`${resets.projectResets} ${classes.summarize_page}`}>
            <Header2 />
            <div className={classes.summarize_container}>
                <div className={classes.summarize_bar_container}>
                    <div className={classes.summarize_upper_bar}>
                        <div className={classes.summarize_upper_bar_container}>
                            <div className={classes.pdf_uploader_container}>
                                <div
                                    className={`
                                        ${classes.pdf_uploader} 
                                        ${isDragOver ? classes.pdf_uploader_dragover : ''}
                                    `}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragEnter={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                >
                                    <input
                                        id="file-upload"
                                        className={classes.file_input}
                                        type="file"
                                        accept="application/pdf,.txt,.doc,.docx"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="file-upload" className={classes.file_input_label}>
                                        Select File
                                    </label>
                                    <div className={classes.file_input_text}>
                                        Select or Drag File here<br />
                                        Files Supported: PDF
                                    </div>
                                </div>
                                <div className={classes.uploaded_files_container}>
                                    {uploadedFiles.map(file => (
                                        <div className={classes.uploaded_file} key={file.name}>
                                            <img src={uploadIcon} alt="Upload icon" className={classes.upload_icon} />
                                            <span className={classes.file_name}>{file.name}</span>
                                            <button className={classes.delete_button} onClick={() => removeFile(file.name)}>
                                                <img className={classes.delete_icon} src={deleteIcon} alt="Delete" />
                                            </button>
                                        </div>
                                    ))} 
                                    <div className={classes.upload_button}>
                                        <button className={classes.upload_pdf}>Upload</button>
                                    </div>
                                </div>
                                
                                <div className={classes.summarize_bottom_bar}>
                                    <div className={classes.summary}>
                                        <h1 className={classes.header}>Summary:</h1>
                                        <p className={classes.writings}> 
                                            klsdjfdslkfjsdflksfjksdl
                                        askfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşs
                                        askfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşs
                                        askfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşslşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşs arar</p>
                                    </div>
                                    <div className={classes.features}>
                                        <h1 className={classes.header}>Features:</h1>
                                        <p className={classes.writings}>
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşs
                                        askfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşsaskfjdlkfdsjflksdjfsdlkfjsflksdfjs
                                        sdşlfksdlşfsdkfşlsdkfsdlşfksdşlfsdkfşls
                                        lfşdskfsdlşfksdflşdskfdlşs
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});