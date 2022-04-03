import React, { Dispatch, SetStateAction } from "react";
import * as TinyMCE from "@tinymce/tinymce-react";
import axios from "axios";
import { GrammarlyButton } from "@grammarly/editor-sdk-react";
import sioc from "socket.io-client";
import { authorize, getNewToken } from "../utils/google";
import {
    DarkEditorMode,
    GlobalEditorStyles,
    LightEditorMode,
} from "../styles/3ditor";
import { Theme } from "../utils/types";
import { DyslexicMode } from "../styles/theme";

const socket = sioc();

const Editor = ({
    documentContent,
    documentId,
    theme_,
    setTheme_,
    readOnly,
    submitAllowed,
}: {
    documentContent?: string;
    documentId?: string;
    theme_?: Theme;
    setTheme_?: Dispatch<SetStateAction<Theme>>;
    readOnly?: boolean;
    submitAllowed?: boolean;
}) => {
    socket.on("complete_auth", async () => {
        console.log(await getNewToken());
    });

    const handleFormSubmit = () => {
        if (!submitAllowed || readOnly) return;
        console.log("Submitting...");
        const url = `${window.location.protocol}//${
            window.location.hostname
        }/api/v1/editor/save${documentId ? "over" : ""}`;
        const docid =
            (document.getElementById("_3ditor_doc_id") as HTMLInputElement)
                ?.value || "";
        const content =
            (document.getElementById("_3ditor_content") as HTMLTextAreaElement)
                ?.value || "";
        axios
            .post(url, { _3ditor_doc_id: docid, _3ditor_content: content })
            .then((d) => {
                if (window.location.pathname == "/") {
                    window.location.replace(
                        `${window.location.protocol}//${window.location.hostname}/document/d/${d.data.documentId}/edit`
                    );
                }
            })
            .catch(() => {
                alert("Unable to dave document.");
            });
    };

    const [playing, setPlaying] = React.useState(false);
    const [ready, setReady] = React.useState(false);
    const [readyToLoad, setReadyToLoad] = React.useState(false);
    const [theme, setTheme] = React.useState<Theme>(theme_ || "light");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        const t = window.localStorage.getItem("theme");
        if (t) setTheme(t as Theme);
        if (setTheme_) setTheme_(t as Theme);
    });

    interface SelectBoxItemSpec {
        text: string;
        value: string;
        lang: string;
    }

    const voices: SelectBoxItemSpec[] = [];
    const voice: SelectBoxItemSpec = {
        text: "Unknown Voice",
        value: "-1",
        lang: "en-US",
    };

    React.useEffect(() => {
        window.addEventListener("load", () => {
            const synth = window.speechSynthesis;
            setInterval(handleFormSubmit, 5000);
            synth.addEventListener("voiceschanged", () => {
                const voices_ = synth.getVoices();
                if (voices_.length == 0) return;
                for (let i = 0; i < voices_.length; i++) {
                    const v = voices_[i];
                    voices.push({
                        text: v.name,
                        value: i + "",
                        lang: v.lang,
                    });
                }

                setRVoice(
                    getVoiceByLang("en-US") || {
                        text: voices[4].text,
                        value: 4 + "",
                        lang: "en-US",
                    }
                );
                const s_ = new SpeechSynthesisUtterance("test");
                s_.lang = "en-US";
                for (let i = 0; i < voices.length; i++) {
                    if (voices[i].text == s_.voice?.name) {
                        setRVoice(voices[i]);
                    }
                }
                setRVoices(voices);
                setReady(true);
            });
        });
    });

    const [RVoices, setRVoices] = React.useState(voices);
    const [RVoice, setRVoice] = React.useState(voice);

    const getVoiceByLang = (lang: string) =>
        RVoices.find((v) => v.lang == lang);

    return (
        <>
            <GlobalEditorStyles />
            {theme == "light" ? <LightEditorMode /> : <></>}
            {theme == "dark" ? <DarkEditorMode /> : <></>}
            {theme == "light-dyslexic" ? <DyslexicMode /> : <></>}
            {theme == "dark-dyslexic" ? <DyslexicMode /> : <></>}
            {ready ? (
                <>
                    <iframe
                        name="dummy"
                        id="dummy"
                        style={{ display: "none" }}
                    />
                    <form
                        spellCheck={false}
                        id="_3ditor_form"
                        target="dummy"
                        className="_3ditor_form"
                    >
                        {documentId ? (
                            <>
                                <input
                                    type="text"
                                    name="_3ditor_doc_id"
                                    id="_3ditor_doc_id"
                                    defaultValue={documentId}
                                    style={{ display: "none" }}
                                    onSubmit={handleFormSubmit}
                                />
                            </>
                        ) : (
                            <></>
                        )}
                        <TinyMCE.Editor
                            textareaName="_3ditor_content"
                            id="_3ditor_content"
                            initialValue={documentContent || ""}
                            onSubmit={handleFormSubmit}
                            onInit={() => {
                                setReadyToLoad(true);
                            }}
                            onSaveContent={handleFormSubmit}
                            init={{
                                height: "100vh",
                                readonly: readOnly,
                                menu: {
                                    tts: {
                                        title: "TTS",
                                        items: "activatetts ttsconfig",
                                    },
                                    file: {
                                        title: "File",
                                        items: "newdoc restoredraft export | preview | print ",
                                    },
                                    edit: {
                                        title: "Edit",
                                        items: "undo redo | cut copy paste pastetext | selectall | searchreplace",
                                    },
                                    view: {
                                        title: "View",
                                        items: "code | visualaid visualchars visualblocks themeconfig | spellchecker | preview fullscreen",
                                    },
                                    insert: {
                                        title: "Insert",
                                        items: "image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime",
                                    },
                                    format: {
                                        title: "Format",
                                        items: "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat",
                                    },
                                    tools: {
                                        title: "Tools",
                                        items: "spellchecker spellcheckerlanguage | sourcecode wordcount | headings",
                                    },
                                    table: {
                                        title: "Table",
                                        items: "inserttable | cell row column | tableprops deletetable",
                                    },
                                    help: { title: "Help", items: "help" },
                                },
                                menubar: readOnly
                                    ? false
                                    : "file edit view insert format tools tts table help | saving",
                                plugins: [
                                    "print preview paste importcss searchreplace autolink autosave save directionality code",
                                    "visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak",
                                    "nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help",
                                    "charmap quickbars emoticons spellchecker opendocs-editor",
                                ],
                                contextmenu: readOnly
                                    ? false
                                    : "link linkchecker | image imagetools | lists configurepermanentpen | table | spellchecker addtodictionary",
                                toolbar: readOnly
                                    ? false
                                    : "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect \
                    | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor \
                    backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile \
                    image media template link anchor codesample | ltr rtl rtc",
                                font_formats:
                                    "Andale Mono=andale mono,times;\
                    Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; \
                    Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; \
                    Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; \
                    Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; \
                    Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; \
                    Webdings=webdings; Wingdings=wingdings,zapf dingbats; OpenDyslexic 2=OpenDyslexic Two; \
                    OpenDyslexic 3=OpenDyslexic Three; OpenDyslexic Alta=OpenDyslexic Alta; OpenDyslexic Mono=OpenDyslexic Mono;",
                                branding: false,
                                id: "_3ditor_tinymce",
                                spellchecker_rpc_url: `${window.location.protocol}//${window.location.hostname}/api/v1/editor/spellchecker/check`,
                                images_upload_handler: (
                                    blob,
                                    success,
                                    fail,
                                    progress
                                ) => {
                                    let xhr: XMLHttpRequest;
                                    let formData: FormData;

                                    xhr = new XMLHttpRequest();
                                    xhr.withCredentials = false;
                                    xhr.open(
                                        "POST",
                                        `${window.location.protocol}//${window.location.hostname}/api/v1/editor/image/upload`
                                    );

                                    xhr.upload.onprogress = function (e) {
                                        console.log(
                                            `Progress: ${
                                                (e.loaded / e.total) * 100
                                            }%`
                                        );

                                        if (progress)
                                            progress(
                                                (e.loaded / e.total) * 100
                                            );
                                    };

                                    xhr.onload = function () {
                                        console.log(`Loaded: ${xhr.status}`);

                                        var json;

                                        if (xhr.status === 403) {
                                            fail("HTTP Error: " + xhr.status, {
                                                remove: true,
                                            });
                                            return;
                                        }

                                        if (
                                            xhr.status < 200 ||
                                            xhr.status >= 300
                                        ) {
                                            fail("HTTP Error: " + xhr.status);
                                            return;
                                        }

                                        json = JSON.parse(xhr.responseText);

                                        if (
                                            !json ||
                                            typeof json.location != "string"
                                        ) {
                                            fail(
                                                "Invalid JSON: " +
                                                    xhr.responseText
                                            );
                                            return;
                                        }

                                        success(json.location);
                                    };

                                    xhr.onerror = function () {
                                        console.log(
                                            "Image upload failed due to a XHR Transport error. Code: " +
                                                xhr.status
                                        );
                                        fail(
                                            "Image upload failed due to a XHR Transport error. Code: " +
                                                xhr.status
                                        );
                                    };

                                    console.log("Appending formData");

                                    formData = new FormData();
                                    formData.append(
                                        "_3ditor_upload",
                                        blob.blob(),
                                        blob.filename()
                                    );

                                    console.log(formData);

                                    console.log("Sending request");

                                    xhr.send(formData);
                                },
                                content_style: `@import url('/fonts/opendyslexic${
                                    theme == "light-dyslexic" ||
                                    theme == "dark-dyslexic"
                                        ? ".dyslexia"
                                        : ""
                                }${
                                    theme == "dark" || theme == "dark-dyslexic"
                                        ? ".dark"
                                        : ""
                                }.css');`,
                                content_css:
                                    theme == "dark" || theme == "dark-dyslexic"
                                        ? "dark"
                                        : "default",
                                skin:
                                    theme == "dark" || theme == "dark-dyslexic"
                                        ? "oxide-dark"
                                        : "oxide",
                                browser_spellcheck: false,
                                gecko_spellcheck: false,
                                setup: async (editor) => {
                                    // Disable built-in spellcheck
                                    editor.getElement().spellcheck = false;

                                    // Prepare speech synthesis
                                    const s = new SpeechSynthesisUtterance(
                                        "Prep"
                                    );
                                    s.voice = speechSynthesis.getVoices()[4];
                                    s.lang = "en";
                                    s.rate = 1;
                                    s.volume = 0;
                                    speechSynthesis.speak(s);
                                    speechSynthesis.cancel();

                                    // Custom code menu
                                    editor.ui.registry.addMenuItem(
                                        "sourcecode",
                                        {
                                            text: "Source code",
                                            icon: "sourcecode",
                                            onAction: async () => {
                                                editor.windowManager.open({
                                                    title: "Source Code",
                                                    body: {
                                                        type: "panel",
                                                        items: [
                                                            {
                                                                type: "iframe",
                                                                name: "_3ditor_code_editor",
                                                            },
                                                        ],
                                                        classes: [
                                                            "_3ditor_code_dialog",
                                                        ],
                                                    },
                                                    size: "large",
                                                    buttons: [
                                                        {
                                                            text: "Ok",
                                                            type: "submit",
                                                        },
                                                        {
                                                            text: "Cancel",
                                                            type: "cancel",
                                                        },
                                                    ],
                                                    onSubmit: (api) => {
                                                        const frame =
                                                            document.querySelector(
                                                                ".tox-navobj > iframe"
                                                            ) as HTMLIFrameElement;
                                                        editor.setContent(
                                                            (
                                                                frame.contentWindow as Window & {
                                                                    editor: monaco.editor.IStandaloneCodeEditor;
                                                                }
                                                            )?.editor.getValue()
                                                        );
                                                        handleFormSubmit();
                                                        api.close();
                                                    },
                                                    initialData: {
                                                        _3ditor_code_editor: `
                                                        <!DOCTYPE html>
                                                        <html>
                                                            <head>
                                                                <title>3ditor Embedded Code Editor</title>
                                                                <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
                                                                <style>
                                                                    html,
                                                                    body {
                                                                        height: 100%;
                                                                        margin: 0;
                                                                        width: 100%;
                                                                        padding: 0;
                                                                    }
                                                                </style>
                                                            </head>
                                                            <body>
                                                                <div id="_3ditor_code_editor" style="height: 100%; width: 100%"></div>
                                                                <script src="/monaco/min/vs/loader.js"></script>
                                                                <script>
                                                                    require.config({ paths: { vs: "/monaco/min/vs" } });
                                                        
                                                                    require(["vs/editor/editor.main"], function () {
                                                                        var editor = monaco.editor.create(document.getElementById("_3ditor_code_editor"), {
                                                                            value: \`${editor.getContent()}\`,
                                                                            language: "html",
                                                                            theme: "vs-dark"
                                                                        });
                                                                        window.editor = editor;
                                                                    });
                                                                </script>
                                                            </body>
                                                        </html>                                                        
                                                        `,
                                                    },
                                                });
                                            },
                                        }
                                    );

                                    // Add to dictionary context menu
                                    editor.ui.registry.addMenuItem(
                                        "addtodictionary",
                                        {
                                            text: "Add to Dictionary",
                                            icon: "bookmark",
                                            onAction: async () => {
                                                await axios.post(
                                                    `${window.location.protocol}//${window.location.hostname}/api/v1/editor/spellchecker/check`,
                                                    {
                                                        method: "addtodictionary",
                                                        lang: "en",
                                                        text: editor.selection.getContent(),
                                                    }
                                                );
                                            },
                                        }
                                    );

                                    // Exporting
                                    editor.ui.registry.addNestedMenuItem(
                                        "export",
                                        {
                                            text: "Export",
                                            icon: "export",
                                            getSubmenuItems: () => {
                                                return [
                                                    {
                                                        text: "Word",
                                                        type: "menuitem",
                                                        icon: "document-properties",
                                                        onAction: () => {
                                                            const a =
                                                                document.createElement(
                                                                    "a"
                                                                );
                                                            a.href = `${
                                                                window.location
                                                                    .protocol
                                                            }//${
                                                                window.location
                                                                    .host
                                                            }/api/v1/editor/export/word?content=${encodeURIComponent(
                                                                btoa(
                                                                    editor.getContent()
                                                                )
                                                            )}`;
                                                            a.style.visibility =
                                                                "hidden";
                                                            document.body.appendChild(
                                                                a
                                                            );
                                                            a.click();
                                                            a.remove();
                                                        },
                                                    },
                                                    {
                                                        text: "Google Docs",
                                                        type: "menuitem",
                                                        icon: "document-properties",
                                                        onAction: async () => {
                                                            const c =
                                                                await authorize(
                                                                    {
                                                                        client_id:
                                                                            process
                                                                                .env
                                                                                .G_DOCS_CLIENT_ID ||
                                                                            "",
                                                                        client_secret:
                                                                            process
                                                                                .env
                                                                                .G_DOCS_CLIENT_SECRET ||
                                                                            "",
                                                                        redirect_uri:
                                                                            process
                                                                                .env
                                                                                .G_DOCS_CALLBACK_URL ||
                                                                            "",
                                                                    }
                                                                );
                                                            console.log(
                                                                "Authorized!"
                                                            );
                                                            window.open(c.url);
                                                        },
                                                    },
                                                ];
                                            },
                                        }
                                    );

                                    // Initialize headings sidebar
                                    editor.ui.registry.addSidebar(
                                        "headings-sidebar",
                                        {
                                            tooltip:
                                                "Headings in the document.",
                                            icon: "list-num-lower-roman",
                                            onSetup: (api) => {
                                                console.log(
                                                    "Render panel",
                                                    api.element()
                                                );
                                                return () => {};
                                            },
                                            onShow: (api) => {
                                                console.log(
                                                    "Show panel",
                                                    api.element()
                                                );
                                                api.element().innerHTML =
                                                    "Hello world!";
                                                return () => {};
                                            },
                                            onHide: (api) => {
                                                console.log(
                                                    "Hide panel",
                                                    api.element()
                                                );
                                                return () => {};
                                            },
                                        }
                                    );

                                    // Headings sidebar button
                                    editor.ui.registry.addMenuItem("headings", {
                                        text: "Headings",
                                        icon: "list-num-lower-roman",
                                        onAction: () => {
                                            editor.execCommand(
                                                "togglesidebar",
                                                false,
                                                "headers"
                                            );
                                        },
                                    });

                                    // New document
                                    editor.ui.registry.addMenuItem("newdoc", {
                                        text: "New document",
                                        icon: "document-properties",
                                        onAction: () => {
                                            window.location.replace("/");
                                        },
                                    });

                                    // TTS Configuration
                                    editor.ui.registry.addMenuItem(
                                        "ttsconfig",
                                        {
                                            text: "Text to Speech Settings",
                                            onAction: async () => {
                                                editor.windowManager.open({
                                                    title: "Text to Speech Settings",
                                                    body: {
                                                        type: "panel",
                                                        items: [
                                                            {
                                                                type: "selectbox",
                                                                name: "voice",
                                                                items: RVoices,
                                                                label: `Select a TTS Voice (Current: ${RVoice.text})`,
                                                            },
                                                        ],
                                                    },
                                                    onChange: (api) => {
                                                        const data: any =
                                                            api.getData();
                                                        const sel = data.voice;
                                                        for (
                                                            let i = 0;
                                                            i < RVoices.length;
                                                            i++
                                                        ) {
                                                            const v =
                                                                RVoices[i];
                                                            if (
                                                                v.value ==
                                                                sel.toString()
                                                            ) {
                                                                setRVoice(v);
                                                                break;
                                                            }
                                                        }
                                                    },
                                                    onAction: (api) => {
                                                        const data: any =
                                                            api.getData();
                                                        const sel = data.voice;
                                                        for (
                                                            let i = 0;
                                                            i < RVoices.length;
                                                            i++
                                                        ) {
                                                            const v =
                                                                RVoices[i];
                                                            if (
                                                                v.value ==
                                                                sel.toString()
                                                            ) {
                                                                setRVoice(v);
                                                                break;
                                                            }
                                                        }
                                                    },
                                                    buttons: [
                                                        {
                                                            text: "Ok",
                                                            type: "submit",
                                                        },
                                                        {
                                                            text: "Cancel",
                                                            type: "cancel",
                                                        },
                                                    ],
                                                    onSubmit: (api) => {
                                                        const data: any =
                                                            api.getData();
                                                        const sel = data.voice;
                                                        for (
                                                            let i = 0;
                                                            i < RVoices.length;
                                                            i++
                                                        ) {
                                                            const v =
                                                                RVoices[i];
                                                            if (
                                                                v.value ==
                                                                sel.toString()
                                                            ) {
                                                                setRVoice(v);
                                                                break;
                                                            }
                                                        }
                                                        api.close();
                                                    },
                                                });
                                            },
                                        }
                                    );

                                    // Initialize TTS
                                    editor.ui.registry.addMenuItem(
                                        "activatetts",
                                        {
                                            text: "Text to Speech",
                                            onAction: async () => {
                                                if (playing === true) {
                                                    if (
                                                        speechSynthesis.speaking
                                                    )
                                                        speechSynthesis.cancel();
                                                    setPlaying(false);
                                                    return;
                                                }
                                                setPlaying(true);
                                                const content =
                                                    editor.getContent({
                                                        format: "text",
                                                    });
                                                const splitted =
                                                    content.split(
                                                        /(?:\.|\,|\?|\!|\-)/gm
                                                    );
                                                for (
                                                    let i = 0;
                                                    i < splitted.length;
                                                    i++
                                                ) {
                                                    const word = splitted[i];
                                                    editor.setContent(
                                                        editor
                                                            .getContent()
                                                            .replace(
                                                                word,
                                                                `<span class="speaking">${word}</span>`
                                                            )
                                                    );
                                                    await new Promise((r) => {
                                                        const s =
                                                            new SpeechSynthesisUtterance(
                                                                word
                                                            );
                                                        if (
                                                            parseInt(
                                                                RVoice.value
                                                            ) != -1
                                                        )
                                                            s.voice =
                                                                speechSynthesis.getVoices()[
                                                                    parseInt(
                                                                        RVoice.value
                                                                    )
                                                                ];
                                                        s.lang = "en";
                                                        s.rate = 1;
                                                        s.addEventListener(
                                                            "end",
                                                            (e) => r(e)
                                                        );
                                                        speechSynthesis.speak(
                                                            s
                                                        );
                                                    });
                                                    editor.setContent(
                                                        editor
                                                            .getContent()
                                                            .replace(
                                                                `<span class="speaking">${word}</span>`,
                                                                word
                                                            )
                                                    );
                                                }
                                                setPlaying(false);
                                                return;
                                            },
                                        }
                                    );

                                    // Theme config
                                    editor.ui.registry.addMenuItem(
                                        "themeconfig",
                                        {
                                            text: "Change Theme",
                                            icon: "contrast",
                                            onAction: async () => {
                                                editor.windowManager.open({
                                                    title: "Change Theme",
                                                    body: {
                                                        type: "panel",
                                                        items: [
                                                            {
                                                                type: "selectbox",
                                                                name: "theme",
                                                                items: [
                                                                    {
                                                                        text: "Light Theme",
                                                                        value: "light",
                                                                    },
                                                                    {
                                                                        text: "Dark Theme",
                                                                        value: "dark",
                                                                    },
                                                                    {
                                                                        text: "Dyslexic Light Theme",
                                                                        value: "light-dyslexic",
                                                                    },
                                                                    {
                                                                        text: "Dyslexic Dark Theme",
                                                                        value: "dark-dyslexic",
                                                                    },
                                                                ],
                                                                label: `Select a theme (Current: ${
                                                                    theme ==
                                                                    "light"
                                                                        ? "Light"
                                                                        : theme ==
                                                                          "dark"
                                                                        ? "Dark"
                                                                        : theme ==
                                                                          "dark-dyslexic"
                                                                        ? "Dyslexic Dark"
                                                                        : theme ==
                                                                          "light-dyslexic"
                                                                        ? "Dyslexic Light"
                                                                        : "Unknown"
                                                                })`,
                                                            },
                                                        ],
                                                    },
                                                    onChange: (api) => {
                                                        const data: any =
                                                            api.getData();
                                                        const sel = data.theme;
                                                        if (setTheme)
                                                            setTheme(
                                                                (sel.toString() as Theme) ||
                                                                    theme
                                                            );
                                                        if (setTheme_)
                                                            setTheme_(
                                                                (sel.toString() as Theme) ||
                                                                    theme
                                                            );
                                                        window.localStorage.setItem(
                                                            "theme",
                                                            (sel.toString() as Theme) ||
                                                                theme
                                                        );
                                                        handleFormSubmit();
                                                        window.location.reload();
                                                    },
                                                    buttons: [
                                                        {
                                                            text: "Ok",
                                                            type: "submit",
                                                        },
                                                        {
                                                            text: "Cancel",
                                                            type: "cancel",
                                                        },
                                                    ],
                                                    onSubmit: (api) => {
                                                        const data: any =
                                                            api.getData();
                                                        const sel = data.theme;
                                                        if (setTheme)
                                                            setTheme(
                                                                (sel.toString() as Theme) ||
                                                                    theme
                                                            );
                                                        if (setTheme_)
                                                            setTheme_(
                                                                (sel.toString() as Theme) ||
                                                                    theme
                                                            );
                                                        window.localStorage.setItem(
                                                            "theme",
                                                            (sel.toString() as Theme) ||
                                                                theme
                                                        );
                                                        handleFormSubmit();
                                                        window.location.reload();
                                                        api.close();
                                                    },
                                                });
                                            },
                                        }
                                    );
                                },
                            }}
                            tinymceScriptSrc={`${window.location.protocol}//${window.location.hostname}/tinymce/js/tinymce/tinymce.min.js`}
                        />
                    </form>
                    <GrammarlyButton className="grammarlyButton" />
                    {readyToLoad ? (
                        <></>
                    ) : (
                        <>
                            <div
                                className="loader_container2"
                                style={{
                                    display: readyToLoad ? "none" : "flex",
                                }}
                            >
                                <div className="loader2" />
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    <div className="loader_container">
                        <div className="loader" />
                    </div>
                </>
            )}
        </>
    );
};

export default Editor;
