import createTimeStamp from '@src/utils/createTimeStamp';
import { base64Header, ListItem, ListItemType } from '@src/models/ListItem';
import { defineStore } from 'pinia';
import { Storage } from '@capacitor/storage';

export interface State {
  list: ListItem[];
  editing: Partial<ListItem>;
}

const KEY = 'todoList';

export const useListStore = defineStore('list', {
  state: (): State => ({
    list: [],
    editing: {},
  }),
  getters: {
    getList: (state: State): (type: ListItemType) => ListItem[] =>
      (type: ListItemType) => state.list.filter(item => item.type === type),
    getEditing: (state: State): Partial<ListItem> => state.editing,
    getTargetItem: (state: State): (id: number) => ListItem | undefined =>
      (id: number): ListItem | undefined =>
        state.list.find(item => item.id === id),
    newId: (state: State): number => (state.list.length ?
      Math.max(...state.list.map(item => item.id)) + 1
      : 1
    ),
  },
  actions: {
    async initialize() {
      const { value: list } = await Storage.get({ key: KEY });
      this.list = list ? JSON.parse(list) : [];
    },
    saveToStorage() {
      Storage.set({ key: KEY, value: JSON.stringify(this.list) });
    },
    loadEditing(payload: number): boolean {
      // when user clicked to edit an item from list
      this.editing = this.list.find(item => item.id === payload) as ListItem;
      return Boolean(this.editing);
    },
    editItem(payload: Partial<ListItem>) {
      this.editing = {
        ...this.editing,
        ...payload,
      };
    },
    uploadImage(payload: string) {
      const imgAsString = payload.replaceAll(base64Header, '');
      if (this.editing.images) {
        this.editing.images.push(imgAsString);
      } else {
        this.editing.images = [imgAsString];
      }
    },
    save() {
      const { id, title, content } = this.editing;

      if (id === undefined && (title && content)) {
        // new
        this.list.push({
          ...this.editing,
          id: this.newId,
          type: ListItemType.Todo,
          createdAt: createTimeStamp(),
        } as ListItem);
      } else {
        // edit
        if (this.list.some(item => item.id === id)) {
          const index = this.list.findIndex(item => item.id === id);
          this.list[index] = {
            ...this.list[index],
            ...this.editing,
          }
        }
      }

      // clear editing
      this.editing = {};

      this.saveToStorage();
    },
    toggleComplete(id: number): ListItemType {
      const targetItem = this.getTargetItem(id);
      if (targetItem) {
        if (targetItem.completedAt) {
          delete targetItem.completedAt;
          targetItem.type = ListItemType.Todo;
        } else {
          targetItem.completedAt = createTimeStamp();
          targetItem.type = ListItemType.Completed;
        }

        this.saveToStorage();

        return targetItem.type;
      } else {
        throw new ReferenceError('Item not found');
      }
    },
    toggleArchive(id: number): ListItemType {
      const targetItem = this.getTargetItem(id);
      if (targetItem) {
        if (targetItem.archivedAt) {
          delete targetItem.archivedAt;
          targetItem.type = targetItem.completedAt
            ? ListItemType.Completed
            : ListItemType.Todo;
        } else {
          targetItem.archivedAt = createTimeStamp();
          targetItem.type = ListItemType.Archived;
        }

        this.saveToStorage();

        return targetItem.type;
      } else {
        throw new ReferenceError('Item not found');
      }
    },
    delete(id: number) {
      this.list = this.list.filter(item => item.id !== id);

      this.saveToStorage();
    },
  },
});
