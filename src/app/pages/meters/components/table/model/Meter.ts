/**
 * Created by Inneasoft on 13/12/2016.
 */
export class Meter {
  Id: number = null;
  Name: string = "";
  LocationId: number = 0;
  ServiceId: number = 0;
  UniteId: number = 0;
  ConsumptionDay: number;
  ConsumptionWeek: number;
  ConsumptionMonth: number;
  ConsumptionYear: number;
  UniteName: string;
  Nature: string;
  LocationName: string;
  children: Meter[];
  expanded: boolean;
  checked: boolean;
  Color: any;
  Niveau: number = 0;

  constructor(Object, children) {
    if (Object != null) {
      for (var k in Object) this[k] = Object[k];
    }
    this.children = children;
    this.expanded = true;
    this.checked = false;
  }

  toggle() {
    this.expanded = !this.expanded;
  }

  check() {
    let newState = !this.checked;
    this.checked = newState;
    this.checkRecursive(newState);
  }

  checkRecursive(state) {
    this.children.forEach(d => {
      d.checked = state;
      d.checkRecursive(state);
    })
  }

  mapIdValue(property: any, mappingItem: string, idValue: number, targetProperty: any) {
    if (idValue != null) {
      for (let obj of JSON.parse(localStorage.getItem(mappingItem))) {
        if (obj['Id'] == idValue) {
          return this[property] = obj[targetProperty];
        }
      }
    }
  }

}
