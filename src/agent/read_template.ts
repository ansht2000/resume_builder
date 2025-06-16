import read_file from "./tools/functions/read_file";

// wrapper for the read_file tool to specifically read template files
async function read_tex_template_file(file_name: string): Promise<string> {
    try {
        let content: string = await read_file("public/templates", file_name);
        return content;
    } catch (error) {
        return `Error: Encountered an error while reading file: ${error}`;
    }
}

async function test() {
    const content: string = await read_tex_template_file("template.tex")
    console.log(content)
}

test()