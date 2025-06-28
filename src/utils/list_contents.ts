import { promises as fs, Stats } from "fs";
import path from "path";

export default async function list_contents(working_directory: string, directory: string = "."): Promise<string[]> {
    const target_dir: string = path.resolve(path.join(working_directory, directory));
    const abs_path: string = path.resolve(working_directory);
    if (directory === ".") {
        directory = working_directory;
    }

    if (!target_dir.startsWith(abs_path)) {
        throw Error(`Error: cannot list contents of "${directory}" because it is outside of the working directory`);
    }

    try {
        const stat: Stats = await fs.stat(target_dir);

        if (!stat.isDirectory()) {
            throw Error(`Error: ${directory} is not a directory`);
        }

        const content_list: string[] = await fs.readdir(target_dir);
        return content_list
    } catch (error) {
        throw Error(`Error: Encountered error while listing contents of directory`);
    }
}