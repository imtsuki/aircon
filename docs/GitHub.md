# GitHub 工作流程备忘录

这是我常用的工作流程（绝对真实，公司实习经历血泪史）：

## 开始

第一步，fork 主仓库，然后把 fork clone 到本地。比如，我们的主仓库为 `imtsuki/aircon`，fork 到「我自己的仓库」（假设我叫 jason），为 `jason/aircon`：

```bash
git clone git@github.com:jason/aircon.git
```

然后，设置上游仓库：

```bash
git remote add upstream git@github.com:imtsuki/aircon.git
```

这些步骤只需要进行一次。

## 怎么提交 PR

要开发一个新功能，首先切换到 `master` 分支，更新自己的仓库：

```bash
git checkout master
git fetch upstream
git merge upstream/master
```

然后，创建一个新的分支并切换过去，比如这里我取名分支为 `new-feature`：

```bash
git checkout -b new-feature
```

!> 永远不要直接动 `master` 分支。要在新的分支搞事情。

然后在这个分支开始写代码/文档。写完后就可以 commit 了：

```bash
git add .
git commit -m "这是 commit 信息"
```

最后推送到 GitHub 上，就能在自己的 GitHub 主页看到 **Compare & Pull Request** 按钮了：

```bash
git push --set-upstream origin new-feature
```

然后点一下这个按钮就提交了 PR 啦！

如果之后还需要继续修改，只需要继续 commit 并 push 就可以了：

```bash
git add .
git commit -m "这是第二次 commit 信息"
git push
```
