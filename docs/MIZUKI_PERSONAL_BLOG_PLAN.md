# Mizuki Personal Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Mizuki demo into the Chinese personal technical blog `xushen · Code & Notes`, centered on CS learning notes with supporting project and skill pages.

**Architecture:** Preserve Astro's current routes, layouts, Markdown pipeline, animations, and multi-entry TOC behavior. Personalization should be implemented primarily through the existing configuration, content, data, and asset boundaries; the only planned presentation-logic change is removing quantified proficiency from skill cards.

**Tech Stack:** Astro 7, TypeScript 6, Svelte 5, Tailwind CSS 4, Markdown/MDX Content Collections, pnpm 11, Pagefind, Vercel.

---

## Confirmed product decisions

- Public identity: `xushen`.
- Site title: `xushen · Code & Notes`.
- Primary language: Simplified Chinese (`zh_CN`).
- Positioning: personal technical-learning blog first; projects and skills are supporting evidence, not a recruitment landing page.
- Audience priority: the author, peer learners, then recruiters.
- Main topics: Python, Java, Agent development, CS course notes, and project retrospectives.
- Article categories: `CS 学习`, `项目复盘`, `博客写作`.
- Example tags: `Python`, `Java`, `LLM`, `Astro`, `数据结构`, and specific course names.
- Content and code remain in the same repository; external content synchronization stays disabled.
- Hosting: Vercel first, without a custom domain.
- Launch may contain one real article; additional articles can follow after deployment.
- Visual direction: preserve the current layout and animation system, replace personalizable assets, and use a clean anime-inspired style.
- Friends code remains, but the page is disabled and hidden until real friend links exist.
- Existing duplicate TOC entry points are intentionally preserved.

## Privacy boundary

Public:

- nickname and user-supplied avatar;
- major: Computer Science and Technology;
- expected graduation year: 2028;
- public email: `871446573@qq.com`;
- GitHub: `https://github.com/xushen666`;
- selected project information.

Not public in the first release:

- city or location;
- precise school identity unless the user later approves a deliberately vague form;
- phone number;
- complete PDF resume;
- unselected private project details.

## External input gate

Do not begin the corresponding content or asset step until the user has supplied and approved the required input. Never retain a Mizuki demo value as a temporary public substitute.

Required before public launch:

1. Final site subtitle.
2. Avatar image.
3. Header logo and small header icon.
4. Favicon.
5. One desktop banner and one mobile banner in the same visual family.
6. Final theme hue chosen after reviewing the supplied images.
7. Names, descriptions, technology stacks, status, and disclosure rules for three projects.
8. At least one publishable Markdown article.

Optional after launch:

- project screenshots;
- source links for the two projects that are not currently public;
- additional articles;
- real friend links.

## Existing-work protection

At planning time, the worktree contains one user-owned change:

```diff
-const SITE_LANG = "en";
+const SITE_LANG = "zh_CN";
```

Preserve this change. Do not reset, revert, reformat, or attribute it to the implementation agent. Before every implementation task, inspect the current diff and work around any additional user edits.

## File responsibility map

| Responsibility | Files |
|---|---|
| Site identity, language, page switches, banner, theme, TOC | `src/config/siteConfig.ts` |
| Profile and public links | `src/config/profileConfig.ts` |
| Top navigation | `src/config/navBarConfig.ts` |
| Desktop and mobile sidebar composition | `src/config/sidebarConfig.ts` |
| Optional feature switches | `src/config/musicConfig.ts`, `pioConfig.ts`, `effectsConfig.ts`, `commentConfig.ts`, `shareConfig.ts`, `randomPostsConfig.ts`, `relatedPostsConfig.ts` |
| About copy | `src/content/spec/about.md` |
| Posts and content-pipeline fixture | `src/content/posts/` |
| Projects | `src/data/projects.ts` |
| Skills model and entries | `src/data/skills.ts` |
| Skill presentation | `src/components/features/skills/SkillCard.astro`, `src/components/features/skills/types.ts` |
| Friend-link data | `src/data/friends.ts` |
| Regression coverage | `tests/personalization.test.mjs`, `package.json` |
| Personal visual assets | `src/assets/images/avatar.webp`, `public/assets/home/`, `public/assets/desktop-banner/`, `public/assets/mobile-banner/`, `public/favicon/` |
| Demo-asset cleanup | `public/assets/anime/`, `public/assets/music/`, `public/images/albums/`, `public/images/demos/`, `public/images/device/`, `public/images/diary/`, `public/pio/` |

## Scope constraints

The first release does not include:

- page or component architecture redesign;
- animation implementation changes;
- Pagefind internals;
- comment-provider integration;
- analytics integration;
- a separate content repository;
- a custom domain;
- a downloadable resume;
- an online editor or administration panel;
- removal of the encryption framework itself;
- Projects page redesign;
- deduplication of TOC entry points.

## Task 1: Capture the baseline

**Files:**

- Inspect: `src/config/siteConfig.ts`
- Inspect: all files reported by `git status --short`
- No file changes

- [ ] **Step 1: Record the current worktree state**

Run:

```powershell
git status --short
git diff -- src/config/siteConfig.ts
```

Expected: the known `SITE_LANG` change is present. Stop and review any additional paths before editing.

- [ ] **Step 2: Run the fastest baseline checks**

Run:

```powershell
pnpm check
pnpm type-check
pnpm test
```

Expected: each command exits with code 0. If a baseline failure exists, record it separately and do not conflate it with personalization work.

- [ ] **Step 3: Run the production baseline build**

Run:

```powershell
pnpm build
```

Expected: Astro generates `dist/`, the global-style and font checks pass, and Pagefind completes.

- [ ] **Step 4: Create an implementation checkpoint without committing**

Run:

```powershell
git diff --check
git status --short
```

Expected: no whitespace errors; only user-owned baseline changes are listed.

## Task 2: Add personalization regressions first

**Files:**

- Create: `tests/personalization.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Create a source-level regression suite**

Create `tests/personalization.test.mjs` with this complete content:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

const read = (path) =>
	readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [
	siteConfig,
	profileConfig,
	navBarConfig,
	sidebarConfig,
	musicConfig,
	pioConfig,
	commentConfig,
	shareConfig,
	randomPostsConfig,
	skillCard,
	skillsData,
	fixture,
] = await Promise.all([
	read("src/config/siteConfig.ts"),
	read("src/config/profileConfig.ts"),
	read("src/config/navBarConfig.ts"),
	read("src/config/sidebarConfig.ts"),
	read("src/config/musicConfig.ts"),
	read("src/config/pioConfig.ts"),
	read("src/config/commentConfig.ts"),
	read("src/config/shareConfig.ts"),
	read("src/config/randomPostsConfig.ts"),
	read("src/components/features/skills/SkillCard.astro"),
	read("src/data/skills.ts"),
	read("src/content/posts/content-pipeline-fixture.mdx"),
]);

describe("personal blog configuration", () => {
	it("uses the xushen identity and Simplified Chinese", () => {
		assert.match(siteConfig, /const SITE_LANG = "zh_CN"/);
		assert.match(siteConfig, /title: "xushen · Code & Notes"/);
		assert.match(profileConfig, /name: "xushen"/);
		assert.match(profileConfig, /https:\/\/github\.com\/xushen666/);
		assert.match(profileConfig, /mailto:871446573@qq\.com/);
	});

	it("publishes only the selected feature pages", () => {
		for (const page of ["projects", "skills"]) {
			assert.match(siteConfig, new RegExp(`${page}: true`));
		}
		for (const page of [
			"anime",
			"diary",
			"friends",
			"timeline",
			"albums",
			"devices",
			"aiTools",
		]) {
			assert.match(siteConfig, new RegExp(`${page}: false`));
		}
	});

	it("uses the approved navigation and public GitHub link", () => {
		for (const preset of ["Home", "Archive", "Projects", "Skills", "About"]) {
			assert.match(navBarConfig, new RegExp(`LinkPreset\\.${preset}`));
		}
		assert.doesNotMatch(navBarConfig, /LinkPreset\.Friends/);
		assert.match(navBarConfig, /https:\/\/github\.com\/xushen666/);
	});

	it("keeps only approved sidebar widgets", () => {
		for (const widget of [
			"profile",
			"categories",
			"tags",
			"site-stats",
			"card-toc",
		]) {
			assert.match(sidebarConfig, new RegExp(`"${widget}"`));
		}
		for (const widget of ["announcement", "music-sidebar", "calendar"]) {
			assert.doesNotMatch(sidebarConfig, new RegExp(`"${widget}"`));
		}
	});

	it("disables the rejected optional features", () => {
		for (const config of [
			musicConfig,
			pioConfig,
			commentConfig,
			shareConfig,
			randomPostsConfig,
		]) {
			assert.match(config, /enable: false/);
		}
	});

	it("does not quantify skills", () => {
		assert.doesNotMatch(skillCard, /getLevelText|getLevelWidth|formatExperience/);
		assert.doesNotMatch(skillCard, /skill\.level|skill\.experience/);
		assert.doesNotMatch(skillsData, /level:|experience:/);
	});

	it("keeps the content pipeline fixture out of production", () => {
		assert.match(fixture, /draft:\s*true/);
	});
});
```

- [ ] **Step 2: Add the new test to the existing Node test command**

In `package.json`, append `tests/personalization.test.mjs` to the first `node --experimental-strip-types --test` invocation. Do not change the remaining crypto test command.

- [ ] **Step 3: Run the new test and verify the expected red state**

Run:

```powershell
node --experimental-strip-types --test tests/personalization.test.mjs
```

Expected: failures identify the remaining Mizuki identity, enabled demo pages and features, quantified skills, and public fixture.

## Task 3: Personalize site identity and navigation

**Files:**

- Modify: `src/config/siteConfig.ts`
- Modify: `src/config/profileConfig.ts`
- Modify: `src/config/navBarConfig.ts`

- [ ] **Step 1: Apply the approved site-level values**

In `siteConfig.ts`, preserve `SITE_LANG = "zh_CN"` and set these confirmed values:

```ts
title: "xushen · Code & Notes",
timeZone: "Asia/Shanghai",
featurePages: {
	anime: false,
	diary: false,
	friends: false,
	projects: true,
	skills: true,
	timeline: false,
	albums: false,
	devices: false,
	aiTools: false,
},
wallpaperMode: {
	defaultMode: "banner",
	showModeSwitchOnMobile: "off",
},
```

Set `siteStartDate` to the calendar date on which the public Vercel deployment is released. Set `themeColor.hue` to the numeric hue explicitly approved after the personal assets are supplied, and set `themeColor.fixed` to `true`. Set `subtitle` only to the user-approved final text. Do not ship `Mizuki`, `One demo website`, or an invented substitute. Keep the existing TOC object unchanged, including `mobileTop`, `desktopSidebar`, `floating`, depth, and Japanese badges.

Replace the banner arrays with exactly one supplied desktop path and one supplied mobile path, and set:

```ts
carousel: {
	enable: false,
	interval: 3,
	switchable: false,
},
```

- [ ] **Step 2: Replace the profile configuration**

Use the existing user-supplied avatar path and the following public identity shape:

```ts
export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.webp",
	name: "xushen",
	bio: "计算机科学与技术 · 2028 届",
	typewriter: {
		enable: true,
		speed: 80,
	},
	links: [
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/xushen666",
		},
		{
			name: "Email",
			icon: "material-symbols:mail",
			url: "mailto:871446573@qq.com",
		},
	],
};
```

- [ ] **Step 3: Replace the navigation structure**

Keep the existing imports and replace `navBarConfig` with:

```ts
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Projects,
		LinkPreset.Skills,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/xushen666",
			external: true,
			icon: "fa7-brands:github",
		},
	],
};
```

- [ ] **Step 4: Run the focused regression**

Run:

```powershell
node --experimental-strip-types --test tests/personalization.test.mjs
```

Expected: identity, feature-page, and navigation assertions pass; later feature and skill assertions remain red.

- [ ] **Step 5: Inspect the checkpoint**

Run:

```powershell
git diff --check
git diff -- src/config/siteConfig.ts src/config/profileConfig.ts src/config/navBarConfig.ts
```

Expected: no whitespace errors and no unrelated configuration changes.

## Task 4: Configure sidebars and optional features

**Files:**

- Modify: `src/config/sidebarConfig.ts`
- Modify: `src/config/musicConfig.ts`
- Modify: `src/config/pioConfig.ts`
- Modify: `src/config/effectsConfig.ts`
- Modify: `src/config/commentConfig.ts`
- Modify: `src/config/shareConfig.ts`
- Modify: `src/config/randomPostsConfig.ts`
- Verify: `src/config/relatedPostsConfig.ts`

- [ ] **Step 1: Reduce sidebar properties to the approved widgets**

Keep property definitions only for `profile`, `categories`, `tags`, `card-toc`, and `site-stats`. Preserve their existing positions, responsive thresholds, CSS classes, animation settings, and default animation configuration.

Set the component arrays exactly to:

```ts
components: {
	left: ["profile", "tags", "card-toc"],
	right: ["site-stats", "categories"],
	drawer: ["profile", "categories", "tags"],
},
```

Do not remove `card-toc`; duplicate TOC entry points are an explicit user decision.

- [ ] **Step 2: Disable optional features through their existing switches**

Set:

```ts
// musicConfig.ts
enable: false,
showFloatingPlayer: false,

// pioConfig.ts
enable: false,

// effectsConfig.ts
enable: false,
switchable: false,

// commentConfig.ts
enable: false,

// shareConfig.ts
enable: false,

// randomPostsConfig.ts
enable: false,
```

Leave `relatedPostsConfig.enable` set to `true`.

Announcement and calendar have no independent global `enable` switch required for this scope; removing them from all `sidebarConfig.components` arrays prevents them from rendering or affecting layout.

- [ ] **Step 3: Run focused and type checks**

Run:

```powershell
node --experimental-strip-types --test tests/personalization.test.mjs
pnpm type-check
```

Expected: all configuration assertions pass; only skill and content-fixture assertions may remain red.

- [ ] **Step 4: Inspect the checkpoint**

Run:

```powershell
git diff --check
git diff -- src/config
```

Expected: only approved configuration changes plus the pre-existing language change.

## Task 5: Replace public content and demo data

**Files:**

- Modify: `src/content/spec/about.md`
- Modify: `src/content/posts/content-pipeline-fixture.mdx`
- Delete: demo post files under `src/content/posts/` except the fixture
- Modify: `src/data/projects.ts`
- Modify: `src/data/friends.ts`
- Modify: disabled feature data modules under `src/data/` only as needed to remove demo identities while preserving valid exports
- Create: at least one user-supplied Markdown post under `src/content/posts/`

- [ ] **Step 1: Hide the content-pipeline fixture in production**

Add this frontmatter field to `content-pipeline-fixture.mdx`:

```yaml
draft: true
```

Do not move or delete the fixture. Existing tests and the optional content-pipeline script reference its path.

- [ ] **Step 2: Remove public demo posts**

After checking test references, remove these demo publications and their article-local assets when unreferenced:

```text
src/content/posts/draft.md
src/content/posts/encrypted-post.md
src/content/posts/guide/index.md
src/content/posts/guide/cover.webp
src/content/posts/image-grid-demo.md
src/content/posts/markdown-extended.md
src/content/posts/markdown-mermaid.md
src/content/posts/markdown-tutorial.md
src/content/posts/video.md
```

Run before deletion:

```powershell
git grep -n -E "draft\.md|encrypted-post|guide/index|image-grid-demo|markdown-extended|markdown-mermaid|markdown-tutorial|video\.md" -- tests scripts src
```

Expected: review every reference. Preserve or update a referenced fixture instead of blindly deleting it.

- [ ] **Step 3: Replace About with approved personal information**

The final `about.md` must contain these sections and no template feature advertisement:

```markdown
# 关于我

你好，我是 **xushen**，计算机科学与技术专业学生，预计于 2028 年毕业。

这个博客用于记录我的计算机科学学习过程、编程笔记、Agent 开发实践和项目复盘。我希望这些记录既能帮助未来的自己，也能为学习相似内容的读者提供参考。

## 当前关注

- Python 与 Java
- Agent 与 LLM 应用开发
- 计算机科学课程学习
- 软件项目设计与复盘

## 联系方式

- GitHub：[xushen666](https://github.com/xushen666)
- Email：[871446573@qq.com](mailto:871446573@qq.com)
```

Do not add city, phone, precise school identity, or a resume download.

- [ ] **Step 4: Replace project data**

Keep the existing `Project` interface. Add exactly three user-approved project records. For each record:

- use the user-supplied `id`, `title`, `description`, `category`, `techStack`, and `status`;
- set `sourceCode` only for the one public repository;
- omit `sourceCode`, `liveDemo`, and `visitUrl` when the project has no approved public destination;
- set `showImage: false` until an approved screenshot exists;
- never reuse Mizuki or FolkPatch demo descriptions or screenshots.

- [ ] **Step 5: Clear friend-link demo data while preserving the API**

Set:

```ts
export const friendsData: FriendItem[] = [];
```

Keep `getFriendsList()` and `getShuffledFriendsList()` unchanged so the page can be re-enabled later without redesign.

- [ ] **Step 6: Add the first real post**

Use the user-supplied article body and an English, lower-case, hyphenated file name. Copy the approved Chinese title and one-sentence description exactly, use the real publication date in `YYYY-MM-DD` form, set `draft: false`, and include at least one approved technology tag. Set `category` to exactly one of `CS 学习`, `项目复盘`, or `博客写作` according to the article's actual subject. Do not add encryption fields, aliases, or custom permalinks.

- [ ] **Step 7: Verify content collection behavior**

Run:

```powershell
node --experimental-strip-types --test tests/personalization.test.mjs
pnpm check
```

Expected: the fixture assertion passes, content schemas validate, and the remaining failures are limited to quantified skills if Task 6 has not run.

## Task 6: Remove quantified skill claims

**Files:**

- Modify: `src/data/skills.ts`
- Modify: `src/components/features/skills/SkillCard.astro`
- Verify: `src/components/features/skills/types.ts`
- Verify: `src/pages/skills.astro`

- [ ] **Step 1: Simplify the Skill interface**

Use this interface:

```ts
export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string;
	category: "frontend" | "backend" | "database" | "tools" | "other";
	projects?: string[];
	certifications?: string[];
	color?: string;
}
```

Remove every `level` and `experience` field from `skillsData`.

- [ ] **Step 2: Replace demo skills with the approved list**

Create entries for these skills, using Iconify names already supported by the project and honest descriptions that state scope rather than proficiency:

```text
frontend: HTML, CSS, JavaScript, Vue
backend: Python, Java, Spring Boot
database: MySQL
tools: Git, Linux, Docker
other: C++, LangChain, PyTorch
```

Agent development is represented through the LangChain description and project evidence rather than an invented proficiency level.

- [ ] **Step 3: Simplify SkillCard presentation**

Remove the `I18nKey` and `i18n` imports, `getLevelText`, `getLevelWidth`, and `formatExperience`. Replace the card header body with:

```astro
<div class="flex-1 min-w-0">
	<h3
		class="text-lg font-bold text-black/90 dark:text-white/90 truncate group-hover:text-(--primary) transition-colors duration-200"
	>
		{skill.name}
	</h3>
</div>
```

Keep the description paragraph and hover overlay. Remove the proficiency badge, experience paragraph, and progress-bar block completely.

- [ ] **Step 4: Run the red-to-green regression**

Run:

```powershell
node --experimental-strip-types --test tests/personalization.test.mjs
pnpm type-check
```

Expected: the personalization suite and TypeScript check both exit with code 0.

- [ ] **Step 5: Inspect the checkpoint**

Run:

```powershell
git diff --check
git diff -- src/data/skills.ts src/components/features/skills/SkillCard.astro
```

Expected: no quantified skill fields or rendering remain and no unrelated Skills page redesign appears.

## Task 7: Replace and prune visual assets

**Files:**

- Replace: `src/assets/images/avatar.webp`
- Replace: `public/assets/home/home.webp`
- Replace: `public/assets/home/default-logo.webp`
- Replace: `public/favicon/favicon.ico`
- Replace: `public/assets/desktop-banner/1.webp`
- Replace: `public/assets/mobile-banner/1.webp`
- Delete after reference validation: unused template assets under `public/`

- [ ] **Step 1: Validate user-supplied assets**

Confirm every supplied file opens successfully and matches its intended role. Do not stretch a desktop banner into the mobile slot. Preserve WebP for avatar, logos, and banners unless the existing consumer specifically requires ICO.

- [ ] **Step 2: Replace assets at stable paths**

Replace the files in place so existing components continue to resolve them without component changes. Update `siteConfig.banner.src` only if the approved file names differ from `1.webp`.

- [ ] **Step 3: Build an explicit reference inventory before deletion**

Run:

```powershell
git grep -n -E "assets/anime|assets/music|images/albums|images/demos|images/device|images/diary|/pio/|desktop-banner/[2-4]|mobile-banner/[2-4]" -- src public scripts tests
```

Expected: every remaining reference is reviewed. Do not delete a path that is still consumed by an enabled page, a build check, or a test fixture.

- [ ] **Step 4: Delete only confirmed-unused template assets**

Remove unused anime, music, demo-album, device, diary, Live2D, extra banner, demo image, and template project assets. Keep empty data modules or directory markers when code imports or scanners require them.

- [ ] **Step 5: Verify asset integrity**

Run:

```powershell
pnpm test
pnpm check
pnpm build
```

Expected: no missing-asset errors, all checks exit with code 0, and `dist/` contains the replacement identity assets but not removed template files.

## Task 8: Full acceptance and Vercel deployment

**Files:**

- Modify after first deployment: `src/config/siteConfig.ts` (`siteURL` only)
- Inspect: generated `dist/`

- [ ] **Step 1: Run the full local gate**

Run:

```powershell
pnpm check
pnpm type-check
pnpm test
pnpm build
```

Expected: every command exits with code 0. Do not report the site ready if any command fails.

- [ ] **Step 2: Inspect generated routes and feeds**

Verify these generated pages exist:

```text
dist/index.html
dist/archive/index.html
dist/projects/index.html
dist/skills/index.html
dist/about/index.html
dist/rss.xml
dist/atom.xml
```

Verify disabled feature pages do not expose demo content. Verify RSS and Atom include only real public posts and exclude `content-pipeline-fixture.mdx`.

- [ ] **Step 3: Perform desktop and mobile visual checks**

Run:

```powershell
pnpm preview
```

Check:

- desktop and mobile banners use the approved assets;
- profile, categories, tags, site statistics, and card TOC appear in their approved positions;
- mobile drawer contains profile, categories, and tags;
- the intentionally duplicated TOC entry points match the current Mizuki behavior;
- search, dark mode, related posts, archive filters, and outbound GitHub/email links work;
- music, Live2D, comments, share poster, random posts, announcement, calendar, and wallpaper controls do not appear;
- no demo author identity, demo project, demo friend, or public demo article remains.

- [ ] **Step 4: Deploy through Vercel**

Use:

```text
Install command: pnpm install
Build command: pnpm build
Output directory: dist
Framework preset: Astro
```

Keep `ENABLE_CONTENT_SYNC` unset or false.

- [ ] **Step 5: Set the canonical site URL**

After Vercel assigns the production URL, set `siteConfig.siteURL` to that exact HTTPS URL with a trailing slash, then run:

```powershell
pnpm build
```

Expected: sitemap, feeds, canonical metadata, and generated links use the production Vercel origin.

- [ ] **Step 6: Redeploy and test from mainland China**

Verify from at least one desktop and one mobile network in mainland China:

- homepage and article HTML load;
- replacement images load;
- search assets load;
- GitHub and email links are correct;
- no console-breaking client error prevents navigation.

- [ ] **Step 7: Final diff review**

Run:

```powershell
git diff --check
git status --short
git diff --stat
```

Expected: only files named by this plan or explicitly approved during implementation are changed. Do not create commits unless the user separately authorizes them.

## Release acceptance checklist

- [ ] Browser title and public identity use `xushen · Code & Notes`.
- [ ] Final approved subtitle replaces every demo subtitle.
- [ ] Site language is Simplified Chinese.
- [ ] Avatar, logo, favicon, desktop banner, mobile banner, and theme hue use the approved personal visual set.
- [ ] Navigation contains Home, Archive, Projects, Skills, About, and the external GitHub link only.
- [ ] Friends and all other disabled feature pages return 404 or otherwise expose no demo content.
- [ ] About, Projects, Skills, and Profile contain real approved information.
- [ ] Exactly three real projects are shown; only approved destinations render link buttons.
- [ ] Skills contain no levels, experience durations, or percentage bars.
- [ ] At least one real post is public under `/posts/` with an English lower-case hyphenated slug.
- [ ] Public posts use only the approved categories and relevant tags.
- [ ] The content-pipeline fixture is draft-only and absent from production routes and feeds.
- [ ] RSS and Atom include only real public content.
- [ ] Search, dark mode, related posts, and the existing multi-entry TOC behavior work.
- [ ] Music, Live2D, comments, share poster, encryption examples, random posts, announcement, calendar, banner carousel, fullscreen wallpaper controls, visitor hue selection, and analytics are absent.
- [ ] Unused demo assets have been deleted only after reference validation.
- [ ] Desktop and mobile layouts pass visual review.
- [ ] `pnpm check`, `pnpm type-check`, `pnpm test`, and `pnpm build` pass.
- [ ] Vercel deployment succeeds and `siteURL` matches the final HTTPS deployment URL.
