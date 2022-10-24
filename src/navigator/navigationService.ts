import {CommonActions, NavigationContainerRef} from '@react-navigation/native';

export default class NavigationService {
  static _navigator: NavigationContainerRef<ReactNavigation.RootParamList> | null =
    null;

  static setTopLevelNavigator(navigatorRef: any) {
    this._navigator = navigatorRef;
  }

  static debounce = true;
  static pageName = '';

  static navigate(routeName: string, params: any) {
    if (this.debounce) {
      this.debounce = false;
      this.pageName = routeName;

      this._navigator &&
        this._navigator.dispatch(
          CommonActions.navigate({
            name: routeName,
            params,
          }),
        );

      setTimeout(() => {
        this.debounce = true;
      }, 500);
    }
  }
}
