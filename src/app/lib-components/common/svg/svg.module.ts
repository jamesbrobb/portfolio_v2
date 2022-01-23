import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";

import { SvgComponent } from './svg/svg.component';
import { SvgRegistry } from './registry/svg-registry';
import { SvgsConfigInjectionToken } from './svg.config.injection-token';
import {SvgsConfig} from "./svg.config";



const components = [
    SvgComponent
];

export const svgRegistryFactory = (materialIconRegistry: MatIconRegistry, sanitizer: DomSanitizer, config:SvgsConfig) => {
    return new SvgRegistry(materialIconRegistry, sanitizer, config);
}

@NgModule({
    imports: [
        HttpClientModule ,
        MatIconModule,
        CommonModule
    ],
    declarations: components,
    exports: components
})
export class SvgModule {

    public static forRoot(config: any): ModuleWithProviders<SvgModule> {
        return {
            ngModule: SvgModule,
            providers: [
                { provide: SvgsConfigInjectionToken, useValue: config },
                {
                  provide: SvgRegistry,
                  useFactory: svgRegistryFactory,
                  deps: [
                    MatIconRegistry,
                    DomSanitizer,
                    SvgsConfigInjectionToken
                  ]
                }
            ]
        }
    }
}

