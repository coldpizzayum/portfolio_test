---
name: case-study-copy
description: >
  Case study 標題／副標題／標籤文案的 Notion ↔ code 對照表。使用者維護一份
  Notion 文件當文案的 single source of truth（連結見下方），改完會叫我
  「更新」或直接貼 Notion 連結過來。任何時候要同步 case study 文案、或要
  改 data/caseStudies.ts 裡 workItems／caseStudies 的 title／description／
  subtitle／tags 欄位，都先讀這份 skill——裡面記錄了改一個欄位會連動渲染到
  哪些頁面，避免漏改或誤以為兩個欄位是同一份文字。
---

# Case Study 文案同步

## Notion 來源

https://app.notion.com/p/3c4ab7a61e228164a5d9faecffebaf0f

使用者在這份 Notion 頁面編輯文案，改完會說「更新」或貼連結過來。流程固定是：

1. `notion-fetch` 抓這個頁面最新內容
2. 逐欄比對現在 `data/caseStudies.ts` 的值，抓出差異
3. 用 `Edit` 套用到 `data/caseStudies.ts`（不要改 Notion 文件本身的結構/標題，
   除非使用者要求）
4. `npx tsc --noEmit` + `npx eslint data/caseStudies.ts`
5. `curl` 首頁、`/case-study`、三個 `/case-study/[slug]` 頁確認 200 且新文字
   有出現
6. 用繁體中文回報改了哪些欄位

Notion 文件本身沒有欄位級的變更記號（不再用紅字標記），每次都是整份內容視為
目前的目標值，直接跟 code 現況做 diff。

## 資料結構：兩組陣列，各自獨立

`data/caseStudies.ts` 裡有兩組平行資料，用 `slug` 對應同一個真實案例，**不是
同一份文字**，改一邊不會自動改到另一邊：

| | `workItems[]`（`WorkItem`） | `caseStudies[]`（`CaseStudy`） |
|---|---|---|
| 欄位 | `title` / `description` / `tags` / `image` | `title` / `subtitle` / `tags` / `heroImage` |
| 對應關係 | `caseStudySlug` 指向 `caseStudies[].slug` | `slug` |
| 語意 | 卡片文案（短，給列表用） | 頁面文案（Hero 區塊的完整標題/副標題） |

兩邊的 `title`（跟 `description`／`subtitle`）**允許不一樣**，過去這兩組文字
時而同步、時而刻意分開維護，不要假設「標題應該要一致」是規則——一切以 Notion
文件當下寫的為準，Notion 文件也是分成「1. Work Card」跟「2. Case Study 頁面
本身/More Works」兩節分開列，不是筆誤。

## 改一個欄位，連動到哪些頁面

### `workItems[i]`（改這裡 = 兩個地方同時變）
- **首頁** `Selected works`（`WorkCard.tsx`，`#works` 區塊）
- **`/case-study` 索引頁**（`WorkImageCard.tsx`，透過 `CaseStudyIndex.tsx`）

這兩個頁面讀的是同一個 `workItems` 陣列、同一份 JSX props，改一次自動兩邊
都更新，不用分開改。

`workItems[i].tags` 有**固定分類限制**：`/case-study` 索引頁的 `FilterPills`
只認 `CaseStudyIndex.tsx` 裡寫死的 7 個分類（`AI`／`B2B`／`B2C`／`eCommerce`／
`FinTech`／`Data Heavy`／`Blockchain & Web3`）。幫 `workItems` 加標籤時只能用
這 7 個之一，寫別的字（例如「Pre-seed」）不會報錯，但那張卡片在任何篩選條件
下都不會被篩出來（只有「全部」看得到），等於篩選功能失效。

### `caseStudies[i]`（改這裡 = 三個地方同時變）
- **該案例自己的 Hero 區塊**（`CaseStudyView.tsx`：`title`／`year`／`subtitle`／
  `tags`／`heroImage`）
- **同一頁的 Overview 卡片**（只有設了 `meta` 才會出現）：`subtitle` 會重複
  顯示在「Overview」欄位標籤下面，是同一個欄位渲染兩次，不是獨立文案
- **其他兩個案例頁面**的「More case studies」堆疊卡片（`MoreCaseStudies.tsx`，
  `#next` 區塊）：卡片的標題/描述直接讀 `cs.title`／`cs.subtitle`
  （`CaseStudyView.tsx` 裡 `otherCaseStudies` 這段 map 出來的），**不是**
  獨立欄位。改了 `caseStudies[i].title`／`subtitle`，另外兩頁的 More case
  studies 卡片會自動一起變,不用另外去改 `MoreCaseStudies.tsx` 或
  `MoreCaseStudyItem`。

`caseStudies[i].tags` 是自由描述性標籤，沒有固定分類限制，跟 `workItems`
的標籤系統不互通，也不需要對齊。

## 已知的欄位落差（不是 bug）

- `meta.timeline`／`meta.tools` 三個案例的資料都有存，但 `CaseStudyView.tsx`
  目前完全沒有渲染這兩欄到任何地方。改這兩欄不會反映在網站上，除非先加渲染
  邏輯。
- `metaDescription`（SEO meta/OG description）是獨立欄位，`subtitle` 沒設時
  才會 fallback 用它。改 `subtitle` 不會自動同步 `metaDescription`，Notion
  文件目前也沒有涵蓋這欄，需要另外問使用者是否要一起改。
