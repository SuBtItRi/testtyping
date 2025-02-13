interface WindowWinProps {
    text: string
    speed: number
    accuracy: number
    wrongLetters: number
    startTest: () => void
}

function WindowWin({ text, speed, accuracy, wrongLetters, startTest }: WindowWinProps) {
    return (
        <div className="window-win">
            <h2>Тест закончен, ваши результаты:</h2>
            <div className='block-info settings-bi'>
                <div className='speed bie'>
                    <h3>Скорость</h3>
                    <h4>
                        {String(Math.round(speed)) == 'Infinity' ? 0 : Math.round(speed)} букв/мин
                    </h4>
                </div>
                <div className='accuracy bie'>
                    <h3>Точность</h3>
                    <h4>{Math.round(accuracy)}%</h4>
                    <h4>{wrongLetters} ошибок</h4>
                </div>
                <div className='textLength bie'>
                    <h3>Длинна текста</h3>
                    <h4>
                        {text.length} букв
                        {(() => {
                            const lastDigit = text.length % 10
                            if (lastDigit === 1) {
                                return 'а'
                            } else if ([2, 3, 4].includes(lastDigit)) {
                                return 'ы'
                            }
                        })()}
                    </h4>
                </div>
            </div>
            <button className='restart' onClick={() => startTest()}>
                Новый тест
            </button>
            <p className='help-text'>При нажатии Enter, появиться новый текст</p>
        </div>
    )
}

export default WindowWin
