import { promises as fs } from "fs";
import path from "path";

export default async function read_file(working_directory: string, file_name: string): Promise<string> {
    const file_path: string = path.resolve(path.join(working_directory, file_name));
    const abs_path: string = path.resolve(working_directory);

    if (!file_path.startsWith(abs_path)) {
        throw Error(`Error: cannot read file "${file_path}" because it is outside of the working directory`);
    }

    try {
        const stat = await fs.stat(file_path);

        if (!stat.isFile()) {
            throw Error(`Error: provided file path does not exist or is not a file`);
        }

        const content: string = await fs.readFile(file_path, "utf-8");
        return content
    } catch (error) {
        throw Error(`Error reading file "${file_path}": ${error instanceof Error ? error.message : String(error)}`);
    }
}