from openpyxl import load_workbook
import json

debug = False

excel_table = 'public/DIGITAL_PORTFOLIO.xlsx'
try:
    wb = load_workbook(excel_table, read_only=True)
except FileNotFoundError:
    raise ValueError('Excel-таблица не найдена в ' + excel_table)
s = wb.worksheets[0]

if (debug):
    print()
    print()
    print()

if (s['C1'].value != 'Категория'):
    raise ValueError('Excel-таблица существует, но в ячейке C1 нет слова "Категория". Скорее всего, что-то сдвинулось')

data = []

rows = list(s.rows)[1:]

for row in rows:
    if (row[2].value != ' '):
        category = row[2].value
        if debug: print('category changed to ' + category)
    if (row[1].value): 
        #если ряд - это проект (если указан путь к картинке)
        #print('path found: ' + str(row[1].value))
        paths = json.dumps(str(row[1].value).split(', '))
        name = row[3].value
        desc = row[4].value
        tags = json.dumps(str(row[5]).split(', '))

        data.append({
            'images': paths,
            'title': name,
            #'year': as a tag if need
            'tags': tags
        })

#print(data)