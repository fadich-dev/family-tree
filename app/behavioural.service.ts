
export class BehaviouralService {

    /** Visibility of menu items */
    public vMenuItems: boolean[] = [];

    public showMenuItems(key) {
        this.vMenuItems[key] = false;
    }

    public hideMenuItems(key) {
        this.vMenuItems[key] = true;
    }

    public isHidden(key) {
        return this.vMenuItems[key] === undefined ? true : this.vMenuItems[key];
    }
}
