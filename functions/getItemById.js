// functions/getItemById.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Путь к файлу db.json
    const filePath = path.join(__dirname, '../../public/db.json');
    console.log('File path:', filePath);

    // Проверка существования файла
    if (!fs.existsSync(filePath)) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'File db.json not found' }),
      };
    }

    // Чтение и парсинг файла
    let data;
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Invalid JSON format in db.json' }),
      };
    }

    // Получение id из query-параметров
    const { id } = event.queryStringParameters;

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'ID is required' }),
      };
    }

    // Поиск элемента по id
    const item = data.items.find(item => item.id === parseInt(id));

    if (item) {
      return {
        statusCode: 200,
        body: JSON.stringify(item),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Item not found' }),
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};