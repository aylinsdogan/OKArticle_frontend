import { FC, memo, useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from "jspdf";

import classes from './Summarize.module.css';
import resets from '../../../_reset.module.css';
import { Header2 } from '../../shared/Header/Header2';
import uploadIcon from '../../../../assets/upload.png';
import deleteIcon from '../../../../assets/remove.png';

interface Props {
    className?: string;
}

const IP = "192.168.242.108:8000" // Will be changed

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
    const [inputKey, setInputKey] = useState(Date.now());

    const [ifCalsim, setIfCalsim] = useState(false);
    const [ifFindContext, setIfFindContext] = useState(false);
    const [ifRecommend, setIfRecommend] = useState(false);

    useEffect(() => {
        let timeout: number;
        if (showErrorPopup) {
          timeout = setTimeout(() => {
            setShowErrorPopup(false);
          }, 3500);
        }
    
        return () => clearTimeout(timeout);
      }, [showErrorPopup]);

    const saveSummaryAsPDF = () => {
        const doc = new jsPDF();
        console.log(summaryOutput)
        doc.setFont('Times', 'normal');
        doc.setFontSize(12);
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 10; 
        const maxLineWidth = pageWidth - (margin * 2);
        const lines = doc.splitTextToSize(summaryOutput, maxLineWidth);
        doc.text(lines, margin, 10);
        doc.save('summary.pdf');
    };

    const updatePdfFiles = (newFiles: File[]) => {
        setIfFilesUploaded(false)
        setsummaryAvail(false)
        setIfCalsim(false)
        setIfFindContext(false)
        setIfRecommend(false)
        const filteredNewFiles = newFiles.filter(newFile => 
            newFile.type === "application/pdf" && 
            !uploadedFiles.some(file => file.name === newFile.name)
        );
        setUploadedFiles(currentFiles => {
            const updatedFiles = [...currentFiles, ...filteredNewFiles];
            if (updatedFiles.length > 1) {
                setSelectedFile(updatedFiles[0]);
            } else {
                setSelectedFile(null);
            }
            return updatedFiles;
        });
    };
    
    const removeFile = (fileName: string) => {
        setUploadedFiles(currentFiles => {
            const updatedFiles = currentFiles.filter(file => file.name !== fileName);
            if (updatedFiles.length > 1) {
                setSelectedFile(updatedFiles[0]);
            } else {
                setSelectedFile(null);
            }
            return updatedFiles;
        });
        setInputKey(Date.now());
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
        setInputKey(Date.now());
    };

    const handleSummarizeClick2 = async() => {
        setLoading(true)
        const formData = new FormData();
        formData.append('ratio', summaryRatio.toString());
        if (selectedFile) {
            const selectedIndex = uploadedFiles.findIndex(file => file === selectedFile);
            formData.append('index', selectedIndex.toString());
        } else {
            formData.append('index', '0');
        }

        uploadedFiles.forEach((file) => {
            formData.append(`files`, file);  
        });
    
        try {
            const response = await axios.post(`http://${IP}/summarize`, formData);
            setShowPopup(false)  
            setLoading(false)
            setsummaryAvail(true) // for summary
            setOptionsAvail(true) // for options
            setIfFilesUploaded(true) // for upload
            setSummaryOutput(response.data)
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
            if (selectedFile) {
                const selectedIndex = uploadedFiles.findIndex(file => file === selectedFile);
                formData.append('index', selectedIndex.toString());
            } else {
                formData.append('index', '0');
            }
            uploadedFiles.forEach((file) => {
                formData.append(`files`, file);  
            });
        
            try {
                const response = await axios.post(`http://${IP}/upload`, formData);
                setShowPopup(false)  
                setLoading2(false)
                setOptionsAvail(true)
                setIfFilesUploaded(true)
                console.log('File upload successful', response.data);

            } catch (error) {
                setShowErrorPopup(true);
                setLoading2(false)
                console.error('Error uploading file', error);
            }
        } else {
            alert('Please upload at least one PDF file to summarize.');
        }
    }

    const [CalculateSimResults, setCalculateSimResults] = useState("");
    const handleCalculateSimilarity = async () => {
        try {
            const response = await axios.get(`http://${IP}/CalSim`)
            setIfCalsim(true)
            setCalculateSimResults(response.data)
            console.log('File upload successful', response.data);
        } 
        catch (error) {
            console.error('Error uploading file', error);
        }
    }
    const [RecommendArticleResults, setRecommendArticleResults] = useState<string[] | null>(null);
    const handleRecommendArticle = async () => {
        try {
            const response = await axios.get(`http://${IP}/RecommendArticle`)
            setIfRecommend(true)
            setRecommendArticleResults(response.data);
            console.log('File upload successful', response.data);
        } 
        catch (error) {
            console.error('Error uploading file', error);
        }
    }

    const [contextSearchTerm, setContextSearchTerm] = useState('');
    const [contextResults, setContextResults] = useState<string[] | null>(null);

    const handleFindContext = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const formData = new FormData();
            formData.append('string', contextSearchTerm.toString());
            const response = await axios.post(`http://${IP}/FindContext`, formData);
            setIfFindContext(true);
            setContextResults(response.data);
            console.log('Context search successful', response.data);
        } 
        catch (error) {
            console.error('Error in context search', error);
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
                                        key={inputKey}
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
                                    <div className={classes.uploaded_files_header}> 
                                        <p> Uploaded Files </p>
                                    </div>
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
                                        <button className={classes.summarize_pdf} onClick={handleSummarizeClick}>Summarize</button>
                                    </div>
                                </div>
                                <div className={classes.summarize_bottom_bar}>
                                    <div className={classes.summary}>
                                    {!summaryAvail ? (
                                        <p className={classes.writings_before}>
                                            Summary will be displayed if you click on "Summarize"
                                        </p>
                                        ):(
                                        <div className={classes.summary_output}>
                                            <p className={classes.writings_after}>
                                                {summaryOutput}
                                                Download the React DevTools for a better development experience
                                            </p>
                                            <div className={classes.save_pdf_container}>
                                                <button onClick={saveSummaryAsPDF} className={classes.save_pdf_button}>
                                                    Save as PDF
                                                </button>
                                            </div>
                                        </div>

                                    )}
                                    </div>
                                    <div className={classes.features}>
                                        {!optionsAvail ? (
                                        <p className={classes.writings_before}>
                                            Options will be displayed after uploading some PDFs
                                        </p> ):(
                                        <div className={classes.features_option}>
                                            {/* calculate sim */}
                                            <button className={classes.features_button} onClick={handleCalculateSimilarity}>Calculate Similarity</button>
                                            {ifCalsim ? (
                                                <div className={classes.calsim}>
                                                    <p className={classes.calsim_header}> Similarity Score </p>
                                                    <div className={classes.calsim_output}> {CalculateSimResults} </div>
                                                </div>
                                                
                                            ):(null)}
                                            {/* Recommend */}
                                            <button className={classes.features_button} onClick={handleRecommendArticle}>Recommend Article</button>
                                            {ifRecommend ? (
                                                <div className={classes.recommend_output}>
                                                    <p className={classes.rec_header}> Recommended Articles</p>
                                                    {RecommendArticleResults?.map((result, index) => (
                                                        <div key={index} className={classes.rec_item}>
                                                            <img src={uploadIcon} alt="Upload icon" className={classes.upload_icon2} />
                                                            <div className={classes.rec_item}>{result}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : null}
                                            {/* find context */}
                                            <button className={classes.features_button} onClick={handleFindContext}>Find Context</button>
                                            <div className={classes.findContext_container}>
                                                <input 
                                                    type="text"
                                                    className={classes.findContext_input}
                                                    value={contextSearchTerm}
                                                    onChange={(e) => setContextSearchTerm(e.target.value)}
                                                />
                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="#007bff" viewBox="0 0 16 16">
                                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM6.5 11A4.5 4.5 0 1 1 11 6.5 4.505 4.505 0 0 1 6.5 11z"/>
                                                </svg>
                                            </div>
                                            {ifFindContext ? (
                                                contextResults && contextResults.length > 0 ? (
                                                    <div className={classes.findContext_output}>
                                                        <p className={classes.findContext_header}> Context </p>
                                                        {contextResults.map((result, index) => (
                                                            <p key={index}>{result}</p>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className={classes.findContext_output2}> Can not found the context!</div>
                                                )
                                            ) : null}
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
