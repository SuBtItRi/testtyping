import { useEffect, useState } from 'react'
import './style.scss'

function Keyboard() {
    const [pressedKeys, setPressedKeys] = useState({})
    const [isCapsLock, setIsCapsLock] = useState(false)

    const keys = [
        'Ё',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        '-',
        '=',
        'BACKSPACE',
        'TAB',
        'Й',
        'Ц',
        'У',
        'К',
        'Е',
        'Н',
        'Г',
        'Ш',
        'Щ',
        'З',
        'Х',
        'Ъ',
        '\\',
        'CAPSLOCK',
        'Ф',
        'Ы',
        'В',
        'А',
        'П',
        'Р',
        'О',
        'Л',
        'Д',
        'Ж',
        'Э',
        'ENTER',
        'L SHIFT',
        'Я',
        'Ч',
        'С',
        'М',
        'И',
        'Т',
        'Ь',
        'Б',
        'Ю',
        '.',
        'R SHIFT',
        'L CTRL',
        'L ALT',
        ' SPACE',
        'R ALT',
        'R CTRL',
    ]

    const wide_keys = [
        'BACKSPACE',
        'TAB',
        'ENTER',
        'L SHIFT',
        'R SHIFT',
        'CAPSLOCK',
        'L CTRL',
        'R CTRL',
        'L ALT',
        'R ALT',
        '\\',
    ]

    const handleKeyDown = (event) => {
        const key = `${event.location == 1 ? 'L ' : ''}${event.location == 2 ? 'R ' : ''}${
            event.key.toUpperCase() == 'CONTROL' ? 'CTRL' : event.key.toUpperCase()
        }${event.key == ' ' ? 'SPACE' : ''}`

        setIsCapsLock(event.getModifierState('CapsLock'))
        setPressedKeys((prev) => ({ ...prev, [key]: true }))
    }

    const handleKeyUp = (event) => {
        const key = `${event.location == 1 ? 'L ' : ''}${event.location == 2 ? 'R ' : ''}${
            event.key.toUpperCase() == 'CONTROL' ? 'CTRL' : event.key.toUpperCase()
        }${event.key == ' ' ? 'SPACE' : ''}`

        if (key != 'CAPSLOCK') {
            setPressedKeys((prev) => ({ ...prev, [key]: false }))
        } else {
            if (!event.getModifierState('CapsLock')) {
                setPressedKeys((prev) => ({ ...prev, [key]: false }))
            }
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return (
        <div className='keyboard'>
            {Array.from({ length: 5 }, (_, rowIndex) => (
                <div className='row' key={rowIndex}>
                    {keys
                        .slice(
                            rowIndex * 14 -
                                (rowIndex > 1 ? rowIndex - 2 : 0) -
                                (rowIndex > 3 ? 1 : 0),
                            rowIndex * 14 - (rowIndex > 1 ? 1 : 0) - (rowIndex > 2 ? 2 : 0) + 14,
                        )
                        .map((key, index) => (
                            <div
                                key={index}
                                id={key}
                                className={`key ${pressedKeys[key] ? 'pressed' : ''} ${
                                    wide_keys.includes(key) ? 'key-wide' : ''
                                } ${key === ' SPACE' ? 'key-superwide' : ''}`}
                            >
                                {key}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    )
}

export default Keyboard
