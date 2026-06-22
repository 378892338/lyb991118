# 项目最佳实践与高阶原则 (由高频经验提炼)

> 本文件使用 YAML Frontmatter 严格结构化。
> self_lift.py 每周自动解析此文件，提取 efficiency_score >= 8 的规则注入 CLAUDE.md。

---
skill_id: SK-001
source_lesson: LESSON-005
efficiency_score: 9
rule: "JSON 中的 bash hook 禁止使用 awk（引号嵌套不可控），替代方案: wc -l < file + 纯 bash if [ $n -gt N ]"
status: active
---
## [SKILL-001] Bash Hook 转义安全原则
- **提炼自**: LESSON-005
- **核心原则**: JSON→bash 多层转义不可控，禁止 awk，用纯 bash
- **验证方法**: `bash -c 'count=$(wc -l < file); if [ "$count" -gt 150 ]; then echo ALERT; fi'` 在 bash 中零错误执行

---
skill_id: SK-002
source_lesson: LESSON-002
efficiency_score: 8
rule: "所有 Hook 中的环境变量必须加双引号，禁止 echo $VAR 裸写，必须使用 echo \"$VAR\""
status: active
---
## [SKILL-002] Hook 变量引用安全原则
- **提炼自**: LESSON-002
- **核心原则**: Hook 命令中所有环境变量必须加双引号包裹
- **验证方法**: `echo "$CLAUDE_TOOL_INPUT"` 在任何输入下不产生 bash syntax error

---
skill_id: SK-003
source_lesson: LESSON-003
efficiency_score: 8
rule: "飞轮系统必须区分 command hook (框架强制执行) 和 prompt hook (AI 可忽略)，自动化率低于 50% 的系统不是飞轮"
status: active
---
## [SKILL-003] 自动化设计原则
- **提炼自**: LESSON-003
- **核心原则**: 所有声称"自动"的功能必须有对应的 command hook，不能仅靠 prompt 文本
- **验证方法**: 审计 settings.json 中每个功能的触发是 command 还是 prompt
