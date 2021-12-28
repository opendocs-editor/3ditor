import React from "react";
import { faBold, faItalic, faUnderline, faListUl, faListOl, faLink, faAlignLeft, faAlignRight, faAlignCenter, faAlignJustify, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";

function App() {
  const [ hasInitialized, setHasInitialized ] = React.useState(false);
  window.addEventListener("load", () => {
    if(hasInitialized) return;
    window.addEventListener("keydown", (e) => {
      if(e.ctrlKey) {
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
      if(e.ctrlKey && e.shiftKey) {
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
            <FontAwesomeIcon size="2x" icon={faBold} />
          </button>
          <button type="button" className="_3ditor-button" data-action="italic" onClick={() => {
            document.execCommand("italic", false);
          }}>
            <FontAwesomeIcon size="2x" icon={faItalic} />
          </button>
          <button type="button" className="_3ditor-button" data-action="underline" onClick={() => {
            document.execCommand("underline", false);
          }}>
            <FontAwesomeIcon size="2x" icon={faUnderline} />
          </button>
          <button type="button" className="_3ditor-button" data-action="insertUnorderedList" onClick={() => {
            document.execCommand("insertUnorderedList", false);
          }}>
            <FontAwesomeIcon size="2x" icon={faListUl} />
          </button>
          <button type="button" className="_3ditor-button" data-action="insertOrderedList" onClick={() => {
            document.execCommand("insertOrderedList", false);
          }}>
            <FontAwesomeIcon size="2x" icon={faListOl} />
          </button>
          <button type="button" className="_3ditor-button" data-action="createLink" onClick={() => {
            let linkLocation = prompt("Please enter the link's target.", "https://www.example.com/");
            if(!linkLocation) return;
            document.execCommand("createLink", false, linkLocation);
          }}>
            <FontAwesomeIcon size="2x" icon={faLink} />
          </button>
          <button type="button" className="_3ditor-button" data-action="justifyLeft" onClick={() => {
            document.execCommand("justifyLeft", false);
          }}>
            <FontAwesomeIcon size="2x" icon={faAlignLeft} />
          </button>
          <button type="button" className="_3ditor-button" data-action="justifyCenter" onClick={() => {
            document.execCommand("justifyCenter", false);
          }}>
            <FontAwesomeIcon size="2x" icon={faAlignCenter} />
          </button>
          <button type="button" className="_3ditor-button" data-action="justifyRight" onClick={() => {
            document.execCommand("justifyRight", false);
          }}>
            <FontAwesomeIcon size="2x" icon={faAlignRight} />
          </button>
          <button type="button" className="_3ditor-button" data-action="justifyFull" onClick={() => {
            document.execCommand("justifyFull", false);
          }}>
            <FontAwesomeIcon size="2x" icon={faAlignJustify} />
          </button>
          <button type="button" className="_3ditor-button" data-action="insertImage" onClick={() => {
            let imageLocation = prompt("Please enter the image's URL.", "https://www.example.com/example.png");
            if(!imageLocation) return;
            document.execCommand("insertImage", false, imageLocation);
          }}>
            <FontAwesomeIcon size="2x" icon={faImage} />
          </button>
        </div>
        <div className="_3ditor-content" contentEditable={true}>

        </div>
      </div>
    </div>
  );
}

export default App;
