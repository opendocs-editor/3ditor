import { createGlobalStyle } from "styled-components";

export const GlobalEditorStyles = createGlobalStyle`
/* Main Content */
._3ditor_main {
    width: 100%;
    height: 100%;
    position: absolute;
}

/* Header & Buttons */
._3ditor_header {
    background-color: white;
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    width: 100%;
    border-bottom: 1px solid rgba(100, 100, 100, 0.4);
}
._3ditor_header > ._3ditor_button {
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    margin-right: 15px;
}
._3ditor_header > ._3ditor_button:nth-child(1) {
    margin-left: 6px;
}
._3ditor_header > ._3ditor_size_control {
    border: 1px solid black;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    /* margin-right: 10px; */
    padding: 4.5px 5px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: none;
    transition: background 0.5s ease;
}
._3ditor_header > ._3ditor_size_control:hover {
    background: #dedede;
}
._3ditor_header > ._3ditor_size_control_last {
    border: 1px solid black;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    margin-right: 15px;
    padding: 4.5px 5px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-left: none;
    transition: background 0.5s ease;
}
._3ditor_header > ._3ditor_size_control_last:hover {
    background: #dedede;
}
._3ditor_header > ._3ditor_size_input {
    width: 30px;
    outline: none;
    border: 1px solid black;
    padding: 5px 5px;
    background: none;
    transition: background 0.5s ease;
}
._3ditor_header > ._3ditor_size_input:hover {
    background: #dedede;
}
._3ditor_header > ._3ditor_size_input:focus {
    background: none;
    border: 1px solid royalblue;
    border-radius: 4px;
}
._3ditor_header_divider {
    border: none;
    border-left: 2px solid rgba(0, 0, 0, 0.2);
    height: 18px;
    padding: 0;
    margin: 0;
    width: 0;
    left: 0;
    margin-right: 15px;
}

._3ditor_header > ._3ditor_font {
    margin-right: 15px;
    width: 7.5%;
    height: 100%;
    padding: 3px 5px;
    color: black;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
}

/* WYSIWYG Content */
._3ditor_content_container {
    background-color: rgba(241, 241, 241, 1);
    margin: 0;
    padding: 0;
    height: 175%;
    width: 100%;
    border: none;
}
._3ditor_content {
    outline: none;
    min-height: 85%;
    border: 1px solid #fcfcfc;
    margin-top: 3.5%;
    margin-bottom: 1%;
    padding-top: 90px;
    padding-left: 90px;
    background-color: rgba(255, 255, 255);
    color: black;
    font-size: 12px;
    scroll-behavior: smooth;
    cursor: text;
    width: 60%;
    margin-left: 17.5%;
    box-shadow: 1px 2px 1px 1px #bbbbbb;
    word-wrap: break-word;
    overflow-wrap: break-word;
}
._3ditor_content * {
    display: inline;
    white-space: pre;
    word-wrap: break-word;
    overflow-wrap: break-word;
}

/* Grammarly Button */

.grammarlyButton {
    position: absolute;
    z-index: 200;
}

/* Code Dialog */

._3ditor_code_dialog {
    background-color: black;
    width: 100%;
    height: 100%;
}

/* Form */

._3ditor_form {
    padding: 0;
    margin: 0;
    z-index: 0;
}

/* Keyframes */

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

`;

export const LightEditorMode = createGlobalStyle`
/* Loader */

.loader_container {
    width: 100%;
    height: 100vh;
    padding: 0 !important;
    margin: 0 !important;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    position: absolute;
}

.loader {
    border: 2px solid #cccccc;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

.loader_container2 {
    width: 100%;
    height: 100vh;
    padding: 0 !important;
    margin: 0;
    margin-top: -5vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    position: absolute;
}

.loader2 {
    border: 2px solid #cccccc;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}
`;

export const DarkEditorMode = createGlobalStyle`
/* Loader */

.loader_container {
    width: 100%;
    height: 100vh;
    padding: 0 !important;
    margin: 0 !important;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    position: absolute;
    background-color: #1f2120;
}

.loader {
    border: 2px solid #cccccc;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

.loader_container2 {
    width: 100%;
    height: 100vh;
    padding: 0 !important;
    margin: 0;
    margin-top: -5vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    position: absolute;
    background-color: #1f2120;
}

.loader2 {
    border: 2px solid #cccccc;
    border-top: 2px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}
`;
