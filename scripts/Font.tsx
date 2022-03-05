const Font = class {
    constructor(
        public name: string,
        public cssName: string,
        public importUrl?: string,
        public importType?: string
    ) {}

    public importCss(): string {
        if (!this.importUrl) return "";
        return `
            @font-face {
                font-family: "${this.cssName}";
                src: @import url("${this.importUrl}") format("${
            this.importType || "TrueType"
        }");
            }
        `;
    }

    public css(): string {
        return `font-family: "${this.cssName}";`;
    }

    public getSelectOption(): string {
        return `<option value="${this.cssName}">${this.name}</option>`;
    }

    public getJSXSelectOption(): JSX.Element {
        return <option value={this.cssName}>{this.name}</option>;
    }
};

export default Font;
