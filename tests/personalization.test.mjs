import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { describe, it } from "node:test";

const readSource = (path) =>
	readFile(new URL(`../${path}`, import.meta.url), "utf8");

const sourceExists = async (path) => {
	try {
		await access(new URL(`../${path}`, import.meta.url));
		return true;
	} catch {
		return false;
	}
};

const [
	siteConfig,
	profileConfig,
	navBarConfig,
	sidebarConfig,
	musicConfig,
	pioConfig,
	effectsConfig,
	commentConfig,
	shareConfig,
	randomPostsConfig,
	relatedPostsConfig,
	skillsData,
	skillCard,
	fixturePost,
	globalStyleCheck,
	readme,
	packageSource,
	footerSource,
] = await Promise.all([
	readSource("src/config/siteConfig.ts"),
	readSource("src/config/profileConfig.ts"),
	readSource("src/config/navBarConfig.ts"),
	readSource("src/config/sidebarConfig.ts"),
	readSource("src/config/musicConfig.ts"),
	readSource("src/config/pioConfig.ts"),
	readSource("src/config/effectsConfig.ts"),
	readSource("src/config/commentConfig.ts"),
	readSource("src/config/shareConfig.ts"),
	readSource("src/config/randomPostsConfig.ts"),
	readSource("src/config/relatedPostsConfig.ts"),
	readSource("src/data/skills.ts"),
	readSource("src/components/features/skills/SkillCard.astro"),
	readSource("src/content/posts/content-pipeline-fixture.mdx"),
	readSource("scripts/check-global-style-loading.mjs"),
	readSource("README.md"),
	readSource("package.json"),
	readSource("src/components/organisms/footer/Footer.astro"),
]);

const packageConfig = JSON.parse(packageSource);
const [
	deployWorkflowExists,
	lintWorkflowExists,
	licenseExists,
	mitLicenseExists,
	faviconExists,
] = await Promise.all([
	sourceExists(".github/workflows/deploy.yml"),
	sourceExists(".github/workflows/lint.yml"),
	sourceExists("LICENSE"),
	sourceExists("LICENSE.MIT"),
	sourceExists("public/favicon/favicon.ico"),
]);

describe("Personal blog configuration", () => {
	it("uses xushen's public identity and Chinese site settings", () => {
		assert.match(siteConfig, /const SITE_LANG = "zh_CN"/);
		assert.match(siteConfig, /title: "xushen · Code & Notes"/);
		assert.match(siteConfig, /text: "xushen"/);
		assert.match(profileConfig, /name: "xushen"/);
		assert.match(profileConfig, /871446573@qq\.com/);
		assert.match(profileConfig, /https:\/\/github\.com\/xushen666/);
	});

	it("keeps only the approved feature pages public", () => {
		for (const page of ["anime", "diary", "friends", "timeline", "albums", "devices", "aiTools"]) {
			assert.match(siteConfig, new RegExp(`${page}: false`));
		}
		for (const page of ["projects", "skills"]) {
			assert.match(siteConfig, new RegExp(`${page}: true`));
		}
	});

	it("uses the approved top navigation and sidebar widgets", () => {
		for (const preset of ["Home", "Archive", "Projects", "Skills", "About"]) {
			assert.match(navBarConfig, new RegExp(`LinkPreset\\.${preset}`));
		}
		assert.match(navBarConfig, /name: "GitHub"[\s\S]*?github\.com\/xushen666[\s\S]*?external: true/);
		for (const removed of ["Bilibili", "Gitee", "Anime", "Diary", "Gallery", "Devices", "AITools", "Timeline", "Friends"]) {
			assert.doesNotMatch(navBarConfig, new RegExp(`name: "${removed}"|LinkPreset\\.${removed}`));
		}

		for (const kept of ["profile", "categories", "tags", "site-stats", "card-toc"]) {
			assert.match(sidebarConfig, new RegExp(`"${kept}"`));
		}
		for (const removed of ["announcement", "music-sidebar", "calendar"]) {
			assert.doesNotMatch(sidebarConfig, new RegExp(`"${removed}"`));
		}
	});

	it("disables optional effects while keeping core reading features", () => {
		for (const source of [musicConfig, pioConfig, commentConfig, shareConfig, randomPostsConfig]) {
			assert.match(source, /enable: false/);
		}
		assert.match(effectsConfig, /enable: false/);
		assert.match(effectsConfig, /switchable: false/);
		assert.match(relatedPostsConfig, /enable: true/);
		assert.match(siteConfig, /toc:\s*\{[\s\S]*?enable: true[\s\S]*?mobileTop: true[\s\S]*?desktopSidebar: true[\s\S]*?floating: true/);
		assert.match(siteConfig, /carousel:\s*\{[\s\S]*?enable: false/);
		assert.match(siteConfig, /showModeSwitchOnMobile: "off"/);
		assert.match(siteConfig, /themeColor:\s*\{[\s\S]*?fixed: true/);
	});

	it("shows skills without unverifiable levels or experience", () => {
		assert.doesNotMatch(skillsData, /\blevel\??:/);
		assert.doesNotMatch(skillsData, /\bexperience\??:/);
		assert.doesNotMatch(skillCard, /getLevelText|getLevelWidth|formatExperience|skill\.level|skill\.experience/);
	});

	it("keeps the content-pipeline fixture out of the public blog", () => {
		assert.match(fixturePost, /draft: true/);
	});

	it("verifies the personalized About page without requiring template promo markup", () => {
		assert.match(globalStyleCheck, /871446573@qq\.com/);
		assert.doesNotMatch(
			globalStyleCheck,
			/requiredMarkup: \[\["card-github"/,
		);
	});

	it("keeps the repository ready for Vercel deployment", () => {
		assert.equal(packageConfig.engines?.node, ">=22.12.0");
		assert.equal(deployWorkflowExists, false);
		assert.equal(lintWorkflowExists, true);

		for (const expected of [
			"xushen · Code & Notes",
			"https://github.com/xushen666/xushen-code-notes",
			"pnpm dev",
			"pnpm build",
			"Vercel",
			"https://github.com/LyraVoid/Mizuki",
		]) {
			assert.ok(readme.includes(expected), `README must include ${expected}`);
		}

		assert.equal(licenseExists, true);
		assert.equal(mitLicenseExists, true);
		assert.equal(faviconExists, true);
		assert.match(
			footerSource,
			/https:\/\/github\.com\/LyraVoid\/Mizuki/,
		);
	});
});
