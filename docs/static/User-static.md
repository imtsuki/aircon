# 住户用例静态结构设计

##住户用例静态类图
![User-static](住户用例-静态类图.png)



## 类说明


| 类名  |  ApiController   |
| -------- | --- |
| 属性  | 1.schedulerService:SchedulerService|
| 方法  | 1.changeWind(roomId:String,changeWind:ChangeWindDto):void    |
|       | 2.powerOn:(powerOn:PowerOnDto):void   |
|       | 3.powerOff():void   |




| 类名  |  ServingQueueService   |
| -------- | --- |
| 属性  | 1.waitQueueService:WaitQueueService|
| 方法  | 1.isFull():boolean  |
|       |    |





| 类名  |  WaitQueueService   |
| -------- | --- |
| 属性  | 1.queue:WaitRoom[]|
| 方法  | 1.isEmpty():boolean  |






| 类名  |  SchedulerService   |
| -------- | --- |
| 属性  | 1.waitQueueService:WaitQueueService|
|       | 2.scheduleService:SchedulerService|
| 方法  | 1.schedule():void    |






| 类名  |  Action   |
| -------- | --- |
| 属性  | 1.On  布尔类型，表示是否开机|
|       | 2.Off 布尔类型，表示是否关机 |
| 方法  |     |






| 类名  |  WindMode   |
| -------- | --- |
| 属性  | 1.Cooling  布尔类型，表示是否制冷 |
|       | 2.Heating  布尔类型，表示是否制热 |
| 方法  |     |





| 类名  |  WindSpeed   |
| -------- | --- |
| 属性  | 1.LOW  布尔类型，表示是否低风|
|       | 2.MID  布尔类型，表示是否中风 |
|       | 3.HIGH 布尔类型，表示是否高风 |
| 方法  |     |




| 类名  |  ChangeWindDto  |
| -------- | --- |
| 属性  | 1.action:Action  包含action类来表示是否开机 |
|       | 2.mode:WindMode  包含Winmode类来表示模式|
|       | 3.speed:WindSpeed 包含WinSpeed类来表示风速 |
| 方法  |     |





| 类名  |  PowerOnDto  |
| -------- | --- |
| 属性  | 1.mode:WindMode  包含Winmode类来表示模式|
|       | 2.minTemperature:number  表示最小温度 |
|       | 3.maxTemperature:number  表示最大温度|
|       | 4.defaultTemperature:number  表示默认温度|
|       | 5.feeRate:number  表示费率|
|       | 6.maxCapacity:number  表示最大容量|
| 方法  |     |



