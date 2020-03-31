import json
import csv
#MULTIPOINT
'''
list = []
with open('../data/coords/coord_data.csv', 'r') as file:
	this_file = csv.DictReader(file)
	for row in this_file:
		list.append([float(row['long']), float(row['lat'])])
	print(list)


filename = '../data/coords/coords_multipoint.json'
with open(filename, 'r') as file:
	jsonfile = json.load(file)

jsonfile['coordinates'] = list

with open(filename, 'w') as file:
	file.write(json.dumps(jsonfile))
'''

#POINT
list = []
with open('../data/coords/coord_data.csv', 'r') as file:
	this_file = csv.DictReader(file)
	for row in this_file:
		list.append([float(row['long']), float(row['lat'])])
	print(list)

filename = '../data/coords/coords_point.json'
with open(filename, 'r') as file:
	jsonfile = json.load(file)

for item in list:
	di = {"type": "Point", "coordinates": item}
	jsonfile.append(di)

with open(filename, 'w') as file:
	file.write(json.dumps(jsonfile))

