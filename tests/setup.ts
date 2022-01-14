import path from "path";

process.env.PUBLIC_DIR = path.join(__dirname, "_fixtures");
process.env.HTML_TEMPLATE_PATH = path.join(__dirname, "_fixtures/index.html");