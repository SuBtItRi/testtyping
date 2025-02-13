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

export const getRandomWord = async () => {
    try {
        const response = await fetch(`http://localhost:3053/words/${getRandomNumber(1, 1532628)}`)
        if (!response.ok) {
            throw new Error('Wtf, you stupid man!')
        }
        const result = await response.json()
        return result.word
    } catch {
        return 'error'
    }
}
