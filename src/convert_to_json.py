import json

# Читаем файл words.txt
with open('words.txt', 'r', encoding='utf-8') as file:
    words = [line.strip() for line in file if line.strip()]

# Создаем список словарей с id
json_data = {'words': [{'id': i + 1, 'word': word} for i, word in enumerate(words)]}

# Записываем в файл words.json
with open('words.json', 'w', encoding='utf-8') as json_file:
    json.dump(json_data, json_file, ensure_ascii=False, indent=2)

print('words.json создан успешно!')