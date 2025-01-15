import React, { useEffect } from 'react'
import Base from '../layouts/Base'
import AOS from 'aos';
import 'aos/dist/aos.css';

const BannerAbout = () => {
    return (
        <div className='section mt-5 pi30 banner-aboutus w-100'>
            <div className='d-flex container gap-5 align-items-center w-100 h-100 contain-banner'>
                <div className='title-banner-about'>
                    <h1>Our Offerings <br />& Services</h1>
                </div>
                <div className='text-light'>
                    <span className='text-satoshi'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At, quibusdam.</span>
                </div>
            </div>
        </div>
    )
}

const SectionWelcoming = () => {
    return (
        <section className='w-100 d-flex flex-column align-items-center container section-aboutus'>
            <div className='contain-about-top container justify-content-center fa-centercode align-items-center w-100 my-5 pb-5'>
                <div className="d-flex flex-column text-primary">
                    <h2 className='text-primary' data-aos="fade-down">About Application</h2>
                    <p className="text-font-color" data-aos="fade-right" data-aos-delay="300">
                        Green House offers a seamless experience for buying, selling, and learning about ornamental plants. Here’s what makes us unique:
                    </p>
                    <div className="d-flex gap-3 mt-2">
                        <i
                        className="icon-excess text-primary"
                        style={{fontStyle: "normal"}}
                        data-aos="zoom-in"
                        >
                            1.
                        </i>
                        <div>
                        <h3 data-aos="fade-right" data-aos-delay="400">Effortless Transactions</h3>
                        <p className='text-font-color' data-aos="fade-right">
                            Connecting sellers and buyers with ease to make every transaction smooth and reliable.
                        </p>
                        </div>
                    </div>
                    <div className="d-flex gap-3">
                        <i
                        className="icon-excess text-primary"
                        style={{fontStyle: "normal"}}
                        data-aos="zoom-in"
                        >2.</i>
                        <div>
                        <h3 data-aos="fade-right" data-aos-delay="600">Comprehensive Education</h3>
                        <p className='text-font-color' data-aos="fade-right" data-aos-delay="700">
                            Dive into plant care tips and sustainable gardening practices with our rich educational resources.
                        </p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <i
                        className="icon-excess text-primary"
                        style={{fontStyle: "normal"}}
                        data-aos="zoom-in"
                        >3.</i>
                        <div>
                        <h3 data-aos="fade-right" data-aos-delay="600">AI-Powered Assistance</h3>
                        <p className='text-font-color' data-aos="fade-right">
                            Personalized recommendations and insights, thanks to our Green AI.
                        </p>
                        </div>
                    </div>
                </div>
                <div className='img-about-us'>
                    <img src="/images/plants4-bg.png" data-aos="zoom-in" alt="" />
                </div>
            </div>
        </section>
    )
}


const AboutProfile = () => {
    return (
        <section className='w-100 py-3 container section-about-profile gap-2 align-items-center d-flex'>
            <div className='contain-about-profile d-flex gap-3 flex-wrap'>
                <div className='card-profile' data-aos="zoom-in">
                    <img src="/images/JUSTINE-TEAM.png" className='img-card-profile' alt="" />
                    <div className='position-absolute bottom-0 bg-primary py-3 w-100 text-center text-light'>
                        <h3>Justine</h3>
                        <span className='text-satoshi'>Student In SMKN 4 Bogor</span>
                    </div>
                </div>
                <div className='card-profile' data-aos="zoom-in" data-aos-delay="500">
                    <img src="/images/FARHAN-TEAM.jpg" className='img-card-profile' alt="" />
                    <div className='position-absolute bottom-0 bg-primary py-3 w-100 text-center text-light'>
                        <h3>Farhan</h3>
                        <span className='text-satoshi'>Student In SMKN 4 Bogor</span>
                    </div>
                </div>
            </div>
            <div className='contain-about-text pi30 d-flex flex-column'>
                <h2 className='text-primary' data-aos="fade-left">About Us</h2>
                <p data-aos="fade-left" data-aos-delay="300">Founded with a passion for plants and technology, Green House empowers sellers and plant lovers through innovation.</p>
                <div>
                    <button className='btn bg-primary text-light' data-aos="fade-left" data-aos-delay="500" onClick={() => window.location.href = "/contact-us"}>Go To Contact Us</button>
                </div>
            </div>
        </section>
    )
}

const Faq = () => {
    return (
        <section className='w-100 mt-5 pi30 section-faq d-flex flex-wrap align-items-center container section py-3'>
            <div className='d-flex flex-column justify-content-center'>
                <h2 className='text-primary' data-aos="fade-right">Question & Answers</h2>
                <p data-aos="fade-right" data-aos-delay="300">Your queries about Green House answered in one place for an easy start!</p>
                <div data-aos="fade-right" data-aos-delay="500">
                    <button className='btn bg-primary text-light' onClick={() => window.location.href = '/contact-us'}>Go To Contact Us</button>
                </div>
            </div>
            <div className='contain-accordion-faq' data-aos="fade-left" data-aos-delay="500">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            How can I join as a seller on Green House?
                        </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Simply register and follow the steps to open your shop.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Is there a delivery system in Green House?
                        </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Sellers manage deliveries to ensure quality and freshness.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            What features does the Education section offer?
                        </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Practical tips on plant care, gardening, and Green AI insights.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                            Can buyers from outside Bogor use this platform?
                        </button>
                        </h2>
                        <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Absolutely! We connect plant enthusiasts nationwide.</div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                          Is the application free to use?
                        </button>
                        </h2>
                        <div id="flush-collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">Yes, Green House is completely free for everyone to use.</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const AboutUs = () => {
  useEffect(() => {
      AOS.init({
          duration: 1000,
          once: true,
      })
  }, [])
  return (
    <Base mainContent={<>
        {/* <BannerAbout /> */}
        <SectionWelcoming />
        <AboutProfile />
        <Faq />
    </>} />
  )
}

export default AboutUs