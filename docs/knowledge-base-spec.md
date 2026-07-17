# Second Curve Lab — 知识库系统设计 v1.0

## 1. 现状与目标

**现状**：5 篇 `.md`，3 种类型，纯手动编辑，无搜索，无分类体系，无后端。

**目标**（用户量级：1 人 / 数百篇）：

```
上线即 MVP（配好 CMS + 搜索 + 分类）
           ↓
量上来后（100+ 篇）开启 AI 问答
           ↓
长期演进为个人知识库 + AI 咨询入口
```

## 2. 总体架构

```
用户浏览器: /knowledge /search /ask
              ↓
      Next.js App Router
  ┌─────────┐ ┌──────┐ ┌──────┐
  │ 页面渲染  │ │搜索API│ │RAG   │
  │ SSG     │ │JSON  │ │API   │
  └────┬────┘ └──┬───┘ └──┬───┘
       │         │        │
  ┌────▼─────────▼────────▼───┐
  │     Pagefind Index        │
  │   (build-time 生成)       │
  └──────────┬────────────────┘
             ↓
  ┌──────────┬────────────────┐
  │ 内容层 (Git + .md)        │
  │ content/articles/         │
  │ content/experiments/      │
  │ content/cases/            │
  │ content/knowledge-base/   │
  │ public/images/            │
  └──────────┬────────────────┘
             ↓
  Decap CMS (GitHub OAuth / Personal Token)
  → 可视化编辑 → 自动 git commit
```

## 3. 层次设计

### 3.1 内容数据模型

```ts
export interface ContentMeta {
  // 基础
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  minutesRead?: number;
  published?: boolean;
  featured?: boolean;
  coverImage?: string;

  // 多级分类
  category: string;           // 一级，如 "AI/LLM"
  subcategory?: string;       // 二级，如 "AI/LLM/Agent"
  series?: string;            // 系列名
  seriesOrder?: number;

  // 知识库属性
  relatedSlugs?: string[];
  references?: string[];
  difficulty?: "beginner" | "intermediate" | "advanced";

  // 类型扩展 — 支持多模态
  contentType?: "article" | "video" | "audio" | "image";
  mediaUrl?: string;           // TTS/video 文件路径
  mediaDuration?: number;      // 音视频时长（秒）

  // 原有
  techStack?: string[];
  client?: string;
  industry?: string;
  type?: string;
  status?: string;
}
```

### 3.2 导航模型（Navbar 改为递归树）

```ts
export type NavItem = {
  label: string;
  labelCn: string;
  href?: string;
  children?: NavItem[];
}
```

有 `children` 的下拉渲染，单层的直接展示。数据驱动，Navbar 组件只做递归遍历。

### 3.3 搜索层：Pagefind + 中文降级

- 构建时 `npx pagefind --source .next/server/app --bundle-dir ../../public/pagefind --language zh`
- 前端 `<script src="/pagefind/pagefind.js">` 轻量加载
- **中文搜索降级**：如果 Pagefind 中文分词命中率低，前端自动 fallback 到 `fuse.js` 对标题/摘要做侧载模糊匹配

### 3.4 AI 问答层（Phase 3 开启）

**供应商**：DeepSeek（便宜，中文好）
**API Key**：`process.env.LLM_API_KEY`，服务器部署脚本注入，不提交 Git
**流程**：
```
POST /api/rag/ask  { query: string }
  → 搜索 TOP-5 相关文档 → 切片拼接 context
  → 调 DeepSeek API → 返回 { answer, sources: [{title, slug, url}] }
```

### 3.5 知识库路由

```
/knowledge                    ← 首页（分类入口 + 最近更新）
/knowledge/[category]         ← 按一级分类浏览
/knowledge/[category]/[slug]  ← 文章详情
/knowledge/tags/[tag]         ← 标签聚合
/search?q=xxx                 ← 全站搜索
/ask                          ← AI 问答（后期开启）
```

### 3.6 CMS 启动流程

Decap CMS 配置为 `backend: github` + Personal Access Token 模式：
1. 用户去 GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. 创建 token：repo 权限 → 只选目标仓库
3. 在浏览器 `/admin/` 登录时填入 token
4. Token 仅存本地浏览器 localStorage，不传输服务器

## 4. 文件变更清单

### 新建
| 文件 | 用途 |
|------|------|
| `src/lib/taxonomy.ts` | 分类体系 |
| `src/components/search/SearchDialog.tsx` | Cmd+K 搜索 |
| `src/components/search/SearchBar.tsx` | 移动端搜索条 |
| `src/app/knowledge/page.tsx` | 知识库首页 |
| `src/app/knowledge/[category]/page.tsx` | 分类浏览 |
| `src/app/knowledge/[category]/[slug]/page.tsx` | 文章详情 |
| `src/app/knowledge/tags/[tag]/page.tsx` | 标签聚合 |
| `src/app/api/rag/ask/route.ts` | RAG API |
| `src/components/rag/AskPanel.tsx` | AI 问答面板 |

### 修改
| 文件 | 变更 |
|------|------|
| `src/types/content.ts` | 增加 category, subcategory, series, contentType 等字段 |
| `src/lib/constants.ts` | NAV_ITEMS 改为可嵌套树 |
| `src/components/layout/Navbar.tsx` | 递归渲染 + 下拉菜单 |
| `public/admin/config.yml` | 增加 content type 配置 |
| `package.json` | 增加 pagefind 依赖 |
| `src/components/content/MarkdownRenderer.tsx` | support media embed |

## 5. 分阶段排期

**Phase 1（当前）**
- [ ] `ContentMeta` 扩展 + taxonomy 定义
- [ ] NAV_ITEMS 改为树结构 + Navbar 下拉渲染
- [ ] `/knowledge` 路由三页（首页 + 分类 + 详情）
- [ ] Pagefind 搜索集成
- [ ] CMS 配置上线
- [ ] 部署

**Phase 2（下周）**
- [ ] 现有内容 frontmatter 按分类重构
- [ ] 新增 10~20 篇内容
- [ ] 标签聚合页 + 相关文章推荐

**Phase 3（50+ 篇后）**
- [ ] RAG API 路由
- [ ] AI 问答面板
- [ ] TTS / 视频嵌入支持

## 6. 约束与风险

| 项 | 状态 |
|------|------|
| 搜索 | Pagefind 构建时索引 < 500ms；中文不稳则 fuse.js 降级 |
| AI Key | process.env.LLM_API_KEY，不提交 Git |
| CMS 认证 | Nginx Basic Auth 已就位，CMS 内用 PAT 不传服务器 |
| 多模态 | contentType + mediaUrl 字段预留，渲染层后续扩展 |
| 无 DB 依赖 | 全程文件系统 + Git |
| 退出路径 | Pagefind→Meilisearch；.md→SQLite；RAG→Coze/Dify |
