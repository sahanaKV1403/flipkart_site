import React, { useState, useEffect } from 'react';
import carousel1 from '../../assets/carousel1.png'
import carousel2 from '../../assets/carousel2.png'
import carousel3 from '../../assets/carousel3.png'
import carousel4 from '../../assets/carousel4.png'
import carousel5 from '../../assets/carousel5.png'
import './Carousel.css'
const Carousel = () => {
    const arr = [carousel1,carousel2,carousel3,carousel4,carousel5];
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const carousal = setInterval(() => {
             setIdx(prevIdx => prevIdx==(arr.length-1)?0:(prevIdx+1))
         }, 2500);
        return () => clearInterval(carousal);
    }, []);

    return (
        <div className='carousel'>
            <div>
            <img src={arr[idx]} width="97%" height="200px" />
            </div>          
        </div>
    );
}

export default Carousel;