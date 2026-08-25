export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string;
	category: "frontend" | "backend" | "database" | "tools" | "other";
	color?: string;
}

export const skillsData: Skill[] = [
	{
		id: "html",
		name: "HTML",
		description: "用于构建语义清晰的网页结构。",
		icon: "fa7-brands:html5",
		category: "frontend",
		color: "#E34F26",
	},
	{
		id: "css",
		name: "CSS",
		description: "用于实现响应式布局和页面视觉样式。",
		icon: "fa7-brands:css3-alt",
		category: "frontend",
		color: "#1572B6",
	},
	{
		id: "javascript",
		name: "JavaScript",
		description: "用于网页交互与前端应用开发。",
		icon: "fa7-brands:js",
		category: "frontend",
		color: "#F7DF1E",
	},
	{
		id: "vue",
		name: "Vue",
		description: "用于构建组件化的前端界面。",
		icon: "fa7-brands:vuejs",
		category: "frontend",
		color: "#42B883",
	},
	{
		id: "python",
		name: "Python",
		description: "用于算法练习、自动化与 Agent 开发。",
		icon: "fa7-brands:python",
		category: "backend",
		color: "#3776AB",
	},
	{
		id: "java",
		name: "Java",
		description: "用于面向对象编程与后端开发学习。",
		icon: "fa7-brands:java",
		category: "backend",
		color: "#ED8B00",
	},
	{
		id: "spring-boot",
		name: "Spring Boot",
		description: "用于学习和实践 Java Web 应用开发。",
		icon: "simple-icons:springboot",
		category: "backend",
		color: "#6DB33F",
	},
	{
		id: "mysql",
		name: "MySQL",
		description: "用于关系型数据建模、查询与应用存储。",
		icon: "simple-icons:mysql",
		category: "database",
		color: "#4479A1",
	},
	{
		id: "git",
		name: "Git",
		description: "用于版本管理和代码协作。",
		icon: "fa7-brands:git-alt",
		category: "tools",
		color: "#F05032",
	},
	{
		id: "linux",
		name: "Linux",
		description: "用于开发环境、命令行和服务部署学习。",
		icon: "simple-icons:linux",
		category: "tools",
		color: "#FCC624",
	},
	{
		id: "docker",
		name: "Docker",
		description: "用于统一开发环境与应用容器化。",
		icon: "fa7-brands:docker",
		category: "tools",
		color: "#2496ED",
	},
	{
		id: "cpp",
		name: "C++",
		description: "用于程序设计、数据结构与算法学习。",
		icon: "simple-icons:cplusplus",
		category: "other",
		color: "#00599C",
	},
	{
		id: "langchain",
		name: "LangChain",
		description: "用于学习大语言模型应用与 Agent 工作流。",
		icon: "simple-icons:langchain",
		category: "other",
		color: "#1C3C3C",
	},
	{
		id: "pytorch",
		name: "PyTorch",
		description: "用于机器学习和深度学习基础实践。",
		icon: "simple-icons:pytorch",
		category: "other",
		color: "#EE4C2C",
	},
];
