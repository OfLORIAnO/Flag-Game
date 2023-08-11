import os
import requests
from bs4 import BeautifulSoup
import json
import re
from urllib.parse import urlparse
from googletrans import Translator
englAlph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
newEnglAlph = []
for m in englAlph:
    newEnglAlph.append(m)
# Создаем папку для изображений, если ее нет
if not os.path.exists("flagsImg"):
    os.makedirs("flagsImg")

# Отправляем GET-запрос на сайт
url = "https://flagi-1.ru/"
response = requests.get(url)

translator = Translator()
source_lang = "ru"
target_lang = "en"

# Создаем объект BeautifulSoup для парсинга HTML-кода
soup = BeautifulSoup(response.content, "html.parser")

# Находим список <tr> элементов
rows = soup.find_all("tr")

# Создаем пустой список для хранения данных
data = []

# Переменная для нумерации
id_counter = 1

# Перебираем каждую строку <tr>
for row in rows:
    # Находим элементы <td> внутри строки
    tds = row.find_all("td")
    if len(tds) == 3:
        for elem in tds:
            texts = elem.find("figcaption").text.split("<br/>")
            HzGlyanu = texts[0].split("Столица")
            HzGlyanu = ' '.join(HzGlyanu)
            HzGlyanu = HzGlyanu.split("Население")
            HzGlyanu = ' '.join(HzGlyanu)
            newHzGlyanu = ''
            for i in range(len(HzGlyanu)):
                if HzGlyanu[i:i+3] == "Общ":
                    newHzGlyanu = HzGlyanu[0:i]
                    break
            NewnewHzGlyanu = ''
            NewnewHzGlyanu = newHzGlyanu
            NewnewHzGlyanu = NewnewHzGlyanu.split()
            NewnewHzGlyanu = ' '.join(NewnewHzGlyanu)
            newString = ''
            for i in range(len(NewnewHzGlyanu)):
                if NewnewHzGlyanu[i] == '(' or NewnewHzGlyanu[i] == ')':
                    newString = ''
                    break
                else:
                    newString += NewnewHzGlyanu[i]
            if len(newString) == 0:
                break
            NewnewString = ''
            for i in range(len(newString)):
                if newString[i:i+2] == 'че':
                    break
                else:
                    NewnewString += newString[i]
            name = ""
            for i in range(len(NewnewString)):
                if NewnewString[i] in newEnglAlph:
                    name = NewnewString[0:i-1]
                    NewnewString = NewnewString[i:len(NewnewString)]
                    break
            engWas = False
            for i in range(len(NewnewString)):
                if NewnewString[i] in newEnglAlph:
                    engWas = True
                if engWas and NewnewString[i] not in newEnglAlph:
                    NewnewString = NewnewString[i+1::]
                    break
            population = ''
            for i in range(len(NewnewString)):
                try :
                    num = int(NewnewString[i])
                    population = NewnewString[i::]
                    NewnewString = NewnewString[0:i-1]
                    break
                except:
                    continue
            country_name = name
            capital = NewnewString
            population = population
            # Получаем ссылку на изображение
            img_src = elem.find("img")["src"]
            img_name = translator.translate(country_name, src=source_lang, dest=target_lang).text + '.png'
            
            populationNew = ''
            for i in range(len(population)):
                try: 
                    num = int(population[i])
                    populationNew = populationNew + population[i]
                except: continue
            population = populationNew
            # # Сохраняем изображение
            img_data = requests.get(img_src).content
            img_path = os.path.join("flagsImg", img_name)
            with open(img_path, "wb") as img_file:
                img_file.write(img_data)

            # Добавляем информацию в список data
            flag_info = {
                "id": id_counter,
                "name": country_name,
                "imageName": img_name,
                "capital": capital,
                "population": population
            }
            data.append(flag_info)
            
            id_counter += 1

# Сохраняем данные в data.json
with open("data.json", "w", encoding="utf-8") as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=4)

print("Данные сохранены в data.json и изображения в папке flagsImg.")
