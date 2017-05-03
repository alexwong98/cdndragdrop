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

AWS_ACCESS_KEY = 'AKIAJJJ64Q4YYWWLHWCQ'
AWS_ACCESS_SECRET_KEY= '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'
AWS_BUCKET_NAME = 'cdn981094781'



iam = IAMConnection(aws_access_key_id = AWS_ACCESS_KEY,
        aws_secret_access_key = AWS_ACCESS_SECRET_KEY)
arn = iam.get_user().user.arn

account_id = arn[arn.find('::')+2:arn.rfind(':')]









app = Flask(__name__)

app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024

# class StreamConsumingMiddleware(object):

#     def __init__(self, app):
#         self.app = app

#     def __call__(self, environ, start_response):
#         stream = LimitedStream(environ['wsgi.input'],
#                                int(environ['CONTENT_LENGTH'] or 0))
#         environ['wsgi.input'] = stream
#         app_iter = self.app(environ, start_response)
#         try:
#             stream.exhaust()
#             for event in app_iter:
#                 yield event
#         finally:
#             if hasattr(app_iter, 'close'):
#                 app_iter.close()


# app.wsgi_app = StreamConsumingMiddleware(app.wsgi_app)


CORS(app)

@app.route('/', methods = ['POST'])
def load_file():

	image_data_json = json.loads(request.data)

	image_data_json['encoded_data'] = (image_data_json['encoded_data'])[len("data:;base64,") + len(image_data_json['data_type']):] 

	c = boto.connect_s3(AWS_ACCESS_KEY, AWS_ACCESS_SECRET_KEY)
	b = c.get_bucket(AWS_BUCKET_NAME)
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











#PREVIOUS CODE


# def upload_to_s3(aws_access_key_id, aws_secret_access_key, file, bucket, key, callback=None, md5=None, reduced_redundancy=False, content_type=None):

#     try:
#         size = os.fstat(file.fileno()).st_size
#     except:
#         # Not all file objects implement fileno(),
#         # so we fall back on this
#         file.seek(0, os.SEEK_END)
#         size = file.tell()

#     conn = boto.connect_s3(aws_access_key_id, aws_secret_access_key)
#     bucket = conn.get_bucket(bucket, validate=True)
#     k = Key(bucket)
#     k.key = key
#     if content_type:
#         k.set_metadata('Content-Type', content_type)

#     sent = k.set_contents_from_file(file, cb=callback, md5=md5, reduced_redundancy=reduced_redundancy, rewind=True)

#     # Rewind for later use
#     file.seek(0)

#     if sent == size:
#         return True
#     return False






	# decoded_image_file = open('decodedFile.jpeg', 'r+') 
	# # print base64.decodestring(encoded_image_string)
	# decoded_image_file.write(base64.decodestring(encoded_image_string));

	# key = "asdf" #NEED TO FIX THIS!
	# bucket = 'cdn981094781'

	# if upload_to_s3(AWS_ACCESS_KEY, AWS_ACCESS_SECRET_KEY, decoded_image_file, bucket, key, content_type = 'image/jpeg'):
	# 	print 'It worked!'
	# else:
	# 	print 'The upload failed...'

	# return resp