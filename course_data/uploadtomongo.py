import pymongo
import csv
import pandas as pd
import json
import os

client = pymongo.MongoClient("mongodb+srv://bob123:syntax@cluster0-gcdjv.azure.mongodb.net/test?retryWrites=true&w=majority")
db = client["courses"]

collection = db["course_information"]



for filename in os.listdir("./data"):
    with open("./data/" + filename) as f:
        file_data = json.load(f)
        collection.insert_one(file_data)
        


