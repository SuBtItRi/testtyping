function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRandomText = async () => {
    try {
        const response = await fetch(
            `http://localhost:3052/facts/${getRandomNumber(1, 100)}`, //101
        )
        if (!response.ok) {
            throw new Error('Wtf, you stupid man!')
        }
        const result = await response.json()
        return result.text
    } catch {
        return 'error'
    }
}

async function fetchAndProcessLargeFile(url) {
    const response = await fetch(url)
    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let result = ''

    while (true) {
        const { done, value } = await reader.read()
        if (done) break

        // Обработка каждой части данных
        const chunk = decoder.decode(value, { stream: true })
        result += chunk
        console.log('Received chunk:', chunk.length)
    }

    console.log('File fully loaded')
    return JSON.parse(result) // Преобразуйте результат в JSON
}

export const getRandomWord = async () => {
    fetchAndProcessLargeFile(
        'https://media.githubusercontent.com/media/SuBtItRi/testtyping/main/words.json',
    )
        .then((data) => console.log('Parsed data:', data))
        .catch((error) => console.error('Error:', error))
}
