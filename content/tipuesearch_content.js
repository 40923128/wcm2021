var tipuesearch = {"pages": [{'title': 'First', 'text': 'About \n This is  https://github.com/mdecourse/cmstemplate \n 目前的 cmsimde 在編輯器下方新增一個 csave 按鈕, 意即 collabrative save, 當動態網際管理系統在多人同時維護登入維護網頁內容時, 編輯各頁面時段, 該頁面可能已經改版, 因此使用 csave 按鈕存檔時, 會導入當下最新的該頁面內容, 並試圖與編輯中的頁面內容進行合併. \n 使用 csave 按鈕存檔無法刪除頁面資料. \n 使用 Edit All 模式, 無法使用 csave 按鈕（尚未測試) \n', 'tags': '', 'url': 'First.html'}, {'title': 'Homework', 'text': '', 'tags': '', 'url': 'Homework.html'}, {'title': 'W3', 'text': '1.git clone --recouse-submodules (URL).git (any) 可將檔案資料夾名字改成(any) \n 2.404erro:(1)倉儲沒有任何東西 \n \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0(2)倉儲版本不一，EX-git check (newest ID)可以將cmsimde檔案版本更新至(newest ID) \n', 'tags': '', 'url': 'W3.html'}, {'title': 'W4', 'text': '1.擷取課表(班級)-4設一甲 \n import requests\nimport bs4\n# for os.environ and os.system()\nimport os\n# for geting html file path\nimport pathlib\n\n# for pythn 3.9\nproxy = \'http://[2001:288:6004:17::69]:3128\'\n\nos.environ[\'http_proxy\'] = proxy \nos.environ[\'HTTP_PROXY\'] = proxy\nos.environ[\'https_proxy\'] = proxy\nos.environ[\'HTTPS_PROXY\'] = proxy\n\n\'\'\'\nurl:  \'class_ajax.php\',\ndata: { pselyr: pselyr, pselclss: pselclss\n\'\'\'\nsemester = \'1092\'\nclassno = \'42311\'\ncolumn = True\nif semester == None:\n    semester = \'1091\'\nif classno == None:\n    # 42311 is 設一甲\n    classno = \'42311\'\n    \nheaders = {\'X-Requested-With\': \'XMLHttpRequest\'}\n\nurl = \'https://qry.nfu.edu.tw/class_ajax.php\'\npost_var = {\'pselyr\': semester, \'pselclss\': classno}\n\nresult = requests.post(url, data = post_var, headers = headers)\n\nsoup = bs4.BeautifulSoup(result.content, \'lxml\')\n\n# 先除掉所有 anchor\nfor a in soup.findAll(\'a\'):\n    # bs3 語法\n    #a.replaceWithChildren()\n    # bs4 語法, 將標註與內容拆開\n    a.unwrap()\n    \n# 根據輸出設定, 取出 class=\'tbcls\' 的 table 資料\ntable = soup.find(\'table\', {\'class\': \'tbcls\'})\n\n# 重建 table, 設定邊線為 1 pixel\noutput = "<table border=\'1\'>"\n\nfor i in table.contents:\n    # 利用 replace 復原 \xa0\n    output += str(i).replace("\xa0", "\xa0")\noutput += "</table>"\n# print(output)\n# 將 output 寫入 w1_class_local.html\nwith open("w1_class_local.html", "w", encoding="utf-8") as file:\n    file.write(output)\n# 利用 os.system() 以 default browser 開啟 w1_class_local.html\nfilePath = pathlib.Path(__file__).parent.absolute()\n#print(filePath)\n# set firefox as default browser and start url to open html file\nos.system("start file:///" + str(filePath) + "\\\\w1_class_local.html") \n', 'tags': '', 'url': 'W4.html'}, {'title': 'W5', 'text': 'update add offline cmsimde \n 1.cd (name)/cmsimde \n 2.type "git pull origin master" \n 3.copy cmsimde>up_dair>{cms.bat、acp.bat、http、http-server.py、localhost.crt、localhost.key} \n 4.cover into (name) \n', 'tags': '', 'url': 'W5.html'}, {'title': 'W6、W7 (remote Heroku)', 'text': '1.create heroku account \n 2.create heroku repositories \n 3.download heroku.7z& uncompress filename to Y:home \n 4.add\xa0 command ipv6.bat \n set path_heroku=%Disk%:\\heroku\\bin;\n \n & \n REM for heroku login\nset HTTP_PROXY=http://[2001:288:6004:17::53]:3128\nset HTTPS_PROXY=http://[2001:288:6004:17::53]:3128 \n & \n path=%Disk%:;%path_python%;%path_portablegit%;%path_heroku%;%GIT_SSH%;%path%;\n \n 5.check heroku version on ipv6.bat \n heroku version \n 6.login heroku on ipv6.bat \n heroku login -i\nEmail:\nPassword: \n 7.enter own github repositories \n 8.link heroku\xa0 repositories  and github\xa0 repositories \n heroku git:remote -a (heroku repositories name) \n', 'tags': '', 'url': 'W6、W7 (remote Heroku).html'}, {'title': 'W8', 'text': '1.clone\xa0 https://github.com/mdecourse/nfulist.git \n 2.create\xa0 new "wsgi.py" \n import requests\nimport bs4\n# for os.environ and os.system\nimport os\n# for geting html file path\nimport pathlib\n# 以下因應改為 Heroku based 程式所需導入模組,  修改步驟 1/6\nfrom flask import Flask, request \nfrom flask_cors import CORS\n \n \n# 修改步驟 2/6 , 加入 Flask 相關物件設定\napp = Flask(__name__)\n# 此一設定可以讓程式跨網域擷取資料\nCORS(app)\n \n# for pythn 3.9,  在近端測試時仍需要設定 proxy, 若使用 Python 3.8 執行則會自動使用系統的 Proxy 設定\n\n\'\'\'\nurl:  \'jclassroom_ajax.php\',\ndata: { pselyr: pselyr, pselclssroom: pselclssroom },\n\'\'\'\n \n# 修改步驟 3/6, 試著將程式改為網際模式, 需要套用 Flask 的網際 decorator\n@app.route(\'/\')\ndef timeTableList():\n    \'\'\'\n    semester = \'1092\'\n    classroomno = \'BGA0810\'\n    column = True\n    \'\'\'\n    semester =  request.args.get(\'semester\')\n    classroomno = request.args.get(\'classroomno\')\n    \n    if semester == None:\n        semester = \'1092\'\n    if classroomno == None:\n        # BGA0810 電腦輔助設計室\n        classroomno = \'BGA0810\'\n         \n    headers = {\'X-Requested-With\': \'XMLHttpRequest\'}\n \n    url = \'https://qry.nfu.edu.tw/jclassroom_ajax.php\'\n    post_var = {\'pselyr\': semester, \'pselclssroom\': classroomno}\n \n    result = requests.post(url, data = post_var, headers = headers)\n \n    soup = bs4.BeautifulSoup(result.content, \'lxml\')\n \n    # 先除掉所有 anchor\n    for a in soup.findAll(\'a\'):\n        # bs3 語法\n        #a.replaceWithChildren()\n        # bs4 語法, 將標註與內容拆開\n        a.unwrap()\n \n    # 根據輸出設定, 取出 class=\'tbcls\' 的 table 資料\n    table = soup.find(\'table\', {\'class\': \'tbcls\'})\n \n    # 重建 table, 設定邊線為 1 pixel\n    output = "<table border=\'1\'>"\n \n    for i in table.contents:\n        # 利用 replace 復原  \n        output += str(i).replace("\xa0", " ")\n    output += "</table>"\n    #print(output)\n    # 修改步驟 5/6 , 因為已經將原先可列印出程式的步驟改為 function, 因此必須以 return 將擷取到的網頁資料傳回\n    return output\n     \n# 修改步驟 4/6 , 因為改寫為網際程式後, 下列將內容存檔並自動呼叫 Firefox 的程式碼不再適用, 必須蓋掉\n\'\'\'\n# 將 output 寫入 w1_classroom.html\nfileName = "w1_classroom.html"\nwith open(fileName, "w", encoding="utf-8") as file:\n    file.write(output)\n# 利用 os.system() 以 default browser 開啟 w1_class_local.html\nfilePath = pathlib.Path(__file__).parent.absolute()\n#print(filePath)\n# set firefox as default browser and start url to open html file\nos.system("start file:///" + str(filePath) + "\\\\" + fileName)\n\'\'\'\n \n# 修改步驟 6/6, 配合網際程式啟動,  以及 Python 程式執行與納入其他程式執行的特定進行配置\n \nif __name__ == \'__main__\':\n    app.run(host=\'127.0.0.1\', port=8080, debug=True) \n 3.cove folder nfulist\'s wsgi.py \n 4.cd nfulist(cmd) \n 5.set step: \n heroku login -i\n(enter account)\nheroku git:remote -a nfuclassno-28\ngit config --global user.email "email"\ngit config --global user.name "name"\ngit add .\ngit commit -am "version"\ngit push heroku\n \n 6.enter heroku and oper link(mine): https://nfuclassno-28.herokuapp.com/ \n 7.URL+(?classroomno:"BGAXXXX") can find\xa0 room schedule \n', 'tags': '', 'url': 'W8.html'}, {'title': 'W10', 'text': 'Proxy lock problem: \n 1.Open putty then setting "Proxy" username and password. \n 2.save&open test \n 3.setting gitconfig ipv6 \n [http]\nproxy=http://USERNAME:PASSWORD@PROXYIP:PROXYPORT \n Save and use regedit: \n 1.type regedit(cmd) \n 2.Export SimonTatham \n 3.Next time just type "reg import ?:\\(save address)\\?.reg" (cmd) \n Edit .reg: \n 1.Ues python then open .reg \n 2.search github \n 3.change username&password\xa0 parameter \n Heroku proxy setting: \n REM for heroku login\nset HTTP_PROXY=http://(username:password)@[2001:288:6004:17::69]:3128\nset HTTPS_PROXY=http://(username:password)@[2001:288:6004:17::69]:3128 \n \n \n', 'tags': '', 'url': 'W10.html'}, {'title': 'SSH', 'text': '1.ssh(cmd) \n 2. ssh-keygen -t rsa -b 4096 -C  "使用者學號"(cmd) \n 3.go to Y:putty/putt/puttgen.exe then pounch genrate \n 4.save key \n 5.open putty.exe \n 6.load "github.com" then enter proxy HTTP [2001:288:6004:17::69] 3128 \n 7.into Auth then browse your ppk(save key) \n 8.save session \n 9.add "set GIT_SSH=%Disk%:\\putty\\plink.exe" in ipv6.bat \n 10. add "git@github.com:(username)/(Repositories).git \n 11.set github sshkey then finish \n \n \n', 'tags': '', 'url': 'SSH.html'}]};