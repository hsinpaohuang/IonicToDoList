import { ListItemType } from "@src/models/ListItem";
import router from '@src/router';

export enum SlideDirection {
  Left = 'slide-left',
  Right = 'slide-right',
}

export default (target: ListItemType): SlideDirection => {
  const pageType = router.currentRoute.value.params.type as ListItemType;
  if (pageType === ListItemType.Todo) {
    return SlideDirection.Right;
  } else if (pageType === ListItemType.Completed) {
    if (target === ListItemType.Todo) {
      return SlideDirection.Left;
    } else if (target === ListItemType.Archived) {
      return SlideDirection.Right;
    } else {
      throw new ReferenceError('invalid target');
    }
  } else if (pageType === ListItemType.Archived) {
    return SlideDirection.Left;
  } else {
    throw new ReferenceError('invalid page url');
  }
};
