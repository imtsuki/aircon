# 管理员静态结构设计

## PowerON

### 1.MaintainerController
| 方法名 | 操作说明 |
| -------- | --- |
| PowerOn() | 主控机开机 |

### 2.Service
| 方法名 | 操作说明 |
| AuthLoginDto(username,password) | 管理员登录 |
| PowerOnDto(mode,minTemperature,maxTemperature,defaultTemperature,feeRate,maxCapacity) | 主控机初始参数设定 |

![](https://github.com/Seyuko/Pictures/blob/master/manager-static-1.png?raw=true)

## B.SetPara

### 1.MaintainerController
| 方法名 | 操作说明 |
| -------- | --- |
| SetPara() | 改变主控机参数 |

### 2.Service
| 方法名 | 操作说明 |
| -------- | --- |
| PowerOnDto(mode,minTemperature,maxTemperature,defaultTemperature,feeRate,maxCapacity) | 主控机参数设定 |

![](https://github.com/Seyuko/Pictures/blob/master/manager-static-2.png?raw=true)

## GetInformation

| 方法名 | 操作说明 |
| -------- | --- |
| GetRoomStates() | 获取所有房间信息 |

![](https://github.com/Seyuko/Pictures/blob/master/manager-static-3.png?raw=true)

## PowerOff
| 方法名 | 操作说明 |
| -------- | --- |
| PowerOff() | 主控机关机 |

![](https://github.com/Seyuko/Pictures/blob/master/manager-static-4.png?raw=true)

## 静态结构汇总

![](https://github.com/Seyuko/Pictures/blob/master/manager-static-5.png?raw=true)