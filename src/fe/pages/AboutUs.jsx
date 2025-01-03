import React from 'react'
import Base from '../layouts/Base'

const SectionWelcoming = () => {
    return (
        <section className='w-100 d-flex flex-column align-content-center container-main section-aboutus'>
            <div className='d-flex flex-column align-items-center'>
                <h2 className='text-font-color'>About Us</h2>
            </div>
            <div className='contain-about-top my-5 pb-5'>
                <div className='d-flex flex-column'>
                    <div className="d-flex flex-column text-primary">
                    <h2 className="text-font-color">Handpicked Aesthetic Plants</h2>
                    <p className="text-font-color">
                        Carefully selected indoor plants to add elegance and freshness to
                        your living space.
                    </p>
                    <div className="d-flex gap-3">
                        <i
                        className="iconify icon-excess"
                        data-icon="game-icons:tree-branch"
                        ></i>
                        <div>
                        <h3>Discover our curated</h3>
                        <p>
                            Discover our curated selection of aesthetic houseplants to
                            transform your home int
                        </p>
                        </div>
                    </div>
                    <div className="d-flex gap-3">
                        <i
                        className="iconify icon-excess"
                        data-icon="emojione-monotone:deciduous-tree"
                        ></i>
                        <div>
                        <h3>Eco-Friendly Solutions</h3>
                        <p>
                            Our plants and pots are sourced with sustainability in mind, for
                            a greener future.
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className='img-about-us'>
                    <img src="/images/logo-navbar.png" alt="" />
                </div>
                <div>
                    <img src="" alt="" />
                </div>
            </div>
        </section>
    )
}


const AboutUs = () => {
  return (
    <Base mainContent={<>
    <SectionWelcoming />
    </>} />
  )
}

export default AboutUs