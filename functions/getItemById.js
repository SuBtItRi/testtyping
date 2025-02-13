const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
    try {
        // Чтение db.json
        const dbPath = path.join(__dirname, '../db.json');
        const data = fs.readFileSync(dbPath, 'utf-8');
        const db = JSON.parse(data);

        // Получение id из параметров запроса
        const itemId = event.queryStringParameters.id;

        // Поиск элемента по id
        const item = db.find(item => item.id === itemId);

        if (item) {
            return {
                statusCode: 200,
                body: JSON.stringify(item),
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Элемент не найден' }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Ошибка сервера' }),
        };
    }
};