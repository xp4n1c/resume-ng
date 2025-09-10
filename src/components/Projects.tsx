import { Resume } from "../schema/resume";
import { formatDate } from "../utils/dates";
import Section from "./Section";
import CustomMarkdown from "./CustomMarkdown";

interface ProjectsProps {
  projects: Resume["projects"];
}

const Projects = ({ projects }: ProjectsProps) => (
  <Section
    title="Projects"
    items={projects}
    renderItem={(project, i) => (
      <div key={`${project.name}-${i}`} className="mt-4 project-item break-inside-avoid">
        <div className="flex flex-col">
          <h3 className="border-b-2 border-b-smo-blue-400 text-2xl font-semibold tracking-wide dark:border-smo-blue-900">
            {project.name}
          </h3>
          <div className="flex flex-row justify-between">
            <div>{project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                Ver proyecto
              </a>
            )}</div>
            <div className="self-end text-gray-600 dark:text-gray-300">
              {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : "Present"}
            </div>
          </div>
        </div>
        <CustomMarkdown className="mt-2 max-w-none leading-normal">{project.description}</CustomMarkdown>
        <ul className="ml-1 list-outside list-disc pl-4">
          {project.highlights?.map((highlight, j) => (
            <li key={`${highlight}-${j}`}>
              <CustomMarkdown className="max-w-none" pAsSpan>
                {highlight}
              </CustomMarkdown>
            </li>
          ))}
        </ul>
        <ul className="mt-4">
          {project.technologies?.map((technology, i) => (
            <li
              key={`${technology}-${i}`}
              className="mb-2 mr-2 inline-block rounded-md bg-smo-blue-100 px-2 text-sm tracking-tighter text-gray-700 dark:bg-smo-blue-900 dark:text-smo-blue-50"
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>
    )}
  />
);

export default Projects;
