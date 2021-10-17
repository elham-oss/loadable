import { Type } from '@angular/core';
import { Route } from '@angular/router';

export type FunctionReturningPromise = () => Promise<any>;

export interface ModuleConfig extends Route {
  name: string;
  loadChildren?: string | FunctionReturningPromise;
  matcher: () => null;
  loadingComponent?: Type<any>;
  errorComponent?: Type<any>;
  timeoutTemplate?: Type<any>;
  isElement?: boolean;
  preload?: boolean;
}

export interface ILoadableRootOptions {
  loadingComponent?: Type<any>;
  errorComponent?: Type<any>;
  timeoutTemplate?: Type<any>;
  isElement?: boolean;
  preload?: boolean;
}

export interface ILoadableConfig {
  moduleConfigs?: ModuleConfig[];
}

export interface ILoadableRootConfig {
  moduleConfigs?: ModuleConfig[];
  rootOptions?: ILoadableRootOptions;
}
