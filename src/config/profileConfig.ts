import type { ProfileConfig } from "../types/config";

// 个人资料配置
export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.webp", // 临时占位，后续替换为个人头像
	name: "xushen",
	bio: "计算机科学与技术 · 预计 2028 年毕业",
	typewriter: {
		enable: true, // 启用个人简介打字机效果
		speed: 80, // 打字速度（毫秒）
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
