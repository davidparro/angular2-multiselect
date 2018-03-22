export class Multiselectitem {
    private id: number;
    private label: String;
    private parent: String;

    constructor() {}

    public get $id(): number {
        return this.id;
    }
    public set $id(value: number) {
        this.id = value;
    }

    public get $label(): String {
        return this.label;
    }
    public set $label(value: String) {
        this.label = value;
    }

    public get $parent(): String {
        return this.parent;
    }
    public set $parent(value: String) {
        this.parent = value;
    }

}
