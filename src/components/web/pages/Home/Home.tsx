import { FC, memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import classes from './Home.module.css';
import resets from '../../../_reset.module.css';
import { Header } from '../../shared/Header/Header';
import Image1 from '../../../../assets/1.jpg';
import Image2 from '../../../../assets/2.jpg';
import Image3 from '../../../../assets/3.jpg';

interface Props {
    className?: string;
}

export const Home: FC<Props> = memo(function Home(props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const images = [Image1, Image2, Image3];
    const captions = [
        "Welcome to OKArticle", 
        "What are we doing?", 
        "Click the \"Try It Now\" button"
    ];
    const explanation = [
        "Embark on a journey of effortless knowledge acquisition with our cutting-edge NLP technology. Our platform is designed to streamline your reading experience, offering swift article summarizations, insightful recommendations, and comprehensive overviews of multiple texts. Whether you're a researcher, student, or just a curious mind, our tools are crafted to enhance your understanding and save valuable time.", 
        "At the core of our mission, we harness the power of Natural Language Processing (NLP) to revolutionize how you interact with written content. Our services include creating succinct summaries of lengthy articles, suggesting similar reads for continuous learning, and providing aggregate summaries from multiple sources. We are dedicated to making information consumption more efficient, accessible, and engaging for everyone.", 
        "Dive into a seamless experience by clicking the 'Try It Now' button below. Embark on your journey to knowledge with ease and efficiency. Our platform is tailored to enhance your understanding and accelerate your learning. For a superior experience and immediate access to our intelligent features, take the next step and explore the possibilities."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % images.length);
        }, 20000); 

        return () => clearInterval(interval);
    }, []);

    const handleTryItClicked = () => {
        navigate('/Summarize');
    }
    const handleNext = () => {
        setActiveIndex((current) => (current + 1) % images.length);
    };

    const handlePrev = () => {
        setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
    };
    const BackIconSVG = () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 16 8 12 12 8" />
          <line x1="16" y1="12" x2="8" y2="12" />
        </svg>
      );
    const NextIconSVG = () => (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="35" 
          height="35" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 8 16 12 12 16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
    );

    return (
        <div className={`${resets.projectResets} ${classes.home_page}`}>
            <Header />
            <div className={classes.home_container}>
                <div className={classes.upper_container}>
                    <div className={classes.image_slider}>
                        
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Slide ${index + 1}`}
                                className={activeIndex === index ? classes.active : classes.image}
                            />
                        ))}
                        <div className={classes.image_slider_caption}>
                            {captions.map((caption, index) => (
                                <div 
                                    key={index}
                                    className={`${classes.caption_container} ${activeIndex === index ? classes.caption_active : ''}`}
                                >
                                    <div className={classes.caption_header}>
                                        {caption}
                                        
                                    </div>
                                    <div className={classes.caption_explanation}>
                                        {explanation[index]}
                                    </div>
                                    
                                </div>
                            ))}
                            <div className={classes.try_button_container} onClick={handleTryItClicked}>
                                <button className={classes.try_button}>Try It Now</button>
                            </div>
                            <div className={classes.forward_button_container} onClick={handlePrev}>
                                <button className={classes.forward_button}><BackIconSVG /></button>
                            </div>
                            <div className={classes.back_button_container} onClick={handleNext}>
                                <button className={classes.back_button}><NextIconSVG /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

/* 1. Single Article Summarization
Caption: "Simplify Your Reading with AI-Powered Summaries"
Explanation: "Our advanced NLP technology condenses lengthy
 articles into concise summaries, saving you time and 
 providing quick insights. Simply upload your article 
 and let our AI extract the key points in an instant."
2. Similar Article Recommendations
Caption: "Discover More with Smart Recommendations"
Explanation: "Explore a world of knowledge! Our 
system analyzes your article's content and 
recommends similar articles, offering you a 
broader perspective and deeper understanding of 
the topic. Dive into related readings with just a click."
3. Multi-Article Summaries
Caption: "Get the Big Picture with Multi-Article Summaries"
Explanation: "Combine insights from multiple sources!
 Our platform can merge information from various
  articles on the same topic, providing a 
  comprehensive summary that captures diverse
   viewpoints and key information. Perfect for 
   research and comprehensive understanding." */