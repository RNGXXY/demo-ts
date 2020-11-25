import { LoadableComponent } from "@loadable/component";

export interface IRoute extends Record<string, any> {
    path?: string;
    exact?: boolean;
    redirect?: string;
    component?: React.ComponentType | LoadableComponent<any>;
    routes?: IRoute[];
    key?: any;
    strict?: boolean;
    sensitive?: boolean;
    wrappers?: any[];
}