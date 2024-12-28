import React from 'react'
import Base from '../layouts/Base'

const SupportText = () => {
    return (
    <div className='support-text d-none'>
        <h2 className='text-font-color'>Bring Nature Into Your Space</h2>
        <p>Carefully selected indoor plants to add elegance and freshness to your living space.Carefully selected indoor plants to add elegance and freshness to your living space.</p>
    </div>
    )
}

const ImgProduct = () => {
    return (
        <div className='img-product-detail'>
            <img src="/images/plants1-full2.png" alt="" />
        </div>
    )
}

const ReadyCheckout = () => {
    return (
        <div className='ready-checkout'>
            <div className='img-spec'>
                <img src="/images/plants1-full2.png" alt="" />
            </div>
            <div className='gap-3 d-flex flex-column'>
                <div className='d-flex gap-2'>
                    <span>Tanaman Tipe 1 13-14cm</span>
                    <div className='d-flex gap-2'>
                        <i className='bi-dash bg-primary text-light d-flex justify-content-center align-items-center' style={{borderRadius:"50%", width: "30px", height: "30px"}}></i>
                        <span>1</span>
                        <i className='bi-plus bg-primary text-light d-flex justify-content-center align-items-center' style={{borderRadius:"50%", width: "30px", height: "30px"}}></i>
                    </div>
                </div>
                <div className='d-flex gap-2'>
                    <span>Tanaman Tipe 1 13-14cm</span>
                    <div className='d-flex gap-2'>
                        <i className='bi-dash bg-primary text-light d-flex justify-content-center align-items-center' style={{borderRadius:"50%", width: "30px", height: "30px"}}></i>
                        <span>0</span>
                        <i className='bi-plus bg-primary text-light d-flex justify-content-center align-items-center' style={{borderRadius:"50%", width: "30px", height: "30px"}}></i>
                    </div>
                </div>
                <div className='d-flex gap-2'>
                    <span>Tanaman Tipe 1 13-14cm</span>
                    <div className='d-flex gap-2'>
                        <i className='bi-dash bg-primary text-light d-flex justify-content-center align-items-center' style={{borderRadius:"50%", width: "30px", height: "30px"}}></i>
                        <span>0</span>
                        <i className='bi-plus bg-primary text-light d-flex justify-content-center align-items-center' style={{borderRadius:"50%", width: "30px", height: "30px"}}></i>
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <h3 className='text-font-color'>Rp.120.000</h3>
            </div>
            <div className='d-flex mt-3 gap-3'>
                <button className='btn bg-primary text-light'>Buy Now</button>
                <button className='btn bg-transparent text-primary' style={{border: "1.5px solid #496653"}}>Add To Chart</button>
            </div>
        </div>
    )
}

const Detail = () => {
    return (
        <section className='section section-detail-product'>
            <div className='w-100 d-flex contain-detail justify-content-between'>
                <SupportText />
                <ImgProduct />
                <ReadyCheckout />
            </div>
        </section>  
    )
}

const Recomendation = () => {
    return (
        <section className='section section-recomend mt-5 py-5'>
            <h2>Rekomendasi</h2>
            <div className='d-flex mt-4 flex-wrap gap-4'>
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
            </div>
        </section>
    )
}

const ProductDetail = () => {
  return (
    <Base mainContent={<>
    <section className='section-all-detail-product container-main'>
        <Detail />
        <Recomendation />
    </section>
    </>} />
  )
}

export default ProductDetail