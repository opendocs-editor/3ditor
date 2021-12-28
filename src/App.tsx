import { faBold, faItalic, faUnderline, faListUl, faListOl, faLink, faAlignLeft, faAlignRight, faAlignCenter, faAlignJustify, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forEachTrailingCommentRange } from 'typescript';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="_3ditor-main">
        {/* Header Buttons */}
        <div className="_3ditor-header">
          <button type="button" className="_3ditor-button" data-action="bold" onClick={() => {
            document.execCommand("bold", false);
            (document.getElementsByClassName("_3editor-content") as HTMLCollectionOf<HTMLDivElement>)[0]?.focus();
          }}>
            <FontAwesomeIcon icon={faBold} />
          </button>
          <button type="button" className="_3ditor-button" data-action="italic" onClick={() => {
            document.execCommand("italic", false);
            (document.getElementsByClassName("_3editor-content") as HTMLCollectionOf<HTMLDivElement>)[0]?.focus();
          }}>
            <FontAwesomeIcon icon={faItalic} />
          </button>
          <button type="button" className="_3ditor-button" data-action="underline" onClick={() => {
            document.execCommand("underline", false);
            (document.getElementsByClassName("_3editor-content") as HTMLCollectionOf<HTMLDivElement>)[0]?.focus();
          }}>
            <FontAwesomeIcon icon={faUnderline} />
          </button>
          <button type="button" className="_3ditor-button" data-action="insertUnorderedList" onClick={() => {
            document.execCommand("insertUnorderedList", false);
            (document.getElementsByClassName("_3editor-content") as HTMLCollectionOf<HTMLDivElement>)[0]?.focus();
          }}>
            <FontAwesomeIcon icon={faListUl} />
          </button>
          <button type="button" className="_3ditor-button" data-action="insertOrderedList" onClick={() => {
            document.execCommand("insertOrderedList", false);
            (document.getElementsByClassName("_3editor-content") as HTMLCollectionOf<HTMLDivElement>)[0]?.focus();
          }}>
            <FontAwesomeIcon icon={faListOl} />
          </button>
          <button type="button" className="_3ditor-button" data-action="createLink" onClick={() => {
            let linkLocation = prompt("Please enter the link's target.", "https://www.example.com/");
            if(!linkLocation) return;
            document.execCommand("createLink", false, linkLocation);
            (document.getElementsByClassName("_3editor-content") as HTMLCollectionOf<HTMLDivElement>)[0]?.focus();
          }}>
            <FontAwesomeIcon icon={faLink} />
          </button>
          <button type="button" className="_3ditor-button" data-action="justifyLeft" onClick={() => {
            document.execCommand("justifyLeft", false);
            (document.getElementsByClassName("_3editor-content") as HTMLCollectionOf<HTMLDivElement>)[0]?.focus();
          }}>
            <FontAwesomeIcon icon={faAlignLeft} />
          </button>
          <button type="button" className="_3ditor-button" data-action="justifyCenter" onClick={() => {
            document.execCommand("justifyCenter", false);
            (document.getElementsByClassName("_3editor-content") as HTMLCollectionOf<HTMLDivElement>)[0]?.focus();
          }}>
            <FontAwesomeIcon icon={faAlignCenter} />
          </button>
          <button type="button" className="_3ditor-button" data-action="justifyRight" onClick={() => {
            document.execCommand("justifyRight", false);
            (document.getElementsByClassName("_3editor-content") as HTMLCollectionOf<HTMLDivElement>)[0]?.focus();
          }}>
            <FontAwesomeIcon icon={faAlignRight} />
          </button>
          <button type="button" className="_3ditor-button" data-action="justifyFull" onClick={() => {
            document.execCommand("justifyFull", false);
            (document.getElementsByClassName("_3editor-content") as HTMLCollectionOf<HTMLDivElement>)[0]?.focus();
          }}>
            <FontAwesomeIcon icon={faAlignJustify} />
          </button>
          <button type="button" className="_3ditor-button" data-action="insertImage" onClick={() => {
            let imageLocation = prompt("Please enter the image's URL.", "https://www.example.com/example.png");
            if(!imageLocation) return;
            document.execCommand("insertImage", false, imageLocation);
            (document.getElementsByClassName("_3editor-content") as HTMLCollectionOf<HTMLDivElement>)[0]?.focus();
          }}>
            <FontAwesomeIcon icon={faImage} />
          </button>
        </div>
        <div className="_3ditor-content" contentEditable={true}>

        </div>
      </div>
    </div>
  );
}

export default App;
