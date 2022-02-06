
import { NgModule, ModuleWithProviders } from '@angular/core';

import {SvgModule, SvgRegistry} from '../svg';
import { IconComponent } from './icon/icon.component';

import { IconRegistry } from './registry/icon-registry';
import { IconsConfig } from './icons.config';
import { IconsConfigInjectionToken } from './icons.config.injection-token';


const COMPONENTS = [
    IconComponent
];

export const iconsRegistryFactory = (svgRegistry: SvgRegistry, config: IconsConfig) => {
    return new IconRegistry(svgRegistry, config);
}

@NgModule({
    imports: [
        SvgModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class IconsModule {

    public static forRoot(config: IconsConfig): ModuleWithProviders<IconsModule> {
        return {
            ngModule: IconsModule,
            providers: [
                { provide: IconsConfigInjectionToken, useValue: config },
                {
                  provide: IconRegistry,
                  useFactory: iconsRegistryFactory,
                  deps: [
                    SvgRegistry,
                    IconsConfigInjectionToken
                  ]
                }
            ]
        };
    }

}
