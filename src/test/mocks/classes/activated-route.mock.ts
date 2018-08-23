import {
  convertToParamMap,
  ParamMap,
  Params,
} from '@angular/router';

export class MockActivatedRoute {
  private _testData = null;
  private _testQueryParamMap: ParamMap = convertToParamMap({});

  public set testData(value: any) {
    this._testData = value;
  }

  public set testQueryParamMap(value: Params) {
    this._testQueryParamMap = convertToParamMap(value);
  }

  public get snapshot() {
    return {
      data: this._testData,
      queryParamMap: this._testQueryParamMap,
    };
  }
}
