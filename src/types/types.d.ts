interface Location {
    city: string;
    state: string;
};

interface Duration {
    start_date: string;
    end_date: string;
};

interface EducationItem {
    institution_name: string | null;
    degree_type: string | null;
    degree_subject: string | null;
    location: Location | null;
    duration: Duration | null;
};

interface WorkItem {
    company_name: string | null;
    position_title: string | null;
    contributions: string[] | null;
    location: Location | null;
    duration: Duration | null;
};

interface SkillItem {
    category: string | null;
    skill_list: string[] | null;
};

interface ProjectItem {
    project_name: string | null;
    github_link: string | null;
    description: string | null;
    contributions: string[] | null;
};

interface CourseworkItem {
    subject: string | null;
    class_list: string[] | null;
};

export interface ResumeItems {
    education: EducationItem[] | null;
    work_experiences: WorkItem[] | null;
    skills: SkillItem[] | null;
    projects: ProjectItem[] | null;
    coursework: CourseworkItem[] | null;
};