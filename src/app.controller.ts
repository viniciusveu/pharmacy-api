/* istanbul ignore file */
import { Controller, Get, Logger, Res } from '@nestjs/common';
import { DataSource  } from 'typeorm';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health-check')
@Controller('')
export class AppController {
    constructor(
        private readonly dataSource: DataSource,
    ) {}

    @Get()
    async healthCheck(@Res() response: Response) {
        const dbCheck = this.dataSource.isInitialized;
        let status = dbCheck

        const healthcheck = {
            uptime: process.uptime(),
            message: status ? "OK" : "ERROR",
            timestamp: new Date().toLocaleString(),
            checks: [
                {
                    name: "Banco de dados",
                    type: this.dataSource.options.type, 
                    status: dbCheck,
                }
            ]
        }

        Logger.log({ healthcheck });
        response.status(200).json(healthcheck);
    }
}
