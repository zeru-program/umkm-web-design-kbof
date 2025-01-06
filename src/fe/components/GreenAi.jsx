import React, { useState } from 'react'
import SendGreenAi from '../../be/post/SendGreenAi'

const PopupAi = () => {
  const { send } = SendGreenAi()
  const [inputAi, setInputAi] = useState('')
  return (
    <div className='px-3 py-2 bg-light rounded-1 popup-ai shadow-sm d-flex flex-column align-items-center position-fixed' style={{right: "20px", bottom: "140px", zIndex: "1000"}}>
      <div className='w-100 py-2 border-bottom align-items-center d-flex justify-content-between'>
        <div className='d-flex gap-2 align-items-center'>
          <img src="/images/greenai-nobg.svg" className='img-greenai' alt="" />
          <span className='text-primary fw-bold'>GreenAi</span>
        </div>
        <button className='btn btn-close'></button>
      </div>
      <div className='w-100 d-flex gap-2 body-chat-greenai py-3 flex-column overflow-y-auto'>
        <div className='bubble bubble-ai rounded-2'>
          <span className='sender sender-ai'>GreenAi</span>
          <p className='mess-greenai'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, culpa.</p>
        </div>
        <div className='bubble bubble-user rounded-2'>
          <span className='sender sender-user'>User</span>
          <p className='mess-greenai'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, culpa.</p>
        </div>
      </div>
      <form className='w-100 gap-2 d-flex align-items-center'
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          console.log("Sending input to Green AI:", inputAi);
          const resAi = await send(inputAi);
          console.log("Response received:", resAi);
        } catch (err) {
          console.error("Error in onSubmit:", err);
        }
      }}      
      >
        <div className='w-100'>
          <input type="text" placeholder='Ask Green Ai..' value={inputAi} onInput={(e) => setInputAi(e.target.value)} required className='w-100 form-control' />
        </div>
        <div>
          <button className='btn bg-primary text-light'>
            <i className='bi bi-send-fill'></i>
          </button>
        </div>
      </form>
    </div>
  )
}

const ButtonAi = ({aiActive, setAiActive}) => {
  return (
    // <button className='btn bg-light btn-ai shadow-sm d-flex justify-content-center align-items-center position-fixed' style={{right: "20px", bottom: "80px", zIndex: "1000"}} onClick={(e) => setAiActive(!aiActive)}>
      <img src="/images/greenai-bg.svg" className='rounded-2 btn-ai shadow-sm d-flex justify-content-center align-items-center position-fixed' style={{right: "20px", bottom: "80px", zIndex: "1000"}} onClick={(e) => setAiActive(!aiActive)} />
    // </button>
  )
}

const GreenAi = () => {
  const [aiActive, setAiActive] = useState(false)
  return (
    <div>
      <PopupAi />
      <ButtonAi aiActive={aiActive} setAiActive={setAiActive} />
    </div>
  )
}

export default GreenAi