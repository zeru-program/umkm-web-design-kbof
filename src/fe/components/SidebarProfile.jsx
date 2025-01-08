import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const SidebarProfile = () => {
    const location = useLocation()
    const [imageNav, setImageNav] = useState(false)

    useEffect(() => {
        if (window.innerWidth < 700) {
            setImageNav(false);
        } else if (window.innerWidth > 700) {
            setImageNav(true);
        }
    })
    return (
        <div className=''>
            <div className="offcanvas sidebar offcanvas-start w-25" tabIndex={-1} id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
                <div className="offcanvas-header pt-4 d-flex flex-column">
                    <div className='w-100 d-flex align-items-start justify-content-beetwen'>
                        <div className={`align-items-${imageNav ? "start" : "center"} d-flex flex-column w-100`}>
                            <img src={imageNav ? "/images/logo-navbar.png" : "/images/logo.png"} style={{cursor: "pointer",width: imageNav ? "180px" : "25px"}} className='logo-sidebar mb-4 pb-4' onClick={() => window.location.href = '/'} />
                            <div className='d-flex gap-3 align-items-center'>
                                <img className='img-profile-side' src={sessionStorage.getItem('img') || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"} alt="image_user" />
                                <div className="">
                                    <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">Hi, {sessionStorage.getItem('username')}</h6>
                                    <span className="offcanvas-title d-none d-sm-block" id="offcanvas"> {sessionStorage.getItem('email')}</span>
                                </div>
                            </div>
                            <button type="button" className="btn-close mt-1 text-reset" style={{marginInline: 0, display: !imageNav ? 'flex' : 'none'}} data-bs-dismiss="offcanvas" aria-label="Close" />
                        </div>
                        <button type="button" className="btn-close mt-1 text-reset" style={{display: imageNav ? 'flex' : 'none'}} data-bs-dismiss="offcanvas" aria-label="Close" />
                    </div>
                    </div>
                    <div className="offcanvas-body px-0">
                    <div className='w-100 d-flex flex-column py-1'>
                    <div className={`nav-link-dash ${location.pathname === "/profile" ? "active" : ""} d-flex gap-3 align-items-center py-3`} onClick={() => window.location.href = '/profile'}>
                        <div className='content-link'>
                            <i className='bi bi-person-fill'></i>
                            <span>Profile</span>
                        </div>
                    </div>
                    <div className={`nav-link-dash ${location.pathname === "/profile/my-order" ? "active" : ""} d-flex gap-3 align-items-center py-3`} onClick={() => window.location.href = '/profile/my-order'}>
                        <div className='content-link'>
                            <i className='bi bi-bag-fill'></i>
                            <span>My Order</span>
                        </div>
                    </div>
                    <div className={`nav-link-dash ${location.pathname === "/profile/history" ? "active" : ""} d-flex gap-3 align-items-center py-3`} onClick={() => window.location.href = '/profile/history'}>
                        <div className='content-link'>
                            <i className='bi bi-clock-history'></i>
                            <span>My History</span>
                        </div>
                    </div>
                    <div className={`nav-link-dash position-absolute d-flex gap-3 align-items-center py-3`} style={{bottom: "30px"}} onClick={() => window.location.href = '/auth/logout'}>
                        <div className='content-link text-danger'>
                            <i className='bi bi-box-arrow-left'></i>
                            <span>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default SidebarProfile