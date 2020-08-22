from flask import Flask
from openpyxl import load_workbook
import time
import json

app = Flask(__name__)

path_to_xlsx = '../public/DIGITAL_PORTFOLIO.xlsx'
path_to_images = '../public/Images/' #same thing in js, cause js and python can be deployed at different directories


@app.route('/api/get_data')
def get_data():
    debug = False
    excel_table = '../public/DIGITAL_PORTFOLIO.xlsx'
    try:
        try:
            wb = load_workbook(excel_table, read_only=True)
        except FileNotFoundError:
            raise ValueError('Excel-таблица не найдена в  ' + excel_table)
        s = wb.worksheets[0]

        category_column = -1
        paths_column = -1
        name_column = -1
        desc_column = -1
        tags_column = -1

        if (debug):
            print()
            print()
            print()

        if (s['C1'].value != 'Категория'):
            raise ValueError('Excel-таблица найдена, но в ячейке С1 нет слова "Категория". Вероятно, что-то сместилось, проверьте содержание таблицы.')

        data = []
        categories = []
        tags = []
        cat_tags = ['!barrier']
        
        ans = []

        rows = list(s.rows)[1:]

        for row in rows:
            if (row[2].value != ' '):
                category = row[2].value
                if debug: print('category changed to ' + category)
                if ((len(cat_tags) == 0) or (cat_tags[0] != '!barrier')):
                    tags.append(list(set(cat_tags)))
                cat_tags = []
                categories.append(category)
                
            if (row[1].value): 
                
                #если ряд - это проект (если указан путь к картинке)
                #print('path found: ' + str(row[1].value))
                
                paths = (row[1].value).split(', ')
                #print('ok')
                #print('paths = ' + str(paths))

                for i in range(len(paths)):
                   if (paths[i].find('.') == -1):
                        #print(paths[i], end='')
                        paths[i] += '.jpg' # trying to add .jpg to avoid missing picture
                        #print(' => ' + str(path[i]))
                #print('ok x2')
                name = row[3].value
                
                desc = row[4].value

                tags = (row[5].value).split(', ')

                cat_tags += tags

                data.append({
                    'images': paths,
                    'title': name,
                    'category': category,
                    #'year': as a tag if need
                    'tags': tags
                })
        #jdata = json.dumps(data)

        if ((len(cat_tags) == 0) or (cat_tags[0] != '!barrier')):
            tags.append(cat_tags)
        
        already = []

        for i in range(len(data)):
            for j in range(i + 1, len(data)):
                #ans_j = data[j]
                #ans_j['cagegory'] = data[i]['category']
                ##ans_j.data
                if (data[i]['images'] == data[j]['images'] and (i not in already) and (j not in already)):
                    print(str(i) + ' and ' + str(j) + ' are the same!! ')
                    already += [i, j]
                
        
        
        ans = {
            'data': data,
            'categories': categories,
            'tags': tags
        }

        

    except ValueError as error:
        s = error.args[0]
        return {'error': s}
    except Exception as error:
        return {'error': s}
    
    return ans
    


if __name__ == '__main__':
    app.debug = True
    app.run()
