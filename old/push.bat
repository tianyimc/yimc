@echo off
:: 声明utf-8
chcp 65001
:: 提示用户输入commit信息
set /p commitMessage=请输入commit信息: 

:: 执行git命令
git add .
git commit -m "%commitMessage%"
git push -u origin main

echo Commit完成并已推送到远程仓库.
pause