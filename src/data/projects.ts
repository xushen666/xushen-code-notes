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
		id: "travel-agent",
		title: "智能旅行助手",
		description:
			"基于 LangChain 和 FastAPI 开发的智能旅行助手。",
		image: "/assets/projects/travel-agent.webp",
		category: "web",
		techStack: ["Python", "LangChain", "FastAPI"],
		status: "completed",
		sourceCode: "https://github.com/xushen666/travel-planner",
		visitUrl: "https://项目演示地址.example.com",
		startDate: "2026-07",
		endDate: "2026-08",
		featured: true,
		tags: ["Agent", "LLM"],
		showImage: true,
	},
	{
		id: "Handwritten-digit-recognition",
		title: "手写数字识别",
		description:
			"一个可复现评测、可打包发布的手写数字识别离线桌面应用",
		image: "/assets/projects/Handwritten-digit-recognition.webp",
		category: "web",
		techStack: ["Python", "PyTorch", "torchvision"],
		status: "completed",
		sourceCode: "https://github.com/xushen666/Handwritten-digit-recognition.git",
		startDate: "2025-03",
		endDate: "2025-05",
		featured: true,
		tags: ["深度学习", "python"],
		showImage: true,
	},
	{
		id: "Navigation System",
		title: "导航系统模拟",
		description:
			"基于 Java 17 + Maven + Swing 的数据结构课程设计项目。系统将城市地图抽象为无向图，顶点表示地点，边表示道路，在满足大数据量场景的前提下实现地图展示、最近地点查询、最短路径、动态车流模拟与基于路况的最佳路径计算。",
		image: "/assets/projects/java-system.webp",
		category: "desktop",
		techStack: ["Java", "HTML5 Canvas" , "CSS" ,"JavaScript" ],
		status: "completed",
		sourceCode: "https://github.com/xushen666/仓库名",
		startDate: "2026-3",
		endDate: "2026-5",
		featured: false,
		tags: ["Java", "桌面应用"],
		showImage: true,
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
