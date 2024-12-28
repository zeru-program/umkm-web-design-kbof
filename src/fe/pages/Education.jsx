import React from 'react'
import Base from '../layouts/Base'

const SectionWelcoming = () => {
    return (
        <section className='w-100 d-flex flex-column align-content-center container-main section-education'>
            <div className='d-flex flex-column align-items-center'>
                <h2 className='text-font-color'>Education</h2>
                <p className='text-satoshi'>Discover our curated selection of aesthetic houseplants to transform your home into a vibrant.</p>
                <div className='w-100 position-relative'>
                    <input type="text" placeholder='Cari artikel yang di inginkan' className='text-satoshi form-control py-2 input-search-product ' />
                    <div className='bg-primary text-light d-flex justify-content-center align-items-center icon-search-product'>
                        <i className='bi-search'></i>
                    </div>
                </div>
            </div>
            <div className='d-flex mt-4 justify-content-between'>
                <button className='btn btn-filter fw-bold d-flex align-items-center gap-2'>Popular <i className='iconify text-primary' data-icon="bitcoin-icons:caret-down-filled"></i></button>
                <button className='btn btn-filter fw-bold d-flex align-items-center gap-2'><i className='iconify text-primary' data-icon="cuida:filter-outline"></i> Filter</button>
            </div>
        </section>
    )
}

const DisplayEducation = () => {
    return (
        <section className='w-100 mb-5 section section-display-education container-main d-flex flex-wrap gap-4 justify-content-center'>
            <div className='box-education'>
                <div className='date-type-education text-satoshi d-flex justify-content-between'>
                    <p>17 Agustus 2024</p>
                    <div className='bg-primary rounded-3 px-2 text-light' style={{height: "30px"}}>
                        <p className='m-0'>Farm</p>
                    </div>
                </div>
                <div className='img-education'>
                    <img src="/images/plants2-bg.jpg" alt="" />
                </div>
                <div className='mt-4'>
                    <h5>Cara Menanam dengan Baik 2024 No Root Bgus banget</h5>
                    <p className='text-satoshi'>Discover our curated selection of aesthetic houseplants to transform your home into a vibrant.</p>
                </div>
                <div>
                    <button className='btn bg-primary text-light' onClick={() => window.location.href = '/education/232'}>Explore Now</button>
                </div>
            </div>
            <div className='box-education'>
                <div className='date-type-education text-satoshi d-flex justify-content-between'>
                    <p>17 Agustus 2024</p>
                    <div className='bg-primary rounded-3 px-2 text-light' style={{height: "30px"}}>
                        <p className='m-0'>Farm</p>
                    </div>
                </div>
                <div className='img-education'>
                    <img src="/images/plants2-bg.jpg" alt="" />
                </div>
                <div className='mt-4'>
                    <h5>Cara Menanam dengan Baik 2024 No Root Bgus banget</h5>
                    <p className='text-satoshi'>Discover our curated selection of aesthetic houseplants to transform your home into a vibrant.</p>
                </div>
                <div>
                    <button className='btn bg-primary text-light' onClick={() => window.location.href = '/education/232'}>Explore Now</button>
                </div>
            </div>
            <div className='box-education'>
                <div className='date-type-education text-satoshi d-flex justify-content-between'>
                    <p>17 Agustus 2024</p>
                    <div className='bg-primary rounded-3 px-2 text-light' style={{height: "30px"}}>
                        <p className='m-0'>Farm</p>
                    </div>
                </div>
                <div className='img-education'>
                    <img src="/images/plants2-bg.jpg" alt="" />
                </div>
                <div className='mt-4'>
                    <h5>Cara Menanam dengan Baik 2024 No Root Bgus banget</h5>
                    <p className='text-satoshi'>Discover our curated selection of aesthetic houseplants to transform your home into a vibrant.</p>
                </div>
                <div>
                    <button className='btn bg-primary text-light' onClick={() => window.location.href = '/education/232'}>Explore Now</button>
                </div>
            </div>
        </section>
    )
}

const Education = () => {
  return (
    <Base mainContent={<>
    <SectionWelcoming />
    <DisplayEducation />
    </>} />
  )
}

export default Education