import { Resume } from "../schema/resume";
import { formatDate } from "../utils/dates";
import Section from "./Section";

interface VolunteerProps {
  volunteer: Resume["volunteer"];
}

const Volunteer = ({ volunteer }: VolunteerProps) => (
  <Section
    title="Volunteer Experience"
    items={volunteer}
    renderItem={(vol, i) => (
      <div key={`${vol.organization}-${i}`} className="mt-4 volunteer-item break-inside-avoid">
        <div className="flex flex-col">
          <h3 className="border-b-2 border-b-smo-blue-400 text-2xl font-semibold tracking-wide dark:border-smo-blue-900">
            {vol.organization}
          </h3>
          <div className="flex flex-row justify-between">
            <div>{vol.position}</div>
            <div className="self-end text-gray-600 dark:text-gray-300">
              {formatDate(vol.startDate)} - {vol.endDate ? formatDate(vol.endDate) : "Present"}
            </div>
          </div>
        </div>
        <p className="mt-2">{vol.summary}</p>
        <ul className="ml-1 list-outside list-disc pl-4">
          {vol.highlights?.map((highlight, j) => (
            <li key={`${highlight}-${j}`}>{highlight}</li>
          ))}
        </ul>
        <ul className="mt-4">
          {vol.technologies?.map((technology, i) => (
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

export default Volunteer;
