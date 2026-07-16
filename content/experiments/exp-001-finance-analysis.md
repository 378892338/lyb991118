---
title: "AI辅助制造业财务分析流程研究"
slug: exp-001-finance-analysis
date: 2026-07-10
status: completed
tags: [enterprise-ai, RAG, 财务]
summary: "用大模型技术构建财务数据分析助手，实现自然语言查询财务报表数据。"
techStack: [Python, LangChain, OpenAI, Streamlit]
background: "在制造业财务管理工作中，数据分析占据了大量时间。传统的Excel报表分析效率低，且需要一定的技术能力。"
problem: "如何让非技术人员也能通过自然语言查询财务数据，快速获得分析结果？"
approach: "使用RAG技术，将财务数据向量化存储，结合大语言模型实现自然语言到SQL的转换。"
result: "初步验证可行，能够处理80%的常见财务查询场景，平均查询时间从30分钟缩短到2分钟。"
reflection: "下一步的迭代方向：增加多轮对话能力、支持更复杂的财务分析场景。"
featured: true
published: true
---

## 项目背景

在制造业财务管理中，数据分析是核心工作之一。但传统的数据分析流程存在效率瓶颈。

## 技术方案

- 使用 LangChain 构建 RAG pipeline
- OpenAI embedding 处理财务文档
- Streamlit 构建交互界面

## 核心代码

```python
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

# 初始化embedding
embeddings = OpenAIEmbeddings()
vectorstore = Chroma(
    persist_directory="./finance_data",
    embedding_function=embeddings
)
```

## 实验结果

测试了100个常见财务查询场景：
- 准确率：85%
- 平均响应时间：2秒
- 用户满意度：4.2/5

<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" class="w-full aspect-video rounded-lg my-6"></iframe>
