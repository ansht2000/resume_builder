import { Schema, Type } from "@google/genai";

export const response_schema: Schema = {
    type: Type.OBJECT,
    description: "A schema for a response from an llm choosing the most relevant resume items for a given job listing",
    properties: {
        "education": {
            type: Type.ARRAY,
            description: "An array of education resume items to be inserted in the resume template",
            nullable: true,
            default: null,
            items: {
                type: Type.OBJECT,
                description: "A single education resume item that represents a degree or certificate",
                properties: {
                    "institution_name": {
                        type: Type.STRING,
                        description: "The name of the institution giving the degree or certificate"
                    },
                    "location": {
                        type: Type.STRING,
                        description: "The location of the institution in City, State format"
                    },
                    "degree_type": {
                        type: Type.STRING,
                        description: "The type of degree earned from the institution",
                    },
                    "degree_subject": {
                        type: Type.STRING,
                        description: "The subject of the degree earned from the institution",
                    },
                    "duration": {
                        type: Type.OBJECT,
                        description: "The duration of time attending the institution",
                        properties: {
                            "start_date": {
                                type: Type.STRING,
                                description: "The start date of attending the institution",
                            },
                            "end_date": {
                                type: Type.STRING,
                                description: "The end date of of attending the institution",
                                default: "Present",
                            },
                        },
                    },
                },
            },
        },
        "work_experiences": {
            type: Type.ARRAY,
            description: "An array of work experience resume items to be inserted in the resume template",
            nullable: true,
            default: null,
            items: {
                type: Type.OBJECT,
                description: "A single work experience resume item",
                properties: {
                    "company_name": {
                        type: Type.STRING,
                        description: "The name of the company of the work experience resume item",
                    },
                    "position_title": {
                        type: Type.STRING,
                        description: "The title of the position at the company of the work experience resume item",
                    },
                    "location": {
                        type: Type.STRING,
                        description: "The location of the company of the work experience resume item",
                    },
                    "contributions": {
                        type: Type.ARRAY,
                        description: "An array of sentences describing a person's contribution to the company of the work experience resume item",
                        items: {
                            type: Type.STRING,
                            description: "A sentence describing one aspect of a person's contribution to the company of the work experience resume item",
                        },
                    },
                    "duration": {
                        type: Type.OBJECT,
                        description: "The duration of time worked at the company of the work experience resume item",
                        properties: {
                            "start_date": {
                                type: Type.STRING,
                                description: "The start date of the work experience resume item",
                            },
                            "end_date": {
                                type: Type.STRING,
                                description: "The end date of the work experience resume item",
                                default: "Present",
                            },
                        },
                    },
                },
            },
        },
        "skills": {
            type: Type.ARRAY,
            description: "An array of skill resume items to be insterted in the resume template",
            nullable: true,
            default: null,
            items: {
                type: Type.OBJECT,
                description: "A single skill resume item",
                properties: {
                    "category": {
                        type: Type.STRING,
                        description: "A category to place a group of skills into, e.g. hard skills, soft skills, languages, etc.",
                    },
                    "skill_list": {
                        type: Type.ARRAY,
                        description: "A list of skills that a person has belonging to a certain category",
                        items: {
                            type: Type.STRING,
                            description: "A skill a person has belonging to a certain category",
                        },
                    },
                },
            },
        },
        "projects": {
            type: Type.ARRAY,
            description: "An array of project resume items to be inserted in the resume template",
            nullable: true,
            default: null,
            items: {
                type: Type.OBJECT,
                description: "A single project resume item",
                properties: {
                    "project_name": {
                        type: Type.STRING,
                        description: "The name of the project",
                    },
                    "github_link": {
                        type: Type.STRING,
                        description: "The link to the project",
                        nullable: true,
                        default: null,
                    },
                    "description": {
                        type: Type.STRING,
                        description: "A short description of the project",
                    },
                    "contributions": {
                        type: Type.ARRAY,
                        description: "An array of sentences describing aspects of project that a person implemented",
                        items: {
                            type: Type.STRING,
                            description: "A sentence describing one aspect of a project that a person implemented",
                        },
                    },
                },
            },
        },
        "coursework": {
            type: Type.ARRAY,
            description: "An array of coursework resume items to be inserted in the resume template",
            nullable: true,
            default: null,
            items: {
                type: Type.OBJECT,
                description: "A single coursework resume item",
                properties: {
                    "subject": {
                        type: Type.STRING,
                        description: "A subject to place related classes into",
                    },
                    "class_list": {
                        type: Type.ARRAY,
                        description: "A list of classes that belongs to a certain subject",
                        items: {
                            type: Type.STRING,
                            description: "A class that belongs to a certain subject",
                        },
                    },
                },
            },
        },
        "unqualified": {
            type: Type.STRING,
            description: "If applicable, text explaining why a candidate is not qualified for a job",
            nullable: true,
            default: null,
        }
    },
};