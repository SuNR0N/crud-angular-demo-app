import {
  convertToParamMap,
  ParamMap,
} from '@angular/router';

export class MockActivatedRoute {
  private _testData = null;
  private _testQueryParamMap: ParamMap = convertToParamMap({});

  public get testData() {
    return this._testData;
  }

  public set testData(value: any) {
    this._testData = value;
  }

  public get testQueryParamMap(): ParamMap {
    return this._testQueryParamMap;
  }

  public set testQueryParamMap(value) {
    this._testQueryParamMap = convertToParamMap(value);
  }

  public get snapshot() {
    return {
      data: this.testData,
      queryParamMap: this.testQueryParamMap,
    };
  }
}
