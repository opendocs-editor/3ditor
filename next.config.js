const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

/** @type {import('next').NextConfig} */
let nextConfig = {
    reactStrictMode: true,
    distDir: "dist"
};

if(fs.existsSync(path.join(__dirname, ".env"))) {
    const buf = fs.readFileSync(path.join(__dirname, ".env"));
    const parsed = dotenv.parse(buf);
    nextConfig.env = parsed;
}

module.exports = nextConfig;
