import tkinter as tk
import requests
import math

# get final kills
# get final deaths
# fkdr = fkills/fdeaths
# round fkdr down and add 1 to get the next int

# 300 requests / 5 minutes
# expires in 24 hours
api_key = '6c8d67e6-45b4-4665-bcbc-35dc0ff54d3e'

def getInfo(url):
    r = requests.get(url)
    return r.json()

def getStats(user):
    mojangurl = "https://api.mojang.com/users/profiles/minecraft/" + user
    mojanginfo = getInfo(mojangurl)
    try:
        uuid = mojanginfo["id"]
        hypixelurl = f"https://api.hypixel.net/player?key={api_key}&uuid=" + uuid
        hypixelinfo = getInfo(hypixelurl)
        try:
            ign = hypixelinfo['player']['displayname']
        except KeyError:
            ign = "Invalid Player"
        try:
            star = hypixelinfo['player']['achievements']['bedwars_level']
        except KeyError:
            star = 0
        try:
            bwfinalkills = hypixelinfo['player']['stats']['Bedwars']['final_kills_bedwars']
        except KeyError:
            bwfinalkills = 0
        try:
            bwfinaldeaths = hypixelinfo['player']['stats']['Bedwars']['final_deaths_bedwars']
        except KeyError:
            bwfinaldeaths = 0
        try:
            bwfkdr = round(bwfinalkills / bwfinaldeaths, 2)
        except ZeroDivisionError:
            bwfkdr = bwfinalkills

    except KeyError:
        print("User not found")
        ign = "Invalid Player"
        star = 0
        bwfkdr = 0

root = tk.Tk()
root.title("FKDR Tracker")

player_label = tk.Label(root, text="FKDR Tracker")
player_label.pack(pady=10)

player_entry = tk.Entry(root, width=30)
player_entry.pack(pady=10)

# Define the function to update the label
def update_label():
    text = player_entry.get()
    getStats(text)
    player_label.config(text=text)

# Create a button
go_button = tk.Button(root, text="Go", command=update_label)
go_button.pack(pady=10)



root.mainloop()