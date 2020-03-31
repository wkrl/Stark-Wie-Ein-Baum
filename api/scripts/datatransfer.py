import csv
import pymysql.cursors
import yaml

config = yaml.load(open("/home/kat/Documents/DEVprojects/config.yaml"))

connect = pymysql.connect(host=config['host'],
						  user=config['user'],
						  password=config['password'],
						  db=config['dbname'])

with connect.cursor() as cursor:
	# obstsorten
	sorten_query = "INSERT INTO obstsorten(id, fruchtID, frucht, sorte, andereNamen,herkunft,groesse,beschreibung," \
				   " reifezeit, geschmack, verwendung,lager,verbreitung) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

	# pflanzliste
	pflanzliste_query = "INSERT INTO pflanzliste(baumNr, Pflanzreihe, PflanzreihePosition, BaumID, BaumsortenID, " \
						"FruchtID, Frucht, SortenID, Sorte, Sortenzaehler, Ernte, PatenID, Longitude, Latitude) " \
						"VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

	# admin
	admin_query = "INSERT INTO admin(id, username, password) VALUES(%s,%s,%s)"

	# images
	image_query = "Replace INTO Bilder(id, uri) VALUES(%s, %s)"

	with open('/home/kat/Documents/DEVprojects/images.csv') as table:
		reader = csv.reader(table)
		for row in reader:
			print(str(row))
			'''
			cursor.execute(sorten_query, (
				row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11],
				row[12]))
			
			cursor.execute(pflanzliste_query,
			               (row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], 
			               row[10], row[11], row[12], row[13]))
		
			'''
			cursor.execute(image_query, (row[0], row[1]))

		connect.commit()
