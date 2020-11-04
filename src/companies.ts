import { Inject, Injectable } from '@nestjs/common';
import { HasJobs } from './support/support.interface';
import { NeoAssistService } from './neo-assist/neo-assist.service';
import { EzDevsService } from './ez-devs/ez-devs.service';
import { FireworkService } from './firework/firework.service';

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
   * FireworkService.
   *
   * @protected
   */
  @Inject(FireworkService)
  protected fireworkService: FireworkService;

  /**
   * Get companies.
   */
  getCompanies(): HasJobs[] {
    return [
      this.neoAssistService,
      this.ezDevsServices,
      this.fireworkService,
    ];
  }
}
