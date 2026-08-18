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

## 核心原則

所有色彩、字級、間距、圓角、陰影，一律引用 `app/globals.css` 的
`@theme inline` 區塊裡定義的 token，禁止在 component 檔案裡直接寫死
hex / px / rgba 數值。專案沒有裝 `tailwind-merge`，所以共用元件的鎖定屬性
（padding、字重、hover）不開放用 `className` 字串覆寫，一律用明確的
prop（enum）控制。

---

## 色彩 Token

| Token | 色值 | 用途 |
|---|---|---|
| `--color-fg` | `#233a48` | 主要文字色 |
| `--color-fg-secondary` | `#b2bcc2` | 次要文字色（2026-08-17 從 `#6b6b6b` 改）。2026-08-18 一輪批次把好幾處原本用這個 token 的文字改成 `--color-fg`：Header NavPills 未選取項目（見下方 Link Hover 分組）、`TagChip`（全站標籤共用元件）、TestimonialCard 非 sticky 卡片的 role 文字、Footer 的 Berlin 時鐘那行、JourneyTimeline 手風琴列的日期範圍、`ToggleBlock` 的兩個 icon（Info／Chevron）、FeedbackStack Investment 卡片的 Date 文字。不是把這個 token 整個廢棄——上面列的以外的位置（如 FeedbackStack 的 role 文字、CaseStudyView 年份列、CaseStudySideNav 等）沒有變，這個 token 還是活著的，只是這幾處被判斷成「該用主要文字色」而個別搬走 |
| `--color-fg-hover` | `#465761`（2026-08-18 從 `#333333` 改） | 深色按鈕的 hover 狀態 |
| `--color-bg` | `#f7f5f2` | 主背景 / 深色按鈕上的文字色 |

> `--color-fg` 曾經在一次 rewind 操作中被意外還原回舊值 `#1a1a1a`，2026-08-17 重新確認並改回 `#233a48`——這是目前的正式值，不要看到舊筆記或截圖裡的 `#1a1a1a` 就改回去。`--color-bg`／`--color-surface` 沒有一起還原（使用者這輪沒有要求），目前 `--color-bg` 仍是 rewind 前的舊值 `#f7f5f2`、`--color-surface` 這個 token 不存在，如果之後要補回來要再確認一次。
| `--color-cta` | `#00ffae`（2026-08-18 從 `#ff6553` 珊瑚色改成螢光綠，經 Notion 標注確認） | 品牌強調色，只用於按鈕/圖形背景，**禁止用在內文文字的 resting 狀態**（見下方「已知例外」：`feedbackGrid` headline 關鍵字高亮、`<Button variant="links">` 的 hover） |
| `--color-cta-hover` | `#00d994`（2026-08-18 新增） | `--color-cta` 的 hover 狀態，目前只有 `<Button primary>` 用（`hover:bg-cta-hover`，實色替換，取代原本的 `hover:opacity-85`） |
| `--color-border` | `#e2dfda` | 外框線 |
| `--color-available` | `#5a8a60` | 低調狀態指示（如 TOC 目前所在區塊、Impact Overview 數字卡外框），視覺任務是「安靜不搶戲」 |

> `--color-success`（`#017d18`）已於 2026-08-18 刪除、合併進 `--color-available`——原本唯一的用法（`CaseStudyView.tsx` 的 Impact Overview 數字卡外框）已經改成 `border-available`。不要再加回這個 token，兩個「強調用途」的色彩現在統一用 `available`。

### 卡片配色家族 `--color-card-*`

| Token | 色值 | 用途 |
|---|---|---|
| `--color-card-sand` | `#f5c563` 暖金黃 | Hero 扇形卡、WorkSection 圖片欄輪替、徽章底色 |
| `--color-card-photo` | `#e2dfda` 中性暖灰 | Hero 媒體卡底色 |
| `--color-card-salmon` | `#f3a79e` 鮭粉色 | Header 大頭貼圓框、WorkSection 輪替、徽章底色 |
| `--color-card-jade` | `#74c2a0` 薄荷/翡翠綠 | WorkSection 圖片欄輪替 |
| `--color-card-sky` | `#acdbff` 天空藍 | Hero「Build with AI」卡 |
| `--color-card-mint` | `#b9f1e4` 淡薄荷粉彩 | Hero「About Me」卡，色相跟 `card-jade` 接近但明顯更淺更粉嫩，兩者**不要**互相借用 |
| `--color-card-sand-text` | `#5c4108` | 搭配 `card-sand` 的徽章文字 |
| `--color-card-salmon-text` | `#7a1f22` | 搭配 `card-salmon` 的徽章文字 |

> `card-sage` / `card-slate` / `card-sage-text` 是舊名稱，已全面改名並確認
> repo 內沒有殘留引用，不要再使用這些舊名字。

### 已知例外（刻意不 token 化）

- `#f5a623`（星星評分色）：只出現一次，跟卡片配色沒有配對關係，語意是「評分」不是「卡片文字」。除非未來這個模式重複出現，否則不用建立 token。
- **ActivityHeatmap 的 9 色熱力圖階梯**（`#ebedf0`／`#9be9a8`／`#40c463`／`#30a14e`／`#216e39`／`#ffe0d6`／`#ffb199`／`#ff8a66`／`#ff6553`）：GitHub 來源模仿 GitHub 自己的綠色階梯，Claude Code 來源用暖色系（最深階 `#ff6553` 是寫死值，**不是** `--color-cta` 的引用——2026-08-18 `--color-cta` 改成 `#00ffae` 之後兩者已經不再相等，這組調色盤本來就是獨立於 token 之外的，不用跟著變），程式碼裡已有註解說明用意，是資料視覺化專屬的獨立調色盤，不要拆開套用到其他地方。
- **`--color-cta` 用在內文文字（resting 狀態）**：案例研究 `feedbackGrid` 卡片的 headline 裡，關鍵字（機構名稱，如「AppWorks」「Alibaba Cloud」）刻意用高亮，是唯一被核准的 resting 狀態例外，不要當成可以比照辦理的先例套用到其他內文。實作是 `CaseStudyBlock.tsx` 的 `renderInline()` 新增的 `==text==` 語法（跟既有的 `**bold**`同一套 helper），只在寫 `feedbackGrid` 的 `headline` 欄位時使用。
- **`--color-cta` 用在內文文字（hover 狀態）**：`<Button variant="links">` 的 hover 統一是 `text-cta`，2026-08-18 起用在 Footer 連結欄跟 CaseStudyBlock 內文連結兩處，見下方 `<Button>` 章節，不是單一例外了。

---

## 字體家族

全站只剩 3 個字體：**Source Serif 4**（`font-serif`，大標題 `text-h1`~`h3`）、
**Source Sans 3**（`font-source-sans-pro`，其他所有文字——內文、小標題
`text-h4`/`text-h5`、UI 控制項如 Button/TagChip/nav 連結，也是 `<body>` 的
`font-source-sans-pro` 預設字體）、**JetBrains Mono**（`font-mono`，只有
ActivityHeatmap 跟 WorkIndexRail 用）。

**Inter 已於 2026-08-17 從全站移除**：`app/layout.tsx` 不再載入 `Inter`（`next/font/google`），
`<body>` 的 class 從 `font-sans` 改成明寫 `font-source-sans-pro`，`globals.css` 的
`--font-sans` 也重新指向 `var(--font-source-sans)`（不是刪掉這個 CSS 變數，是改指向，
避免 Tailwind 內部任何地方還在引用 `--font-sans` 時撞到失效的字體）。Inter 原本是
`<body>` 的隱性預設字體，沒有任何地方明寫 `font-sans` class 之外的用法，所以拿掉
沒有需要額外處理的殘留引用。**不要再加回 Inter**，UI 控制項文字現在統一用
Source Sans 3。

## 字級系統

8 個字級 token（`text-h1`／`text-h2`／`text-h3`／`text-h4`／`text-h5`／`text-body`／
`text-body-sm`／`text-caption`）全部是 `clamp()` 流體字級，不是固定 px，行高也是
無單位比例值（不是固定 px）。

| Token | `font-size` | 行高 | 字重 | 字體 | 定位 |
|---|---|---|---|---|---|
| `text-h1` | `clamp(44px, 29.08px + 3.98vw, 80px)` | `1` | 700 | Source Serif 4 | 只用在 Hero 主標題 |
| `text-h2` | `clamp(40px, 30.06px + 2.65vw, 64px)` | `1.1` | 700 | Source Serif 4 | 章節主標題，跟手機版配一個更小字級的家族；案例研究頁標題（`CaseStudyView.tsx` H1）也直接套用這個，不再用自己的 `clamp()` |
| `text-h3` | `clamp(26px, 23.51px + 0.66vw, 32px)` | `1.2` | 600 | Source Serif 4 | 次級標題（WorkCard、案例研究區塊標題——含 `CaseStudyView.tsx` 段落 `<h2>`） |
| `text-h4` | `clamp(20px, 18.34px + 0.44vw, 24px)` | `1.2` | **700** | **Source Sans 3** | 小標題，全站多處平常直接固定使用，範圍刻意留小；案例研究 Overview/My role/Team/Impact Overview 標籤也套這個 |
| `text-h5` | `clamp(22px, 17.86px + 1.10vw, 32px)` | `1` | 700 | Source Sans 3 | 強調用的大數字（案例研究 `statRow` 數字統計）。2026-08-17 從獨立 `clamp()` 升格成 token 時曾短暫改成固定 `32px`；2026-08-18 先改回流體（原始值 `clamp(32px, ..., 42px)`），同日又整段往下推 10px，桌機上限從 42px 收回 32px、手機下限跟著從 32px 變 22px，`vw` 係數（slope，兩次都是 1.10）沒變，只是整條曲線往下平移 |
| `text-body` | `clamp(18px, 17.17px + 0.22vw, 20px)` | `1.5` | 400 | Source Sans 3 | 加 `font-bold` 可當作 Impact 數字卡標籤用（「Body Bold」） |
| `text-body-sm` | `clamp(17px, 16.59px + 0.11vw, 18px)` | `1.5` | 400 | Source Sans 3 | 預設內文字級，全站到處共用；加 `font-bold` 是 FeedbackStack 卡片標題用的「Body-sm (Bold)」 |
| `text-caption` | `clamp(13px, 12.59px + 0.11vw, 14px)` | `1.2` | 400 | Source Sans 3 | 全站到處共用；FeedbackStack 徽章文字也套這個 |

**2026-08-17 兩輪更新**：
1. `text-h3`／`text-h4` 桌機上限縮小（40→32px、28→24px），`text-h4` 手機下限也跟著調小（24→20px），`text-h3`／`text-h4` 行高都改成 `1.2`（原本都是 `1`）、`text-body`／`text-body-sm` 行高統一調成 `1.5`（原本分別是 `1.4`／`1.2`）。中間的 `clamp()` 內插係數（`Apx + Bvw`）都是用同一條公式重算：`B = (MAX-MIN)*100/905`、`A = MIN - (MAX-MIN)*375/905`（375px→1280px 兩個端點的線性內插，跟其他 token 的算法一致）。
2. `text-h4` 的**字體跟字重同時換了**：`font-serif`／600 → `font-source-sans-pro`／700。這不是筆誤，是刻意決定——全站 6 處用到 `text-h4` 的地方（Hero 扇形卡標題、OutsideWork/Footer/JourneyTimeline 標題、CaseStudyBlock 段落標題、MoreCaseStudies 卡片標題）字體都從襯線變成無襯線、變粗了。
3. 新增 `text-h5`，取代原本 CaseStudyBlock 數字統計的獨立 `clamp(32px, 27.86px + 1.10vw, 42px)`——升格當下改成固定 `32px`，2026-08-18 先改回原始 `clamp()`，同日又把整條曲線往下推成 `clamp(22px, 17.86px + 1.10vw, 32px)`（見下方）。

**2026-08-18**：`text-h5` 改回流體，一度是 `clamp(32px, ..., 42px)`，這連帶
影響到下方「案例研究頁 H1/H2/標籤」例外段落記錄的年份/專案列
（`CaseStudyView.tsx` 的 `caseStudy.year`）——那裡當初特意選 `text-h5` 是要它
在桌機固定 32px，一度會跟著長到 42px。同日稍後 `text-h5` 的範圍又整段往下推
成 `clamp(22px, ..., 32px)`，桌機上限剛好收回 32px，年份列在桌機的視覺結果
意外跟原始「固定 32px」的設計意圖重合了——但這是巧合，手機端現在會是 22px
起跳（原本固定版本手機也是 32px），跟原本「完全固定不變」的意圖不同，只是
桌機端數字剛好一樣。

> `text-links`（曾經是 `clamp(17px, 16.59px + 0.11vw, 18px)`、行高 `1`、字重 500）2026-08-17 刪除——盤點發現定義了卻全站零使用，站內連結實際上都是各自用 `text-sm`／`text-caption`／`text-[13px]` 硬寫，沒有真的套過這個 token。不要再加回來，除非有真的要用它的地方。

**核心規則**：

- 縮放參考範圍固定是 **375px（手機）→ 1280px（桌機）**，中間平滑內插，不是斷點式跳躍
- **禁止手寫「手機固定 px + `md:text-hX`」這種兩段式跳躍寫法**——token 本身就會流動縮放，直接引用 token 就好，不用加 `md:` 前綴。這個模式曾經導致平板尺寸（尤其 iPad 直向剛好卡在 `md` 斷點 768px）直接吃到滿版桌機字級，是修過的真實 bug，不要再犯
- `text-h1`／`text-h2` 是「跟手機版配一個更小字級」的專用大字級，才給真正大幅度的縮放範圍；`text-h3`／`text-h4`／`text-body-sm`／`text-caption` 因為全站到處平常直接固定使用，範圍刻意留小，避免不小心波及全站
- 某個元件想要比共用 token 更誇張的縮放（例如 Hero intro 文字 18→28px，2026-08-18 從 18→32px 縮小過），**給它自己的獨立 `clamp()`，不要去撐大共用 token**，不然全站其他用同一個 token 的地方會被一起連動放大。但如果同一組獨立 `clamp()` 值開始在第二個地方重複出現，就該考慮升格成正式 token，不要放著繼續當例外

### 已知例外：案例研究頁 H1/H2/標籤已全部改用共用 token（2026-08-17，取代舊版「縮小標題字級」例外）

`CaseStudyView.tsx` 裡的案例標題 `<h1>`、段落 `<h2>`、Overview/My role/Team/Impact Overview 標籤，**原本**是各自獨立的 `clamp()`（不是共用 token），這批已經拆掉、直接改套用共用 token：H1→`text-h2`、段落 H2→`text-h3`、Overview 系列標籤→`text-h4`、Impact 數字卡標籤→`text-body font-bold`。原本手動補的 `font-serif`／字重現在都由 token 自己帶，呼叫端只留 `tracking-[...]`（值沒變）跟顏色。

`CaseStudyView.tsx`／`CaseStudyBlock.tsx` 是三個案例研究頁（`web3-marketing-dashboard`／`influencer-marketing-tool`／`coolwallet-pro`）共用的同一份元件，不是各自獨立的模板，所以這次改動**自動套用到三頁**，不需要也不可能只套用單一頁面。`coolwallet-pro` 目前看不到 Overview/My role/Team/Impact 卡片,是因為它的資料本身沒有 `meta`／`impactStats` 欄位（整塊不會渲染），是內容差異，不是樣式不一致。

**2026-08-17 追加**：同一個 header 裡的年份/專案列（`caseStudy.year`，例如「2023 — 2024 | Growing3」）從 `text-caption` 改成 `text-h5`（當時是 32px 固定、Bold），顏色維持 `text-fg-secondary`。**2026-08-18**：`text-h5` 本身改回流體並整段往下推成 `clamp(22px, 17.86px + 1.10vw, 32px)`（見上方字級系統章節）——桌機端數字跟原本記錄的固定 32px 剛好一致，但手機端現在是 22px 起跳，不再是完全固定不變，這裡沒有單獨處理去補一個「手機也固定 32px」的例外。

### 已知例外：案例研究頁 header 結尾間距依「有無 Overview 卡片」分兩種

`CaseStudyView.tsx` 把 hero 圖片搬到跟標題並排後，header 結尾（最後一個子
元素）到第一個內文 `<h2>` 之間的間距，依該頁有沒有 `caseStudy.meta`（Overview
卡片）分成兩種，不是同一個固定值：

- **有 Overview 卡片**（`web3-marketing-dashboard`／`influencer-marketing-tool`）：
  標題列的 `mb-10` 只在有卡片時才加（用來隔開標題列跟卡片），`header` 用
  `pb-8`。卡片本身已經是封閉的白色色塊，收尾不需要跟滿版圖片一樣寬的呼吸空
  間，實測間距 **73px**。
- **沒有 Overview 卡片**（`coolwallet-pro`）：標題列不加 `mb-10`（沒有下一個
  元素可隔），`header` 維持 `pb-16`，實測間距 **105px**。

**不要**把這兩種間距改成同一個值——標題列的 `mb-10` 若沒有依 `caseStudy.meta`
做條件判斷，會在沒有卡片的頁面變成最後一個子元素、margin 依然生效，疊加出
多餘的 40px（曾經發生過：160px vs 145px 兩種都太空的間距，肉眼很難抓到差
異，用 CDP 量測 `getBoundingClientRect()` 才抓出來）。

### 已知例外：`FeedbackStack` 卡片的次要文字統一用 `text-caption`

`FeedbackStack.tsx`（案例研究 Feedback & Impact 卡片堆）裡，Customer Review 卡片
的 role 文字（如「@PrismX」）跟 Investment 卡片的 Date 文字，語意上是同一
層級的「次要 meta 文字」，字級樣式要一致：一律用 `text-caption`。
之前 role 文字誤用了裸的 `font-serif text-xs`——`text-xs` 不在字級 token
清單內，是硬寫值，已經修正，不要再改回去。

**2026-08-18 顏色出現分歧（尚未統一）**：Investment 卡片的 Date 文字顏色從
`text-fg-secondary` 改成了 `text-fg`，但 Customer Review 卡片 role 文字（`<span
className="text-fg-secondary">{card.role}</span>`）沒有跟著動，還是
`text-fg-secondary`。這兩處原本被記錄成「樣式要一致」，現在顏色不一致了——
是這次批次調整只精準命中其中一個選取器造成的副作用，如實記錄，不是刻意的
新設計決定，下一輪要看是兩個都收斂成 `text-fg` 還是改回 `text-fg-secondary`。

**2026-08-17 更新**：同一個元件另外三處也拆掉獨立寫死值，改用共用 token——
Customer Review／Investment 徽章文字從 `font-serif text-[10px] font-semibold`
改成 `text-caption`（字體從 Serif 變 Sans 3，字重從 semibold 變 400，尺寸從固定
10px 變流體 13–14px）；卡片標題（headline）從固定 `17px` 改成 `text-body-sm
font-bold`；星等評分維持獨立寫死值，但尺寸從 `text-xs`(12px) 調成 `text-[18px]`，
顏色 `#f5a623`、`tracking-wider`、沒有指定字體（繼承 body 預設）都不變。

### Tracking（字距）跟字級配對

| 字級 | Tracking |
|---|---|
| `text-h1` | `tracking-[-0.05em]` |
| `text-h2` | `tracking-[-0.03em]` |
| `text-h3` | `tracking-[-0.02em]` |
| `text-h4` | `tracking-[-0.01em]` |

**2026-08-17 更新**：`text-h1` 從跟 `text-h2` 共用 `-0.03em` 拆開，改成獨立的 `-0.05em`——四個字級現在是各自獨立的 4 級遞減 tracking（-0.05／-0.03／-0.02／-0.01em），不再有共用同一個值的兩個 token。`text-h1` 目前全站只有 Hero 主標題一處用到，已經同步改過。

**2026-08-17 補齊**：盤點發現 `text-h4` 全站 6 處用法裡有 5 處沒套對 tracking（`Hero.tsx` 扇形卡標題誤用 `-0.03em`、`OutsideWork.tsx`／`Footer.tsx`／`JourneyTimeline.tsx` 三處完全沒套、`MoreCaseStudies.tsx` 卡片標題誤用 `-0.02em`），只有 `CaseStudyBlock.tsx` 是對的。範圍比原本文件記錄的「只有 Hero 一處遺漏」大很多，已經全部補上 `tracking-[-0.01em]`。

### 標題跟內容間距（2026-08-17 改成分層 token，取代舊版單一 `mb-3` 規則）

「標題→它自己管轄的內容」的間距，依標題用的字級 token 分三層，每層一個固定值
（不分手機/桌機，這批不是響應式 pair）：

| Token | 值 | 對應字級 | 用在哪 |
|---|---|---|---|
| `--spacing-heading-gap-h2` | `12px`（`mb-heading-gap-h2`） | `text-h2` | AiProjectsSection／Footer／JourneyTimeline／TestimonialsSection／OutsideWork 的區塊主標題 |
| `--spacing-heading-gap-h3` | `20px`（`mb-heading-gap-h3`） | `text-h3` | WorkCard／CaseStudyView 段落標題／MoreCaseStudies（2026-08-17 從 `mb-8` 收斂進來） |
| `--spacing-heading-gap-h4` | `8px`（`mb-heading-gap-h4`） | `text-h4` | OutsideWork 子項標題、Footer 欄位標題（2026-08-17 從 `mb-4` 收斂進來）、Hero 扇形卡標題（2026-08-17 從完全沒設定間距改過來）、CaseStudyBlock 內文子標題（`mb` 部分，`mt-10` 維持不變沒有收進這批） |

**核心規則**：這批是**固定值，不是流體 `clamp()`**——字級本身雖然是 `clamp()`，
間距目前刻意維持固定，跟間距 token 那批（`--spacing-shell` 等）採同一個策略，
要不要進化成流體是獨立的下一輪決定。

**已知例外**：`WorkSection.tsx`（首頁「Selected works」）維持 `mb-10`（40px），
不套用 `--spacing-heading-gap-h2`——這不是待修的問題，是明確決定要跟其他 h2
標題不一樣的刻意選擇，不要「順手」改成 12px。2026-08-17 這輪修正過它的**寫法**
（原本間距是掛在外層 `<Reveal className="mb-10">` 上代管，跟其他標題「自己帶
margin」的寫法不一致，現在改成 `<h2 className="mb-10">` 直接帶在標題自己身上，
值沒變還是 40px，純粹統一實作方式）。

**2026-08-17 盤點時修正的兩個誤判**（記錄下來避免以後重犯）：
- Hero 扇形卡標題原本外層有 `space-y-3`(12px) 在管標題跟描述的間距，稽核報告
  一度誤記成「完全沒設定間距」——如果直接在標題上疊加 `mb-heading-gap-h4` 會
  變成兩段間距疊加成 20px。正確做法是拿掉 `space-y-3`，改成標題自己帶
  `mb-heading-gap-h4`，跟 WorkSection 一樣統一寫法
- JourneyTimeline 項目標題（h3）看起來「完全沒設定間距」，但那個 h3 其實是
  它所在 `<span>` 裡的**最後一個元素**（上面是日期文字，不是下面接內容），
  套用「標題→內容」的 token 不會有任何視覺效果——這處不屬於「標題→內容」
  這個情境，故意沒有套用任何 token，維持原樣

---

## 陰影 Token

| Token | 值 | 用途 |
|---|---|---|
| `--shadow-card` | `0 0 0 1px rgba(0,0,0,0.06), 0 4px 32px rgba(0,0,0,0.05)` | 玻璃卡片家族的標準陰影（髮絲外框線 + 柔和暈染） |
| `--shadow-hover` | `0 20px 48px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)` | 卡片 hover 提升狀態 |
| `--shadow-float` | `0 12px 30px rgba(0,0,0,0.12)` | 浮動 UI（如 TOC 側邊面板） |

黑色基底統一用純黑透明 `rgba(0,0,0,..)`，不要用帶藍深灰 `rgba(16,24,40,..)`。

### 已知例外（不要硬套進上面三個 token）

- **ActivityHeatmap** 的扁平髮絲線陰影：功能是「面板」不是「卡片」
- **TestimonialCard** 的照片/語錄卡陰影：專屬拼貼質感，且目前有兩段陰影 class 疊加、CSS 生效順序不穩定的已知問題，待獨立處理，不要在這裡順手修
- **MoreCaseStudies** 的堆疊卡片陰影：方向相反（往上投影），語意不同
- **ImageCollage** 的放大圖磚陰影：暈染範圍刻意比其他元素更大，用來強調「這個可以互動點擊」，不要收斂進 `shadow-float`

---

## 間距 Token

跟 `--color-*` 同一套機制：`--spacing-*` 定義在 `@theme inline`，Tailwind 會自動產生對應的 `p-`/`m-`/`gap-` 等 class（不用手寫 `@utility`）。**目前全部是手機/桌機兩個固定值的組合，不是跟字級一樣的流體 `clamp()`**——間距要不要改成流體縮放是獨立的下一輪決定，這批先只解決「同一種情境數值不統一」的問題。

| Token（手機值） | Token（桌機值，`md:` 前綴使用） | 用途 |
|---|---|---|
| `--spacing-shell`(20px) | `--spacing-shell-lg`(40px) | Section 外層水平留白（`px-shell md:px-shell-lg`）——Header/Footer/Hero/AiProjectsSection/JourneyTimeline/OutsideWork/About 首段/TestimonialsSection/WorkSection/CaseStudyView 全部套用，全站唯一的水平留白 token |
| `--spacing-section`(20px) | `--spacing-section-lg`(30px) | Section 外層垂直留白（`py-section md:py-section-lg`，Header 只用單邊 `pt-section`） |
| `--spacing-hero-top`(45px) | `--spacing-hero-top-lg`(50px) | 頁首上邊距（`pt-hero-top md:pt-hero-top-lg`）——Hero、About 首段、CaseStudyView header 三處 |
| `--spacing-card-glass`(28px) | `--spacing-card-glass-lg`(56px) | `<GlassCard>` 內距，唯一使用點是共用元件本身 |
| `--spacing-card-work`(32px) | `--spacing-card-work-lg`(48px) | WorkCard、MoreCaseStudies 外層卡片內距 |
| `--spacing-card-compact`(20px) | `--spacing-card-compact-lg`(32px) | ActivityHeatmap 面板、CaseStudyBlock 的圖片/影片/statRow 卡內距——2026-08-17 合併（CaseStudyBlock 原本手機是 24px，統一降到 20px 跟 ActivityHeatmap 對齊） |
| `--spacing-cs-section-gap`(48px) | `--spacing-cs-section-gap-lg`(80px) | 案例研究頁內文 section 之間的距離 + More case studies 區塊前後距離——2026-08-17 從完全沒有響應式的固定 `pt-20`/`mt-20`/`mb-20`(80px) 改過來，**桌機值不變，手機新增縮小到 48px** |

### 已知例外（刻意沒收進上面的間距 token）

- **GlassCard 的 `no-bottom` 變體**（Hero 專用）：水平內距跟頂部桌機內距套 `--spacing-card-glass`，但**手機頂部內距維持寫死的 `pt-9`(36px)**——這個值本來就跟 `--spacing-card-glass`(28px) 對不上，不是筆誤，不要硬改成一樣
- **WorkCard、MoreCaseStudies 以外的卡片**（FeedbackStack、CaseStudySideNav 浮動面板、TestimonialCard、ToggleBlock）：盤點過但刻意不合併——FeedbackStack 剛手動調過尺寸不想再動、CaseStudySideNav 是浮動 UI chrome 不是卡片、TestimonialCard 有已知的陰影疊加問題待獨立處理、ToggleBlock 內距是配合手風琴圖示位置手調的不規則值，四者都維持各自寫死
- **TestimonialsSection 手機版橫向捲動軸**（`-mx-8`/`px-8` 那對）：這是負邊距抵消正內距、讓內容貼齊螢幕邊緣捲動的技巧，不是「section 留白」，不要套用 `--spacing-shell`
- **ImageCollage 燈箱背景的 `p-6`**：稽核報告曾經誤把它歸類成「卡片內距」，實際上是全螢幕 lightbox 遮罩的邊緣留白（`fixed inset-0 ... p-6`），不是卡片，這輪沒有套用任何間距 token，維持寫死 24px

---

## 共用元件

### `<GlassCard>`

```tsx
interface GlassCardProps {
  children: React.ReactNode;
  padding?: "default" | "no-bottom"; // 預設 "default"（--spacing-card-glass，28px/56px）
  // "no-bottom":Hero 專用，底部無 padding 讓漸層淡出遮罩貼齊邊緣
  className?: string; // 逃生口，不影響 padding，不可用來覆蓋鎖定屬性
}
```

鎖死不開放客製：`bg-dot-grid` 紋理、`max-w-[1200px]`、
`rounded-2xl md:rounded-[20px]`、漸層背景、`shadow-card`、
`backdrop-blur-[12px]`。

動畫需求用 `<Reveal><GlassCard>...</GlassCard></Reveal>` 外部組合，不要把
動畫邏輯塞進 GlassCard 本身，職責要分開。

### `<Button>`（2026-08-18 從 3 變體改成 4 變體，同日稍後拿掉 `size` prop，
再稍後新增 `square`／`ariaLabel` 吸收 Header 的手刻按鈕）

```tsx
interface ButtonProps {
  variant?: "primary" | "secondary" | "third" | "links"; // 預設 "primary"
  hoverTrigger?: "self" | "group"; // 預設 "self"，卡片內裝飾用 <span> 用 "group"
  square?: boolean; // icon-only 方形按鈕（h-10 w-10，無水平 padding、無 gap），primary/secondary/third 適用，links 無視這個 prop
  ariaLabel?: string; // square=true 時必填（沒有可視文字，靠這個給無障礙名稱），一般按鈕也可以傳
  as?: "a" | "button" | "span";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string; // 逃生口，不影響 padding/字重/hover
  children: React.ReactNode;
}
```

**新舊 variant 對應**（prop 值維持小寫，只有對外的顯示名稱大寫）：舊
`primary`（cta 底）→新 `primary`（Primary，沒變）；舊 `dark`（實心深色）→新
`secondary`（Secondary）；舊 `secondary`（外框）→新 `third`（Third）；`links`
是全新的，舊系統沒有對應。**這個改名很容易搞混，「secondary」這個字現在指的
是完全不同的東西**（以前是外框，現在是實心深色）——改程式碼前務必先確認
是要接哪一個。

鎖死不開放客製：`rounded-lg`（`links` 除外，見下方）、
`inline-flex items-center justify-center`、各 variant 的底色/文字色/邊框色/
hover、transition duration。

#### 尺寸（2026-08-18 起沒有 `size` prop 了）

`primary`／`secondary`／`third` 三個 pill 變體現在共用同一個固定形狀常數
`COMPACT_SHAPE`：`h-10`（固定高度，不是 padding 撐出來的）+ `rounded-lg`
（8px 圓角，不是膠囊）+ `px-4`，字重統一 `font-semibold`。原本的演變過程：

1. `secondary` 先脫離「`rounded-full` + `size` 決定 padding」的膠囊系統，
   改成固定形狀 `rounded-lg px-3.5 py-2.5`——比對基準是 `Header.tsx` 的
   `DARK_BUTTON`（見下方已知例外），當時只是視覺上接近，字面上還不是同一
   組數值。
2. 這導致 AiProjectsSection 裡並排的「AI Project」（`secondary`，已變矮）
   跟「GitHub」（`third`，還是舊尺寸）兩顆按鈕高度對不上，於是把 `third`
   也收斂進同一個固定形狀。這連帶讓 MoreCaseStudies 的「Back」（`third`）
   ／「Next」（`secondary`）這組本來就該成對出現的按鈕，尺寸也重新對齊
   了。
3. 這時只剩 `primary` 還是舊的膠囊+`size` 系統，結果換成它在 Hero（「Check
   out recent work」primary 旁邊的「Learn more about me」third）、Footer
   （「Schedule a chat」primary 旁邊的「Copy my email」third）這些成對場合
   看起來明顯過大、不成套，所以最後 `primary` 也收斂進同一個固定形狀。
   三個 pill 變體现在完全同尺寸，`size` prop 因此整個沒有意義了，已經從
   `ButtonProps`、`Button.tsx`（`SIZE_CLASSES`）跟全部呼叫端（WorkCard、
   Hero 扇形卡、MoreCaseStudies 的三顆按鈕）一起移除，不留一個「傳了也沒
   作用」的死 prop。
4. **同日再追加**：`px-3.5 py-2.5` 換成 `h-10 px-4`，跟 `DARK_BUTTON` 逐字
   一致（不再只是「視覺接近」）。這一步是直接指定「把 `DARK_BUTTON` 的
   樣式套用到其餘所有按鈕」執行的，不是又一次「發現對不上」觸發的。

`links` 不套用 padding／`rounded-lg`／`font-semibold`——它是純文字
連結，字級刻意不由 `<Button>` 自己決定，靠外層 context 撐（`CaseStudyBlock`
內文連結繼承父層 `<p>` 的 `text-body-sm`；Footer 連結欄的字級是 `<ul>` 上的
`text-caption`，不是 `<Button>` 自己帶的），這樣同一個 `links` variant 才能同時
服務內文連結（大字）跟 Footer 連結欄（小字）兩種情境。

#### Variant 使用邏輯

選 variant 前先問：這顆按鈕是「這裡最重要的行動」、「留在原地的輔助動作」、
「帶你往前/往外走」，還是「就只是一段可以點的文字」？

| Variant | 樣式 | Hover | 使用時機 | 範例 |
|---|---|---|---|---|
| **primary** | `bg-cta`，形狀跟另外兩個 pill 變體共用同一個 `COMPACT_SHAPE`（`h-10 rounded-lg px-4`，2026-08-18 稍後收斂，原本是 `rounded-full` + `size`）。曾短暫加過 `border border-fg`（見下方無障礙備註），已於同日移除 | `hover:bg-cta-hover`（`--color-cta-hover`，實色替換，不再是 opacity 淡化） | 這個區塊裡**最想要使用者做的單一動作**，一個區塊只出現一次 | Hero「Check out recent work」、Footer「Schedule a chat」、「Read case study」 |
| **secondary** | `bg-fg`，形狀固定 `COMPACT_SHAPE`（`h-10 rounded-lg px-4`，見上方尺寸章節） | `hover:bg-fg-hover` | 推進到新內容，或離開目前脈絡（不論站內站外） | AiProjectsSection「AI Project」、JourneyTimeline「My Resume」、MoreCaseStudies「Next」、Hero 扇形卡 CTA 小標籤 |
| **third** | `border border-border`，形狀同樣固定 `COMPACT_SHAPE` | `hover:border-fg` + `hover:bg-cta/15`（用 `--color-cta` 疊 15% 透明度當淡填色，不是寫死 hex，`--color-cta` 以後再調整這裡會自動跟著變） | 陪襯 primary 的次要選項，或「留在附近」的動作 | Hero「Learn more about me」、AiProjectsSection「GitHub」、Footer「Copy my email」（有 icon）、MoreCaseStudies「Back」 |
| **links** | `text-fg underline decoration-2 underline-offset-3` | `hover:text-cta` | 純文字連結，不是按鈕，語意上「這只是一句話裡可以點的部分」 | Footer 連結欄（Resume/LinkedIn/GitHub/Nav.）、CaseStudyBlock 內文連結 |

**2026-08-18 追加**：`third` 裡唯一帶 icon 的用法（Footer「Copy my email」，
icon + `gap-2` + 文字）沒有另外放大 padding 或特殊處理，跟其他純文字
`third` 用一樣的 `COMPACT_SHAPE`——已確認實測視覺上 icon 靠既有 `gap-2`
的間距就有足夠呼吸空間，不需要為了「有 icon」單獨破例加寬。如果之後肉眼
覺得擠可以再調整，但目前刻意維持跟其他 `third`／`secondary` 完全一致的
padding，避免 icon 按鈕又變成另一個「看起來不一樣」的個案。

**已收斂（2026-08-18）**：`Header.tsx` 的 `DARK_BUTTON`（LinkedIn 圖示鈕 +
「Say Hello」，手機/桌機各一組共 4 處）原本是獨立維護的手刻樣式，形狀先在
上一步變得跟 `secondary` 逐字一致，這一步真的把 `Header.tsx` 換成
`<Button variant="secondary">` 本身，`DARK_BUTTON` 常數已從 `Header.tsx`
刪除。擋著沒收斂的最後一個問題——LinkedIn 是純圖示方形按鈕，`<Button>`
原本沒有這種型態——用新增的 `square` prop 解決：`COMPACT_SHAPE` 拆成
「形狀」（`h-10 rounded-lg`，`primary`／`secondary`／`third` 共用）跟
「內距」兩塊，內距平常是 `w-fit gap-2 px-4`（icon+文字），`square=true`
時換成純 `w-10`（不留水平 padding、不加 gap，讓單一 icon 置中在方框裡）。
`square` 按鈕沒有可視文字，所以新增了 `ariaLabel` prop 補上無障礙名稱
（`Header.tsx` 傳 `ariaLabel="LinkedIn"`，等同原本的 `aria-label="LinkedIn"`）。

一個字面差異值得記錄：「Say Hello」原本手刻是 `font-medium`，`<Button>`
統一鎖定 `font-semibold`——收斂後這行字重變粗了一階，這是共用元件字重
鎖死帶來的預期結果，不是疏漏。

**2026-08-18 收斂**：Hero 扇形卡片底部的 CTA 小標籤（「Recent case studies」／
「Projects I'm building」／「My story」）原本是手刻的 `<span>`（`rounded-lg`、
`border-fg`、固定 `text-[13px]`、`text-white`、`hover:opacity-75`），跟
`secondary` variant 的顏色/形狀都對不上。已經改成
`<Button as="span" variant="secondary" hoverTrigger="group">`，外層
`<Link>` 補上 `group` class。跟其他 `secondary` 用法（如 MoreCaseStudies
「Next」、AiProjectsSection「AI Project」）現在是同一套固定尺寸——這裡
原本傳過 `size="sm"`，但 `size` prop 已經整個從 `<Button>` 移除（見上方
尺寸章節），所以現在也拿掉了，不留一個沒有作用的 prop。唯一的實際差異是
這裡用 `hoverTrigger="group"`（因為整張卡片才是可點擊區，不是這個小標籤
自己——WorkCard「Read case study」以前也是同一套模式，但 2026-08-18 起
WorkCard 改成只有按鈕本身是連結，不再靠祖先 `<Link>` 驅動，見下方 `WorkCard`
章節，不要再拿它當這個模式的參照範例）。

**已知的無障礙問題（記錄下來，還沒處理）**：`--color-cta`（`#00ffae`）跟
`--color-bg`（`#f7f5f2`）對比只有 1.21:1，遠低於非文字元件建議的 3:1。
`primary` variant 2026-08-18 當天曾短暫加過 `border border-fg` 讓按鈕邊界
可辨識，但同日稍後又移除了（經你確認），所以現在連「邊界可辨識」這個局部
緩解都沒有了——底色本身的對比問題完全還沒解決，待下一輪決定要不要換一種
處理方式（邊框以外的做法，或重新評估 `--color-cta` 本身的色值）。受影響
位置：Hero「Check out recent work」（僅手機）、WorkCard「Read case study」
（2026-08-18 起是真的 `<a href>`，不再是裝飾用 `<span>`，見下方 `WorkCard`
章節）、Footer「Schedule a chat」、MoreCaseStudies「Read case study」。

### Link Hover 顏色分組（2026-08-18 更新，同日再更新）

站內連結／可點擊小元件的 hover 顏色現在剩兩組，彼此獨立成立，不要互相借用：

| Hover 目標 | 用在哪 |
|---|---|
| `hover:text-fg`（從 `text-fg-secondary`）| WorkIndexRail 未選取項目、ActivityHeatmap 切換 pill |
| `hover:text-cta`（`<Button variant="links">` 的 hover，見上方） | Footer 連結欄、CaseStudyBlock 內文連結，兩處都走 `links` variant，統一用這個 hover。舊版本裡 Footer 連結原本是 `hover:text-fg`，現在改成跟 CaseStudyBlock 一致的 `hover:text-cta`，是刻意統一的結果，不是意外 |

`bg-bg-alt` 當 hover 背景填色（Header NavPills、JourneyTimeline 手風琴列、
CaseStudySideNav 收合鈕圖示、CaseStudySideNav TOC 主連結**與子項連結**）
統一成實心 `bg-bg-alt`，不要再用 `/60` 這種局部透明度版本。

**2026-08-18**：Header NavPills 從這個分組表格移出——未選取項目的**resting**
文字色從 `text-fg-secondary` 直接改成 `text-fg`（不再是「hover 才變 fg」，
現在 resting 就已經是 fg），所以已選取／未選取兩個狀態現在文字色永遠一樣，
差異只剩背景（選取的有 `bg-cta` 指示條 + hover 時的 `bg-bg-alt`）。連帶把
未選取項目 className 上原本冗餘的 `hover:text-fg` 拿掉了（resting 已經是
`text-fg`，那段 hover 規則不會再改變任何東西）。

**2026-08-18 再更新**：原本獨立成組的 `hover:text-available`（只在
`CaseStudySideNav` 內部，TOC 主連結、子項連結）**整組拿掉了**，改成跟
NavPills 一樣的做法——resting 文字色不變，hover 只靠 `bg-bg-alt` 背景填色。
主連結原本是 `hover:bg-bg-alt hover:text-available` 兩個效果疊加，現在只剩
`hover:bg-bg-alt`；子項連結原本完全沒有背景填色、只有 `hover:text-available`
單純變色，現在改成跟主連結一致的 `hover:bg-bg-alt`（等於新增了背景填色，
拿掉了變色）。主連結旁邊的小圓點指示器原本 hover 時也會有
`group-hover:bg-available/40` 的淡綠色脈動，這次一併拿掉，避免只拿掉文字
變色、卻留著一顆突兀的綠色小圓點半獨立閃動。

`--color-available` 本身沒有被刪除——**這只是拿掉它在「hover」情境的用法，
「目前所在位置」的 active 狀態（`bg-available/10 text-available` 的主連結、
`bg-available` 的圓點、`CaseStudyView.tsx` Impact Overview 卡片外框）完全
沒動，這個 token 還活著**。已經重新掃過全站每一個 `--color-*` token 的實際
引用次數，確認目前沒有任何一個因為這次改動變成零使用，所以沒有刪除任何
token——這不是漏掃，是掃完之後如實回報「這次沒有東西可以刪」。

### `<TagChip>`

```tsx
interface TagChipProps {
  children: React.ReactNode;
}
```

規格鎖死成 `rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-fg`
（顏色 2026-08-18 從 `text-fg-secondary` 改），用在案例研究/作品卡片的標籤（tag）。
沒有 variant/size，全站只有一種規格——這是共用鎖死元件，改這裡會同時影響
WorkCard 跟 CaseStudyView 兩處全部的標籤，不是只有其中一處變色。

### `WorkCard`（首頁「Selected works」卡片，2026-08-18 三處調整）

**內文順序**：標題 → 描述 → 標籤 → 按鈕（原本是標題 → 標籤 → 描述 → 按鈕，這次
上下對調過）。這是共用元件，順序調整會套用到全站每一張作品卡，不是單一案例
獨有。

**標題+描述+標籤固定高度區塊**：這三個元素現在包在同一個 `<div className="flex
min-h-[320px] flex-col">` 裡，跟卡片底部的「Read case study」按鈕（`mt-auto`
推到底部）之間用 flex 的 auto margin 撐開。`min-h-[320px]` 是**估算值**，
依目前最長的內容（`web3-marketing-dashboard`：4 行描述 + 4 個標籤可能繞成
2 行）抓一個留有餘裕的固定高度，讓三張作品卡的按鈕在畫面上落在同一個垂直
位置，不會因為每篇案例研究的標題/描述/標籤數量不同而高低不一。**這是寫死
的估算值，不是量測出來的**——沒有瀏覽器工具可以實際量測渲染後的像素高度，
之後如果新增/編輯案例研究內容比這三篇現有的更長，`320px` 可能不夠，需要回來
肉眼檢查、手動調大這個數字。

**Link 收斂到只剩按鈕（2026-08-18，同日修正過一次方向）**：原本整張卡（圖片＋
標題＋描述＋標籤＋按鈕）包在同一個 `<Link>` 裡，點卡片任何地方都會跳轉，按鈕
用 `hoverTrigger="group"` 讓整張卡 hover 時一起變色。**這是刻意改掉的舊行為，
不是要保留、修 bug 的對象**——中途一度誤判成「應該要整卡可點但被 bug 擋住」而
加了 `select-none` 想修，之後確認方向反了：目標其實是**只有按鈕本身是連結，
卡片其他地方（圖片、標題、描述、標籤）完全沒有 hover／點擊反應**。

現在的實作：外層卡片容器（`<div id={id}>`，原本是 `<Link>`）改回純 `<div>`，
不再有 `href`／`group` class；`Button`（「Read case study」）改成直接吃
`href={href}`（原本是 `as="span" hoverTrigger="group"`，靠祖先卡片驅動 hover
——這個裝飾用 `<span>` 搭配祖先 `<Link>` 的模式，跟 Hero 扇形卡、WorkCard 舊版
是同一套，但 WorkCard 這裡從 2026-08-18 起不再適用），`hoverTrigger` 恢復預設
的 `"self"`，按鈕自己是唯一的可點擊/可 hover 元素。`select-none` 已經拿掉，
沒有存在的理由了（卡片其他地方本來就不該有任何互動回饋，不需要靠禁止選取
文字去「修」點擊）。

---

## 禁止事項

1. 不要寫死顏色/字級/間距/陰影數值，一律引用上面的 token
2. 不要在內文文字的**預設（resting）狀態**使用 `--color-cta`，只能用在按鈕/圖形背景，或 hover 狀態（`feedbackGrid` headline 關鍵字高亮、`<Button variant="links">` 的 `hover:text-cta`，見上方色彩 token／Button 已知例外）
3. 不要手寫「手機固定 px + `md:text-hX`」的字級跳躍寫法，直接引用流體 token
4. 重複元件（按鈕、卡片、標籤）一律用共用元件，不要各頁各自手刻一份
5. 不要用 `className` 覆蓋 `<GlassCard>` / `<Button>` 鎖定的 padding、字重、hover 屬性（專案沒裝 tailwind-merge，覆寫順序不保證）
6. 不要看到 `card-sage` / `card-slate` 就憑名字猜色值，以本文件表格為準

---

## 未完成事項（下一輪處理，目前先不要動）

- `#f5a623` 星星評分色：若未來重複出現再定義 `--color-rating`
- `TestimonialCard` 陰影疊加、CSS 生效順序不穩定：待重新設計該卡片的陰影邏輯
- 是否要導入 `tailwind-merge`：待整體評估，目前用 enum prop 繞過這個問題
- 標題（H2/H3/H4）跟內容的間距已經在 2026-08-17 統一成三層固定 token（見上方「標題跟內容間距」），但還沒決定要不要讓它們跟 `text-h1`~`h5` 的 `clamp()` 掛勾一起流體縮放——是獨立的下一輪。另外 H1→副標語/下一段內容（Hero、CaseStudyView 案例標題）這輪沒有動，只出現 1-2 個案例，還沒有「統一」的必要性
- 間距 token 是否要從「手機/桌機兩個固定值」進化成流體 `clamp()`（呼應字級系統的做法）：這輪刻意沒做，只解決數值不統一的問題
