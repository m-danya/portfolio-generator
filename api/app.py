from flask import Flask, make_response, current_app, send_from_directory
from openpyxl import load_workbook
import time
import json
import img2pdf
from flask import request
from flask_cors import CORS
import os

def node_string(A, five):
    return chr(ord('A') + A) + str(five + 1)

app = Flask(__name__)
CORS(app)

print('\n\n\n')

path_to_xlsx = '../public/DIGITAL_PORTFOLIO.xlsx'
path_to_images = '../public/Images/'
path_to_folder_pdfs = '/home/greedisgood/github/js/ddvb/api/Pdfs'
path_to_pdfs = 'Pdfs/'
host = 'http://localhost:5000/'

number_column = 0     # A
client_column = 1     # B
paths_column = 2     # C
category_column = 3  # D
name_column = 4      # E
tags_column = 5      # F

def convert_bytes(num):
    for x in ['bytes', 'KB', 'MB', 'GB', 'TB']:
        if num < 1024.0:
            return "%3.1f %s" % (num, x)
        num /= 1024.0


@app.route('/api/get_data')
def get_data():
    debug = False
    try:
        try:
            wb = load_workbook(path_to_xlsx, read_only=True)
        except FileNotFoundError:
            raise ValueError('Excel-таблица не найдена в  ' + excel_table)
        s = wb.worksheets[0]

        if (str(s[node_string(number_column, 1)].value) != 'Номер проекта'):
            raise ValueError(
                'Excel-таблица найдена, но содержимое ячейки ' + node_string(number_column, 1) +
                ' не совпадает с ожидаемым форматом. В ней должен быть заголовок колонки "' +
                'Номер проекта' +
                '", но ячейка содержит "' + str(s[node_string(number_column, 1)].value) + '", Вероятно, что-то сместилось. Проверьте содержание таблицы. (Может, кто-то переименовал заголовок?)')

        if (str(s[node_string(client_column, 1)].value) != 'Клиент'):
            raise ValueError(
                'Excel-таблица найдена, но содержимое ячейки ' + node_string(client_column, 1) +
                ' не совпадает с ожидаемым форматом. В ней должен быть заголовок колонки "' +
                'Клиент' +
                '", но ячейка содержит "' + str(s[node_string(client_column, 1)].value) + '", Вероятно, что-то сместилось. Проверьте содержание таблицы. (Может, кто-то переименовал заголовок?)')

        if (str(s[node_string(paths_column, 1)].value) != 'Имена файлов'):
            raise ValueError(
                'Excel-таблица найдена, но содержимое ячейки ' + node_string(paths_column, 1) +
                ' не совпадает с ожидаемым форматом. В ней должен быть заголовок колонки "' +
                'Имена файлов' +
                '", но ячейка содержит "' + str(s[node_string(paths_column, 1)].value) + '", Вероятно, что-то сместилось. Проверьте содержание таблицы. (Может, кто-то переименовал заголовок?)')

        if (str(s[node_string(category_column, 1)].value) != 'Категории'):
            raise ValueError(
                'Excel-таблица найдена, но содержимое ячейки ' + node_string(category_column, 1) +
                ' не совпадает с ожидаемым форматом. В ней должен быть заголовок колонки "' +
                'Категории' +
                '", но ячейка содержит "' + str(s[node_string(category_column, 1)].value) + '", Вероятно, что-то сместилось. Проверьте содержание таблицы. (Может, кто-то переименовал заголовок?)')

        if (str(s[node_string(name_column, 1)].value) != 'Название'):
            raise ValueError(
                'Excel-таблица найдена, но содержимое ячейки ' + node_string(name_column, 1) +
                ' не совпадает с ожидаемым форматом. В ней должен быть заголовок колонки "' +
                'Название' +
                '", но ячейка содержит "' + str(s[node_string(name_column, 1)].value) + '", Вероятно, что-то сместилось. Проверьте содержание таблицы. (Может, кто-то переименовал заголовок?)')

        if (str(s[node_string(tags_column, 1)].value) != 'Теги'):
            raise ValueError(
                'Excel-таблица найдена, но содержимое ячейки ' + node_string(tags_column, 1) +
                ' не совпадает с ожидаемым форматом. В ней должен быть заголовок колонки "' +
                'Теги' +
                '", но ячейка содержит "' + str(s[node_string(tags_column, 1)].value) + '", Вероятно, что-то сместилось. Проверьте содержание таблицы. (Может, кто-то переименовал заголовок?)')

        data = []
        all_categories = []
        all_tags = set()
        all_clients = set()

        all_names = []

        ans = []

        rows = list(s.rows)[2:]
        for row in rows:
            if row[client_column].value and (row[client_column].value != ' ' and row[client_column].value != ''):
                all_clients.add(row[client_column].value)

        # print(all_clients)

        for row in rows:
            if row[paths_column].value and (row[paths_column].value != ' ' and row[paths_column].value != ''):
                # paths set => row is valuable
                paths = row[paths_column].value.split(', ')

                categories = (row[category_column].value).split(', ')
                for c in categories:
                    already = False
                    for a_c in all_categories:
                        if a_c['name'] == c:
                            already = True
                            break
                    if not already:
                        all_categories.append({'name': c, 'tags': set()})

                tags = row[tags_column].value.split(', ')
                for t in tags:
                    if t not in all_clients:
                        all_tags.add(t)
                        for c in categories:
                            for i in range(len(all_categories)):
                                if all_categories[i]['name'] == c:
                                    all_categories[i]['tags'].add(t)

                if (row[client_column].value):
                    for c in categories:
                        for i in range(len(all_categories)):
                            if all_categories[i]['name'] == c:
                                all_categories[i]['tags'].add(
                                    row[client_column].value)

                name = row[name_column].value
                all_names.append(name)

                for i in range(len(paths)):
                    if (paths[i].find('.') == -1):
                        # adding .jpg to files without extension
                        paths[i] += '.jpg'

                #    for i in range(30):
                data.append({
                    'images': paths,
                    'title': name,
                    'categories': categories,
                    'tags': tags,
                    'number': row[number_column].value,
                    'client': row[client_column].value,
                })

        # already = []

        # for i in range(len(data)):
        #     for j in range(i + 1, len(data)):
        #         if (data[i]['images'] == data[j]['images'] and (j not in already)):
        #             print(str(i) + ' and ' + str(j) + ' are the same!! ')
        #             already += [i, j]

        for i in range(len(all_categories)):
            all_categories[i]['tags'] = list(all_categories[i]['tags'])

        ans = {
            'data': data,
            'categories': all_categories,
            'tags': list(all_tags),
            'names': all_names,
            'clients': list(all_clients),
        }
    except ValueError as error:
        s = error.args[0]
        return {'error': s}
    except Exception as error:
        return {'error': s}

    return ans
    #


@app.route('/api/generate_pdf', methods=['POST'])
def generate_pdf():

    print('got data!')
    #print(json.loads(json.loads(request.data)['data']))
    print('###')
    projects_data = json.loads(request.data)['data']
    # print(projects_data[0]['images'])
    if (len(projects_data) < 1):
        return {'link': "../public/Pdfs/Portfolio_05-09-2020_20-18-52.pdf"}
        #return {'error': 'Вы не выбрали ни одного проекта!'}
    print()
    print()
    #print([i['images'] for i in projects_data])

    #pr = [project for project in [i['images'] for i in projects_data]]
    #pr = [item for sublist in pr for item in sublist]

    pr = projects_data

    img_list = [path_to_images + image for image in pr]

    path_to_pdf = path_to_pdfs + \
        time.strftime('Portfolio_%d-%m-%Y_%H-%M-%S.pdf')

    with open(path_to_pdf, "wb") as f:
        f.write(img2pdf.convert([i for i in img_list]))

    response = {
        'link': host + path_to_pdf,
    }

    #return {'error': 'Вы не выбрали ни одного проекта!'}
    return response


@app.route('/Pdfs/<path:filename>', methods=['GET', 'POST'])
def download(filename):
    return send_from_directory(directory=path_to_folder_pdfs, filename=filename)

@app.route('/info')
def info():
    return {
        'warningFolderName': path_to_folder_pdfs,
        'warningCount': len([name for name in os.listdir(path_to_folder_pdfs)]),
        'warningSize': convert_bytes(sum([os.stat(path_to_folder_pdfs + '/' + i).st_size for i in os.listdir(path_to_folder_pdfs)]))
    }


if __name__ == '__main__':
    app.debug = True
    app.run()
