export type RootStackParamList = {
    Home: undefined;
    Registration: undefined;
    Login: undefined;
};

export type DrawerParamList = {
    Scheduler: undefined;
    Notification: undefined;
    Categories: undefined;
    Profile: undefined;
};

export type TabStackParamList = {
    Категории: undefined;
    Планировщик: undefined;
    Уведомления: undefined;
    Профиль: undefined;
    Техники: undefined;
};

export interface RootNavigationConatinerProps {
    isLoggedIn: boolean;
}