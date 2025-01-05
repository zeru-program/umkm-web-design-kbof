import React, { useRef, useState, useEffect } from "react";
// import "./TextEditor.css"; // Ekstrak CSS ke file ini

const TextEditor = () => {
  const contentRef = useRef(null);
  const [showCode, setShowCode] = useState(false);

  const formatDoc = (cmd, value = null) => {
    if (value) {
      document.execCommand(cmd, false, value);
    } else {
      document.execCommand(cmd);
    }
  };

  const addLink = () => {
    const url = prompt("Insert URL");
    if (url) formatDoc("createLink", url);
  };

  useEffect(() => {
    const content = contentRef.current;

    const handleMouseEnter = (e) => {
      const aElements = content.querySelectorAll("a");
      aElements.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          content.setAttribute("contenteditable", "false");
          item.target = "_blank";
        });
        item.addEventListener("mouseleave", () => {
          content.setAttribute("contenteditable", "true");
        });
      });
    };

    content.addEventListener("mouseenter", handleMouseEnter);
    return () => {
      content.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const toggleCodeView = () => {
    setShowCode((prev) => !prev);
    const content = contentRef.current;

    if (!showCode) {
      content.textContent = content.innerHTML;
      content.setAttribute("contenteditable", "false");
    } else {
      content.innerHTML = content.textContent;
      content.setAttribute("contenteditable", "true");
    }
  };

  return (
    <div className="container">
      <div className="toolbar">
        <div className="head">
          <select onChange={(e) => formatDoc("formatBlock", e.target.value)}>
            <option value="" hidden disabled selected>
              Format
            </option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="h5">Heading 5</option>
            <option value="h6">Heading 6</option>
            <option value="p">Paragraph</option>
          </select>
          <select onChange={(e) => formatDoc("fontSize", e.target.value)}>
            <option value="" hidden disabled selected>
              Font size
            </option>
            <option value="1">Extra small</option>
            <option value="2">Small</option>
            <option value="3">Regular</option>
            <option value="4">Medium</option>
            <option value="5">Large</option>
            <option value="6">Extra Large</option>
            <option value="7">Big</option>
          </select>
          <div className="color">
            <span>Color</span>
            <input
              type="color"
              onInput={(e) => formatDoc("foreColor", e.target.value)}
            />
          </div>
          <div className="color">
            <span>Background</span>
            <input
              type="color"
              onInput={(e) => formatDoc("hiliteColor", e.target.value)}
            />
          </div>
        </div>
        <div className="btn-toolbar">
          <button onClick={() => formatDoc("undo")}>
            <i className="bx bx-undo"></i>
          </button>
          <button onClick={() => formatDoc("redo")}>
            <i className="bx bx-redo"></i>
          </button>
          <button onClick={() => formatDoc("bold")}>
            <i className="bx bx-bold"></i>
          </button>
          <button onClick={() => formatDoc("underline")}>
            <i className="bx bx-underline"></i>
          </button>
          <button onClick={() => formatDoc("italic")}>
            <i className="bx bx-italic"></i>
          </button>
          <button onClick={() => formatDoc("strikeThrough")}>
            <i className="bx bx-strikethrough"></i>
          </button>
          <button onClick={() => formatDoc("justifyLeft")}>
            <i className="bx bx-align-left"></i>
          </button>
          <button onClick={() => formatDoc("justifyCenter")}>
            <i className="bx bx-align-middle"></i>
          </button>
          <button onClick={() => formatDoc("justifyRight")}>
            <i className="bx bx-align-right"></i>
          </button>
          <button onClick={() => formatDoc("justifyFull")}>
            <i className="bx bx-align-justify"></i>
          </button>
          <button onClick={() => formatDoc("insertOrderedList")}>
            <i className="bx bx-list-ol"></i>
          </button>
          <button onClick={() => formatDoc("insertUnorderedList")}>
            <i className="bx bx-list-ul"></i>
          </button>
          <button onClick={addLink}>
            <i className="bx bx-link"></i>
          </button>
          <button onClick={() => formatDoc("unlink")}>
            <i className="bx bx-unlink"></i>
          </button>
          <button
            id="show-code"
            data-active={showCode}
            onClick={toggleCodeView}
          >
            &lt;/&gt;
          </button>
        </div>
      </div>
      <div
        id="content"
        ref={contentRef}
        contentEditable={!showCode}
        spellCheck="false"
      >
        Lorem, ipsum.
      </div>
    </div>
  );
};

export default TextEditor;
