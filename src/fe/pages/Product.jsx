import React from 'react'
import Base from '../layouts/Base'

const SectionWelcoming = () => {
    return (
        <section className='w-100 d-flex flex-column align-content-center container-main section-product'>
            <div className='d-flex flex-column align-items-center'>
                <h2 className='text-font-color'>Plants</h2>
                <p className='text-satoshi'>Discover our curated selection of aesthetic houseplants to transform your home into a vibrant.</p>
                <div className='w-100 position-relative'>
                    <input type="text" placeholder='Cari tanaman yang di inginkan' className='text-satoshi form-control py-2 input-search-product ' />
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

const DisplayProduct = () => {
    return (
        <section className='w-100 mb-5 section section-display-product container-main d-flex flex-wrap gap-4 justify-content-center'>
            <div className='box-product d-flex flex-column align-items-center text-satoshi position-relative' onClick={() => window.location.href = '/plants/232'}>
                <div className='bg-primary discount-text px-3 position-absolute top-0 start-0 text-light'>
                    <span className=''>10%</span>
                </div>
                <div>
                    <img src="/images/plants1-full2.png" className='img-product' alt="" />
                </div>
                <div className='d-flex flex-column w-100'>
                    <span className='fw-bold title-product'>Tanaman apa coba</span>
                    <div className='d-flex w-100 contain-star-product'>
                        <div>
                            <span className='price-product'>Rp20.000</span>
                        </div>
                        <div className='gap-2 d-flex star-product'>
                            <i className='bi-star-fill'></i>
                            <i className='bi-star-fill'></i>
                            <i className='bi-star-fill'></i>
                            <i className='bi-star'></i>
                            <i className='bi-star'></i> 
                        </div>
                    </div>
                </div>
            </div>
            <div className='box-product d-flex flex-column align-items-center text-satoshi position-relative' onClick={() => window.location.href = '/plants/232'}>
                <div className='bg-primary discount-text px-3 position-absolute top-0 start-0 text-light'>
                    <span className=''>10%</span>
                </div>
                <div>
                    <img src="/images/plants1-full2.png" className='img-product' alt="" />
                </div>
                <div className='d-flex flex-column w-100'>
                    <span className='fw-bold title-product'>Tanaman apa coba</span>
                    <div className='d-flex w-100 contain-star-product'>
                        <div>
                            <span className='price-product'>Rp20.000</span>
                        </div>
                        <div className='gap-2 d-flex star-product'>
                            <i className='bi-star-fill'></i>
                            <i className='bi-star-fill'></i>
                            <i className='bi-star-fill'></i>
                            <i className='bi-star'></i>
                            <i className='bi-star'></i> 
                        </div>
                    </div>
                </div>
            </div>
            <div className='box-product d-flex flex-column align-items-center text-satoshi position-relative' onClick={() => window.location.href = '/plants/232'}>
                <div className='bg-primary discount-text px-3 position-absolute top-0 start-0 text-light'>
                    <span className=''>10%</span>
                </div>
                <div>
                    <img src="/images/plants1-full2.png" className='img-product' alt="" />
                </div>
                <div className='d-flex flex-column w-100'>
                    <span className='fw-bold title-product'>Tanaman apa coba</span>
                    <div className='d-flex w-100 contain-star-product'>
                        <div>
                            <span className='price-product'>Rp20.000</span>
                        </div>
                        <div className='gap-2 d-flex star-product'>
                            <i className='bi-star-fill'></i>
                            <i className='bi-star-fill'></i>
                            <i className='bi-star-fill'></i>
                            <i className='bi-star'></i>
                            <i className='bi-star'></i> 
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Product = () => {
  return (
    <Base mainContent={<>
    <SectionWelcoming />
    <DisplayProduct />
    </>} />
  )
}

export default Product