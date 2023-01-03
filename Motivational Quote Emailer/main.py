import smtplib
import random
import datetime as dt

my_email = "example@mail.com"
my_pass = "App password"
days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
def sendMail(msg_to_send):
    with smtplib.SMTP("smtp.gmail.com", 587) as connection:
        connection.starttls()# transport layer security
        connection.login(user=my_email, password=my_pass)
        connection.sendmail(
            from_addr=my_email, 
            to_addrs=my_email, 
            msg=msg_to_send
            )

now = dt.datetime.now()
week_day = now.weekday()
day = days[week_day]

with open("quotes.txt") as file:
    quotes = file.readlines()
quote = quotes[random.randint(0, len(quotes)-1)].split("-")    
# print(len(quotes))
# print(quote)
msg = "Subject:"+day+" Motivational quote for the day\n\n"+quote[0]+"\n-"+quote[1]
sendMail(msg)