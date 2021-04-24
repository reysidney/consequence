# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
import sys
import csv
from collections import OrderedDict
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from rest_framework.decorators import api_view
from rest_framework.response import Response
from osgeo import gdal, ogr
from zipfile import ZipFile
import pandas as pd

@api_view(['POST'])
def upload_file(request):
    print("-----------------------Upload File")
    upload_dir = settings.STATIC_ROOT + 'uploads/'
    result = {}
    file = request.FILES['file']
    fs = FileSystemStorage(location=upload_dir)
    filename = fs.save(file.name, file)
    filename = ifKMZ(filename, upload_dir)
    try:
        srcDS = gdal.OpenEx(upload_dir + filename)
        ds = gdal.VectorTranslate(
            upload_dir + 'output/output.json',
            srcDS, 
            format="GeoJSON",
            layerCreationOptions=['WRITE_BBOX=YES']
        )
        del ds # delete VectorTranslate reference to write output in file

        json_data = open(upload_dir + 'output/output.json')
        res = json.load(json_data, object_pairs_hook=OrderedDict)
        result = {
            "status": "success",
            "result": res
        }
        json_data.close()
    except:
        result = {
            "status": "error",
            "result": "File not valid"
        }
    return Response(result)

@api_view(['POST'])
def upload_file_non_geo(request):
    print("-----------------------Upload File Non Geo")
    upload_dir = settings.STATIC_ROOT + 'uploads/'
    result = {}
    file = request.FILES['file']
    fs = FileSystemStorage(location=upload_dir)
    filename = fs.save(file.name, file)
    filename = ifExcel(filename, upload_dir)

    try:
        res = excel2geojson(filename, upload_dir)
        result = {
            "status": "success",
            "result": res
        }
    except:
        result = {
            "status": "error",
            "result": "File not valid"
        }
    return Response(result)

@api_view(['POST'])
def upload_link(request):
    print("-----------------------Upload Link")
    result = {}
    link = request.data['link']
    url = link.split('?')[0]
    layer_name = request.data['layer_name']
    result = {
        "url": url,
        "layer_name": layer_name
    }
    return Response(result)

#Find .shp file name in extracted list
def getShpFileName(list):
    for text in list:
        if '.shp' in text:
            return text

def ifKMZ(filename, upload_dir):
    if filename[-4:] == '.zip':
        try:
            with ZipFile(upload_dir + filename, 'r') as zip_ref:
                zip_ref.extractall(upload_dir)
                filename = getShpFileName(zip_ref.namelist())
        except:
            print("Not a .zip file")
    return filename

def ifExcel(filename, upload_dir):
    if filename[-4:] != '.csv':
        read_file = pd.read_excel(upload_dir + filename)
        read_file.to_csv(upload_dir + '__new.csv', encoding='utf-8')
        filename = '__new.csv'
    return filename

def excel2geojson(filename, upload_dir):
    li = []
    latList = []
    lonList = []
    with open(upload_dir + filename, 'r') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        header = next(reader)
        latIndex, lonIndex = getIndex(header)
        for item in reader:
            d = OrderedDict()
            lat = float(item[latIndex])
            lon = float(item[lonIndex])
            latList.append(lat)
            lonList.append(lon)
            d['type'] = 'Feature'
            d['geometry'] = {
                'type': 'Point',
                'coordinates': [lon, lat]
            }
            d['properties'] = dict(zip(header, item))
            li.append(d)

    d = OrderedDict()
    d['type'] = 'FeatureCollection'
    d['features'] = li
    d['bbox'] = [min(lonList), min(latList), max(lonList), max(latList)]
    return d

def getIndex(header):
    new_header = [item.lower() for item in header]
    latIndex = new_header.index('latitude')
    lonIndex = new_header.index('longitude')
    return [latIndex, lonIndex]

