# 标准作业流程 (Standard Operating Procedures)

> 本文件由飞轮系统自动维护，记录经过验证的 Shell 命令与操作流程。
> 每次成功完成复杂任务后，将验证过的命令更新到此处。

## 已验证的命令

### Hook 配置修复
```bash
# PreToolUse: 变量必须加双引号
echo "$CLAUDE_TOOL_INPUT" | grep -qE "..."

# Stop: 纯 bash 替代 awk (避免多层转义)
count=$(wc -l < .ai/memory/LESSONS.md)
if [ "$count" -gt 150 ]; then echo "ALERT"; fi

# PostToolUse: tsconfig 存在性检查
if [ -f tsconfig.json ]; then npx tsc --noEmit; fi
```

### 记忆系统维护
```bash
# 查看 LESSONS.md 行数
wc -l .ai/memory/LESSONS.md

# 清理记忆 (手动触发)
# 读取 .claude/rules/memory_protocol.md 后执行
```

### Git 操作
```bash
# 防御性提交 (非 Git 项目静默跳过)
git config user.email "ai-agent@local" 2>/dev/null
git add .ai/memory/*.md 2>/dev/null
git commit -m "auto: memory update" 2>/dev/null
exit 0
```

---

*最后更新: 2026-06-22 — 飞轮 v3.1 部署*
