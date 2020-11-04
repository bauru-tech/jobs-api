import { Inject, Injectable } from '@nestjs/common';
import { HasJobs } from './support/support.interface';
import { NeoAssistService } from './neo-assist/neo-assist.service';

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
   * Get companies.
   */
  getCompanies(): HasJobs[] {
    return [
      this.neoAssistService,
    ];
  }
}
