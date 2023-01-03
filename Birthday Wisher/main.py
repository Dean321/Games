# -*- coding: utf-8 -*-
"""
Created on Tue Jan  3 09:54:25 2023

@author: Dean321
"""
import smtplib
import random
import datetime as dt
import pandas as pd
import json
  
f = open('wishes.json')
jwd = json.load(f)

df = pd.read_csv("birthdays.csv")
d = df.to_dict()
len_of_df = df.shape[0]
 
my_email = "example@mail.com"
my_pass = "App password"

def sendMail(msg_to_send):
    with smtplib.SMTP("smtp.gmail.com", 587) as connection:
        connection.starttls()
        connection.login(user=my_email, password=my_pass)
        connection.sendmail(
            from_addr=my_email, 
            to_addrs=my_email, 
            msg=msg_to_send
            )

now = dt.datetime.now()
now_month = now.month


for i in range(0,len_of_df):
    if d["month"][i] == now_month:
        cnt = 0
        print("Chose an option ")
        for j in jwd.keys():
            cnt+=1
        ch = int(input("Type option number here"))
        key = list(jwd.keys())[ch]
        wish = jwd[key][random.randint(0, len(jwd[key]))]
        message = "Subject: Happy Birthday dear "+d["name"][i]+"\n\n"+wish
        sendMail(message)