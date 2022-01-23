

export class AppConfig {

  private _config: {[key: string]: unknown} | undefined;

  load(): Promise<boolean> {
    return fetch('assets/json/config.json')
      .then((response: Response) => response.json())
      .then(config => {
        this._config = config;
        return true;
      })
  }

  getValueByKey<T>(key: string): T {
    return this._config?.[key] as T;
  }
}
