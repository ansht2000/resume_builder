import { FunctionDeclaration, Schema, Type } from "@google/genai";
import { promises as fs } from "fs";
import path from "path";

export default async function read_file(working_directory: string, file_name: string): Promise<string> {
    const templ_path: string = path.resolve(path.join(working_directory, file_name));
    const abs_path: string = path.resolve(working_directory);

    if (!templ_path.startsWith(abs_path)) {
        return `Error: cannot read file "${templ_path}" because it is outside of the working directory`;
    }

    try {
        const stat = await fs.stat(templ_path);

        if (!stat.isFile()) {
            return `Error: provided file path does not exist or is not a file`;
        }

        const templ_file: string = await fs.readFile(templ_path, "utf-8");
        return templ_file
    } catch (error) {
        return `Error: Error reading file: ${error}`;
    }
}

const param_file_name_schema: Schema = {
    type: Type.STRING,
    description: "The path to the file whose content should be read, relative to the working directory",
};

const read_file_params: Schema = {
    type: Type.OBJECT,
    properties: {
        "file_name": param_file_name_schema,
    }
};

export const schema_read_file: FunctionDeclaration = {
    name: "read_file",
    description: "Reads and returns content from a specified file in the working directory",
    parameters: read_file_params,
};