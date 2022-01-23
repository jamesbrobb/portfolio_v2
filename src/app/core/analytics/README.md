# Analytics

A configurable analytics management implementation, that's both framework and tracking library agnostic.

## Usage
`analytics-config.json`

```json
{
  "page": {
    "trackType": "page",
    "properties": {
      "page_title": "{%title%}",
      "page_path": "{%path%}",
      "page_location": "{%href%}"
    }
  },
  "some": {
    "other": {
      "tracking": {
        "metric": {
          "value_1": "{%value_1%}",
          "value_2": "{%value_2%}",
          "value_3": "{%value_3%}"
        }
      }
    }
  }
}
```
<br/>
Instantiate service:
<br/><br/>

```ts
import {CommandGroup} from "./command-group";
import {AnalyticsHook} from "./analytics-hook";
import {AnalyticsAdaptor} from "./analytics-adaptor";

import config from './analytics-config.json'


const hookGroup: CommandGroup<AnalyticsHook> = new CommandGroup<AnalyticsHook>(),
    processor: CommandProcessor = new CommandProcessor(),
    adaptor: AnalyticsAdaptor = new SomeThirdPartyAdaptor();

hookGroup.addCommand(new SomeThirdPartyAnalyticsHook());

const service = new AnalyticsService(config, adaptor, hookGroup, processor);
```
<br/>
Send tracking event:
<br/><br/>

```ts

const event: AnalyticsEvent = {
    actionId: 'some.other.tracking.metric',
    propertyValueMap:  {
        value_1: 'this',
        value_2: 'that',
        value_3: 10
    }
}

service.track(event);
```

