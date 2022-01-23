import {Observable, of} from "rxjs";
import {take} from "rxjs/operators";
import {ObjectUtils} from "../utils";
import {AnalyticsAdaptor} from './analytics-adaptor';
import {AnalyticsHook} from './analytics-hook';
import {CommandGroup, CommandProcessor} from "../commands";
import {IfElse, Equals} from "../../../types";


type PropertyValueMapType = {[propertyKey: string]: unknown};


export const INTERPOLATABLE_PROP_VALUES_BUT_EMPTY_PROP_MAP_ERROR = 'There are interpolatable property values expected but no property value map was supplied';


export enum AnalyticsTrackingTypes {
    page = 'page',
    event = 'event',
    timing = 'timing'
}


export type AnalyticsAction = {
    type: string;
    trackType: AnalyticsTrackingTypes | string;
    disabled?: boolean;
    properties?: {[key: string]: unknown}
}

export type AnalyticsPageAction = AnalyticsAction & {
    doNotPersist?: boolean;
}

export type AnalyticsActions = {
    [key: string]: AnalyticsAction | AnalyticsPageAction | AnalyticsActions;
}

export type AnalyticsEvent = {
    actionId: string,
    propertyValueMap?: PropertyValueMapType;
}

export type CommandProcessorArgType<T> =
    IfElse<
        Equals<T, undefined>,
        [],
        [processor: CommandProcessor]
    >


export class AnalyticsService<T extends CommandGroup<AnalyticsHook> | undefined = undefined> {

    private readonly _actions: AnalyticsActions;
    private readonly _adaptor: AnalyticsAdaptor;

    private _preHooks: CommandGroup<AnalyticsHook> | undefined;
    private _hookProcessor: CommandProcessor | undefined;

    private readonly _matcher: RegExp = /{%\s*([\w.]+)\s*%}/g;


    constructor(actions: AnalyticsActions, adaptor: AnalyticsAdaptor, hooks?: T, ...args: CommandProcessorArgType<T>) {

        this._actions = actions;
        this._adaptor = adaptor;

        if(!hooks) {
          return;
        }

        this._preHooks = hooks;
        this._hookProcessor = args[0];
    }

    public addHook(hook: AnalyticsHook): void {

        this._preHooks?.addCommand(hook);
    }

    public track(analyticsEvent: AnalyticsEvent): void {

        try {

            let action: AnalyticsAction = ObjectUtils.recursivelyFindProperty(analyticsEvent.actionId, this._actions) as AnalyticsAction;

            action = this._interpolateValues(action, analyticsEvent.propertyValueMap);

            this._processHooks(action)
                .pipe(take(1))
                .subscribe((action) => {

                    action = action;

                    if(action.disabled) {
                        console.warn(`Analytics action ${action.type} is disabled`, action);
                        return;
                    }

                    this._adaptor.track(action);
                });

        } catch (e) {

            console.warn((e as Error).message);
        }
    }

    private _interpolateValues(action: AnalyticsAction, propertyValueMap?: PropertyValueMapType): AnalyticsAction {

        const actionAsString = JSON.stringify(action),
            hasInterpolatableValues = this._hasInterpolatablePropertyValues(actionAsString),
            hasEmptyPropertyMap = this._propertyValueMapIsEmpty(propertyValueMap);

        if(hasInterpolatableValues && hasEmptyPropertyMap) {
            throw new Error(INTERPOLATABLE_PROP_VALUES_BUT_EMPTY_PROP_MAP_ERROR);
        }

        if(hasEmptyPropertyMap) {
            return action;
        }

        const interpolatedString = this._matchAndReplaceValues(actionAsString, propertyValueMap as PropertyValueMapType);

        return JSON.parse(interpolatedString);
    }

    private _hasInterpolatablePropertyValues(actionAsString: string): boolean {
        this._matcher.lastIndex = 0;
        return this._matcher.test(actionAsString);
    }

    private _propertyValueMapIsEmpty(propertyValueMap: PropertyValueMapType | undefined): boolean {
        return !propertyValueMap || ObjectUtils.isEmpty(propertyValueMap);
    }

    private _matchAndReplaceValues(actionAsString: string, propertyValueMap: PropertyValueMapType): string {

        this._matcher.lastIndex = 0;

        return actionAsString.replace(
            this._matcher,
            (match: string, innerGroupMatch: string): string => {
                return ObjectUtils.recursivelyFindProperty(innerGroupMatch, propertyValueMap) as string;
            }
        );
    }

    private _processHooks(action: AnalyticsAction): Observable<AnalyticsAction> {

        if(!this._preHooks || !this._hookProcessor) {
            return of(action);
        }

        return this._hookProcessor.execute(this._preHooks, action, [this._actions, this._adaptor]);
    }
}
