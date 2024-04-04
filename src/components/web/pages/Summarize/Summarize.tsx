import { FC, memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [summaryRatio, setSummaryRatio] = useState(0.2);
    const [summaryAvail, setsummaryAvail] = useState(false);
    const [optionsAvail, setOptionsAvail] = useState(false);
    const [summaryOutput, setSummaryOutput] = useState("");

    const [showErrorPopup, setShowErrorPopup] = useState(false);

    useEffect(() => {
        let timeout: number;
        if (showErrorPopup) {
          timeout = setTimeout(() => {
            setShowErrorPopup(false);
          }, 3500);
        }
    
        return () => clearTimeout(timeout);
      }, [showErrorPopup]);

    const updatePdfFiles = (newFiles: File[]) => {
        setIfFilesUploaded(false)
        setsummaryAvail(false) 
        setOptionsAvail(false) 
        const filteredNewFiles = newFiles.filter(newFile => 
            newFile.type === "application/pdf" && 
            !uploadedFiles.some(file => file.name === newFile.name)
        );
        setUploadedFiles(currentFiles => {
            const updatedFiles = [...currentFiles, ...filteredNewFiles];
            if (!selectedFile || !selectedFile.name || filteredNewFiles.length > 0) {
                setSelectedFile(updatedFiles[0]);
            }
            console.log(updatedFiles)
            return updatedFiles;
        });
    };

    const removeFile = (fileName: string) => {
        setUploadedFiles(currentFiles => {
            const filteredFiles = currentFiles.filter(file => file.name !== fileName);

            if (selectedFile && selectedFile.name === fileName) {
                setSelectedFile(filteredFiles[0] || null);
            }
            console.log(filteredFiles)
            return filteredFiles;
        });
    };

    const selectFile = (fileName: string) => {
        const file = uploadedFiles.find(file => file.name === fileName);
        if (file) {
            setSelectedFile(file);
        }
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

    
    const handleSummarizeClick2 = async() => {
        setLoading(true)
        const formData = new FormData();
        formData.append('ratio', summaryRatio.toString());
        uploadedFiles.forEach((file) => {
            formData.append(`files`, file);  
        });
    
        try {
            const response = await axios.post('http://10.5.66.205:8000/summarize', formData);     
            setShowPopup(false)  
            setLoading(false)
            setsummaryAvail(true) // for summary
            setOptionsAvail(true) // for options
            setIfFilesUploaded(true) // for upload
            setSummaryOutput(response.data)
            // empty files
            console.log('File upload successful', response.data);

        } catch (error) {
            console.error('Error uploading file', error);
            setShowErrorPopup(true)
            setLoading(false)
        }
    }
    const [ifFilesUploaded, setIfFilesUploaded] = useState(false);
    const handleSummarizeClick = async () => {
        if (uploadedFiles.length > 0 || ifFilesUploaded) {
            setShowPopup(true);
    
        } else {
            alert('Please upload at least one PDF file to summarize.');
        }
    };
    const handleUploadClick = async () => {
        if (uploadedFiles.length > 0) {
            setLoading2(true)
            const formData = new FormData();
            uploadedFiles.forEach((file) => {
                formData.append(`files`, file);  
            });
        
            try {
                //const response = await axios.post('http://10.5.66.205:8000/summarize', formData);     
                setShowPopup(false)  
                setLoading2(false)
                setOptionsAvail(true)
                setIfFilesUploaded(true)
                
                //console.log('File upload successful', response.data);

            } catch (error) {
                setShowErrorPopup(true);
                setLoading2(false)
                console.error('Error uploading file', error);
            }
        } else {
            alert('Please upload at least one PDF file to summarize.');
        }
    }
    const handleCalculateSimilarity = async () => {
        try {
            let data = {calSim: 'calculateSimilarity'};  // the key 'user' matches your FastAPI model
            const response = await axios.get('http://10.3.134.104:8000/CalSim')
            console.log('File upload successful', response.data);
        } catch (error) {
            console.error('Error uploading file', error);
        }
    }
    const handleRecommendArticle = async () => {
        try {
            let data = {operation: 'recommendArticle'};  // the key 'user' matches your FastAPI model
            const response = await axios.post('http://10.3.134.104:8000/deneme2', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('File upload successful', response.data);
        } catch (error) {
            console.error('Error uploading file', error);
        }
    }
    const handleFindContext = async () => {
        try {
            let data = {user: 'a'};  // the key 'user' matches your FastAPI model
            const response = await axios.post('http://10.3.134.104:8000/deneme2', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('File upload successful', response.data);
        } catch (error) {
            console.error('Error uploading file', error);
        }
    };
    return (
        <div className={`${resets.projectResets} ${classes.summarize_page}`}>
            <Header2 />
            {showErrorPopup && (
            <div className={`${classes.error_message} ${classes.error_pop_up}`}>
                <p>Could not upload the files! Please try again.</p>
            </div>
            )}
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
                                {ifFilesUploaded ? (
                                    <div className={classes.uploaded_files_header}> Uploaded Files </div>
                                ):(null)}
                                    {uploadedFiles.map(file => (
                                        <div 
                                            className={`${classes.uploaded_file} ${selectedFile && selectedFile.name === file.name && !ifFilesUploaded ? classes.selected_file : classes.unselected_files}`} 
                                            key={file.name}
                                            onClick={() => !ifFilesUploaded ? selectFile(file.name) : null}
                                        >
                                            <img src={uploadIcon} alt="Upload icon" className={classes.upload_icon} />
                                            <span className={classes.file_name}>{file.name}</span>
                                            {!ifFilesUploaded ? (
                                            <button className={classes.delete_button} onClick={() => removeFile(file.name)}>
                                                <img src={deleteIcon} alt="Delete" className={classes.delete_icon} />
                                            </button> ):(null)}
                                        </div>
                                    ))}
                                    <div className={classes.upload_button}>
                                        <button className={classes.upload_pdf} onClick={handleUploadClick}>
                                        {loading2 ? (
                                            <div className={classes.loadingIcon}></div>
                                        ) : (
                                            "Upload"
                                        )}         
                                        </button>
                                        <button className={classes.upload_pdf} onClick={handleSummarizeClick}>Summarize</button>
                                    </div>
                                </div>
                                <div className={classes.summarize_bottom_bar}>
                                    <div className={classes.summary}>
                                    {!summaryAvail ? (
                                        <p className={classes.writings_before}>
                                            Summary will be displayed if you click on "Summarize"
                                        </p>
                                        ):(
                                        <p className={classes.writings_after}>
                                            {summaryOutput}
                                        </p>

                                    )}
                                    </div>
                                    <div className={classes.features}>
                                        {!optionsAvail ? (
                                        <p className={classes.writings_before}>
                                            Options will be displayed after uploading some PDFs
                                        </p> ):(
                                        <div className={classes.features_option}>
                                            <button className={classes.features_button} onClick={handleCalculateSimilarity}>Calculate Similarity</button>
                                            <button className={classes.features_button} onClick={handleRecommendArticle}>Recommend Article</button>
                                            <button className={classes.features_button} onClick={handleFindContext}>Find Context</button>
                                            <input type="text" 
                                                className={classes.findContext_input}
                                            />
                                        </div>
                                        )}
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
                            min="0.2"
                            max="0.8"
                            step="0.2"
                            value={summaryRatio}
                            onChange={e => setSummaryRatio(parseFloat(e.target.value))}
                        />
                        <p> Summary Ratio: {summaryRatio.toFixed(1)}</p>
                        <button className={classes.popupButton} onClick={handleSummarizeClick2}>
                        {loading ? (
                            <div className={classes.loadingIcon}></div>
                        ) : (
                            "Summarize"
                        )}
                        
                        </button> 
                      
                    </div>
                </div>
            )}
        </div>
    );
});
