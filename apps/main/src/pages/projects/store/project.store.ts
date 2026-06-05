export const removeProject = (id: string) => {
  projects = projects.filter((p) => p.id !== id);
};
import { Project } from "../../../types";
import { projects as initialProjects } from "../data/projectData";

let projects = [...initialProjects];

export const getProjects = () => projects;

export const getProjectById = (id: string) =>
  projects.find((p) => p.id === id) ?? null;

export const createProject = (project: Project) => {
  projects = [project, ...projects];
};

export const updateProject = (id: string, updated: Partial<Project>) => {
  projects = projects.map((p) => (p.id === id ? { ...p, ...updated } : p));
};
