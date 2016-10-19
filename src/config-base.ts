import { Config } from './config';

export class ConfigBase implements Config {
  
  protected data: any;

  constructor(data?: any) {
  	if (data) {
      this.setData(data);
  	}
  }

  setData(data: any) {
  	this.data = data;
  }

  set(key: string, value: any): this {
  	this.data[key] = value;
  	return this;
  }
  
  get(key: string): any {
  	return typeof this.data[key] !== undefined ? this.data[key] : null;
  }
  
  getAll(): any {
  	return this.data;
  }
}
