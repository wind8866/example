
1. 1🖍️[对数据求散列](https://www.30secondsofcode.org/js/s/hash-sha-256/)
2. 2✅🖍️[双链表](https://www.30secondsofcode.org/js/s/data-structures-doubly-linked-list/)
3. ✅[git按添加时间列出分支](https://www.30secondsofcode.org/git/s/sort-branches-by-date/)
4. ✅[git快捷命令(Git aliases)](https://www.30secondsofcode.org/git/s/aliases/)
5. ✅[git编辑快捷命令](https://www.30secondsofcode.org/git/s/edit-config/)
6. 3✅[格式化持续时间](https://www.30secondsofcode.org/js/s/format-duration/)
7. [最大公约数和最小公倍数](https://www.30secondsofcode.org/js/s/gcd-lcm/)
8. 4✅[笛卡尔积](https://www.30secondsofcode.org/js/s/cartesian-product/)
9. 4✅[数组的叉值](https://www.30secondsofcode.org/js/s/cross-product-of-arrays/)
10. 🖍️[Nodejs服务器](https://www.30secondsofcode.org/js/s/nodejs-static-file-server/)
11. [js中的事件循环](https://www.30secondsofcode.org/js/s/event-loop-explained/)
12. [链表](https://www.30secondsofcode.org/js/s/data-structures-linked-list/)
13. [luhn-check](https://www.30secondsofcode.org/js/s/luhn-check/)
14. [数值后缀](https://www.30secondsofcode.org/js/s/to-ordinal-suffix/)
15. ✅[随机16进制颜色代码](https://www.30secondsofcode.org/js/s/random-hex-color-code/)
16. ✅[中位数](https://www.30secondsofcode.org/js/s/median/)
17. 7✅[范围内的随机数](https://www.30secondsofcode.org/js/s/random-number-in-range/)
18. 7✅[范围内的随机整数](https://www.30secondsofcode.org/js/s/random-integer-in-range/)
19. 8✅[加权平均数](https://www.30secondsofcode.org/js/s/weighted-average/)
20. ✅[查找包含某次commit的分支](https://www.30secondsofcode.org/git/s/branches-containing-commit/)
21. 🗑️[从历史记录清除文件](https://www.30secondsofcode.org/git/s/purge-file/)
22. [查看合并的分支](https://www.30secondsofcode.org/git/s/view-merged-branches/)
23. [创建不同作者的提交](https://www.30secondsofcode.org/git/s/set-or-amend-commit-author/)
24. [查看撤销历史](https://www.30secondsofcode.org/git/s/view-undo-history/)
25. [删除合并的分支](https://www.30secondsofcode.org/git/s/delete-merged-branches/)
26. [git快进模式](https://www.30secondsofcode.org/git/s/fast-forward-merge/)
27. [操作特定字符串的提交](https://www.30secondsofcode.org/git/s/view-commits-by-string/)
28. [合并分支](https://www.30secondsofcode.org/git/s/merge-branch-merge-commit/)
29. [查看本地分支](https://www.30secondsofcode.org/git/s/view-all-branches/)
30. [查看两次提交之间的摘要](https://www.30secondsofcode.org/git/s/view-changes-summary/)
31. [查看存储库的可视化图形](https://www.30secondsofcode.org/git/s/view-commit-graph/)


git
```shell
# git按添加时间列出分支
git branch --sort=-committerdate

# git快捷命令(Git aliases)
git config -l # getc

# git编辑快捷命令
git config --global -e # setc

# 查找包含某次commit的分支
git branch --contains cfd0e9107b5cad694e80fac0ce1ab8ccc65c7

# 从历史记录清除文件
# 可以用于删除最早提交的密码等信息，但具有破坏性

# 查看合并的分支
git branch -a --merged # merged


```