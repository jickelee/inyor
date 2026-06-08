# Inyor Pakistan Loan App UI Mockup

这是基于一期低保真原型重新设计的高保真移动端 UI 原型，定位为巴基斯坦市场正规金融科技贷款 App。每个核心页面都提供两种版面：英文 LTR 与乌尔都语 RTL。实现方式为 React + CSS design tokens，可直接作为前端开发参考。

## 运行

```bash
npm install --cache ./.npm-cache
npm run dev -- --port 5173
```

本地预览地址：

```text
http://127.0.0.1:5173/
```

## 已覆盖页面

- Splash Screen
- 风险提示 / Responsible borrowing
- 隐私与权限说明
- English LTR 与 Urdu RTL 双版本权限说明
- 登录
- 登录错误状态
- OTP 验证
- OTP 错误与 loading 状态
- 图案锁设置
- 图案锁确认错误
- 首页
- 首页空状态
- 首页网络错误状态
- 贷款申请资料补全
- Loan Calculator：3 期
- Loan Calculator：6 期
- Personal Center：未登录
- Personal Center：已登录
- 资料认证中心
- 设置中心
- 重置密码
- 账号删除
- 设备管理
- 优惠券空状态
- FAQ
- About Us
- Dialog / Toast / 系统权限弹窗状态

## 设计规范

### 配色

- Primary Emerald: `#0A5C4A`
- Secondary Emerald: `#0F7A63`
- Teal: `#0A8F8A`
- Gold accent: `#C99A2E`
- Background: `#F6F8F7`
- Text: `#10201B`
- Muted text: `#65746F`
- Border: `#DCE5E1`
- Danger: `#B42318`

### 字体

- English: Inter / Roboto / system sans
- Urdu: Noto Naskh Arabic / Noto Nastaliq Urdu
- 推荐字号：12, 14, 16, 20, 22, 28, 52
- 正文行高：1.45

### 图标

- 使用 Lucide outline icons
- 基础尺寸：20-24 px
- 重点状态：ShieldCheck, Smartphone, Calculator, Ticket, AlertTriangle, LockKeyhole
- 避免现金、金币、红包、强营销图标，保持正规金融感

### 组件

- 主按钮高度：52 px
- 卡片圆角：16-18 px
- 输入框高度：54 px
- Android touch target：不低于 48 px
- 卡片使用轻边框与浅阴影，避免高饱和大渐变

## 核心跳转逻辑

```text
Splash
-> Risk Notice
-> Consent / Permission Explanation
-> System Permissions
-> Login
-> OTP
-> Pattern Setup
-> Home
```

```text
Home Apply Now
-> Loan Application / Profile Completion
-> Loan Calculator
-> Apply
```

```text
Profile
-> Coupons
-> Loan Calculator
-> Profile Verification
-> About Us
-> FAQ
-> Terms
-> Settings
```

```text
Settings
-> Reset Password
-> Devices Manager
-> Account Deletion
```

## 补充的异常与反馈状态

- Loading：OTP 验证中、首页额度检查中
- Empty：无贷款、无优惠券
- Error：OTP 错误、登录手机号错误、首页网络错误
- Success：OTP 成功、申请提交成功
- Disabled：输入未完成时按钮禁用
- Permission denied：相机/定位/通知权限被拒绝
- Account deletion：删除前条件说明与二次确认
- Device disable：非当前设备禁用入口
- Toast：成功与失败提示

## English LTR / Urdu RTL 兼容要点

- 英文版使用 `dir="ltr"`，乌尔都语版使用 `dir="rtl"`
- 乌尔都语版文本右对齐，导航、返回箭头、列表箭头和信息结构镜像
- 两个版本共用同一套组件与 design tokens，避免后续维护两套样式
- 语言切换入口保留在 Header
- 金额、PKR、日期、OTP、手机号等数字信息保持 LTR 展示，避免财务数字阅读混乱
