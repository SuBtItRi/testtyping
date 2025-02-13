interface WindowMainProps {
  text:string
  pastText:string
  currentLetter:string
  futureText:string
  speed:number
  wrongLetters:number
  accuracy:number
  startTest:() => void
}

function WindowMain({
    text,
    pastText,
    currentLetter,
    futureText,
    speed,
    wrongLetters,
    accuracy,
    startTest,
}: WindowMainProps) {
    return (
        <div className='window-main'>
            <div className='block-text'>
                <h4>
                    <span className='past-text'>{pastText}</span>
                    <span
                        className='current-letter'
                        id='currentLetter'
                        style={{ textDecoration: 'underline' }}
                    >
                        {currentLetter}
                    </span>
                    <span className='future-text'>{futureText}</span>
                </h4>
            </div>
            <div className='block-info'>
                <div className='speed'>
                    <h3>Скорость</h3>
                    <h4>{String(Math.round(speed)) == 'Infinity' ? 0 : Math.round(speed)} букв/сек</h4>
                </div>
                <div className='accuracy'>
                    <h3>Точность</h3>
                    <h4>{Math.round(accuracy)}%</h4>
                    <h4>{wrongLetters} ошибок</h4>
                </div>
                <div className='textLength'>
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
                <button className='restart' onClick={() => startTest()}>
                    Перезапустить
                </button>
            </div>
            <p className='help-text'>При нажатии Enter, появиться новый текст</p>
        </div>
    )
}

export default WindowMain
