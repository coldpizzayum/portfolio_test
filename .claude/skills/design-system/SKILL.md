---
name: design-system
description: >
  Yiting 個人作品集網站的設計系統規則（色彩、字級、間距、陰影、共用元件、
  按鈕語意）。每次新增頁面、新增元件、或修改既有 UI 時都必須套用這份規則，
  不可以自己發明新的顏色/字級/間距/陰影數值，也不可以繞過共用元件手刻
  按鈕、卡片或標籤。只要任務涉及這個 repo 底下的任何 .tsx / .css 檔案改動，
  就該先讀這份 skill，即使使用者沒有明講「照設計系統做」。
---

# Design System

這份 skill 記錄的是「已經拍板的決策」，不是討論空間。如果要用的值不在下面
清單裡，先停下來問，不要自己發明一個看起來差不多的數值。

## 維護原則（給未來更新這份檔案的人看）

這份 skill 只記錄「現在生效的規則」，不記錄變更過程。更新這份檔案時：

- 直接覆寫舊數值，不要寫「原本是 A 後來改成 B」
- 不要加日期戳記或「XX 更新」這類敘述
- 如果一個方案被推翻，直接刪除，不要留著並註記「已推翻」
- 過程、討論、決策脈絡屬於 Notion 文件，不屬於這裡

這是給以後也在編輯這份 SKILL.md 的人（不管是你自己還是我）看的，確保這份
檔案不會隨著時間變成一本流水帳。

## 核心原則

所有色彩、字級、間距、圓角、陰影，一律引用 `app/globals.css` 的
`@theme inline` 區塊裡定義的 token，禁止在 component 檔案裡直接寫死
hex / px / rgba 數值。專案沒有裝 `tailwind-merge`，所以共用元件的鎖定屬性
（padding、字重、hover）不開放用 `className` 字串覆寫，一律用明確的
prop（enum）控制。

---

## 色彩 Token

色彩一律讀 `app/globals.css` 的 `@theme inline` 區塊定義的 token，不要
假設或憑記憶回答色值，修改或引用前先讀取該檔案確認現況。

**命名邏輯與語意規則**：

- `--color-fg-*`／`--color-bg-*`：主要文字色／背景色家族，含各自的
  hover、secondary 變體。
- `--color-cta-*`：品牌強調色家族，只用於按鈕／圖形背景，**禁止用在內文
  文字**；文字需要這個色系一律改用 `--color-cta-text`（`--color-cta`
  本身是調給按鈕底色用的，直接當文字色可讀性差）。
- `--color-card-*`：卡片配色家族，部分成員有對應的 `--color-card-*-text`
  文字變體，用於卡片徽章文字——兩者要配對使用，不要混搭不同卡片顏色的
  底色跟文字色。
- `--color-available`：低調狀態指示專用色，跟 `--color-cta` 系統無關，
  不要混用。

**不要用名字猜色值**：`card-sage`／`card-slate`／`card-sage-text`／
`card-sand-text`／`card-salmon-text` 是已刪除的舊 token 名稱，全站零
引用——看到這些名字不要憑印象猜色值或以為還存在，一律以 `globals.css`
現況為準。

---

## 字體家族

全站只有 2 個字體：**Source Serif 4**（`font-serif`，`text-h1`~`h3`）、
**Source Sans 3**（`font-source-sans-pro`，其餘所有文字，也是 `<body>`
預設字體）。JetBrains Mono、Inter 已整套移除，不要再加回來。

## 字級系統

8 個字級 token 全部是 `clamp()` 流體字級，縮放參考範圍固定是 375px
（手機）→ 1280px（桌機），中間平滑內插，不是斷點式跳躍。實際數值定義在
`app/globals.css`，修改或引用前請先讀取該檔案確認現況。

**核心規則**：

- **禁止手寫「手機固定 px + `md:text-hX`」這種兩段式跳躍寫法**——token
  本身就會流動縮放，直接引用 token，不用加 `md:` 前綴。這個模式曾經在
  平板尺寸（尤其 iPad 直向卡在 `md` 斷點 768px）直接吃到滿版桌機字級，
  是修過的真實 bug，不要再犯。
- 大字級（`text-h1`／`text-h2`）才給真正大幅度的縮放範圍；其餘字級因為
  全站到處固定使用，範圍刻意留小，避免不小心波及全站。
- 某個元件想要比共用 token 更誇張的縮放，**給它自己的獨立 `clamp()`，
  不要去撐大共用 token**。如果同一組獨立 `clamp()` 值開始在第二個地方
  重複出現，就該考慮升格成正式 token。

---

## 陰影 Token

黑色基底統一用純黑透明 `rgba(0,0,0,..)`，不要用帶藍深灰
`rgba(16,24,40,..)`。實際陰影值定義在 `app/globals.css`，修改或引用前
請先讀取該檔案確認現況。

---

## 間距 Token

`--spacing-*` 定義在 `app/globals.css` 的 `@theme inline`，Tailwind 會
自動產生對應的 `p-`/`m-`/`gap-` 等 class。修改或引用前請先讀取該檔案
確認現況，不要假設或憑記憶回答。

---

## 共用元件

### `<GlassCard>`

鎖死不開放客製：`bg-dot-grid` 紋理、`max-w-[1200px]`、
`rounded-2xl md:rounded-[20px]`、漸層背景、`shadow-card`、
`backdrop-blur-[12px]`。

動畫需求用 `<Reveal><GlassCard>...</GlassCard></Reveal>` 外部組合，不要把
動畫邏輯塞進 GlassCard 本身，職責要分開。

實際 props 定義見 `GlassCard.tsx`。

### `<Button>`

Button props 速查：`variant`(primary/secondary/third/links)、
`square`(icon-only 方形)、`hoverTrigger`(self/group，卡片內裝飾用
`<span>` 要選 group)、`underline`(只對 links 有效)。完整型別定義見
`Button.tsx`。

鎖死不開放客製：`rounded-lg`（`links` 除外）、
`inline-flex items-center justify-center`、各 variant 的底色/文字色/
邊框色/hover、transition duration。

#### Variant 使用邏輯

選 variant 前先問：這顆按鈕是「這裡最重要的行動」、「留在原地的輔助動作」、
「帶你往前/往外走」，還是「就只是一段可以點的文字」？

| Variant | 樣式 | Hover | 使用時機 | 範例 |
|---|---|---|---|---|
| **primary** | `bg-cta`，`COMPACT_SHAPE` | `hover:bg-cta-hover`（實色替換） | 這個區塊裡**最想要使用者做的單一動作**，一個區塊只出現一次 | Hero「Check out recent work」、「Read case study」 |
| **secondary** | `bg-fg text-bg`，`COMPACT_SHAPE` | `hover:bg-fg-hover` | 推進到新內容，或離開目前脈絡（不論站內站外） | AiProjectsSection「AI Project」、Header LinkedIn/Say Hello、JourneyTimeline「My Resume」、MoreCaseStudies「Next」、Hero 扇形卡 CTA 小標籤 |
| **third** | `border border-border`，`COMPACT_SHAPE` | `hover:border-fg hover:bg-bg-alt` | 陪襯 primary 的次要選項，或「留在附近」的動作 | Hero「Learn more about me」、AiProjectsSection「GitHub」、Footer「Copy my email」（有 icon）、MoreCaseStudies「Back」 |
| **links** | `text-fg` + 底線（`underline decoration-2 underline-offset-3`） | `hover:text-cta-text` | 純文字連結，不是按鈕 | Footer 連結欄（Resume/LinkedIn/GitHub/Nav.）、CaseStudyBlock 內文連結 |

### Link Hover 顏色分組

站內連結／可點擊小元件的 hover 顏色分幾組，彼此獨立成立，不要互相
借用——各組實際成員跟理由見對應元件檔案的程式碼註解（`Header.tsx`／
`ActivityHeatmap.tsx`／`WorkIndexRail.tsx`／`JourneyTimeline.tsx`／
`CaseStudySideNav.tsx`／`Button.tsx` 等）。

### `<TagChip>`

規格鎖死成單一款式，沒有 variant/size，全站只有一種規格——改這裡會同時
影響 `WorkCard` 跟 `CaseStudyView` 兩處全部的標籤。實際 class 定義見
`TagChip.tsx`。

---

## 禁止事項

1. 不要寫死顏色/字級/間距/陰影數值，一律引用上面的 token
2. 不要在內文文字用 `--color-cta`（resting 或 hover 皆同），只能用在按鈕/圖形背景——文字需要這個色系的地方一律用 `--color-cta-text`，見上方色彩 token
3. 不要手寫「手機固定 px + `md:text-hX`」的字級跳躍寫法，直接引用流體 token
4. 重複元件（按鈕、卡片、標籤）一律用共用元件，不要各頁各自手刻一份
5. 不要用 `className` 覆蓋 `<GlassCard>` / `<Button>` 鎖定的 padding、字重、hover 屬性（專案沒裝 tailwind-merge，覆寫順序不保證）
6. 不要看到 `card-sage` / `card-slate` 這類已刪除的舊 token 名稱就憑印象猜色值，一律以 `app/globals.css` 現況為準

---

## 未完成事項（下一輪處理，目前先不要動）

- `TestimonialCard` 照片/語錄卡陰影疊加、CSS 生效順序不穩定：待重新設計該卡片的陰影邏輯（見 `TestimonialCard.tsx` 對應註解）
- `--color-cta` 對 `--color-bg` 的對比未達建議標準，尚未處理，實際數值見 `globals.css` 換算。受影響位置：Hero「Check out recent work」（僅手機）、WorkCard「Read case study」、Footer 相關按鈕、MoreCaseStudies「Read case study」
- 是否要導入 `tailwind-merge`：待整體評估，目前用 enum prop 繞過這個問題
- 標題（H2/H3/H4）跟內容的間距已經統一成三層固定 token，但還沒決定要不要讓它們跟 `text-h1`~`h5` 的 `clamp()` 掛勾一起流體縮放——是獨立的下一輪。H1→副標語/下一段內容這輪沒有動，只出現 1-2 個案例，還沒有「統一」的必要性
- 間距 token 是否要從「手機/桌機兩個固定值」進化成流體 `clamp()`（呼應字級系統的做法）：這輪刻意沒做，只解決數值不統一的問題
