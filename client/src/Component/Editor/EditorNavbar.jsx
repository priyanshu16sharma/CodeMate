import React from 'react';

const SelectLanguage = ({ handleLanguage }) => {

    return (<>
        <div className=''>
            <label htmlFor="language" className='p-2'>Language: </label>
            <select name='language' id='language' className='border rounded-md text-black py-1 outline-none' onChange={handleLanguage}>
                <option value="CPP17">C++</option>
                <option value="c">C</option>
                <option value="PYTHON3">Python</option>
                <option value="javascript">Javascript</option>
                <option value="java" selected>Java</option>
            </select>

        </div>
    </>)
}

const SelectTheme = ({ handleTheme }) => {

    return (<>
        <div className=''>
            <label htmlFor="theme" className='p-2'>Theme: </label>
            <select name='theme' id='theme' className='border rounded-md text-black py-1 outline-none' onChange={handleTheme}>
                <option value="vs-dark">Dark</option>
                <option value="light">Light</option>
            </select>

        </div>
    </>)
}

const EditorNavbar = ({ handleLanguage, handleTheme, compile }) => {
    return (
        <>
            <div className='h-16 text-white flex flex-row gap-4' style={{ backgroundColor: "rgb(28, 28, 28)" }}>
                <div className="h-full flex items-center p-5 text-xl font-medium">
                    Priyanshu's Editor
                </div>
                <div className='h-full flex items-center '>
                    <SelectLanguage handleLanguage={handleLanguage} />
                </div>
                <div className='h-full flex items-center '>
                    <SelectTheme handleTheme={handleTheme} />
                </div>
                <div className="h-full flex items-center ">
                    <button className='fixed right-3 rounded-md px-4 text-lg bg-blue-400 hover:bg-blue-600 h-10 w-auto align-middle' onClick={compile}>Run</button>
                </div>
            </div>

            <hr className='bg-slate-800' />
        </>
    )
}

export default EditorNavbar;