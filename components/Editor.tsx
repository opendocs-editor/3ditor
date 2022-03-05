import React from "react";
import * as TinyMCE from "@tinymce/tinymce-react";
import * as tts from "google-tts-api";
import axios from "axios";

interface HandleEditorChangeResult {
    target: {
        getContent: () => any;
    };
}

type EditorState = {
    playing: boolean;
};

class Editor extends React.Component {
    handleEditorChange = (e: HandleEditorChangeResult) => {
        console.log(`Content was updated: `, e.target.getContent());
    };

    state: EditorState = {
        playing: false,
    };

    render() {
        return (
            <TinyMCE.Editor
                initialValue=""
                init={{
                    height: "100vh",
                    menu: {
                        tts: {
                            title: "TTS",
                            items: "activatetts",
                        },
                        file: {
                            title: "File",
                            items: "newdocument restoredraft | preview | print ",
                        },
                        edit: {
                            title: "Edit",
                            items: "undo redo | cut copy paste pastetext | selectall | searchreplace",
                        },
                        view: {
                            title: "View",
                            items: "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen",
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
                            items: "spellchecker spellcheckerlanguage | code wordcount",
                        },
                        table: {
                            title: "Table",
                            items: "inserttable | cell row column | tableprops deletetable",
                        },
                        help: { title: "Help", items: "help" },
                    },
                    menubar:
                        "file edit view insert format tools tts table help",
                    plugins: [
                        "print preview paste importcss searchreplace autolink autosave save directionality code",
                        "visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak",
                        "nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help",
                        "charmap quickbars emoticons opendocs-editor",
                    ],
                    toolbar:
                        "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect \
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
                    images_upload_url:
                        "https://docs.nosadnile.net/api/v1/editor/image/upload",
                    content_style: "@import url('/3ditor/fonts/opendyslexic.css');",
                    setup: (editor) => {
                        const s = new SpeechSynthesisUtterance("Prep");
                        s.voice = speechSynthesis.getVoices()[4];
                        s.lang = "en";
                        s.rate = 1;
                        s.volume = 0;
                        speechSynthesis.speak(s);
                        speechSynthesis.cancel();
                        // Initialize headings sidebar
                        editor.ui.registry.addSidebar("headings-sidebar", {
                            tooltip: "Headings in the document.",
                            icon: "list-num-lower-roman",
                            onSetup: (api) => {
                                console.log("Render panel", api.element());
                                return () => {};
                            },
                            onShow: (api) => {
                                console.log("Show panel", api.element());
                                api.element().innerHTML = "Hello world!";
                                return () => {};
                            },
                            onHide: (api) => {
                                console.log("Hide panel", api.element());
                                return () => {};
                            },
                        });
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
                        // Initialize TTS
                        editor.ui.registry.addMenuItem("activatetts", {
                            text: "Text to Speech",
                            onAction: async () => {
                                if (this.state.playing) {
                                    if (speechSynthesis.speaking)
                                        speechSynthesis.cancel();
                                    this.state.playing = false;
                                    return;
                                }
                                this.state.playing = true;
                                const content = editor.getContent({
                                    format: "text",
                                });
                                const splitted = content.split(".");
                                for (let i = 0; i < splitted.length; i++) {
                                    if (!this.state.playing) break;
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
                                        const s = new SpeechSynthesisUtterance(
                                            word
                                        );
                                        s.voice =
                                            speechSynthesis.getVoices()[4];
                                        s.lang = "en";
                                        s.rate = 1;
                                        s.addEventListener("end", (e) => r(e));
                                        speechSynthesis.speak(s);
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
                                this.state.playing = false;
                            },
                        });
                    },
                }}
                tinymceScriptSrc={`./tinymce/js/tinymce/tinymce.min.js`}
            />
        );
    }
}

export default Editor;
