import React from "react";
import { FiLink2 } from 'react-icons/fi';
import { AiOutlineUnorderedList, AiOutlineOrderedList, AiOutlineAlignLeft, AiOutlineAlignCenter, AiOutlineAlignRight, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { BsJustify, BsImage, BsCodeSlash, BsTypeBold, BsTypeItalic, BsTypeUnderline } from 'react-icons/bs';
import "./App.css";

function App() {
  const [ hasInitialized, setHasInitialized ] = React.useState(false);
  window.addEventListener("load", () => {
    if(hasInitialized) return;
    window.addEventListener("keydown", (e) => {
      if(e.ctrlKey && !e.shiftKey && !e.altKey) {
        switch(e.keyCode) {
          case 66:
            document.execCommand("bold", false);
            break;
          case 73:
            document.execCommand("italic", false);
            break;
          case 85:
            document.execCommand("underline", false);
            break;
          default:
            break;
        }
      }
      if(e.ctrlKey && e.shiftKey && !e.shiftKey) {
        switch(e.keyCode) {
          case 56:
            document.execCommand("insertUnorderedList", false);
            break;
          case 55:
            document.execCommand("insertOrderedList", false);
            break;
          default:
            break;
        }
      }
      if(e.ctrlKey && !e.shiftKey && e.altKey) {
        switch(e.keyCode) {
          case 189:
            e.preventDefault();
            document.execCommand("decreaseFontSize", false);
            break;
          case 187:
            e.preventDefault();
            document.execCommand("increaseFontSize", false);
            break;
          default:
            break;
        }
      }
      switch(e.keyCode) {
        case 9:
          e.preventDefault();
          document.execCommand("indent", false);
          break;
        default:
          break;
      }
    });
    setHasInitialized(true);
  });
  return (
    <div className="App">
      <div className="_3ditor-main">
        {/* Header Buttons */}
        <div className="_3ditor-header">
          <button type="button" className="_3ditor-button" data-action="bold" onClick={() => {
            document.execCommand("bold", false);
          }}>
            <BsTypeBold size="20px" />
          </button>
          <button type="button" className="_3ditor-button" data-action="italic" onClick={() => {
            document.execCommand("italic", false);
          }}>
            <BsTypeItalic size="20px" />
          </button>
          <button type="button" className="_3ditor-button" data-action="underline" onClick={() => {
            document.execCommand("underline", false);
          }}>
            <BsTypeUnderline size="20px" />
          </button>
          <span className="_3ditor-header-divider" />
          <button type="button" className="_3ditor-button" data-action="insertUnorderedList" onClick={() => {
            document.execCommand("insertUnorderedList", false);
          }}>
            <AiOutlineUnorderedList />
          </button>
          <button type="button" className="_3ditor-button" data-action="insertOrderedList" onClick={() => {
            document.execCommand("insertOrderedList", false);
          }}>
            <AiOutlineOrderedList />
          </button>
          <span className="_3ditor-header-divider" />
          <button type="button" className="_3ditor-button" data-action="createLink" onClick={() => {
            let linkLocation = prompt("Please enter the link's target.", "https://www.example.com/");
            if(linkLocation) document.execCommand("createLink", false, linkLocation);
            if(!linkLocation) document.getElementsByClassName("_3ditor-content")[0].innerHTML += "<div></div>";
          }}>
            <FiLink2 />
          </button>
          <span className="_3ditor-header-divider" />
          <button type="button" className="_3ditor-button" data-action="justifyLeft" onClick={() => {
            document.execCommand("justifyLeft", false);
          }}>
            <AiOutlineAlignLeft />
          </button>
          <button type="button" className="_3ditor-button" data-action="justifyCenter" onClick={() => {
            document.execCommand("justifyCenter", false);
          }}>
            <AiOutlineAlignCenter />
          </button>
          <button type="button" className="_3ditor-button" data-action="justifyRight" onClick={() => {
            document.execCommand("justifyRight", false);
          }}>
            <AiOutlineAlignRight />
          </button>
          <button type="button" className="_3ditor-button" data-action="justifyFull" onClick={() => {
            document.execCommand("justifyFull", false);
          }}>
            <BsJustify />
          </button>
          <span className="_3ditor-header-divider" />
          <button type="button" className="_3ditor-button" data-action="increaseFontSize" onClick={() => {
            document.execCommand("increaseFontSize", false);
          }}>
            <AiOutlinePlus />
          </button>
          <button type="button" className="_3ditor-button" data-action="decreaseFontSize" onClick={() => {
            document.execCommand("decreaseFontSize", false);
          }}>
            <AiOutlineMinus />
          </button>
          <span className="_3ditor-header-divider" />
          <button type="button" className="_3ditor-button" data-action="none" onClick={() => {
            let content = prompt("Please enter the custom code to insert.", "<div>Hello, world!</div>");
            if(content) document.getElementsByClassName("_3ditor-content")[0].innerHTML += content;
            if(!content) document.getElementsByClassName("_3ditor-content")[0].innerHTML += "<div></div>";
          }}>
            <BsCodeSlash />
          </button>
          <button type="button" className="_3ditor-button" data-action="insertImage" onClick={() => {
            let imageLocation = prompt("Please enter the image's URL.", "https://www.example.com/example.png");
            if(imageLocation) document.execCommand("insertImage", false, imageLocation);
            if(!imageLocation) document.getElementsByClassName("_3ditor-content")[0].innerHTML += "<div></div>";
          }}>
            <BsImage />
          </button>
        </div>
        <div className="_3ditor-content-container">
          <div className="_3ditor-content" contentEditable={true}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
