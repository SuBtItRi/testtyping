import { useState, useEffect } from 'react'

function Settings({
    text,
    show,
    settingsHide,
}: {
    text: string
    show: boolean
    settingsHide: boolean
}) {
    const [letterSpacing, setLetterSpacing] = useState(
        localStorage.getItem('letterSpacing') || '0px',
    )
    const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || '24px')

    useEffect(() => {
        const elements = document.querySelectorAll('.block-text')
        elements.forEach((element) => {
            element.style.letterSpacing = `${letterSpacing}`
        })
        localStorage.setItem('letterSpacing', letterSpacing)
    }, [letterSpacing, show, settingsHide])

    useEffect(() => {
        const elements = document.querySelectorAll('.block-text')
        elements.forEach((element) => {
            element.style.fontSize = `${fontSize}`
        })
        localStorage.setItem('fontSize', fontSize)
    }, [fontSize, show, settingsHide])

    return (
        <div className='settings' style={settingsHide ? { display: 'none' } : { display: 'flex' }}>
            <h2 className='settings-title'>Настройки</h2>
            <h3>Настройки текста</h3>
            <div className='settings-category'>
                <div className='settings-category-elems'>
                    <div className='settings-category-elem'>
                        Размер
                        <select
                            name='font-size'
                            id=''
                            onChange={(e) => setFontSize(`${e.target.value}px`)}
                            value={parseInt(fontSize)}
                        >
                            {Array(9)
                                .fill(0)
                                .map((_, index) => (
                                    <option key={index} value={20 + index}>
                                        {20 + index}px
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className='settings-category-elem'>
                        Шрифт
                        <select name='font-family' id=''>
                            <option value=''></option>
                        </select>
                    </div>
                    <div className='settings-category-elem'>
                        letter spacing
                        <select
                            name='letter-spacing'
                            id=''
                            onChange={(e) => setLetterSpacing(`${e.target.value}px`)}
                            value={parseInt(letterSpacing)}
                        >
                            {Array(11)
                                .fill(0)
                                .map((_, index) => (
                                    <option key={index} value={index * 0.2}>
                                        {(index * 0.2).toFixed(1)}px
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className='settings-category-preview'>
                    <div className='block-text'>
                        <h4>{text.slice(0, 35)}...</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings
