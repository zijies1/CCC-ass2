from flask import Flask
from flask import send_file
from flask_cors import CORS
import os
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:8080"]}})

@app.route('/aurinObese',methods=['GET'])
def aurinObese():
	try:
		return send_file('./data/aurinObese.json', attachment_filename='aurinObese.json')
	except Exception as e:
		return str(e)

@app.route('/aurinOverweight',methods=['GET'])
def aurinOverweight():
	try:
		return send_file('./data/aurinOverweight.json', attachment_filename='aurinOverweight.json')
	except Exception as e:
		return str(e)

@app.route('/twrGeometry',methods=['GET'])
def aurinTwr():
	try:
		return send_file('./data/twrGeometry.json', attachment_filename='twrGeometry.json')
	except Exception as e:
		return str(e)
