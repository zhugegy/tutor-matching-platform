from tkinter import *
from tkinter import scrolledtext
from tkinter import messagebox
from tkinter.simpledialog import askstring
from tkinter.messagebox import showinfo
from tkinter import filedialog

from os import path

import pymongo
import urllib.parse
from bson import ObjectId

import time
from dateutil import tz

from tree import *

#print(chk_stateTutor.get())


def defaultCallback():
    messagebox.showinfo('Sorry', 'Function is in progress!')


def whenSearchButtonClicked():
    btnSearch.config(state="disabled")
    btnSearch.config(bg="grey")

    strReg = '.*' + txtSearchBox.get() + '.*';
    mycol = mydb["users"]
    x = mycol.find({"name": { "$regex": strReg, "$options": 'i'}})

    car_list.clear()

    for result in x:
        car_list.append((result["name"], result["contact"], result["faculty"], result["campus"], result["_id"]));

    listboxUsers._delete_content()
    listboxUsers._build_tree()

    btnSearch.config(state="active")
    btnSearch.config(bg="white")

def whenMakeUserTutorButtonClicked():
    curItem = listboxUsers.tree.focus()
    strName = listboxUsers.tree.item(curItem)['values'][0]
    strID = listboxUsers.tree.item(curItem)['values'][4]
    oid = ObjectId(strID)
    mycol = mydb["users"]
    newvalues = {"$set": {"isTutor": True, "unitOfStudyTutor": []}}
    mycol.update_one({"_id": oid}, newvalues)

    messagebox.showinfo('Success', strName + ' has been granted Tutor tag!')

def whenMakeUserMentorButtonClicked():
    curItem = listboxUsers.tree.focus()
    strName = listboxUsers.tree.item(curItem)['values'][0]
    strID = listboxUsers.tree.item(curItem)['values'][4]
    oid = ObjectId(strID)
    mycol = mydb["users"]
    newvalues = {"$set": {"isMentor": True}}
    mycol.update_one({"_id": oid}, newvalues)

    messagebox.showinfo('Success', strName + ' has been granted Mentor tag!')

def whenMakeUserAdminButtonClicked():
    curItem = listboxUsers.tree.focus()
    strName = listboxUsers.tree.item(curItem)['values'][0]
    strID = listboxUsers.tree.item(curItem)['values'][4]
    oid = ObjectId(strID)
    mycol = mydb["users"]
    newvalues = {"$set": {"isAdmin": True}}
    mycol.update_one({"_id": oid}, newvalues)

    messagebox.showinfo('Success', strName + ' has been granted Admin tag!')

def whenRemoveUserTutorButtonClicked():
    curItem = listboxUsers.tree.focus()
    strName = listboxUsers.tree.item(curItem)['values'][0]
    strID = listboxUsers.tree.item(curItem)['values'][4]
    oid = ObjectId(strID)
    mycol = mydb["users"]
    newvalues = {"$set": {"isTutor": False, "unitOfStudyTutor": []}}
    mycol.update_one({"_id": oid}, newvalues)

    messagebox.showinfo('Success', 'The Tutor tag of user ' + strName + ' has been removed');

def whenRemoveUserMentorButtonClicked():
    curItem = listboxUsers.tree.focus()
    strName = listboxUsers.tree.item(curItem)['values'][0]
    strID = listboxUsers.tree.item(curItem)['values'][4]
    oid = ObjectId(strID)
    mycol = mydb["users"]
    newvalues = {"$set": {"isMentor": False}}
    mycol.update_one({"_id": oid}, newvalues)

    messagebox.showinfo('Success', 'The Mentor tag of user ' + strName + ' has been removed');

def whenRemoveUserAdminButtonClicked():
    curItem = listboxUsers.tree.focus()
    strName = listboxUsers.tree.item(curItem)['values'][0]
    strID = listboxUsers.tree.item(curItem)['values'][4]
    oid = ObjectId(strID)
    mycol = mydb["users"]
    newvalues = {"$set": {"isAdmin": False}}
    mycol.update_one({"_id": oid}, newvalues)

    messagebox.showinfo('Success', 'The Admin tag of user ' + strName + ' has been removed');

def whenCreateAccountButtonClicked():
    strAccount = askstring('Account', 'What is the account name?', initialvalue="account")

    if (strAccount == None):
        return True

    mycol = mydb["users"]
    result = mycol.find_one({"account": strAccount})

    if (result):
        showinfo("Sorry! This account exists!")

    strName = askstring('Name', 'What is his/her name?')

    if (strName == None):
        return True

    newAccount = {"name": strName, "account": strAccount, "password": "123", "faculty": "", "campus": "", "contact": ""};

    x = mycol.insert_one(newAccount)

    messagebox.showinfo('Success', 'The account ' + strAccount + ' has been created. The default password is 123.');


def whenChangePasswordButtonClicked():
    curItem = listboxUsers.tree.focus()
    strName = listboxUsers.tree.item(curItem)['values'][0]
    strID = listboxUsers.tree.item(curItem)['values'][4]
    oid = ObjectId(strID)
    strPassword = askstring('Password', 'You will change the password of the selected user ' + strName + '. What is the new password?')

    if (strPassword == None):
        return True

    mycol = mydb["users"]
    newvalues = {"$set": {"password": strPassword}}
    mycol.update_one({"_id": oid}, newvalues)
    messagebox.showinfo('Success', 'The password has been changed!');


def whenGenerateReportButtonClicked():
    curItem = listboxUsers.tree.focus()
    strName = listboxUsers.tree.item(curItem)['values'][0]
    strID = listboxUsers.tree.item(curItem)['values'][4]
    oid = ObjectId(strID)
    mycol = mydb["event"]
    result = mycol.find({"members": oid})
    dicReport = {}
    for res in result:
        print(res)
        if dicReport.get(res["type"], "") == "":
            dicReport[res["type"]] = []
            dicReport[res["type"]].append((res["_id"], res["description"]))
        else:
            dicReport[res["type"]].append((res["_id"], res["description"]))

    HERE = tz.tzlocal()
    strReportDetail = "# Report for user " + strName + "\r\n"
    for types in dicReport:
        strReportDetail += "## " + types + "\r\n"
        for entries in dicReport[types]:
            strReportDetail += "[" + entries[0].generation_time.astimezone(HERE).strftime("%Y-%m-%d %H:%M:%S") + "] " + entries[1] + "\r\n"

        strReportDetail += "\r\n"

    txtReport.delete(1.0,END)
    txtReport.insert(INSERT, strReportDetail)

def whenExportReportButtonClicked():
    dir = filedialog.askdirectory(initialdir= path.dirname(__file__))
    strName = "defaultName";
    print(dir);

    curItem = listboxUsers.tree.focus()
    strName = listboxUsers.tree.item(curItem)['values'][0]
    strFileName = time.ctime() + "_" + strName + ".txt";
    strContent = txtReport.get('1.0', END)

    with open(dir + '/' + strFileName, "w") as text_file:
        text_file.write(strContent)

    messagebox.showinfo('Success', 'File saved as: ' + strFileName);

# main program starts here

## database connection. account, password and IP address hard-encoded.
username = urllib.parse.quote_plus('username_placeholder')
password = urllib.parse.quote_plus('password_placeholder')
myclient = pymongo.MongoClient('mongodb://%s:%s@database_address_placeholder:27017/DSDB' % (username, password))
mydb = myclient["DSDB"]


## interface configuration
pady_row0 = 5;

window = Tk()
window.title("Root tool")
window.geometry('780x900')

## widgets layout starts here. From top to bottom, left to right.
lblUserName = Label(window, text="user name (can be empty): ")
lblUserName.grid(column=0, row=0, pady=pady_row0)
#lblUserName.pack()

txtSearchBox = Entry(window, width=20)
txtSearchBox.grid(column=1, row=0, pady=pady_row0)
#txtSearchBox.pack()
txtSearchBox.focus()

lblMustBe = Label(window, text="must be a: ")
lblMustBe.grid(column=2, row=0, pady=pady_row0)
#lblMustBe.pack()

chk_stateTutor = BooleanVar()
chk_stateTutor.set(False)
chkTutor = Checkbutton(window, text='tutor', var=chk_stateTutor)
chkTutor.grid(column=3, row=0, pady=pady_row0)
#chkTutor.pack()

chk_stateMentor = BooleanVar()
chk_stateMentor.set(False)
chkMentor = Checkbutton(window, text='mentor', var=chk_stateMentor)
chkMentor.grid(column=4, row=0, pady=pady_row0)
#chkMentor.pack()

chk_stateAdmin = BooleanVar()
chk_stateAdmin.set(False)
chkAdmin = Checkbutton(window, text='admin', var=chk_stateAdmin)
chkAdmin.grid(column=5, row=0, pady=pady_row0)
#chkAdmin.pack()

btnSearch = Button(window, text="Search", command=whenSearchButtonClicked)
btnSearch.grid(column=6, row=0, pady=pady_row0)
#btnSearch.pack()

listboxUsers = MultiColumnListbox()

btnMakeUserTutor = Button(window, text="Grant tutor", command=whenMakeUserTutorButtonClicked)
btnMakeUserTutor.grid(column=0, row=2)

btnMakeUserMentor = Button(window, text="Grant mentor", command=whenMakeUserMentorButtonClicked)
btnMakeUserMentor.grid(column=1, row=2)

btnMakeUserAdmin = Button(window, text="Grant admin", fg='RED', command=whenMakeUserAdminButtonClicked)
btnMakeUserAdmin.grid(column=2, row=2)

btnRemoveUserTutor = Button(window, text="Revoke tutor", command=whenRemoveUserTutorButtonClicked)
btnRemoveUserTutor.grid(column=0, row=3)

btnRemoveUserMentor = Button(window, text="Revoke mentor", command=whenRemoveUserMentorButtonClicked)
btnRemoveUserMentor.grid(column=1, row=3)

btnRemoveUserAdmin = Button(window, text="Revoke admin", fg='RED', command=whenRemoveUserAdminButtonClicked)
btnRemoveUserAdmin.grid(column=2, row=3)

btnCreateAccount = Button(window, text="Create account", command=whenCreateAccountButtonClicked)
btnCreateAccount.grid(column=0, row=4)

btnChangePassword = Button(window, text="Change password", command=whenChangePasswordButtonClicked)
btnChangePassword.grid(column=1, row=4)


txtReport = scrolledtext.ScrolledText(window, width=105, height=25, bg='lavender')
txtReport.grid(column=0, columnspan=7, row=6, pady=10)
#txtReport.pack()

btnGenerateReport = Button(window, text="Generate report", command=whenGenerateReportButtonClicked)
btnGenerateReport.grid(column=0, row=7)

btnExportReport = Button(window, text="Export report to local disk", command=whenExportReportButtonClicked)
btnExportReport.grid(column=1, row=7)

# btnFlaggedAppointmentReport = Button(window, text="Flagged appointment report", command=defaultCallback)
# btnFlaggedAppointmentReport.grid(column=0, row=7)
#
# btnRemoveAllTutorSelection = Button(window, text="Remove all student's tutor selection",  fg='RED', command=defaultCallback)
# btnRemoveAllTutorSelection.grid(column=0, row=8)
#
# btnRemoveAllMentorSelection = Button(window, text="Remove all student's mentor selection",  fg='RED', command=defaultCallback)
# btnRemoveAllMentorSelection.grid(column=1, row=8)


window.mainloop()