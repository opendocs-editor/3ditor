import React from "react";
import { FiLink2 } from "react-icons/fi";
import {
    AiOutlineUnorderedList,
    AiOutlineOrderedList,
    AiOutlineAlignLeft,
    AiOutlineAlignCenter,
    AiOutlineAlignRight,
    AiOutlinePlus,
    AiOutlineMinus,
} from "react-icons/ai";
import {
    BsJustify,
    BsImage,
    BsCodeSlash,
    BsTypeBold,
    BsTypeItalic,
    BsTypeUnderline,
} from "react-icons/bs";

import styles from "../styles/3ditor.module.css";

class Selection {
    readonly anchorNode: Node | null | undefined;
    readonly anchorOffset: number | undefined;
    readonly focusNode: Node | null | undefined;
    readonly focusOffset: number | undefined;
    readonly isCollapsed: boolean | undefined;
    readonly rangeCount: number | undefined;
    readonly type: string | undefined;
    addRange(range: Range) {}
    collapse(node: Node | null, offset?: number) {}
    collapseToEnd() {}
    collapseToStart() {}
    containsNode(node: Node, allowPartialContainment?: boolean) { return false; }
    deleteFromDocument() {}
    empty() {}
    extend(node: Node, offset?: number) {}
    getRangeAt(index: number) { new Range(); }
    removeAllRanges() {}
    removeRange(range: Range) {}
    selectAllChildren(node: Node) {}
    setBaseAndExtent(anchorNode: Node, anchorOffset: number, focusNode: Node, focusOffset: number) {}
    setPosition(node: Node | null, offset?: number) {}
    toString() { return ""; }
}

const Editor = (): JSX.Element => {
    const [hasInitialized, setHasInitialized] = React.useState(false);
    const [selection_, setSelection_] = React.useState(new Selection());
    React.useEffect(() => {
        window.addEventListener("load", () => {
            if (hasInitialized) return;
            const container = document.getElementById("_3ditor_content") as HTMLDivElement;
            if(container) {
                document.addEventListener("selectionchange", () => {
                    const selection = document.getSelection();
                    if(!selection || !selection.anchorNode?.parentElement) return;
                    if(!container.contains(selection.anchorNode?.parentElement)) return;
                    const sizeFull = getComputedStyle(selection.anchorNode?.parentElement, null).getPropertyValue("font-size");
                    // /(\d*\.?\d*)(.+)/gms
                    const regex = new RegExp("(\\d*\\.?\\d*)(.+)", "gms");
                    const matched = regex.exec(sizeFull);
                    if(!matched) return;
                    const size = parseInt((parseFloat(matched[1]) - 1).toFixed(0));
                    if(Math.sign(size) == -1) return;
                    const fontSize = document.getElementById("fontSize") as HTMLInputElement;
                    if(!fontSize) return;
                    fontSize.value = "" + size;
                });
            }
            document.addEventListener("keydown", (e) => {
                if (e.ctrlKey && !e.shiftKey && !e.altKey) {
                    switch (e.keyCode) {
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
                if (e.ctrlKey && e.shiftKey && !e.shiftKey) {
                    switch (e.keyCode) {
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
                if (e.ctrlKey && !e.shiftKey && e.altKey) {
                    switch (e.keyCode) {
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
                switch (e.keyCode) {
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
    });
    return (
        <div className={styles._3ditor_main}>
            {/* Header Buttons */}
            <div className={styles._3ditor_header}>
                <button
                    type="button"
                    className={styles._3ditor_button}
                    data-action="bold"
                    onClick={() => {
                        document.execCommand("bold", false);
                    }}
                >
                    <BsTypeBold size="20px" />
                </button>
                <button
                    type="button"
                    className={styles._3ditor_button}
                    data-action="italic"
                    onClick={() => {
                        document.execCommand("italic", false);
                    }}
                >
                    <BsTypeItalic size="20px" />
                </button>
                <button
                    type="button"
                    className={styles._3ditor_button}
                    data-action="underline"
                    onClick={() => {
                        document.execCommand("underline", false);
                    }}
                >
                    <BsTypeUnderline size="20px" />
                </button>
                <span className={styles._3ditor_header_divider} />
                <button
                    type="button"
                    className={styles._3ditor_button}
                    data-action="insertUnorderedList"
                    onClick={() => {
                        document.execCommand("insertUnorderedList", false);
                    }}
                >
                    <AiOutlineUnorderedList />
                </button>
                <button
                    type="button"
                    className={styles._3ditor_button}
                    data-action="insertOrderedList"
                    onClick={() => {
                        document.execCommand("insertOrderedList", false);
                    }}
                >
                    <AiOutlineOrderedList />
                </button>
                <span className={styles._3ditor_header_divider} />
                <button
                    type="button"
                    className={styles._3ditor_button}
                    data-action="createLink"
                    onClick={() => {
                        let linkLocation = prompt(
                            "Please enter the link's target.",
                            "https://www.example.com/"
                        );
                        if (linkLocation)
                            document.execCommand(
                                "createLink",
                                false,
                                linkLocation
                            );
                        if (!linkLocation)
                            document.getElementsByClassName(
                                "_3ditor_content"
                            )[0].innerHTML += "<div></div>";
                    }}
                >
                    <FiLink2 />
                </button>
                <span className={styles._3ditor_header_divider} />
                <button
                    type="button"
                    className={styles._3ditor_button}
                    data-action="justifyLeft"
                    onClick={() => {
                        document.execCommand("justifyLeft", false);
                    }}
                >
                    <AiOutlineAlignLeft />
                </button>
                <button
                    type="button"
                    className={styles._3ditor_button}
                    data-action="justifyCenter"
                    onClick={() => {
                        document.execCommand("justifyCenter", false);
                    }}
                >
                    <AiOutlineAlignCenter />
                </button>
                <button
                    type="button"
                    className={styles._3ditor_button}
                    data-action="justifyRight"
                    onClick={() => {
                        document.execCommand("justifyRight", false);
                    }}
                >
                    <AiOutlineAlignRight />
                </button>
                <button
                    type="button"
                    className={styles._3ditor_button}
                    data-action="justifyFull"
                    onClick={() => {
                        document.execCommand("justifyFull", false);
                    }}
                >
                    <BsJustify />
                </button>
                <span className={styles._3ditor_header_divider} />
                <button
                    type="button"
                    className={styles._3ditor_size_control}
                    data-action="decreaseFontSize"
                    onClick={() => {
                        const selection = document.getSelection();
                        if(!selection || !selection.anchorNode?.parentElement) return;
                        const sizeFull = getComputedStyle(selection.anchorNode?.parentElement, null).getPropertyValue("font-size");
                        // /(\d*\.?\d*)(.+)/gms
                        const regex = new RegExp("(\\d*\\.?\\d*)(.+)", "gms");
                        const matched = regex.exec(sizeFull);
                        if(!matched) return;
                        const size = parseInt((parseFloat(matched[1]) - 1).toFixed(0));
                        if(Math.sign(size) == -1) return;
                        const unit = matched[2];
                        const html = `<span style="font-size: ${size + unit};">${document.getSelection() ? document.getSelection()?.toString() : ""}</span>`;
                        document.execCommand("insertHTML", false, html);
                    }}
                >
                    <AiOutlineMinus />
                </button>
                <input type="number" name="fontSize" id="fontSize" defaultValue="11" className={styles._3ditor_size_input} onKeyUp={(e) => {
                    if(e.keyCode != 13) return;
                    const selection = selection_;
                    // /(\d*\.?\d*)(.+)/gms
                    const fontSize = document.getElementById("fontSize") as HTMLInputElement;
                    if(!fontSize || !fontSize.value) return;
                    fontSize.blur();
                    const size = parseInt(fontSize.value);
                    if(Math.sign(size) == -1) return;
                    const unit = "px";
                    const html = `<span style="font-size: ${size + unit};">${selection ? selection.toString() : ""}</span>`;
                    document.execCommand("insertHTML", false, html);
                }} onChange={() => {
                    const selection = selection_;
                    // /(\d*\.?\d*)(.+)/gms
                    const fontSize = document.getElementById("fontSize") as HTMLInputElement;
                    if(!fontSize || !fontSize.value) return;
                    fontSize.blur();
                    const size = parseInt(fontSize.value);
                    if(Math.sign(size) == -1) return;
                    const unit = "px";
                    const html = `<span style="font-size: ${size + unit};">${selection ? selection.toString() : ""}</span>`;
                    document.execCommand("insertHTML", false, html);
                }} onFocus={() => {
                    const sel = document.getSelection();
                    if(!sel || sel.toString() == "" || sel.toString() == " ") return;
                    setSelection_(sel);
                }} />
                <button
                    type="button"
                    className={styles._3ditor_size_control_last}
                    data-action="increaseFontSize"
                    onClick={() => {
                        const selection = document.getSelection();
                        if(!selection || !selection.anchorNode?.parentElement) return;
                        const sizeFull = getComputedStyle(selection.anchorNode?.parentElement, null).getPropertyValue("font-size");
                        // /(\d*\.?\d*)(.+)/gms
                        const regex = new RegExp("(\\d*\\.?\\d*)(.+)", "gms");
                        const matched = regex.exec(sizeFull);
                        if(!matched) return;
                        const size = parseInt((parseFloat(matched[1]) + 1).toFixed(0));
                        if(Math.sign(size) == -1) return;
                        const unit = matched[2];
                        const html = `<span style="font-size: ${size + unit};">${document.getSelection() ? document.getSelection()?.toString() : ""}</span>`;
                        document.execCommand("insertHTML", false, html);
                    }}
                >
                    <AiOutlinePlus />
                </button>
                <span className={styles._3ditor_header_divider} />
                <select id="_3ditor_font" className={styles._3ditor_font}>
                    <option value="Arial" style={{ fontFamily: "arial" }}>Arial</option>
                    <option value="Helvetica" style={{ fontFamily: "helvetica" }}>Helvetica</option>
                </select>
                <span className={styles._3ditor_header_divider} />
                <button
                    type="button"
                    className={styles._3ditor_button}
                    data-action="none"
                    onClick={() => {
                        let content = prompt(
                            "Please enter the custom code to insert.",
                            "<div>Hello, world!</div>"
                        );
                        if (content)
                            document.getElementsByClassName(
                                "_3ditor_content"
                            )[0].innerHTML += content;
                        if (!content)
                            document.getElementsByClassName(
                                "_3ditor_content"
                            )[0].innerHTML += "<div></div>";
                    }}
                >
                    <BsCodeSlash />
                </button>
                <button
                    type="button"
                    className={styles._3ditor_button}
                    data-action="insertImage"
                    onClick={() => {
                        let imageLocation = prompt(
                            "Please enter the image's URL.",
                            "https://www.example.com/example.png"
                        );
                        if (imageLocation)
                            document.execCommand(
                                "insertImage",
                                false,
                                imageLocation
                            );
                        if (!imageLocation)
                            document.getElementsByClassName(
                                "_3ditor_content"
                            )[0].innerHTML += "<div></div>";
                    }}
                >
                    <BsImage />
                </button>
            </div>
            <div className={styles._3ditor_content_container}>
                <div
                    className={styles._3ditor_content}
                    contentEditable={true}
                    id="_3ditor_content"
                ></div>
            </div>
        </div>
    );
};

export default Editor;
