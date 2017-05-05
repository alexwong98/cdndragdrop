# requirements : flask_cors, flask
import os
from flask import Flask   
from flask_cors import CORS
from flask import request
from flask import make_response
from werkzeug.wsgi import LimitedStream

import boto
from boto.s3.connection import S3Connection
from boto.iam.connection import IAMConnection
from boto.s3.key import Key
import boto3

import json

import base64

credentials = {}
with open(os.getcwd() + '/.credentials.example') as credentials_json:
	credentials = json.load(credentials_json)
	# print credentials_json.read()



app = Flask(__name__)



iam = IAMConnection(aws_access_key_id = credentials['AWS_ACCESS_KEY'],
        aws_secret_access_key = credentials['AWS_ACCESS_SECRET_KEY'])
arn = iam.get_user().user.arn

account_id = arn[arn.find('::')+2:arn.rfind(':')]


app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024

CORS(app)

@app.route('/', methods = ['POST'])

def load_file():

	image_data_json = json.loads(request.data)

	image_data_json['encoded_data'] = (image_data_json['encoded_data'])[len("data:;base64,") + len(image_data_json['data_type']):] 

	c = boto.connect_s3(credentials['AWS_ACCESS_KEY'], credentials['AWS_ACCESS_SECRET_KEY'])
	b = c.get_bucket(credentials['AWS_BUCKET_NAME'])
	k = Key(b)

	k.key = image_data_json['name']

	k.set_contents_from_string(base64.b64decode(image_data_json['encoded_data']))
	k.set_metadata('Content-Type', image_data_json['data_type']) 
	k.set_acl('public-read')

	url_resp = make_response(k.generate_url(expires_in=0, query_auth=False))
	url_resp.headers['Access-Control-Allow-Origin'] = '*'

	# b.add_user_grant("READ", account_id)


	# acp = k.get_acl()

	# for grant in acp.acl.grants:
	# 	grant.permission = 'READ'


	return url_resp









 #  #   key.set_acl('public-read')

	# url = key.generate_url(expires_in=0, query_auth=False)
	# print url 