import { Inject, Injectable } from '@nestjs/common';
import { HasJobs } from './support/support.interface';
import { NeoAssistService } from './neo-assist/neo-assist.service';
import { EzDevsService } from './ez-devs/ez-devs.service';
import { FireworkService } from './firework/firework.service';
import { ArcaSolutionsService } from './arca-solutions/arca-solutions.service';
import { NewWayService } from './new-way/new-way.service';
import { LabsPaschoalottoService } from './labs-paschoalotto/labs-paschoalotto.service'
import { GalataService } from './galata/galata.service';
import { LecomService } from './lecom/lecom.service';
import { FinchService } from './finch/finch.service';

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
   * ArcaSolutionsService.
   *
   * @protected
   */
  @Inject(ArcaSolutionsService)
  protected arcaSolutionsService: ArcaSolutionsService;

  /**
   * NewWayService.
   *
   * @protected
   */
  @Inject(NewWayService)
  protected newWayService: NewWayService;

  /**
   * LabsPaschoalottoService.
   *
   * @protected
   */
  @Inject(LabsPaschoalottoService)
  protected labsPaschoalottoService: LabsPaschoalottoService;

  /**
   * GalataService.
   *
   * @protected
   */
  @Inject(GalataService)
  protected galataService: GalataService;

  /**
   * LecomService.
   *
   * @protected
   */
  @Inject(LecomService)
  protected lecomService: LecomService;

  /**
   * FinchService.
   *
   * @protected
   */
  @Inject(FinchService)
  protected finchService: FinchService;

  /**
   * Get companies.
   */
  getCompanies(): HasJobs[] {
    return [
      this.neoAssistService,
      this.ezDevsServices,
      this.fireworkService,
      this.arcaSolutionsService,
      this.newWayService,
      this.labsPaschoalottoService,
      this.galataService,
      this.lecomService,
      this.finchService,
    ];
  }
}
