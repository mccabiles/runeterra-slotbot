import glob
import json

cards = []

for file in glob.glob('./data/set*.json'):
  json_file = open(file)
  json_data = json.load(json_file)
  cards.extend(json_data)

with open('cards.json', 'w') as outfile:
  json.dump(cards, outfile)