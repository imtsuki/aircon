

# 前台静态结构设计

##  Createcheck

#### CheckInService

##### CheckInDto

属性：

​	{

​		string username;
   	 number roomId;

​	}；CheckInService

##### CheckInService

​	方法：checkIn(username, roomID)

​	创建服务对象

​	方法：checkOut(username）

​    清除服务对象

​	方法：getRoomIdByUsername(username)

​	根据住户名获取房间号

​	方法：getUsernameByRoomId(roomId)

​	根据房间号获取住户名

##### ApiController

​	方法：register()

​	注册用户

​	方法：getCheckInStatus(username)

​	获取住户信息

![tYVCTO.png](https://s1.ax1x.com/2020/06/02/tYVCTO.png)

## CreateDetail

##### CheckInDto

​	方法：getRoomIdByUsername(username)

​	根据住户名获取房间号

​	方法：getUsernameByRoomId(roomId)

​	根据房间号获取住户名

##### StatisticsService

​	方法：getStatisticsByRange(period: "day" | "week" | "month")

​	按范围向系统请求账单信息

​    方法：getDetail(roomId)

​	向系统请求房间状态

​    方法：getInvoice(roomId)

​	根据房间号向系统请求费用清单并打印

##### ApiController

​	方法：getCheckInStatus(username)

​	获取用户状态

​	方法：getDetail(username)

​	获取用户使用信息

​	方法：getReport()

​	输出信息报告

![tYVFte.png](https://s1.ax1x.com/2020/06/02/tYVFte.png)

## CreateInvoice

##### CheckInDto

​	方法：checkIn(username, roomID)

​	创建服务对象

​	方法：checkOut(username）

​    清除服务对象

​	方法：getRoomIdByUsername(username)

​	根据住户名获取房间号

​	方法：getUsernameByRoomId(roomId)

​	根据房间号获取住户名

##### StatisticsService

​	方法：getStatisticsByRange(period: "day" | "week" | "month")

​	按范围向系统请求账单信息

​    方法：getDetail(roomId)

​	向系统请求房间状态

​    方法：getInvoice(roomId)

​	根据房间号向系统请求费用清单并打印

##### ApiController

​	方法：getCheckInStatus(username)

​	获取用户状态

​	方法：getBilling()

​	获取用户消费情况

​	方法：getInvoice(username)

​	获取用户消费详单

​	方法：getReport()

​	输出信息报告

![tYVFte.png](https://s1.ax1x.com/2020/06/02/tYVFte.png)

## 汇总

​	 ![tYVkfH.png](https://s1.ax1x.com/2020/06/02/tYVkfH.png)

