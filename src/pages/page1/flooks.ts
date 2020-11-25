// flooks在js中用户尚可，在ts中类型不明，不堪重用
import { Model } from "flooks";
interface ModelData extends Record<string, any> {
    state: {
        count: number
    }
}
type Now = (next?: Model | ModelData) => any
export type Counter = (now: Now) => ModelData

const counter: Counter = (now) => ({
    state: { count: 0 },
    effects: {
        add() {
            const { state: { count } } = now();
            now({ state: { count: count + 1 } });
        },
        sub() {
            const { state: { count } } = now();
            now({ state: { count: count - 1 } });
        },
        async addLater() {
            const { effects: { add } } = now();
            await new Promise((resolve) => setTimeout(resolve, 1000));
            add();
        },
    }
});

export default counter;
