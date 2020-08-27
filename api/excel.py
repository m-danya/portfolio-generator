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

print(s.rows)

#if (s.rows[0][1].value != 'Категория'):
#    print('Excel-таблица существует, но в ячейке C1 нет слова "Категория". Скорее всего, что-то сдвинулось')

#print(data)