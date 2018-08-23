import {
  convertToParamMap,
  ParamMap,
  Params,
  Route,
} from '@angular/router';

export class MockActivatedRouteSnapshot {
  private _testParamMap: ParamMap;
  private _testParams: Params;
  private _testRouteConfig: Route | null;

  constructor({
    paramMap,
    params,
    routeConfig,
  }: {
    paramMap?: Params,
    params?: Params,
    routeConfig?: Route | null,
  } = {
    paramMap: {},
    params: {},
    routeConfig: null,
  }) {
    this._testParamMap = convertToParamMap(paramMap);
    this._testParams = params;
    this._testRouteConfig = routeConfig;
  }

  public set testParamMap(value) {
    this._testParamMap = convertToParamMap(value);
  }

  public set testParams(value) {
    this._testParams = value;
  }

  public set testRouteConfig(value: Route | null) {
    this._testRouteConfig = value;
  }

  public get paramMap() {
    return this._testParamMap;
  }

  public get params() {
    return this._testParams;
  }

  public get routeConfig() {
    return this._testRouteConfig;
  }
}
