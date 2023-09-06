import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import EditorNavbar from '../Editor/EditorNavbar';
import Axios from 'axios'


const CodeEditor = () => {
    const compilerHeight = 'calc(100vh - 4.1rem)';

    const [language, setLanguage] = useState("java");
    const [theme, setTheme] = useState("vs-dark");
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState("");
    const [input, setInput] = useState("");
    const [userCode, setUserCode] = useState("");



    const handleValidation = (markers) => {
        markers.forEach((marker) => {
            console.log("Marker Validation: " + marker.message);
        });
    }

    const clearOutput = () => {
        setOutput("")
    }

    const handleTheme = (e) => {
        setTheme(e.target.value);
    }

    const handleLanguage = (e) => {
        setLanguage(e.target.value);
        // setTimeout(() => {
        //     console.log(language);
        //     if (language == "PYTHON3") return;

        // }, 2000);

        // setInterval(() => {
        //     console.log(language);
        //     //if (language == "PYTHON3") return;

        // }, 2000);
    }

    const compile = async (e) => {
        console.log(language);
        setLoading(true);
        if (userCode === "") return;

        try {
            console.log("Hi");
            await Axios.post(`http://localhost:8080/compile`, {
                code: userCode,
                language: language,
                input: input
            }).then((res) => {
                let response = res.data.result;
                if (res.data.error != "undefined")
                    response = response + "\n" + res.data.error;
                setOutput(response);
                console.log(res.data.result);
            }).then(() => {
                setLoading(false);
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    const recordInput = (e) => {
        setInput(e.target.value);
        console.log(input);
    }

    const options = {
        autoIndent: 'full',
        contextmenu: true,
        fontFamily: 'monospace',
        fontSize: 16,
        lineHeight: 27,
        hideCursorInOverviewRuler: true,
        matchBrackets: 'always',
        minimap: {
            enabled: true,
        },
        scrollbar: {
            horizontalSliderSize: 4,
            verticalSliderSize: 18,
        },
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true,
    };

    return (<>
        <EditorNavbar handleLanguage={handleLanguage} handleTheme={handleTheme} compile={compile} />
        <div className='flex flex-row'>
            <div>
                <Editor
                    height={compilerHeight}
                    width={"50vw"}
                    defaultLanguage={language}
                    defaultValue=""
                    onValidate={handleValidation}
                    theme={theme}
                    options={options}
                    onChange={(value) => { setUserCode(value); }}
                />
            </div>
            <div className='w-1/2 flex flex-col' style={{ backgroundColor: "rgb(30, 30, 30" }}>
                <div className='w-full h-1/2 p-4 text-lg'>
                    <div><h4 className='text-white'>Input:</h4></div>
                    <div>

                        {/* lg-screen */}
                        <textarea name="input-screen" id="" cols="80" rows="10" style={{ backgroundColor: "rgb(30,30,30)", color: "white" }} onChange={recordInput} className='hidden lg:block'></textarea>

                        {/* small screen */}
                        <textarea name="input-screen" id="" rows="8" style={{ backgroundColor: "rgb(30,30,30)", color: "white" }} onChange={recordInput} className='lg:hidden'></textarea>
                    </div>

                </div>
                <hr className='bg-white' />
                <div className='w-full h-1/2 p-4 text-lg overflow-auto'>
                    <div><h4 className='text-white'>Output:</h4></div>
                    {
                        loading ?
                            <div></div>
                            :
                            <div className='h-full w-full'>
                                <pre className='text-white font-extralight text-normal'>
                                    {
                                        output
                                    }
                                </pre>
                                <div className=''>
                                    <button className=' h-10 bg-lime-600 w-auto p-2 text-white align-middle rounded-lg hover:bg-lime-800 fixed bottom-1 ' onClick={clearOutput}>Clear Output</button>
                                </div>
                            </div>
                    }
                </div>
                <div></div>
            </div>
        </div>
    </>
    )
}

export default CodeEditor;