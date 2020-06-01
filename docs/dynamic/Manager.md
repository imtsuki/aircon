# 管理员动态结构设计

## 系统操作
| 操作名称 | 操作说明 |
| -------- | --- |
| Login(ID:string,pwd:string) | 登录系统 |
| InitializationMode(mode:boolen,scope:{"min":interger, "max": interger},defluat:interger,rate:interger,object:interger) | 管理员对主控机初始化，设置基础参数，分别为温控模式（冷或热）、设置温控范围（18-26/26-30度）、缺省温度（26度）、费率（3/2/1）以及服务对象（假设服务对象数=3）|
| SetMode(mode:boolen,scope:{"min":interger, "max": interger},defluat:interger,rate:interger,object:interger) | 管理员改变主控机当前的运行配置 |
| GetRoomInformation() | 获取所有房间状态信息，默认每分钟刷新一次 |
| GetInformation(roomID:int) | 获取指定从控机详细信息，默认每分钟刷新一次 |
| Quit() | 退出系统 |

## 操作契约

| 系统事件 |Login(role:string,ID:string,pwd:string),登录系统|
| -------- | --- |
| 交叉引用 |切换运行状态 Manager_001|
| 前置条件 |无|
| 后置条件 |1.管理员与主控机建立关联|
|           | 2.管理员与主控机状态切换界面建立关联|

| 事件名称 | 功能 |
| -------- | --- |
|Logoninterface()|管理员进入登录界面|
|Staff=Authentication(ID,pwd)|进行身份验证，返回值staff为布尔变量，参数为用户名及密码|

![](https://github.com/Seyuko/Pictures/blob/master/manager-dynamic-1.png?raw=true)

| 系统事件 |InitializationMode(mode:boolen,scope:{"min":interger, "max": interger},defluat:interger,rate:interger,object:interger),主控机配置初始化|
| -------- | --- |
| 交叉引用 |主控机开机 Manager_001_1|
| 前置条件 |主控机开机|
| 后置条件 |主控机配置设定完成，初始化完成|

| 事件名称 | 功能 |
| -------- | --- |
|Operateinterface()|管理员进入管理员操作面板|
|Setupinterface()|管理员进入主控机设置面板|
|Parameterset(mode,scope,defluat,rate,object）|管理员对主控机进行初始化，设置基础参数，参数分别为温控模式，范围，缺省温度，费率，服务对象|

![](https://github.com/Seyuko/Pictures/blob/master/manager-dynamic-2.png?raw=true)

| 系统事件 |SetMode(mode:boolen,scope:{"min":interger, "max": interger},defluat:interger,rate:interger,object:interger),改变主控机当前配置|
| -------- | --- |
| 交叉引用 |更改运行配置 Manager_002|
| 前置条件 |主控机开启|
| 后置条件 |主控机运行配置改变|

| 事件名称 | 功能 |
| -------- | --- |
|Operateinterface()|管理员进入管理员操作面板|
|Setupinterface()|管理员进入主控机设置面板|
|SetMode(mode,scope,defluat,rate,object）|管理员对主控机设置进行更改，参数分别为温控模式，范围，缺省温度，费率，服务对象|

![用例图](https://github.com/Seyuko/Pictures/blob/master/manager-dynamic-3.png?raw=true)

| 系统事件 |GetRoomInformation(),获取各房间信息|
| -------- | --- |
| 交叉引用 |监控运行状态 Manager_003|
| 前置条件 |主控机开启|
| 后置条件 |管理员获取所有房间的状态信息|

| 事件名称 | 功能 |
| -------- | --- |
|Operateinterface()|管理员进入管理员操作面板|
|Querypanel()|管理员进入主控机信息查看面板|
|GetRoomInformation()|主控机获取所有房间的状态信息，按刷新频率（一分钟）进行更新|

![用例图](https://github.com/Seyuko/Pictures/blob/master/manager-dynamic-4.png?raw=true)

| 系统事件 |GetInformation(roomID:int),获取指定从控机详细信息|
| -------- | --- |
| 交叉引用 |监控运行状态 Manager_003|
| 前置条件 |主控机开启，管理员使用主控机|
| 后置条件 |管理员获取指定从控机详细信息|

| 事件名称 | 功能 |
| -------- | --- |
|Operateinterface()|管理员进入管理员操作面板|
|Querypanel()|管理员进入主控机设置面板|
|Inform=Getinformation(roomID)|获取从控机工作信息，按刷新频率（一分钟）进行更新，参数为被检测的房间号|

![用例图](https://github.com/Seyuko/Pictures/blob/master/manager-dynamic-5.png?raw=true)

| 系统事件 |Quit(),退出系统|
| -------- | --- |
| 交叉引用 |切换运行状态 Manager_001|
| 前置条件 |主控机开启|
| 后置条件 |主控机关闭|