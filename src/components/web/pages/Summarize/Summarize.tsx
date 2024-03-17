import { FC, memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './Summarize.module.css';
import resets from '../../../_reset.module.css';
import { Header2 } from '../../shared/Header/Header2';
import uploadIcon from '../../../../assets/upload.png';
import deleteIcon from '../../../../assets/remove.png';

interface Props {
    className?: string;
}

export const Summarize: FC<Props> = memo(function Summarize(props) {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [summaryRatio, setSummaryRatio] = useState(0.1);
    const rangeValues = Array.from({ length: 8 }, (_, i) => (i + 1) / 10);

    const updatePdfFiles = (newFiles: File[]) => {
        setUploadedFiles(currentFiles => {
            // Filter out non-PDF files and duplicates
            const filteredNewFiles = newFiles.filter(newFile => 
                newFile.type === "application/pdf" && 
                !currentFiles.some(file => file.name === newFile.name)
            );
            return [...currentFiles, ...filteredNewFiles];
        });
    };

    const removeFile = (fileName: string) => {
        setUploadedFiles(currentFiles => 
            currentFiles.filter(file => file.name !== fileName)
        );
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
        const files = Array.from(e.dataTransfer.files);
        updatePdfFiles(files);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        updatePdfFiles(files);
    };

    const handleSummarizeClick = () => {
        if (uploadedFiles.length > 0) {
            setShowPopup(true);
        } else {
            alert('Please upload at least one PDF file to summarize.');
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
                                    className={`${classes.pdf_uploader} ${isDragOver ? classes.pdf_uploader_dragover : ''}`}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragEnter={handleDragEnter}
                                    onDragLeave={handleDragLeave}
                                >
                                    <input
                                        id="file-upload"
                                        className={classes.file_input}
                                        type="file"
                                        multiple
                                        accept="application/pdf"
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
                                        <button className={classes.upload_pdf} onClick={handleSummarizeClick}>Summarize</button>
                                    </div>
                                </div>
                                <div className={classes.summarize_bottom_bar}>
                                    <div className={classes.summary}>
                                        <p className={classes.writings_before}>
                                            Summary will be displayed if you click on "Summarize"
                                        </p>
                                    </div>
                                    <div className={classes.features}>
                                        <p className={classes.writings_before}>
                                            Options will be displayed after uploading some PDFs
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className={classes.popup_container} onClick={() => setShowPopup(false)}>
                    <div className={classes.popup} onClick={(e) => e.stopPropagation()}>
                        <h2>Select Summary Ratio</h2>
                        <p> How long would you like your summary to be? </p>
                        <input
                            type="range"
                            min="0.1"
                            max="0.8"
                            step="0.1"
                            value={summaryRatio}
                            onChange={e => setSummaryRatio(parseFloat(e.target.value))}
                        />
                        <p> Summary Ratio: {summaryRatio.toFixed(1)}</p>
                        <button onClick={() => setShowPopup(false)}>Summarize</button>
                    </div>
                </div>
            )}
        </div>
    );
});
