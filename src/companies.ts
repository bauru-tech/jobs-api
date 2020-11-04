import { Inject, Injectable } from '@nestjs/common';
import { HasJobs } from './support/support.interface';
import { NeoAssistService } from './neo-assist/neo-assist.service';
import { EzDevsService } from './ez-devs/ez-devs.service';

@Injectable()
export class Companies {
  /**
   * NeoAssistService.
   *
   * @protected
   */
  @Inject(NeoAssistService)
  protected neoAssistService: NeoAssistService;

  /**
   * EzDevsService.
   *
   * @protected
   */
  @Inject(EzDevsService)
  protected ezDevsServices: EzDevsService;

  /**
   * Get companies.
   */
  getCompanies(): HasJobs[] {
    return [
      this.neoAssistService,
      this.ezDevsServices,
    ];
  }
}
