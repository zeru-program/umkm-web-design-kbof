import React, { useEffect, useState } from 'react'

const BtnToTop = () => {
    const [classTop, setClassTop] = useState(false)
    const handleToTop = () => {
        window.scrollTo(0, 0)
    }
     useEffect(() => {
        const handleScroll = () => {
          const heroSection = document.querySelector(".hero");
          const heroHeight = heroSection?.offsetHeight || 0;
          
          if (window.scrollY > heroHeight) {
            setClassTop(true);
          } else {
            setClassTop(false);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [])
  return (
    <div onClick={() => handleToTop()} className='position-fixed btn shadow-sm bg-primary text-light btn-top d-flex justify-content-center align-items-center' style={{opacity: classTop ? "1" : "0", transition: "all .6s ease"}}>
        <i className='bi bi-arrow-up'></i>
    </div>
  )
}

export default BtnToTop