import React, { useEffect, useRef, useState } from 'react'
import RequestToGreenAi from '../../be/post/RequestToGreenAi'
import { CompanyInfo } from '../../be/CompanyInfo'


const LoaderAi = (
  <div className="bubble bubble-ai rounded-2">
    <span className="sender sender-ai">GreenAi</span>
    <div className="mess-greenai">
      <div className="loader"></div>
    </div>
  </div>
);

const PopupAi = ({ aiActive, setAiActive }) => {
  const { requestAi } = RequestToGreenAi();
  const [disButton, setDisButton] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: CompanyInfo,
    },
  ]);
  const inputRef = useRef();
  const chatBodyRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMess = inputRef.current.value.trim();
    if (!userMess) return;
    inputRef.current.value = "";
    setDisButton(true);

    // Update chat history when user sends a message
    setChatHistory((history) => [...history, { role: "user", text: userMess }]);

    // Add loader to chat history temporarily
    setChatHistory((history) => [...history, { role: "model", isLoader: true }]);

    try {
      setTimeout(async () => {
        const res = await requestAi([
          ...chatHistory,
          { role: "user", text: `By using the details given above and only using Indonesian please answer this question: ${userMess}` },
        ]);

        setDisButton(false);
        setChatHistory((prev) =>
          prev.map((msg) =>
            msg.isLoader ? { role: "model", hideInChat: false, text: res, isError: false } : msg
          )
        );
      }, 2000);
    } catch (error) {
      setChatHistory((prev) =>
        prev.map((msg) =>
          msg.isLoader ? { role: "model", hideInChat: false, text: error.message, isError: true } : msg
        )
      );
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div
      className="px-3 py-2 bg-light rounded-1 popup-ai shadow-sm flex-column align-items-center position-fixed"
      style={{ display: aiActive ? "flex" : "none", right: "20px", bottom: "140px", zIndex: "2000" }}
    >
      <div className="w-100 py-2 border-bottom align-items-center d-flex justify-content-between">
        <div className="d-flex gap-2 align-items-center">
          <img src="/images/greenai-nobg.svg" className="img-greenai" alt="" />
          <span className="text-primary fw-bold">GreenAi</span>
        </div>
        <button className="btn btn-close" onClick={() => setAiActive(!aiActive)}></button>
      </div>
      <div className="w-100 d-flex gap-2 body-chat-greenai py-3 flex-column" ref={chatBodyRef}>
        {chatHistory.length > 1 ? (
          chatHistory.map((chat, index) => {
            if (chat.isLoader) {
              return <div key={index}>{LoaderAi}</div>;
            }
            return (
              !chat.hideInChat && (
                <div
                  key={index}
                  className={`bubble bubble-${chat.role === "model" ? "ai" : "user"} ${
                    chat.isError ? "text-danger" : ""
                  } rounded-2`}
                >
                  <span
                    className={`sender sender-${chat.role === "model" ? "ai" : "user"}`}
                  >
                    {chat.role === "model" ? "GreenAi" : "User"}
                  </span>
                  <p className="mess-greenai">{chat.text}</p>
                </div>
              )
            );
          })
        ) : (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <span className="text-satoshi text-muted border-bottom">Let's Talk With GreenAi!</span>
          </div>
        )}
      </div>
      <form className="w-100 gap-2 d-flex align-items-center" onSubmit={handleSubmit}>
        <div className="w-100">
          <input
            type="text"
            ref={inputRef}
            placeholder="Ask Green Ai.."
            required
            className="w-100 form-control"
          />
        </div>
        <div>
          <button className="btn bg-primary text-light" disabled={disButton ? true : false}>
            <i className="bi bi-send-fill"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

const ButtonAi = ({aiActive, setAiActive}) => {
  const[firstSpan, setFirstSpan] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setFirstSpan(true)
    }, 500)
    setTimeout(() => {
      setFirstSpan(false)
    }, 3000)
  }, [])
  return (
    // <button className='btn bg-light btn-ai shadow-sm d-flex justify-content-center align-items-center position-fixed' style={{right: "20px", bottom: "80px", zIndex: "1000"}} onClick={(e) => setAiActive(!aiActive)}>
    // </button>
    <div className='position-fixed con-btn-ai d-flex justify-content-center align-items-center' style={{right: "20px", bottom: "90px", zIndex: "1000"}}>
      <div className='bg-primary span-hover-greenai text-light' style={{opacity: firstSpan ? "1" : "0"}}><span>GreenAi</span></div>
      <img src="/images/greenai-bg.svg" className='rounded-2 btn-ai shadow-sm ' onClick={(e) => setAiActive(!aiActive)} />
    </div>
  )
}

const GreenAi = () => {
  const [aiActive, setAiActive] = useState(false)
  return (
    <div>
      <PopupAi aiActive={aiActive} setAiActive={setAiActive} />
      <ButtonAi aiActive={aiActive} setAiActive={setAiActive} />
    </div>
  )
}

export default GreenAi