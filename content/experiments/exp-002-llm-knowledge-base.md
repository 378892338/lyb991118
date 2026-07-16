---
title: "基于LLM的企业知识库系统搭建"
slug: exp-002-llm-knowledge-base
date: 2026-07-08
status: ongoing
tags: [enterprise-ai, LLM, RAG, 知识管理]
summary: "为企业搭建基于大语言模型的知识库系统，实现内部文档的智能检索和问答。"
techStack: [Python, LangChain, OpenAI, FastAPI]
background: "企业知识管理是制造业数字化的核心问题。大量技术文档、操作规程散落在不同系统中。"
problem: "如何将分散的企业知识整合起来，让员工能够快速找到所需信息？"
approach: "搭建RAG知识库系统，支持多格式文档上传、智能检索和问答。"
result: "第一阶段完成，支持PDF、Word、文本文件的上传和检索。"
reflection: "需要优化中文场景下的检索准确率，增加权限管理功能。"
featured: true
published: true
---

## 系统架构

该系统采用经典的 RAG 架构：

1. 文档解析层
2. 向量存储层
3. 检索增强层
4. 问答生成层

## 技术栈

- 后端：FastAPI + LangChain
- 向量数据库：Chroma
- LLM：GPT-4
- 前端：React

## 关键设计

文档解析是难点。制造业的文档格式多样，包括 PDF 图纸描述、Word 操作规范、Excel 数据表等。
