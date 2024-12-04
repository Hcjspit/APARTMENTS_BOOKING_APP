import { Log } from "../entities/log.entity";
import { LogModel } from "../models/log,model";

var ip = require("ip");

export class LogService {
  async add(description: string, result: boolean) {
    const logData: Log = {
      date: new Date(),
      ipAddress: ip.address(),
      description: description,
      result: result,
    };

    const newLog = await LogModel.create(logData);
    return newLog;
  }
}

export default new LogService();
