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
| `--color-fg` | `#1a1a1a` | 主要文字色 |
| `--color-fg-secondary` | `#6b6b6b` | 次要文字色 |
| `--color-fg-hover` | `#333333` | 深色按鈕的 hover 狀態 |
| `--color-bg` | `#f7f5f2` | 主背景 / 深色按鈕上的文字色 |
| `--color-cta` | `#ff6553` | 品牌珊瑚色，只用於按鈕/圖形背景，**禁止用在內文文字**（唯一例外見下方「已知例外」：案例研究 Feedback 卡片標題內的關鍵字高亮） |
| `--color-border` | `#e2dfda` | 外框線 |
| `--color-available` | `#5a8a60` | 低調狀態指示（如 TOC 目前所在區塊），視覺任務是「安靜不搶戲」 |
| `--color-success` | `#017d18` | 高飽和成就強調色（如 Impact Overview 數字卡外框），視覺任務是「一眼看到亮點」，不可跟 `--color-available` 共用 |

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
- **`--color-cta` 用在內文文字**：案例研究 `feedbackGrid` 卡片的 headline 裡，關鍵字（機構名稱，如「AppWorks」「Alibaba Cloud」）刻意用珊瑚色高亮，是唯一被核准的例外，不要當成可以比照辦理的先例套用到其他內文。實作是 `CaseStudyBlock.tsx` 的 `renderInline()` 新增的 `==text==` 語法（跟既有的 `**bold**`同一套 helper），只在寫 `feedbackGrid` 的 `headline` 欄位時使用。

---

## 字級系統

8 個字級 token（`text-display`／`text-h1`／`text-h2`／`text-h3`／`text-body`／
`text-body-sm`／`text-links`／`text-caption`）全部是 `clamp()` 流體字級，
不是固定 px，行高也是無單位比例值（不是固定 px）。

| Token | `font-size` | 行高 | 定位 |
|---|---|---|---|
| `text-display` | `clamp(44px, 29.08px + 3.98vw, 80px)` | `1` | 只用在 Hero 主標題 |
| `text-h1` | `clamp(40px, 30.06px + 2.65vw, 64px)` | `1.1` | 章節主標題，跟手機版配一個更小字級的家族 |
| `text-h2` | `clamp(26px, 20.2px + 1.55vw, 40px)` | `1` | 次級標題（WorkCard、案例研究區塊標題） |
| `text-h3` | `clamp(24px, 22.34px + 0.44vw, 28px)` | `1` | 小標題，全站多處平常直接固定使用，範圍刻意留小 |
| `text-body` | `clamp(18px, 17.17px + 0.22vw, 20px)` | `1.4` | |
| `text-body-sm` | `clamp(17px, 16.59px + 0.11vw, 18px)` | `1.2` | 預設內文字級，全站到處共用，範圍刻意留小 |
| `text-links` | `clamp(17px, 16.59px + 0.11vw, 18px)` | `1` | |
| `text-caption` | `clamp(13px, 12.59px + 0.11vw, 14px)` | `1.2` | 全站到處共用，範圍刻意留小 |

**核心規則**：

- 縮放參考範圍固定是 **375px（手機）→ 1280px（桌機）**，中間平滑內插，不是斷點式跳躍
- **禁止手寫「手機固定 px + `md:text-hX`」這種兩段式跳躍寫法**——token 本身就會流動縮放，直接引用 token 就好，不用加 `md:` 前綴。這個模式曾經導致平板尺寸（尤其 iPad 直向剛好卡在 `md` 斷點 768px）直接吃到滿版桌機字級，是修過的真實 bug，不要再犯
- `text-h1`／`text-h2` 是「跟手機版配一個更小字級」的專用大字級，才給真正大幅度的縮放範圍；`text-h3`／`text-body-sm`／`text-links`／`text-caption` 因為全站到處平常直接固定使用，範圍刻意留小（1-4px），避免不小心波及全站
- 某個元件想要比共用 token 更誇張的縮放（例如 Hero intro 文字 18→28px、案例研究數字統計 32→42px），**給它自己的獨立 `clamp()`，不要去撐大共用 token**，不然全站其他用同一個 token 的地方會被一起連動放大

### 已知例外：案例研究頁縮小標題字級（三頁統一套用）

`CaseStudyView.tsx` 裡的 H1（案例標題）、段落 `<h2>`、Overview/My role/Team/Impact Overview 標籤，`text-h1`／`text-h2`／`text-h3` 其實各自綁定了 `font-family`（襯線）+ `font-weight`（700/600/600）+ `line-height`，不是只有字級。這幾處已經改成各自獨立的 `clamp()`（桌機上限縮小：H1 64→52px、H2 40→32px、Overview 系列標籤 28→20px、Impact 數字卡標籤 20→18px），並**手動補回了原本 token 帶的 `font-serif` 跟對應字重**，視覺語言（襯線字/粗細層級）沒有變。

`CaseStudyView.tsx`／`CaseStudyBlock.tsx` 是三個案例研究頁（`web3-marketing-dashboard`／`influencer-marketing-tool`／`coolwallet-pro`）共用的同一份元件，不是各自獨立的模板，所以這個縮小字級**自動套用到三頁,已驗證過編譯後的 class 完全一致**，不需要也不可能只套用單一頁面。`coolwallet-pro` 目前看不到 Overview/My role/Team/Impact 卡片,是因為它的資料本身沒有 `meta`／`impactStats` 欄位（整塊不會渲染），是內容差異，不是樣式不一致。

### 已知例外：`FeedbackStack` 卡片的次要文字統一用 `text-caption`

`FeedbackStack.tsx`（案例研究 Feedback & Impact 卡片堆）裡，Customer Review 卡片
的 role 文字（如「Vincent@PrismX」）跟 Investment 卡片的 Date 文字，語意上是同一
層級的「次要 meta 文字」，樣式要一致：一律用 `text-caption text-fg-secondary`。
之前 role 文字誤用了裸的 `font-serif text-xs`——`text-xs` 不在 8 個字級 token
清單內，是硬寫值，已經修正，不要再改回去。

### Tracking（字距）跟字級配對

| 字級 | Tracking |
|---|---|
| `text-display`／`text-h1` | `tracking-[-0.03em]` |
| `text-h2` | `tracking-[-0.02em]` |
| `text-h3` | `tracking-[-0.01em]`（Hero 扇形卡片標題目前沒套這個，是已知的遺漏，不是規則本身有例外，之後補上即可） |

### 標題跟內容間距

標準是 `mb-3`，全站已統一（`OutsideWork`／`Footer`／`AiProjectsSection`／
`JourneyTimeline`／`TestimonialsSection`／`ComingSoon`／`CaseStudyView` 主標題都是
`mb-3`）。

**已知例外**：`WorkSection.tsx`（首頁「Selected works」）用 `mb-10`——這不是
待修的問題，是明確決定要跟其他標題不一樣的刻意選擇，不要「順手」改回 `mb-3`。

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

## 共用元件

### `<GlassCard>`

```tsx
interface GlassCardProps {
  children: React.ReactNode;
  padding?: "default" | "no-bottom"; // 預設 "default" (p-7 md:p-14)
  // "no-bottom":Hero 專用，底部無 padding 讓漸層淡出遮罩貼齊邊緣
  className?: string; // 逃生口，不影響 padding，不可用來覆蓋鎖定屬性
}
```

鎖死不開放客製：`bg-dot-grid` 紋理、`max-w-[1200px]`、
`rounded-2xl md:rounded-[20px]`、漸層背景、`shadow-card`、
`backdrop-blur-[12px]`。

動畫需求用 `<Reveal><GlassCard>...</GlassCard></Reveal>` 外部組合，不要把
動畫邏輯塞進 GlassCard 本身，職責要分開。

### `<Button>`

```tsx
interface ButtonProps {
  variant?: "primary" | "secondary" | "dark"; // 預設 "primary"
  size?: "md" | "sm"; // 預設 "md"
  hoverTrigger?: "self" | "group"; // 預設 "self"，卡片內裝飾用 <span> 用 "group"
  as?: "a" | "button" | "span";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string; // 逃生口，不影響 padding/字重/hover
  children: React.ReactNode;
}
```

鎖死不開放客製：`rounded-full`、`inline-flex items-center justify-center`、
各 variant 的底色/文字色/邊框色、transition duration。

#### 尺寸

| Size | Padding | 判斷依據 |
|---|---|---|
| `md` | `px-7 py-3.5` | 章節內獨立的主要行動呼籲 |
| `sm` | `px-6 py-2.5` | 卡片內嵌的按鈕 |

三種 variant 共用同一組尺寸邏輯，不會有「深色 md 比珊瑚色 md 小一號」這種
情況。字重統一 `font-semibold`。

#### Variant 使用邏輯

選 variant 前先問：這顆按鈕是「這裡最重要的行動」、「留在原地的輔助動作」，
還是「帶你往前/往外走」？

| Variant | 樣式 | 使用時機 | 範例 |
|---|---|---|---|
| **primary** | `bg-cta`，`hover:opacity-85` 200ms | 這個區塊裡**最想要使用者做的單一動作**，一個區塊只出現一次 | Hero/Footer 主 CTA、「Read case study」 |
| **secondary** | `border-border`，`hover:border-fg` 300ms | 陪襯 primary 的次要選項，或「留在附近」的動作（返回、同主題延伸） | 次要按鈕、「Back」 |
| **dark** | `bg-fg`，`hover:bg-fg-hover` 300ms | 推進到新內容，或離開目前脈絡（不論站內站外） | 「Next」、外部連結（GitHub）、下載文件（Resume） |

### `<TagChip>`

```tsx
interface TagChipProps {
  children: React.ReactNode;
}
```

規格鎖死成 `rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-fg-secondary`，
用在案例研究/作品卡片的標籤（tag）。沒有 variant/size，全站只有一種規格。

---

## 禁止事項

1. 不要寫死顏色/字級/間距/陰影數值，一律引用上面的 token
2. 不要在內文文字使用 `--color-cta`，只能用在按鈕/圖形背景（唯一例外：`feedbackGrid` headline 關鍵字高亮，見上方色彩 token 已知例外）
3. 不要手寫「手機固定 px + `md:text-hX`」的字級跳躍寫法，直接引用流體 token
4. 重複元件（按鈕、卡片、標籤）一律用共用元件，不要各頁各自手刻一份
5. 不要用 `className` 覆蓋 `<GlassCard>` / `<Button>` 鎖定的 padding、字重、hover 屬性（專案沒裝 tailwind-merge，覆寫順序不保證）
6. 不要看到 `card-sage` / `card-slate` 就憑名字猜色值，以本文件表格為準

---

## 未完成事項（下一輪處理，目前先不要動）

- `#f5a623` 星星評分色：若未來重複出現再定義 `--color-rating`
- `TestimonialCard` 陰影疊加、CSS 生效順序不穩定：待重新設計該卡片的陰影邏輯
- 是否要導入 `tailwind-merge`：待整體評估，目前用 enum prop 繞過這個問題
- Hero 扇形卡片標題（`text-h3`）沒有套用 `tracking-[-0.01em]`：小遺漏，之後補上
