export class GameFont {
    static base = '18px';
    static concat = (suffix: string) => `${GameFont.base} ${suffix}`;
    static options = {
        chest: {
            title: this.concat('serif'),
        }
    }
}
