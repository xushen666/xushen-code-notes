export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	visitUrl?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	showImage?: boolean;
}

// 以下三张卡片是内容占位；补充真实项目资料后再添加仓库地址和截图。
export const projectsData: Project[] = [
	{
		id: "project-placeholder-1",
		title: "项目一（待补充）",
		description: "待补充项目名称、背景、个人职责、实现过程与结果。",
		image: "",
		category: "web",
		techStack: [],
		status: "in-progress",
		startDate: "待补充",
		tags: ["待补充"],
		showImage: false,
	},
	{
		id: "project-placeholder-2",
		title: "项目二（待补充）",
		description: "待补充项目名称、技术栈、项目截图与可公开链接。",
		image: "",
		category: "other",
		techStack: [],
		status: "planned",
		startDate: "待补充",
		tags: ["待补充"],
		showImage: false,
	},
	{
		id: "project-placeholder-3",
		title: "项目三（待补充）",
		description: "待补充项目名称、核心亮点、复盘文章与演示材料。",
		image: "",
		category: "other",
		techStack: [],
		status: "planned",
		startDate: "待补充",
		tags: ["待补充"],
		showImage: false,
	},
];

export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter((p) => p.status === "completed").length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: { completed, inProgress, planned },
	};
};

export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") return projectsData;
	return projectsData.filter((p) => p.category === category);
};

export const getFeaturedProjects = () =>
	projectsData.filter((p) => p.featured);

export const getAllTechStack = () => {
	const techSet = new Set<string>();
	for (const project of projectsData) {
		for (const tech of project.techStack) techSet.add(tech);
	}
	return Array.from(techSet).sort();
};
