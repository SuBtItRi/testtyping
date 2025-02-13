import { useEffect, useRef, useState } from 'react'
import './App.scss'
import { getRandomText, getRandomWord } from './api'
import Settings from './components/Settings'
import WindowMain from './components/WindowMain'
import Keyboard from './components/keyboard'

function App() {
    const [show, setShow] = useState(true)
    const [settingsHide, setSettingsHide] = useState(true)
    const [mode, setMode] = useState<number>(0)
    const [speed, setSpeed] = useState(0)
    const [time, setTime] = useState(0)
    const [startTime, setStartTime] = useState(false)
    const [accuracy, setAccuracy] = useState(100)
    const [text, setText] = useState('')
    const [pastText, setPastText] = useState('')
    const [futureText, setFutureText] = useState('')
    const [wrongLetters, setWrongLetters] = useState(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Start test typing
    const getText = async () => {
        if (mode == 0) {
            const randomText = await getRandomText()
            setText(randomText)
            setFutureText(randomText)
        }
        if (mode >= 1) {
            let randomWords: string = String(
                await Promise.all(
                    Array(mode * 5)
                        .fill(0)
                        .map(async () => {
                            const randomWord = await getRandomWord()
                            return ` ${randomWord}`
                        }),
                ),
            )
            randomWords = randomWords.replace(/,/g, '')
            setText(randomWords.replace(' ', ''))
            setFutureText(randomWords.replace(' ', ''))
        }
        setPastText('')
    }

    const startTest = () => {
        getText()

        setShow(false)

        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current)
        }
        setStartTime(false)
        setSpeed(0)
        setTime(0)

        setWrongLetters(0)
        setAccuracy(100)
    }

    // Звапуск секундомера
    useEffect(() => {
        if (startTime) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1)
            }, 1000)
        }
    }, [startTime])

    // Высчитывание точности
    useEffect(() => {
        setSpeed((pastText.length / time) * 60)
    }, [time])

    // Описывание нажатия кнопок
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // console.log(`Нажата клавиша: ${event.key}`,futureText.slice(0, 1), futureText.slice(1))
            if (event.key == 'Enter') {
                document.body.querySelector('#currentLetter')?.classList.remove('wrong')
                startTest()
            }
            if (event.key.length == 1) {
                if (futureText.length == 1) {
                    console.log('pobeda!')
                    if (intervalRef.current !== null) {
                        clearInterval(intervalRef.current)
                    }
                }
                if (event.key == futureText.slice(0, 1)) {
                    document.body.querySelector('#currentLetter')?.classList.remove('wrong')
                    setPastText(pastText + futureText.slice(0, 1))
                    setFutureText(futureText.slice(1))
                    setStartTime(true)
                    // console.log('right letter pressed', futureText.length)
                } else {
                    document.body.querySelector('#currentLetter')?.classList.add('wrong')
                    setWrongLetters(wrongLetters + 1)
                    // console.log('wrong letter pressed')
                }
            }
        }

        window.addEventListener('keydown', handleKeyPress)

        return () => {
            window.removeEventListener('keydown', handleKeyPress)
        }
    }, [futureText])

    useEffect(() => {
        setAccuracy(100 - (wrongLetters * 100) / text.length)
    }, [text.length, wrongLetters])

    useEffect(() => {
        if (!show) {
            startTest()
        } else {
            getText()
        }
    }, [settingsHide])

    return (
        <main>
            <div className='container'>
                <img
                    src='/settings.svg'
                    alt=''
                    className='settings-icon'
                    onClick={() => {
                        setSettingsHide(!settingsHide)
                        getRandomText()
                    }}
                />
                <img
                    src='/back.svg'
                    alt=''
                    className='back-btn'
                    style={settingsHide && show ? { display: 'none' } : { display: 'flex' }}
                    onClick={() => {
                        setShow(true)
                        setSettingsHide(true)
                    }}
                />
                {settingsHide && (
                    <>
                        {show ? (
                            <div className='window-start'>
                                <img src='' alt='' />
                                <h2>Приготовьте к набору текста. Go go go!</h2>
                                <select
                                    name='mode'
                                    id=''
                                    onChange={(e) => setMode(parseInt(e.target.value))}
                                    value={mode}
                                >
                                    <option value={0}>Интересный факт (10-30 слов)</option>
                                    <option value={1}>Рандомные 5 слов</option>
                                    <option value={2}>Рандомные 10 слов</option>
                                    <option value={3}>Рандомные 15 слов</option>
                                </select>
                                <button className='start' onClick={() => startTest()}>
                                    Начать тест
                                </button>
                            </div>
                        ) : (
                            <WindowMain
                                text={text}
                                pastText={pastText}
                                currentLetter={futureText.slice(0, 1)}
                                futureText={futureText.slice(1)}
                                speed={speed}
                                accuracy={accuracy}
                                wrongLetters={wrongLetters}
                                startTest={startTest}
                            />
                        )}
                    </>
                )}
                <Settings text={text} show={show} settingsHide={settingsHide} />
            </div>
            <Keyboard />
        </main>
    )
}

export default App
