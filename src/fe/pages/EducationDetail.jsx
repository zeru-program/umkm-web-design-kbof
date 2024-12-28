import React from 'react'
import Base from '../layouts/Base'

const Detail = () => {
    return (
        <section className='section section-detail-education d-flex flex-column align-items-center'>
            <div className='w-100'>
                <img src="/images/plants2-bg.jpg" alt="" className='w-100' />
            </div>
            <div className='box-content-education py-5 d-flex flex-column py-4 container-main'>
                <h3>Kata Dokter Paru soal Tanaman Hias untuk Bersihkan Polusi Udara di Rumah</h3>
                <div className='creator-education-detail mt-2 d-flex gap-2 align-items-center'>
                    <img src="/images/man1.jpg" alt="" />
                    <span>Abdul zaki</span>
                </div>
                <div className='mt-4'>
                    <div>
                    Masyarakat Jabodetabek kini dikepung polusi udara ugal-ugalan. Imbasnya, tak sedikit warga mengeluh engap terutama ketika beraktivitas di luar rumah. Lantas untuk mencegah risiko gangguan pernapasan, apa sih yang bisa diupayakan warga? Akankah menanam tanaman hias efektif mencegah penyakit akibat polusi?Dokter spesialis paru dr Erlina Burhan, SpP(K) menjelaskan, menanam pohon di area luar rumah atau memperbanyak tanaman di dalam rumah (indoor) bisa dilakukan di tengah situasi buruknya kualitas udara saat ini. Ia menyarankan, perbanyak tanaman hijau di area sekitar rumah.Namun begitu, langkah tersebut belum tentu cukup mengatasi efek polusi udara. Terutama, berkenaan dengan risiko gangguan pernapasan pada mereka yang sering terpapar polusi udara."Masih ada kontribusinya tapi tidak cukup, terutama bila sumber polusi tidak diintervensi," ujar dr Erlina saat dihubungi detikcom, Senin (21/8/2023)."(Penggunaan tanaman hijau di area tempat tinggal) sedikit membuat udara lebih bersih. Sedikit banget dibanding polusi yang sudah pada level mengkhawatirkan," ujarnya lebih lanjut.Di samping langkah tersebut, dr Erlina mengimbau masyarakat untuk meningkatkan imunitas di tengah buruknya udara Jabodetabek saat ini."Konsumsi nutrisi yang seimbang. Cukup minum agar hidrasi tubuh terjaga, konsumsi vitamin, cukup tidur, olahraga teratur. Berhenti merokok, jangan pindah ke vape. Bila ada dana, pakai air purifier di dalam rumah," pungkas dr Erlina.
                    </div>
                </div>
            </div>
        </section>  
    )
}

const Recomendation = () => {
    return (
        <section className='section section-recomend mt-5 py-5'>
            <h2>Rekomendasi</h2>
            <div className='d-flex mt-4 flex-wrap gap-4'>
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
            </div>
        </section>
    )
}

const EducationDetail = () => {
  return (
    <Base mainContent={<>
    <section className='section-all-detail-product container-main'>
        <Detail />
        <Recomendation />
    </section>
    </>} />
  )
}

export default EducationDetail